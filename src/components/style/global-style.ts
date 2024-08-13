import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        font-family: "Poppins", sans-serif;
    }
    
    body {
        margin: 0;
        
        &>div {
            padding-top: 12px;
            padding-bottom: 32px;
            min-height: 100vh;
            background: linear-gradient(to bottom, #00101A 25%, #003942 100%);
        }
    }
`

export default GlobalStyle