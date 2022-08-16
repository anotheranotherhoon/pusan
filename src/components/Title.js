import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Title = () => {
    //다른 컴포넌트들 처럼 themeState 하면 에러발생함 그래서 themestate
    const themestate = useSelector((state) => state.themeReducer).theme
    return(
        <h1><GoToHome to='/' themestate={themestate} >부산에 가면</GoToHome></h1>
    )
}

const GoToHome = styled(Link)`
    font-size: 30px;
    font-weight: bold;
    text-decoration:none;
    color:${(props) => props.themestate === 'light' ? 'darkslategrey': 'white'};
`

export default Title