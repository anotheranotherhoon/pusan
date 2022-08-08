import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "styled-components";
import { useTheme } from "../context/themeProvider";
import "./ScrollToTop.css"

const ScrollToTop = () => {
    const [themeMode, toggleTheme] = useTheme()
    console.log(themeMode)
    const [scrollY, setScrollY] = useState(0);
    const [BtnStatus, setBtnStatus] = useState(false);
    const handleFollow = () => {
        setScrollY(window.scrollY);
        if(scrollY > 100){
            setBtnStatus(true)
        }else{
            setBtnStatus(false)
        }
    }
    const handleTop = () => {  // 클릭하면 스크롤이 위로 올라가는 함수
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        setScrollY(0);  // ScrollY 의 값을 초기화
        setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
    }
    useEffect(() => {
        // console.log("ScrollY is", scrollY)
    }, [scrollY])
    useEffect(() => {
        const watch = () => {
            window.addEventListener('scroll', handleFollow);
        }
        watch()
        return () => {
            window.removeEventListener('scroll', handleFollow);
        }
    })
    return (
            <button className={BtnStatus ? "topBtn active" : "topBtn"} onClick={handleTop}>TOP</button>
    )
}

export default ScrollToTop