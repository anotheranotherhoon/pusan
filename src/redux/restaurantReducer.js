import { createSlice } from "@reduxjs/toolkit";
import {VILLAGE_FILLTER_OPTION} from "../util/constValue"

let initialState = {
    restaurantList : [],
    filteredRestaurant : [],
    optionRestaurant :VILLAGE_FILLTER_OPTION,
    currentFilter : "지역을 선택하세요"
}

export const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        fetchRestaurant : (state, action) => {
            state.restaurantList = action.payload
            state.filteredRestaurant = action.payload
        },
        addWishRestaurant : (state, action) => {
            state.wishTogoList = action.payload
        },
        filterRestaurant : (state, action) => {
            if(action.payload.option==="지역을 선택하세요"){
                state.filteredRestaurant = action.payload.restaurantList
            }
            else{
                state.filteredRestaurant = action.payload.restaurantList.filter((el)=>el.GUGUN_NM===action.payload.option)
            }
        }
    }
})

export const {fetchRestaurant, addWishRestaurant, filterRestaurant} = restaurantSlice.actions
export default restaurantSlice.reducer