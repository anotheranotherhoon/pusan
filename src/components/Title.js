import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTheme } from "../context/themeProvider";

const Title = () => {
    //다른 컴포넌트들 처럼 themeMode라고 하면 에러발생함
    const [theme] = useTheme()
    return(
        <h1><GoToHome to='/' theme={theme} >부산에 가면</GoToHome></h1>
    )
}

const GoToHome = styled(Link)`
    font-size: 30px;
    font-weight: bold;
    text-decoration:none;
    color:${(props) => props.theme === 'light' ? 'darkslategrey': 'white'};
`

export default Title