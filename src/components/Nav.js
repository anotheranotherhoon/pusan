import styled from "styled-components"
import { Link } from "react-router-dom";
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { useTheme } from "../context/themeProvider";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authReducer";
import { useNavigate } from "react-router-dom";

const NavContainer = styled.ul`
    display:flex;
    flex-direction: row-reverse;
    width:100%;
    margin : 0;
    padding: 0;
    background-color: darkslategrey;
    list-style-type: none;
`
const NavItem = styled.li`
    padding: 15px;
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
    const [themeMode, toggleTheme] = useTheme()
    const state = useSelector((state) => state.authReducer)
    const {token, isLoggedIn} = state
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }
    return (
        <NavContainer>
            {isLoggedIn && (
                <>
                    <NavItem><LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn></NavItem>
                    <NavItem><LinkTo to="/profile">profile</LinkTo></NavItem>
                    <NavItem><LinkTo to="/review">review</LinkTo></NavItem>
                    <NavItem><LinkTo to="/wishtogo">wishToGo</LinkTo></NavItem>
                    <NavItem><LinkTo to="/festival">축제</LinkTo></NavItem>
                    <NavItem><LinkTo to="/restaurant">맛집</LinkTo></NavItem>
                    <NavItem onClick={toggleTheme}>{themeMode==='light' ? <BsFillSunFill /> : <BsFillMoonFill />}</NavItem>
                </>
            )}
            {!isLoggedIn &&<NavItem onClick={toggleTheme}>{themeMode==='light' ? <BsFillSunFill /> : <BsFillMoonFill />}</NavItem>}
        </NavContainer>
    )
}

export default Nav