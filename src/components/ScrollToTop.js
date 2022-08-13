import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";



const ScrollToTop = () => {
    const themeState = useSelector((state) => state.themeReducer)
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
            <TopBtn className={BtnStatus ? "topBtn active" : "topBtn"} onClick={handleTop} themeState={themeState} >TOP</TopBtn>
    )
}

const TopBtn = styled.button`
    position: fixed;
    opacity: 0;
    bottom: 40px;
    right: 40px;
    z-index: -10;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    border: 0 none;
    background: ${(props) => props.themeState === 'light' ? 'darkslategrey': 'grey'};
    color:${(props) => props.themeState === 'light' ? 'white': 'black'};
    border: 2px solid white;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: -0.06em;
    box-shadow: 1px 1px 6px 3px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: opacity 0.3s ease-in;
    &.active{
        z-index: 10;
        opacity: 1;
    }
    &:hover,
    &:focus,
    &:active{
        outline: 0 none;
    }
`

export default ScrollToTop