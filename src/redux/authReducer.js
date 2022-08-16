import {createSlice} from "@reduxjs/toolkit"
const initialToken = localStorage.getItem('token');


let initialState = {
    token: initialToken,
    isLoggedIn : !!initialToken,
    email : null
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state, action) => {
            state.token = action.payload.idToken
            localStorage.setItem('token',action.payload.idToken)
            localStorage.setItem('expirationTime',action.payload.expirationTime)
            state.isLoggedIn = !!action.payload.idToken
            state.email = action.payload.email
        },
        logout : (state, action) => {
            state.token = null
            state.isLoggedIn = false
            state.email = null
            localStorage.removeItem('token')
            localStorage.removeItem('expirationTime');
        }
    }
})


export const {login, logout, fetchEmail} = authSlice.actions
export default authSlice.reducer