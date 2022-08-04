import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    festivalList : [],
    wishTogoList: [],
}

export const festivalSlice = createSlice({
    name: 'festival',
    initialState,
    reducers: {
        fetchFestival : (state, action) => {
            state.festivalList = action.payload
        },
        addWishfestival : (state, action) => {
            state.wishTogoList = action.payload
        },
    }
})

export const {fetchFestival, addWishfestival} = festivalSlice.actions
export default festivalSlice.reducer