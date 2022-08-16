import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    festivalList : [],
    filteredFestival : [],
    optionFestival : ["지역을 선택하세요"]
}

export const festivalSlice = createSlice({
    name: 'festival',
    initialState,
    reducers: {
        fetchFestival : (state, action) => {
            let options = action.payload.map((el) => el.GUGUN_NM)
            const set = new Set(options)
            state.optionFestival.push(...set)
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