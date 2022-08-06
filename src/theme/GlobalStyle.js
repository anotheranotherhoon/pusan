import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset'

export const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
    box-sizing: border-box;
    }  
    body {        
    background-color: ${(props) => props.theme.bgColor};
    color:${(props) => props.theme.textColor};
    margin: 0;
    padding: 0;
    font-family: 'Hahmlet', serif;
    }
    
    
`;
