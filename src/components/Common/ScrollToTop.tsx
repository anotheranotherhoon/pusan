import { useState, useEffect } from "react";
import styled from "styled-components";



const ScrollToTop = () => {
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
    const handleTop = () => {  
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        setScrollY(0);  
        setBtnStatus(false); 
    }
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
            <TopBtn className={BtnStatus ? "topBtn active" : "topBtn"} onClick={handleTop} >TOP</TopBtn>
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
    background: ${(props) => props.theme.theme === 'light' ? 'darkslategrey': 'grey'};
    color:${(props) => props.theme.theme === 'light' ? 'white': 'black'};
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