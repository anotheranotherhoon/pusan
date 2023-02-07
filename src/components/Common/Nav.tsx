import styled from "styled-components"
import { Link } from "react-router-dom";
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authReducer";
import {toggleTheme} from "../../redux/themeReducer"
import { useNavigate } from "react-router-dom";
import React from "react";
import { RootState } from "../../store";

const NavContainer = styled.ul`
    display:flex;
    flex-direction: row-reverse;
    width:100%;
    height: 4rem;
    margin : 0;
    padding: 0 3em;
    background-color: darkslategrey;
    list-style-type: none;
    align-items:center;
    @media screen and (max-width: 1024px) {
        padding:0;
    } 


`
const NavItem = styled.li`
    padding: 15px;
    margin-left: 5px;
    color: white;
    cursor: pointer;
`
const LinkTo = styled(Link)`
    color: inherit;
    text-decoration:none;
    text-align:center;
`
const LogoutBtn = styled.div`
    color: inherit;
    text-decoration:none;
    text-align:center;
`

const Nav = () => {
    const navigate = useNavigate()
    const state = useSelector((state : RootState) => state.persistedReducer)
    const {theme} = state.themeReducer
    const { isLoggedIn} = state.authReducer
    const dispatch = useDispatch();
    const handleToggleTheme = () => {
        dispatch(toggleTheme())
    }
    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }
    return (
        <NavContainer>
            {isLoggedIn && (
                <React.Fragment>
                    <NavItem><LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn></NavItem>
                    <NavItem><LinkTo to="/wishtogo">wishToGo</LinkTo></NavItem>
                    <NavItem><LinkTo to="/festival">축제</LinkTo></NavItem>
                    <NavItem><LinkTo to="/restaurant">맛집</LinkTo></NavItem>
                    <NavItem onClick={handleToggleTheme}>{theme==='light' ? <BsFillMoonFill /> : <BsFillSunFill />}</NavItem>
                </React.Fragment>
            )}
            {!isLoggedIn &&<NavItem onClick={handleToggleTheme}>{theme==='light' ? <BsFillMoonFill /> : <BsFillSunFill /> }</NavItem>}
        </NavContainer>
    )
}

export default Nav