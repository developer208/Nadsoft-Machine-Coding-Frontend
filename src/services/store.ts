import { configureStore } from "@reduxjs/toolkit";
import { restApiInstance } from "./restApiInstance";

export const store = configureStore({
  reducer: {
    [restApiInstance.reducerPath]: restApiInstance.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(restApiInstance.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
