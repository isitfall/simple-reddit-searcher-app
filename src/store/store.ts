import { configureStore } from "@reduxjs/toolkit";

import searchSlice from "./reducers/search";
import layoutSlice from "./reducers/layout";

export const store = configureStore({
  reducer: {
    search: searchSlice,
    layout: layoutSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
