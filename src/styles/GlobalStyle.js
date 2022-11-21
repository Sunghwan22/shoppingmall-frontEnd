import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{
 box-sizing: border-box;
 list-style: none;
 margin: 0;
 padding: 0;
 line-height: 1em;
 word-break: keep-all;
}

 a {   
   text-decoration: none;
 }

 /* button {
  border: none;
  background-color: none;
 } */
`;

export default GlobalStyle;
