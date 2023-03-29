import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/authReducer";

interface LoginType {
  (email: string, pasword: string): any;
}

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const firebaseKey = process.env.REACT_APP_FIREBASE_KEY;
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submit: LoginType = async (email, password) => {
    setIsLoading(true);
    let url;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseKey}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseKey}`;
    }
    try {
      const response = await axios.post(url, {
        email,
        password,
        returnSecureToken: true,
      });
      if (isLogin) {
        dispatch(
          login({ idToken: response.data.idToken, email: response.data.email })
        );
      } else {
        alert("회원가입에 성공하셨습니다");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLogin,
    isLoading,
    switchAuthModeHandler,
    submit,
  };
};
