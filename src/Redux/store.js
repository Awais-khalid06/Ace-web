import { configureStore } from "@reduxjs/toolkit";
// import reducers from './reducers';
import reducers from "./index";
// Persisit State
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createMigrate,
  createTransform,
} from "redux-persist";
import localStorage from "redux-persist/es/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage: localStorage,

  //whitelist: ['Data'],
  blacklist: ["app", "bussiness", "shopper"],
};
const persistedReducer = persistReducer(persistConfig, reducers);
const configureAppStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat([]),
  });
};
export default configureAppStore;
