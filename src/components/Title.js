import { Link } from "react-router-dom";
import styled from "styled-components";

const GoToHome = styled(Link)`
    text-decoration:none;
    color : green;
`

const Title = () => {
    return(
        <h1><GoToHome to='/'>부산에 가면</GoToHome></h1>
    )
}

export default Title