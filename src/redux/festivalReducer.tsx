import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFestivalInfo } from "../api/getFestivalInfo";
import {VILLAGE_FILLTER_OPTION} from "../util/constValue"

export interface FestivalInfoType {
    ADDR1 : string;
    ADDR2 : string;
    CNTCT_TEL : string;
    GUGUN_NM : string;
    HOMEPAGE_URL : string;
    ITEMCNTNTS : string;
    LAT : number;
    LNG : number;
    MAIN_IMG_NORMAL : string;
    MAIN_IMG_THUMB : string;
    MAIN_PLACE : string;
    MAIN_TITLE : string;
    MIDDLE_SIZE_RM1 : string;
    PLACE : string;
    SUBTITLE : string;
    TITLE : string;
    TRFC_INFO : string;
    UC_SEQ : number;
    USAGE_AMOUNT : string;
    USAGE_DAY : string;
    USAGE_DAY_WEEK_AND_TIME : string;
}

interface FestivalInitialStateType {
    status : null | string;
    festivalList : FestivalInfoType[];
    filteredFestival : FestivalInfoType[];
    optionFestival : string[];
    currentFilter : string;
}

let initialState : FestivalInitialStateType = {
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
                state.filteredFestival = action.payload.festivalList.filter((el : FestivalInfoType)=>el.GUGUN_NM===action.payload.option)
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

export const {filterFestival} = festivalSlice.actions
export default festivalSlice.reducer