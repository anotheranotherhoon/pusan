import { Routes, Route, Navigate} from "react-router-dom"
import Home from "./routes/Home"
import Restaurant from "./routes/Restaurant"
import Festival from "./routes/Festival"
import WishToGo from "./routes/WishToGo"
import { useSelector } from "react-redux"
import React from "react"
import { RootState } from "./store"

const Router = () => {
    const {isLoggedIn} = useSelector((state : RootState) => state.persistedReducer.authReducer)
    return (
            <Routes>
                <Route path="/" element ={<Home />}/>
                {isLoggedIn&&(
                    <React.Fragment>
                        <Route path="/restaurant" element ={<Restaurant />}/>
                        <Route path="/festival" element ={<Festival />}/>
                        <Route path="/wishtogo" element ={<WishToGo/>}/>
                    </React.Fragment>
                )}
                <Route path='*' element={<Navigate replace to="/"/>}/>
            </Routes>
    )
}

export default  Router