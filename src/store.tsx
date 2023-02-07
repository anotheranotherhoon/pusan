import { configureStore, combineReducers } from "@reduxjs/toolkit";
import restaurantReducer from "./redux/restaurantReducer";
import festivalReducer from "./redux/festivalReducer";
import authReducer from "./redux/authReducer";
import themeReducer from "./redux/themeReducer"
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
        persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [REHYDRATE, PURGE, PERSIST]
            },
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch