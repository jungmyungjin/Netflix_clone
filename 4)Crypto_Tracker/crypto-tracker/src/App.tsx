import React from "react";
import { useState } from "react";
import { createGlobalStyle } from "styled-components";
import Router from "./routes/Router";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";

// 글로벌 스타일 적용 : 전역 스코프에 스타일을 올려준다
// styled-reset 수동으로 적용
const GlobalStyled = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Fredoka&display=swap');
	html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
*{
	box-sizing: border-box;
}
body {
	font-family: 'Fredoka', sans-serif;
	background-color: ${(props) => props.theme.bgColor};
	color : ${(props) => props.theme.textColor};
}
a{
	text-decoration : none;
	color:inherit;
}
`;

function App() {
  // const [isDark, setIsDark] = useState(false);
  // const toggleDark = () => setIsDark((current) => !current); // toggle function
  const isDark = useRecoilValue(isDarkAtom); // 필요한 위치에 바로 사용한다 (ThemeProvider 용도)
  return (
    // Fragment: 유령컴포넌트로 감싼다
    <>
      {/*state를 사용하기 위해 ThemeProvider를 'index.tsx' -> 'App.tsx' 로 변경하였다.*/}
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyled />
        {/*<Router isDark={isDark} toggleDark={toggleDark} />*/}
        {/*<Router toggleDark={toggleDark} />*/}
        <Router />

        <ReactQueryDevtools initialIsOpen={true}></ReactQueryDevtools>
      </ThemeProvider>
    </>
  );
}

export default App;
