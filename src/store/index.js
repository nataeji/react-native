import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slice";

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    if (__DEV__) {
      const createDebugger = require("redux-flipper").default;
      return getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(createDebugger());
    }
    return getDefaultMiddleware();
  },
});

export default store;
