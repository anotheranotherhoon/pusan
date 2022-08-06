import { Routes, Route } from "react-router-dom"
import Home from "./routes/Home"
import Detail from "./routes/Detail"
import Restaurant from "./routes/Restaurant"
import Festival from "./routes/Festival"


const Router = () => {
    return (
            <Routes>
                <Route path="/" element ={<Home />}/>
                <Route path="/restaurant" element ={<Restaurant />}/>
                <Route path="/festival" element ={<Festival />}/>
            </Routes>
    )
}

export default  Router