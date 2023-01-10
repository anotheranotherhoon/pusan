import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFestivalInfo } from "../api/getFestivalInfo";
import {VILLAGE_FILLTER_OPTION} from "../util/constValue"
let initialState = {
    status : null,  
    festivalList : [],
    filteredFestival : [],
    optionFestival : VILLAGE_FILLTER_OPTION,
    currentFilter : "지역을 선택하세요"
}

export const getFestival = createAsyncThunk(
    'getFestival',getFestivalInfo
)


export const festivalSlice = createSlice({
    name: 'festival',
    initialState,
    reducers: {
        filterFestival : (state, action) => {
            if(action.payload.option==="지역을 선택하세요"){
                state.filteredFestival = action.payload.festivalList
            }
            else {
                state.filteredFestival = action.payload.festivalList.filter((el)=>el.GUGUN_NM===action.payload.option)
            }
        }
    },
    extraReducers : (builder) => {
        builder.addCase(getFestival.pending, (state, action)=>{
            state.status = "Loading"
        })
        builder.addCase(getFestival.fulfilled, (state, action)=>{
            state.status = "fulfilled"
            state.festivalList = action.payload
            state.filteredFestival = action.payload
        })
        builder.addCase(getFestival.rejected,(state, action)=>{
            state.status = "failed"
        })
    }
})

export const {fetchFestival, addWishfestival, filterFestival} = festivalSlice.actions
export default festivalSlice.reducer