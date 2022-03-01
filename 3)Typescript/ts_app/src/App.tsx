import React from "react";
import { useState } from "react";
import styled from "styled-components";
// import Circle from "./Circle";
// import Form from "./Form";

const Contatiner = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

function App() {
  return (
    <Contatiner>
      <H1>Hello Theme of Typescript?!</H1>
    </Contatiner>
  );
}

export default App;
