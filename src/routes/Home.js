import React from "react"
import { useSelector } from "react-redux"
import AuthForm from "../components/AuthForm"
import MainPage from "../components/MainPage"

const Home = () => {
    const {isLoggedIn} = useSelector((state) => state.persistedReducer.authReducer)
    return (
        <React.Fragment>
        {isLoggedIn&&(
            <MainPage/>
        )}
        {!isLoggedIn&&(
            <div>
                <AuthForm/>
            </div>
        )}
        </React.Fragment>
        
    )
}


export default Home