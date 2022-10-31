import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export default createGlobalStyle`
    ${reset}
    /* other styles */
    * {
      margin: 0;
      padding: 0;
      font-family: 'Noto Sans KR', sans-serif;
    }
    
    html, body {
      color: 000742;
      background-color: #FDFDFD;
      font-family: 'Noto Sans KR', sans-serif;
      height: 100%;
      overflow: hidden;
    }

    *, :after, :before {
        box-sizing: border-box;
    }

    a {
      color: inherit;
      text-decoration: none;

      &:hover,
      &:focus {
        cursor: pointer;
      }
    }

    button {
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
    }

    ul,
    ol {
      list-style: none;
    }
`;
