import { Link } from "react-router-dom";
import styled from "styled-components";

const Title = () => {
    return(
        <Main><GoToHome to='/'>부산에 가면</GoToHome></Main>
    )
}
const Main = styled.h1`
    margin: 3em 0 3em 10em;
    @media screen and (max-width: 1024px) {
        margin:  3em 0;
}

`

const GoToHome = styled(Link)`
    font-size: 50px;
    font-weight: bold;
    text-decoration:none;
    color:${(props) => props.theme.theme === 'light' ? 'darkslategrey': 'white'};
    @media screen and (max-width: 1024px) {
        font-size: 25px;
}
`

export default Title