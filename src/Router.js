import { Routes, Route } from "react-router-dom"
import Home from "./routes/Home"
import Restaurant from "./routes/Restaurant"
import Festival from "./routes/Festival"
import WishToGo from "./routes/WishToGo"
import Profile from "./routes/Profile"

const Router = () => {
    return (
            <Routes>
                <Route path="/" element ={<Home />}/>
                <Route path="/restaurant" element ={<Restaurant />}/>
                <Route path="/festival" element ={<Festival />}/>
                <Route path="/wishtogo" element ={<WishToGo/>}/>
                <Route path="/profile" element ={<Profile />} />
            </Routes>
    )
}

export default  Router