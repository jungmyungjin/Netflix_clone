import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import "./root.css";

// 두개의 Theme의 property 값이 같아야 한다.
const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111",
};
const whiteTheme = {
  textColor: "#111",
  backgroundColor: "whitesmoke",
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
