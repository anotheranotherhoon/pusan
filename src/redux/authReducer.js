import {createSlice} from "@reduxjs/toolkit"

let initialState = {
    token: '',
    isLoggedIn : false,
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state, action) => {
            state.token = action.payload
            state.isLoggedIn = !!action.payload
        },
        logout : (state, action) => {
            state.token = null
            state.isLoggedIn = false
        }
    }
})


export const {login, logout} = authSlice.actions
export default authSlice.reducer