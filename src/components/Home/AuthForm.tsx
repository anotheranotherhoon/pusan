import React, { useRef } from "react"
import styled from "styled-components";
import LoadingInicator from "../Common/LoadingIndicator"
import { useAuth } from "../../hook/useAuth";


const AuthForm = () => {
    const TEST_EMAIL = process.env.REACT_APP_TEST_EMAIL as string
    const TEST_PW = process.env.REACT_APP_TEST_PW as string
    const emailInputRef = useRef<HTMLInputElement | null>(null);
    const passwordInputRef = useRef<HTMLInputElement | null>(null);
    const {isLogin, isLoading, switchAuthModeHandler, submit} = useAuth()
    const guestLogin = async () => {
        submit(TEST_EMAIL, TEST_PW)
    }
    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current!.value;
        const enteredPassword = passwordInputRef.current!.value;
        submit(enteredEmail, enteredPassword)
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
                    {
                        isLoading ? <LoadingInicator /> : (
                            isLogin ?
                                <React.Fragment>
                                    <button type='button' onClick={guestLogin}>
                                        게스트 로그인
                                    </button>
                                    <button>로그인</button>
                                    <button type='button' onClick={switchAuthModeHandler}>
                                        새 계정 만들기
                                    </button>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <button>계정 생성</button>
                                    <button type='button' onClick={switchAuthModeHandler}>
                                        로그인하러 가기
                                    </button>
                                </React.Fragment>
                        )
                    }
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
    color:${(props) => props.theme.theme === 'light' ? 'white' : 'black'};
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    padding: 1rem;
`
const AuthTitle = styled.h1`
    text-align: center;
    font-size: 1.5rem;
    color:${(props) => props.theme.theme === 'light' ? 'white' : 'black'};
    margin-bottom: 5%;
`

const AuthControl = styled.div`
    margin-bottom: 0.5rem;
    
    label{
        display: block;
        color:${(props) => props.theme.theme === 'light' ? 'white' : 'black'};
        font-weight: bold;
        margin-bottom: 5%;
    }
    input{
        font: inherit;
        background-color: lightgray;
        color:${(props) => props.theme.theme === 'light' ? 'white' : 'black'};
        margin-bottom: 2%;
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
        color:${(props) => props.theme.theme === 'light' ? 'white' : 'black'};
        background: ${(props) => props.theme.theme === 'light' ? '#489572' : 'grey'};
        width : 100%;
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
        color:${(props) => props.theme.theme === 'light' ? 'white' : 'black'};
        border: none;
        padding: 0.15rem 1.5rem;
        &:hover{
            background-color: transparent;
            color: #ae82cc;
        }
    }
`





export default AuthForm