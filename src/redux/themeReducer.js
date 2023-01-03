import { createSlice } from "@reduxjs/toolkit";
let initialState = {
    theme : 'light',
}
export const themeSlice = createSlice({
    name : 'theme',
    initialState,
    reducers: {
        toggleTheme : (state, action) => {
            if(state.theme === 'light'){
                state.theme = 'dark';
            }else{
                state.theme = 'light';
            }
        }
    }
})
export const {toggleTheme} = themeSlice.actions
export default themeSlice.reducer
