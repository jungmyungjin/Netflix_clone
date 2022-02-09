import styled from "styled-components";

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
    </Father>
  );
}

export default App;
