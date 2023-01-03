import { useSelector } from "react-redux"
import AuthForm from "../components/AuthForm"

const Home = () => {
    const {isLoggedIn} = useSelector((state) => state.persistedReducer.authReducer)
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