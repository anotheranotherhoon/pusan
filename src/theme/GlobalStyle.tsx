import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
declare module "styled-components" {
  export interface DefaultTheme {
    theme?: string;
    bgColor: string;
    textColor: string;
    borderColor: string;
  }
}

export const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
    box-sizing: border-box;
    }
    body {        
    background: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
    margin: 0;
    padding: 0;
    font-family: 'Hahmlet', serif;
    }
`;
