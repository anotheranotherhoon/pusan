import { configureStore, combineReducers } from "@reduxjs/toolkit";
import restaurantReducer from "./redux/restaurantReducer";
import festivalReducer from "./redux/festivalReducer";
import authReducer from "./redux/authReducer";
import themeReducer from "./redux/themeReducer"
import wishToGoReducer from "./redux/wishToGoReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, REHYDRATE, PERSIST,PURGE, } from 'redux-persist'

const persistConfig = {
    key: "root",
    storage,
};

const reducer = combineReducers({
    authReducer,
    themeReducer
})
const persistedReducer = persistReducer(persistConfig, reducer)
export const store = configureStore({
    reducer: {
        restaurantReducer,
        festivalReducer,
        authReducer,
        themeReducer,
        wishToGoReducer,
        persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [REHYDRATE, PURGE, PERSIST]
            },
        }),
})

