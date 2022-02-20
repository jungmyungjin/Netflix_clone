import styled, { keyframes } from "styled-components";

// styled components 사용하기
// - className을 사용할 필요 X
// - Style 태그를 사용할 필요 X
// - 변경하여 사용할 수 있다.
// - 확장할 수 있다.

// 사용법 : styled.[HTML 태그] `` (back tick)
// - `` 백틱 사이에 들어가는 부분은 무조건 CSS여야 한다.

const Father = styled.div`
  display: flex;
  flex-direction: column;
`;

// 가용성 있도록 변경하여 사용하기
const Box = styled.div`
  // 속성에서 값을 가져와서 쓴다
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

// 기존 컴포넌트를 확장하여 사용하기
// Box 컴포넌트에 있는 내용을 가져오고, 필요한 내용을 추가한다.
const Circle = styled(Box)`
  border-radius: 50px;
`;

const Text = styled.span`
  color: white;
`;

const Btn = styled.button`
  background-color: pink;
`;

// style로 컴포넌트를 작성하는 방법
// required를 각각 태그에 하나하나 입력하지 않고, 한번에 입력할 수 있다.
const Input = styled.input.attrs({ required: true, minLength: "10" })`
  background-color: green;
`;

// anination 공부
const turnturn = keyframes` // 일반적인 css의 animation을 적용시키면 됨
0% {
	transform : rotate(0deg);
	border-radius: 0px;
}
50% {
	transform : rotate(360deg);
	border-radius:100px;
}
100%{
	transform : rotate(0deg);
	border-radius: 0px;
}
`;

const Box2 = styled.div`
  height: 200px;
  width: 200px;
  background-color: yellow;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${turnturn} 1s linear infinite;
  // div형태의 Box2 컴포넌트 하위 'span'태그를 선택 함
  span {
    font-size: 40px;
    // span:hover{} -> 라고 적는것과 같은 의미
    // & : 부모 태그를 선택할 수 있다
    &:hover {
      font-size: 100px;
    }
    &:active {
      opacity: 0;
    }
  }
  /* 위에서 대체된 내용
  span:hover {
    font-size: 100px;
  }
  span:active {
    opacity: 0;
  } */
`;

// 나만의 태그 명을 만드는 방법
const Emoji = styled.span`
  font-size: 40px;
`;

const Box3 = styled.div`
  height: 200px;
  width: 200px;
  background-color: yellow;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${turnturn} 1s linear infinite;

  // 위에서 정의한 태그 컴포넌트를 가져와서 사용한다.
  ${Emoji} {
    &:hover {
      font-size: 100px;
    }
    &:active {
      opacity: 0;
    }
  }
`;

function App() {
  return (
    <Father as="Header">
      <Box bgColor="teal" />
      <Circle bgColor="tomato" />
      {/* 스타일은 유지한 채 태그만 바꾸는 방법 */}
      {/* 버튼 스타일 컴포넌트인 Btn을 사용할건데, HTML부분을 a태그로 바꾼다는 의미 */}
      <Btn as="a"> login </Btn>
      <Input />
      <Input />
      <Input />
      <Input />
      {/* animation */}
      <Box3>
        {/* 아래의 최종태그는 p태그이다.
		 그러나 태그가 무엇이던간에 스타일 컴포넌트는 Emoji가 적용된다.
		 Emoji는 span태그 기반이지만, 그에 설정한 style은 그대로 적용된다 */}
        <Emoji as="p">🥰 </Emoji>
        {/* 이모지는 span태그 기반이지만, 실제로 styled한 컴포넌트는 Emoji이기 때문에,
		span은 해당 스타일이 적용되지 않는다 */}
        <span>😜</span>
      </Box3>
    </Father>
  );
}

export default App;
