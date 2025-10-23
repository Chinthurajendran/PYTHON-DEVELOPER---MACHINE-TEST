import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import tokenSlice  from "./slices/UserToken";



const persistConfig = {
    key: "root",
    storage,
};


const rootReducer = combineReducers({
    authentication_user: tokenSlice,
});

export default persistReducer(persistConfig, rootReducer);