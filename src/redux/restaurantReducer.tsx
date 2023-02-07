import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { VILLAGE_FILLTER_OPTION } from "../util/constValue"
import { getRestaurantInfo } from "../api/getRestaurantInfo";

export interface RestaurantInfoType {
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
    MAIN_TITLE : string;
    PLACE : string;
    RPRSNTV_MENU : string;
    SUBTITLE : string;
    TITLE : string;
    UC_SEQ : number;
    USAGE_DAY_WEEK_AND_TIME : string;
}


interface RestaurantInitialStateType {
    status : null | string;
    restaurantList : RestaurantInfoType[];
    filteredRestaurant : RestaurantInfoType[];
    optionRestaurant : string[];
    currentFilter : string;
}


let initialState : RestaurantInitialStateType = {
    status : null,  
    restaurantList: [],
    filteredRestaurant: [],
    optionRestaurant: VILLAGE_FILLTER_OPTION,
    currentFilter: "지역을 선택하세요"
}

export const getRestaurant = createAsyncThunk(
    'getRestaurant',getRestaurantInfo
)


export const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        filterRestaurant: (state, action) => {
            if (action.payload.option === "지역을 선택하세요") {
                state.filteredRestaurant = action.payload.restaurantList
            }
            else {
                state.filteredRestaurant = action.payload.restaurantList.filter((el : RestaurantInfoType) => el.GUGUN_NM === action.payload.option)
            }
        }
    },
    extraReducers : (builder) => {
        builder.addCase(getRestaurant.pending, (state, action)=>{
            state.status = "Loading"
        })
        builder.addCase(getRestaurant.fulfilled, (state, action)=>{
            state.status = "fulfilled"
            state.restaurantList = action.payload
            state.filteredRestaurant = action.payload
        })
        builder.addCase(getRestaurant.rejected,(state, action)=>{
            state.status = "failed"
        })
    }
})

export const {filterRestaurant } = restaurantSlice.actions
export default restaurantSlice.reducer