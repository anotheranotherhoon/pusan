import { useState, useRef } from "react"
import { useDispatch } from "react-redux";
import styled from "styled-components";
import LoadingInicator from "../Common/LoadingIndicator"
import {login} from "../../redux/authReducer"
import axios from "axios";


const AuthForm = () => {
    const firebaseKey = process.env.REACT_APP_FIREBASE_KEY
    const TEST_EMAIL = process.env.REACT_APP_TEST_EMAIL
    const TEST_PW = process.env.REACT_APP_TEST_PW
    const dispatch = useDispatch();
    const emailInputRef = useRef<HTMLInputElement | null >(null);
    const passwordInputRef = useRef<HTMLInputElement | null >(null);
    const [isLogin, setIsLogin] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState)
    }
    const guestLogin = async() => {
        setIsLoading(true)
        try{
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseKey}`,{
                email : TEST_EMAIL,
                password: TEST_PW,
                returnSecureToken: true,
            })
            dispatch(login({idToken : response.data.idToken,  email : response.data.email}))
        }
        catch(err){
            alert(err.message)
        }
        finally{
            setIsLoading(false)
        }
    }
    const submitHandler = async(event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current!.value;
        const enteredPassword = passwordInputRef.current!.value;
        setIsLoading(true)
        let url;
        if (isLogin) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseKey}`
        } else {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseKey}`
        }
        try{
            const response = await axios.post(url,{
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            })
            if(isLogin){
                dispatch(login({idToken : response.data.idToken,  email : response.data.email}))
            }else{
                alert('회원가입에 성공하셨습니다')
                setIsLogin(true)
            }
        }catch(err){
            alert(err.message)
        }finally{
            setIsLoading(false)
        }
    }


    return (
        <AuthSection>
            <AuthTitle>{isLogin ? '로그인' : '회원가입'}</AuthTitle>
            <form onSubmit={submitHandler}>
                <AuthControl>
                    <label htmlFor="email">이메일을 입력하세요.</label>
                    <input type='email' id='email' ref={emailInputRef} required />
                </AuthControl>
                <AuthControl>
                    <label htmlFor='password'>비밀번호를 입력하세요.</label>
                    <input type='password' id='password' ref={passwordInputRef} required />
                </AuthControl>
                <AuthActions>
                {isLogin && 
                <button type='button' onClick={guestLogin}>
                        게스트 로그인
                    </button>
                    }
                    {!isLoading && (
                    <button>{isLogin ? '로그인' : '계정 생성'}</button>
                    )}
                    {
                    isLoading && 
                    <LoadingInicator></LoadingInicator>}
                    <button type='button' onClick={switchAuthModeHandler}>
                        {isLogin ? '회원가입' : '기존 계정으로 로그인 하기'}
                    </button>
                </AuthActions>
            </form>
        </AuthSection>
    )
}

const AuthSection = styled.section`
    margin: 3rem auto;
    width: 95%;
    max-width: 25rem;
    border-radius: 6px;
    background: ${(props) => props.theme.theme === 'light' ? 'darkslategrey' : 'grey'};
    color:${(props) => props.theme.theme  === 'light' ? 'white' : 'black'};
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    padding: 1rem;
    text-align: center;
`
const AuthTitle = styled.h1`
    text-align: center;
    color:${(props) => props.theme.theme  === 'light' ? 'white' : 'black'};
`

const AuthControl = styled.div`
    margin-bottom: 0.5rem;
    label{
        display: block;
        color:${(props) => props.theme.theme  === 'light' ? 'white' : 'black'};
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
    input{
        font: inherit;
        background-color: lightgray;
        color:${(props) => props.theme.theme  === 'light' ? 'white' : 'black'};
        border-radius: 4px;
        border: 1px solid white;
        width: 100%;
        text-align: left;
        padding: 0.25rem;
    }
`
const AuthActions = styled.div`
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    button{
        cursor: pointer;
        font: inherit;
        color:${(props) => props.theme.theme  === 'light' ? 'white' : 'black'};
        background: ${(props) => props.theme.theme  === 'light' ? '#489572' : 'grey'};
        border: 1px solid white;
        border-radius: 4px;
        padding: 0.5rem 2.5rem;
        margin-bottom: 0.5rem;
        &:hover{
            background-color: #546E00;
            border-color: #546E00;
        }
    }
    .toggle{
        margin-top: 1rem;
        background-color: transparent;
        color:${(props) => props.theme.theme  === 'light' ? 'white' : 'black'};
        border: none;
        padding: 0.15rem 1.5rem;
        &:hover{
            background-color: transparent;
            color: #ae82cc;
        }
    }
`





export default AuthForm