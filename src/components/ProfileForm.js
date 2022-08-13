import styled from "styled-components"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authReducer";
const ProfileForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const firebaseKey = process.env.REACT_APP_FIREBASE_KEY
    const newPasswordInputRef = useRef()
    const themeState = useSelector((state) => state.themeReducer)
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
            dispatch(logout())
            navigate('/')
        });
    };
    return (
        <ProfileForms themeState={themeState} onSubmit={submitHandler}>
            <ProfileControl themeState={themeState}>
                <label htmlFor='new-password'>New Password</label>
                <input type='password' id='new-password' minLength='7' ref={newPasswordInputRef} />
            </ProfileControl >
            <ProfileAction themeState={themeState}>
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
        color: ${(props) => props.themeState === 'light' ? 'black' : 'white'};
        display: block;
    }
    input {
        display: block;
        font: inherit;
        width: 100%;
        border-radius: 4px;
        border: 1px solid #38015c;
        padding: 0.25rem;
        background-color: ${(props) => props.themeState === 'light' ? 'white' : 'grey'};
    }
`
const ProfileAction = styled.div`
        margin-top: 1.5rem;
        button {
            font: inherit;
            cursor: pointer;
            padding: 0.5rem 1.5rem;
            border-radius: 4px;
            background-color: ${(props) => props.themeState === 'light' ? '#489572' : 'grey'};
            color: ${(props) => props.themeState === 'light' ? 'white' : 'black'};
            border: 1px solid #38015c;
            &:hover{
                background-color:${(props) => props.themeState === 'light' ? '#489572' : 'grey'};
                border-color: #540d83;
            }
        }
`
export default ProfileForm