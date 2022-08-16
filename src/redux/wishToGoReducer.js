import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import {dbService} from "../fbase"
import { collection, getDoc, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";


let initialState = {
    wishToGoList : []
}

export const wishToGoSlice = createSlice({
    name: 'wishToGo',
    initialState,
    reducers: {
        fetchWish : (state, action) => {
            state.wishToGoList = action.payload
        }
    }
})

export const {fetchWish} = wishToGoSlice.actions
export default wishToGoSlice.reducer