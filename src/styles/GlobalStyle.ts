import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  html {
    box-sizing: border-box;
  }
  
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  
  body {
    font-family: 'Open Sans', sans-serif;
    max-width: 1200px;
    padding: 0 25px;
    margin: 0 auto;
    color: #fff;
    background-color: #080808;
    min-height: 100vh;
  }
`;
