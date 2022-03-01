import { useParams } from "react-router";
import styled from "styled-components";

// type 정의 방법1
interface Params {
  coinId: string;
}

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;

function Coin() {
  // react-router-dom v6가 되면서 사용법이 바뀌었다...
  const { coinId } = useParams() as unknown as Params;
  return <Title>Coin {coinId}</Title>;
}

export default Coin;
