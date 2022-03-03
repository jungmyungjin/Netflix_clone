import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    {/* ThemeProvider 는 styled-components 에서 오는 하나의 컴포넌트 이다.
    ThemeProvider 는 하나의 Theme 오브젝트가 필요하다
		ThemeProvider 속성 사이에 있는 모든 컴포넌트는 모든 Theme 오브젝트에 접근 가능하다 */}
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
