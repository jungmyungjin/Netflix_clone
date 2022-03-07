import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "./api";
import { Helmet } from "react-helmet";

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0px auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinList = styled.ul``;
const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
    padding: 20px;
  }
  &:hover {
    // Link를 사용했으나, a태그로 설정해도 적용 되는 이유는,
    // 결국 reacr-router-link 들이 a태그로 바뀌기 때문이다.
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loading = styled.span`
  text-align: center;
  display: block;
  margin: 50px auto;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface Icoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  /* React Query를 사용한 [api.tsx] 파일로 분리
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  // 한번만 실행
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
    })();
    setLoading(false);
  }, []);
   */
  // useQuery 라는 Hook을 사용
  // useQuery(QueryKey[쿼리의 고유 식별자], fetcherFunction[패치할 함수])
  // useQuery에서 리턴하는 값
  // isLoading{boolean} : fetch 함수가 로딩중인지 알려주는 변수
  // data : fetch 함수가 리턴하는 값을 담은 변수
  const { isLoading, data } = useQuery<Icoin[]>("allCoins", fetchCoins);
  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        <Loading>Loading....</Loading>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            // &rarr; : 화살표(->)
            <Coin key={coin.id}>
              {/* react-router-dom 의 state를 사용하여 정보를 넘겨준다 */}
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt=""
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}
export default Coins;
