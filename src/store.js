import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./redux/restaurantReducer";
import festivalReducer from "./redux/festivalReducer";

export const store = configureStore({
    reducer : {
        restaurantReducer,
        festivalReducer
    }
})

