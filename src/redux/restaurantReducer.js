import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    restaurantList : [],
    aedRestaurant : [],
    wishTogoList: [],
    optionRestaurant : ["지역을 선택하세요"]
}

export const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        fetchRestaurant : (state, action) => {
            let options = action.payload.map((el) => el.GUGUN_NM)
            const set = new Set(options)
            state.optionRestaurant.push(...set)
            state.restaurantList = action.payload
            state.filteredRestaurant = action.payload
        },
        addWishRestaurant : (state, action) => {
            state.wishTogoList = action.payload
        },
        filterRestaurant : (state, action) => {
            console.log('action.payload.restaurantList :', action.payload.restaurantList)
            console.log('action.payload.option :', action.payload.option)
            state.filteredRestaurant = action.payload.restaurantList.filter((el)=>el.GUGUN_NM===action.payload.option)
        }
    }
})

export const {fetchRestaurant, addWishRestaurant, filterRestaurant} = restaurantSlice.actions
export default restaurantSlice.reducer