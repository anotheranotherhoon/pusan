import {createSlice} from "@reduxjs/toolkit"
import { festivalSlice } from "./festivalReducer"

// import React, {useState} from "react"

// const AuthContext = React.createContext({
//     token: '',
//     isLoggedIn : false,
//     login: (token) => {},
//     logout: () => {}
// })

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
        }
    }
})

// export const AuthContextProvider = ({children}) => {
//     const [token, setToken] = useState(null)
//     // truty falsy 값을 불리언으로 바꿔준다.
//     const userIsLoggedIn = !!token;
//     const loginHandler = () => {
//         setToken(token)
//     }
//     const logoutHandler = () => {
//         setToken(null);
//     }
//     const contextValue = {
//         token : token,
//         isLoggedIn : userIsLoggedIn,
//         login : loginHandler,
//         logout : logoutHandler
//     }
//     return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
// }

export const {login, logout} = authSlice.actions
export default authSlice.reducer