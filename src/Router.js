import { Routes, Route, Navigate} from "react-router-dom"
import Home from "./routes/Home"
import Restaurant from "./routes/Restaurant"
import Festival from "./routes/Festival"
import WishToGo from "./routes/WishToGo"
import Profile from "./routes/Profile"
import { useSelector } from "react-redux"

const Router = () => {
    const userState = useSelector((state) => state.persistedReducer)
    const {isLoggedIn} = userState.authReducer
    return (
            <Routes>
                <Route path="/" element ={<Home />}/>
                {isLoggedIn&&(
                    <>
                        <Route path="/restaurant" element ={<Restaurant />}/>
                        <Route path="/festival" element ={<Festival />}/>
                        <Route path="/wishtogo" element ={<WishToGo/>}/>
                        <Route path="/profile" element ={<Profile />} />
                    </>
                )}
                <Route path='*' element={<Navigate replace to="/"/>}/>
            </Routes>
    )
}

export default  Router