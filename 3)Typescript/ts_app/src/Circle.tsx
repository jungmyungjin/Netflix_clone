import styled from "styled-components";
import { useState } from "react";

// styled-components에서의 interface
// styled-components가 Container를 div로 변경하는 과정에서
// div 에서는 bgColor라는 props를 받을 준비가 되어있지 않다.
// 때문에 설정을 따로 해주어야 한다.
interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

// interface를 붙여서, props 타입을 정의해준다.
const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 1 00px;
  border: 5px solid ${(props) => props.borderColor};
`;

// interface : 해당 객체의 모양을 정해준다.
// interface는 Typescript와 코드가 실행되기 전에 확인해준다.
// PropsType는 코드 실행 후, 브라우저에서 에러 확인이 가능하지만.
// inerface는 코드 실행 전 에러를 확인할 수 있다.
// props 에서의 interface
interface CircleProps {
  bgColor: string;
  borderColor?: string; // required 처리안되게, 선택적으로 할 수 있게 하는 방법 => optional props
  text?: string;
}

// interface를 사용하여 Circle의 Props의 타입을 정해준다
function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
  const [counter, setCounter] = useState<number | string>(1);
  // <number | string> : 타입을 숫자 혹은 문자열이 들어 올 수 있도록 정의한다.
  // 위의 정의를 하지 않은경우 Typescripts는 default 값을 기반으로, 어떤 타입으로 정의할 것인지에 대해 판단한다.
  const useCounter = () => {
    setCounter("hello");
    setCounter(2);
    // setCounter(false); // Error!!
    setCounter(3.14);
    console.log(counter);
  };

  // ?? : default 값을 설정해준다
  // 기본적으로 bgColor는 Required 처리되기 때문에, 존재하지 않는 경우 에러처리된다.
  return (
    <Container
      bgColor={bgColor}
      borderColor={borderColor ?? bgColor}
      onClick={useCounter}
    >
      {text}
    </Container>
  );
}

export default Circle;
