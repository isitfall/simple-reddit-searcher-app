import React, { useEffect, useState, FormEvent, useCallback } from "react";
import { debounce } from "debounce";
import {
  selectSearchResults,
  selectSearchLoading,
  selectSearchLoadingMore,
  fetchSearchResults,
  fetchMoreSearchResults,
  selectGetMoreResultsKey,
  setSearchResults,
} from "./store/reducers/search";

import { BaseInput } from "./components/common/form/input/input";
import { AppLayout } from "./layout/app-layout/app-layout";
import "./style.css";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { Container } from "./layout/container/container";
import { List } from "./components/list/list";
import { Loader } from "./components/common/loader/loader";

export const App = () => {
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector((state) => selectSearchResults(state));
  const searchLoading = useAppSelector((state) => selectSearchLoading(state));
  const searchLoadingMore = useAppSelector((state) => selectSearchLoadingMore(state));
  const getMoreResultsKey = useAppSelector((state) => selectGetMoreResultsKey(state));

  const [search, setSearch] = useState("");

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  // const handleLoadMore = async (isIntersecting: boolean) => {
  //   // console.log({ getMoreResultsKey, searchLoadingMore });
  //   if (isIntersecting && getMoreResultsKey && !searchLoadingMore) {
  //     console.log("RUNNING", search, getMoreResultsKey);
  //     await dispatch(fetchMoreSearchResults({ search, after: getMoreResultsKey }));
  //   }
  // };

  const handleLoadMore = useCallback(async () => {
    await dispatch(fetchMoreSearchResults({ search, after: getMoreResultsKey }));
  }, [dispatch, getMoreResultsKey, search]);

  useEffect(() => {
    const handler = debounce(
      (searchString: string) => dispatch(fetchSearchResults(searchString)),
      200,
    );

    search.length > 2 ? handler(search) : dispatch(setSearchResults([]));

    return () => {
      handler.clear();
    };
  }, [search, dispatch]);

  return (
    <AppLayout
      showSection={searchResults.length > 0}
      headerChildren={
        <BaseInput
          id="search"
          placeholder="Put thread name..."
          className="min-w-[25%]"
          value={search}
          handleChange={handleChange}
          prefixIcon={
            searchLoading ? <Loader className="loader animate-spin" /> : undefined
          }
        />
      }
    >
      <Container>
        {searchResults.length > 0 ? (
          <List
            items={searchResults}
            handleLoadMore={handleLoadMore}
            loading={searchLoadingMore}
            showButton={!!getMoreResultsKey}
          />
        ) : (
          <div />
        )}
      </Container>
    </AppLayout>
  );
};
