import {createSlice} from "@reduxjs/toolkit"
let initialState = {
    token: '',
    isLoggedIn : false,
    email : ''
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state, action) => {
            state.token = action.payload.idToken
            state.isLoggedIn = !!action.payload.idToken
            state.email = action.payload.email
        },
        logout : (state, action) => {
            return initialState
        }
        
    }
})




export const {login, logout, fetchEmail} = authSlice.actions
export default authSlice.reducer