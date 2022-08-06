import styled from "styled-components"
import { Link } from "react-router-dom";

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

const Nav = () => {
    return(
        <NavContainer>
            <NavItem ><LinkTo to="/review">review</LinkTo></NavItem>
            <NavItem><LinkTo to="/wishtogo">wishToGo</LinkTo></NavItem>
            <NavItem ><LinkTo to="/festival">축제</LinkTo></NavItem>
            <NavItem ><LinkTo to="/restaurant">맛집</LinkTo></NavItem>
        </NavContainer>
    )
}

export default Nav