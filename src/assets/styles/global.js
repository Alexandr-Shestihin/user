import { createGlobalStyle } from "styled-components";

import "normalize.css";
import "./var.css";
import "./icon.css";
import "../fonts/stylesheet.css";

const GlobalStyles = createGlobalStyle`
    *, *::after, *::before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Nexa', sans-serif;
        color: var(--white);
    }

    body {
        font-size: 16px;
         background-color: var(--bg); 
        ${"" /* TODO color  */}
        ${"" /* background-color: #3f317c; */}
    }

    ul, ol {
        list-style: none;
    }

    h1, h2, h3, h4, h5, h6, p {
        margin: 0;
    }

    .c-p {
        cursor: pointer;
    }

    .b-shadow {
        box-shadow: 0 12px 13px 0px #00000075;
    }
`;

export default GlobalStyles;
