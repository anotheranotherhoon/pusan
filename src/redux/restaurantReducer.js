import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    restaurantList : [],
    wishTogoList: [],
}

export const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        fetchRestaurant : (state, action) => {
            state.restaurantList = action.payload
        },
        addWishRestaurant : (state, action) => {
            state.wishTogoList = action.payload
        },
    }
})

export const {fetchRestaurant, addWishRestaurant} = restaurantSlice.actions
export default restaurantSlice.reducer