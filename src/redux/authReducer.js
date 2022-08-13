import {createSlice} from "@reduxjs/toolkit"
const initialToken = localStorage.getItem('token');
let initialState = {
    token: initialToken,
    isLoggedIn : !!initialToken,
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state, action) => {
            localStorage.setItem('token',action.payload)
            state.token = action.payload
            state.isLoggedIn = !!action.payload
        },
        logout : (state, action) => {
            state.token = null
            state.isLoggedIn = false
            localStorage.removeItem('token')
        }
    }
})


export const {login, logout} = authSlice.actions
export default authSlice.reducer