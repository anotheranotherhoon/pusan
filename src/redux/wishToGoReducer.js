import { createSlice } from "@reduxjs/toolkit";



let initialState = {
    wishToGoList : [],
    filteredWishToGoList : [],
    optionWish : ["지역을 선택하세요",
    "강서구",
    "영도구",
    "연제구",
    "중구",
    "해운대구",
    "서구",
    "남구",
    "동구",
    "동래구",
    "기장군",
    "북구",
    "사하구",
    "사상구",
    "부산진구",
    "금정구",
    "수영구"
]
}

export const wishToGoSlice = createSlice({
    name: 'wishToGo',
    initialState,
    reducers: {
        fetchWish : (state, action) => {
            state.wishToGoList = action.payload
            state.filteredWishToGoList = action.payload
        },
        filterWish : (state, action) => {
            if(action.payload.option==="지역을 선택하세요"){
                state.filteredWishToGoList = action.payload.wishToGoList
            }
            else {
                state.filteredWishToGoList = action.payload.wishToGoList.filter((el)=>el.GUGUN_NM===action.payload.option)
            }
        }
    }
})

export const {fetchWish, filterWish} = wishToGoSlice.actions
export default wishToGoSlice.reducer