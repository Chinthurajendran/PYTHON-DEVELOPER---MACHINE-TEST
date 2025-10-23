
import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./rootReducer"
import { persistStore } from "redux-persist";


const Store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

export const persistor = persistStore(Store);

export default Store