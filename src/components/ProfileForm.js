import styled from "styled-components"
import { useTheme } from "../context/themeProvider"
import { useRef } from "react"
import axios from "axios"
import { useSelector } from "react-redux"

const ProfileForm = () => {
    const firebaseKey = process.env.REACT_APP_FIREBASE_KEY
    const newPasswordInputRef = useRef()
    const [themeMode] = useTheme()
    const state = useSelector((state) => state.authReducer)
    const { token, isLoggedIn } = state
    const submitHandler = (event) => {
        event.preventDefault();

        const enteredNewPassword = newPasswordInputRef.current.value;

        // add validation

        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${firebaseKey}`, {
            method: 'POST',
            body: JSON.stringify({
                idToken: token,
                password: enteredNewPassword,
                returnSecureToken: false
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            // assumption: Always succeeds!


        });
    };
    return (
        <ProfileForms themeMode={themeMode} onSubmit={submitHandler}>
            <ProfileControl themeMode={themeMode}>
                <label htmlFor='new-password'>New Password</label>
                <input type='password' id='new-password' minLength='7' ref={newPasswordInputRef} />
            </ProfileControl >
            <ProfileAction themeMode={themeMode}>
                <button>Change Password</button>
            </ProfileAction>
        </ProfileForms>
    )
}

const ProfileForms = styled.form`
    width: 95%;
    max-width: 25rem;
    margin: 2rem auto;
`

const ProfileControl = styled.div`
    margin-bottom: 0.5rem;
    label {
        font-weight: bold;
        margin-bottom: 0.5rem;
        color: ${(props) => props.themeMode === 'light' ? 'black' : 'white'};
        display: block;
    }
    input {
        display: block;
        font: inherit;
        width: 100%;
        border-radius: 4px;
        border: 1px solid #38015c;
        padding: 0.25rem;
        background-color: ${(props) => props.themeMode === 'light' ? 'white' : 'grey'};
    }
`
const ProfileAction = styled.div`
        margin-top: 1.5rem;
        button {
            font: inherit;
            cursor: pointer;
            padding: 0.5rem 1.5rem;
            border-radius: 4px;
            background-color: ${(props) => props.themeMode === 'light' ? '#489572' : 'grey'};
            color: ${(props) => props.themeMode === 'light' ? 'white' : 'black'};
            border: 1px solid #38015c;
            &:hover{
                background-color:${(props) => props.themeMode === 'light' ? '#489572' : 'grey'};
                border-color: #540d83;
            }
        }
`
export default ProfileForm