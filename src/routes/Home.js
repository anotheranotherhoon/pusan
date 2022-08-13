import { useSelector } from "react-redux"
import AuthForm from "../components/AuthForm"

const Home = () => {
    const state = useSelector((state) => state.authReducer)
    const {token, isLoggedIn} = state
    console.log(isLoggedIn)
    return (
        <>
        {isLoggedIn&&(
            <div>로그인됨</div>
        )}
        {!isLoggedIn&&(
            <div>
                <AuthForm/>
            </div>
        )}
        </>
        
    )
}

export default Home