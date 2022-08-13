import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./redux/restaurantReducer";
import festivalReducer from "./redux/festivalReducer";
import authReducer from "./redux/authReducer";
export const store = configureStore({
    reducer : {
        restaurantReducer,
        festivalReducer,
        authReducer
    }
})

