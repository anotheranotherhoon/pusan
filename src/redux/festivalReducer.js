import { createSlice } from "@reduxjs/toolkit";
import {VILLAGE_FILLTER_OPTION} from "../util/constValue"
let initialState = {
    festivalList : [],
    filteredFestival : [],
    optionFestival : VILLAGE_FILLTER_OPTION,
    currentFilter : "지역을 선택하세요"
}

export const festivalSlice = createSlice({
    name: 'festival',
    initialState,
    reducers: {
        fetchFestival : (state, action) => {
            state.festivalList = action.payload
            state.filteredFestival = action.payload
        },
        addWishfestival : (state, action) => {
            state.wishTogoList = action.payload
        },
        filterFestival : (state, action) => {
            if(action.payload.option==="지역을 선택하세요"){
                state.filteredFestival = action.payload.festivalList
            }
            else {
                state.filteredFestival = action.payload.festivalList.filter((el)=>el.GUGUN_NM===action.payload.option)
            }
        }
    }
})

export const {fetchFestival, addWishfestival, filterFestival} = festivalSlice.actions
export default festivalSlice.reducer