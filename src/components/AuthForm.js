import { useState, useRef } from "react"
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useTheme } from "../context/themeProvider";
import LoadingInicator from "./LoadingIndicator"
import {login} from "../redux/authReducer"

const AuthForm = () => {
    const firebaseKey = process.env.REACT_APP_FIREBASE_KEY
    const [themeMode] = useTheme()
    const dispatch = useDispatch();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const [isLogin, setIsLogin] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState)
    }
    const submitHandler = (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        setIsLoading(true)
        let url;
        if (isLogin) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseKey}`
        } else {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseKey}`
        }
        fetch(
            url,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        ).then((res) => {
            setIsLoading(false)
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then((data) => {
                    // show an error modal
                    let errorMessage = 'Authentication failed!';
                    if(data && data.error && data.error.message){
                        errorMessage = data.error.message
                    }
                    throw new Error(errorMessage);
                });
            }
        }).then(data => {
            dispatch(login(data.idToken))
        })
        .catch(err => {
            alert(err.message)
        })
    };


    return (
        <AuthSection themeMode={themeMode}>
            <AuthTitle themeMode={themeMode}>{isLogin ? '로그인' : '회원가입'}</AuthTitle>
            <form onSubmit={submitHandler}>
                <AuthControl themeMode={themeMode}>
                    <label htmlFor="email">이메일을 입력하세요.</label>
                    <input type='email' id='email' ref={emailInputRef} required />
                </AuthControl>
                <AuthControl themeMode={themeMode}>
                    <label htmlFor='password'>비밀번호를 입력하세요.</label>
                    <input type='password' id='password' ref={passwordInputRef} required />
                </AuthControl>
                <AuthActions themeMode={themeMode}>
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
    background: ${(props) => props.themeMode === 'light' ? 'darkslategrey' : 'grey'};
    color:${(props) => props.themeMode === 'light' ? 'white' : 'black'};
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    padding: 1rem;
    text-align: center;
`
const AuthTitle = styled.h1`
    text-align: center;
    color:${(props) => props.themeMode === 'light' ? 'white' : 'black'};
`

const AuthControl = styled.div`
    margin-bottom: 0.5rem;
    label{
        display: block;
        color:${(props) => props.themeMode === 'light' ? 'white' : 'black'};
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
    input{
        font: inherit;
        background-color: lightgray;
        color:${(props) => props.themeMode === 'light' ? 'white' : 'black'};
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
        color:${(props) => props.themeMode === 'light' ? 'white' : 'black'};
        background: ${(props) => props.themeMode === 'light' ? '#489572' : 'grey'};
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
        color:${(props) => props.themeMode === 'light' ? 'white' : 'black'};
        border: none;
        padding: 0.15rem 1.5rem;
        &:hover{
            background-color: transparent;
            color: #ae82cc;
        }
    }
`





export default AuthForm