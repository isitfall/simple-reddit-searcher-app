import { Response, ResponseHasMoreDataMarker } from "./../../types/search-result";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { BaseSearchItem } from "../../types/search-result";
import { mapSearchResponseToArray } from "../../utils/mapSearchResultToArray";
import { replaceStrSpaces } from "../../utils/replaceStrSpaces";
import { RootState } from "../store";

interface SearchSliceState {
  searchResults: BaseSearchItem[];
  getMoreResultsKey: string | null;
  loading: boolean;
  loadingMore: boolean;
}

const initialState: SearchSliceState = {
  searchResults: [],
  getMoreResultsKey: null,
  loading: false,
  loadingMore: false,
};

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (search: string): Promise<Response | never> => {
    const searchUrl = `https://www.reddit.com/r/${replaceStrSpaces(
      search,
    )}.json?limit=10`;
    try {
      const readableStream = await fetch(searchUrl);
      const data = await readableStream.json();

      return data;
    } catch (e) {
      throw new Error("Something wents wrong...", { cause: e });
    }
  },
);

export const fetchMoreSearchResults = createAsyncThunk(
  "search/fetchMoreSearchResults",
  async ({
    search,
    after,
  }: {
    search: string;
    after: ResponseHasMoreDataMarker;
  }): Promise<Response | never> => {
    const searchUrl = `https://www.reddit.com/r/${replaceStrSpaces(
      search,
    )}.json?limit=10&after=${after}`;
    try {
      const readableStream = await fetch(searchUrl);
      const data = await readableStream.json();

      return data;
    } catch (e) {
      throw new Error("Something wents wrong...", { cause: e });
    }
  },
);

const setSearchResultsAction = (
  state: SearchSliceState,
  action: PayloadAction<BaseSearchItem[]>,
): void => {
  state.searchResults = [...action.payload];
};

const addSearchResultsAction = (
  state: SearchSliceState,
  action: PayloadAction<BaseSearchItem[]>,
): void => {
  state.searchResults = [...state.searchResults, ...action.payload];
};

const setGetMoreResultsKey = (
  state: SearchSliceState,
  action: PayloadAction<string | null>,
): void => {
  state.getMoreResultsKey = action.payload;
};

const enableLoadingAction = (state: SearchSliceState) => {
  state.loading = true;
};

const disableLoadingAction = (state: SearchSliceState) => {
  state.loading = false;
};

const enableLoadingMoreAction = (state: SearchSliceState) => {
  state.loadingMore = true;
};

const disableLoadingMoreAction = (state: SearchSliceState) => {
  state.loadingMore = false;
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults: setSearchResultsAction,
    addSearchResults: addSearchResultsAction,
    enableLoading: enableLoadingAction,
    disableLoading: disableLoadingAction,
    enableLoadingMore: enableLoadingMoreAction,
    disableLoadingMore: disableLoadingMoreAction,
  },
  extraReducers: (builder: any) => {
    builder.addCase(fetchSearchResults.pending, (state: SearchSliceState) => {
      enableLoadingAction(state);
    });
    builder.addCase(
      fetchSearchResults.fulfilled,
      (state: SearchSliceState, { payload }: { payload: Response }) => {
        if (payload.error) {
          setSearchResultsAction(state, { payload: [], type: "" });
        } else {
          const mappedResponse = mapSearchResponseToArray(payload);

          setSearchResultsAction(state, { payload: mappedResponse, type: "" });
          setGetMoreResultsKey(state, { payload: payload.data.after, type: "" });
        }

        disableLoadingAction(state);
      },
    );
    builder.addCase(fetchSearchResults.rejected, (state: SearchSliceState) => {
      setSearchResultsAction(state, { payload: [], type: "" });
      disableLoadingAction(state);
    });

    builder.addCase(fetchMoreSearchResults.pending, (state: SearchSliceState) => {
      enableLoadingMoreAction(state);
    });
    builder.addCase(
      fetchMoreSearchResults.fulfilled,
      (state: SearchSliceState, { payload }: { payload: Response }) => {
        if (payload.error) {
          addSearchResultsAction(state, { payload: [], type: "" });
        } else {
          const mappedResponse = mapSearchResponseToArray(payload);

          addSearchResultsAction(state, { payload: mappedResponse, type: "" });
          setGetMoreResultsKey(state, { payload: payload.data.after, type: "" });
        }

        disableLoadingMoreAction(state);
        console.error(state);
      },
    );
    builder.addCase(fetchMoreSearchResults.rejected, (state: SearchSliceState) => {
      addSearchResultsAction(state, { payload: [], type: "" });
      disableLoadingMoreAction(state);
    });
  },
});

export const {
  setSearchResults,
  enableLoading,
  disableLoading,
  enableLoadingMore,
  disableLoadingMore,
} = searchSlice.actions;

export const selectSearchResults = (state: RootState) => state.search.searchResults;
export const selectSearchLoading = (state: RootState) => state.search.loading;
export const selectSearchLoadingMore = (state: RootState) => state.search.loadingMore;
export const selectGetMoreResultsKey = (state: RootState) =>
  state.search.getMoreResultsKey;

export default searchSlice.reducer;
