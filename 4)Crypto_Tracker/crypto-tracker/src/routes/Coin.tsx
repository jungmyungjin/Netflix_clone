import { useParams, useLocation } from "react-router";
import { BrowserRouter, Route, Routes, Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Price from "./Price";
import Chart from "./Chart";
import { fetchTickers, fetchInfoData } from "./api";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

// type 정의 방법1
interface Params {
  coinId: string;
}

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 40px;
  justify-self: center;
`;
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0px auto;
  height: auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a:hover {
    color: ${(props) => props.theme.accentColor};
    transition: color 0.1s ease-in-out;
  }
  a {
    font-size: 25px;
  }
`;

const TodayPrice = styled.div`
  height: 60px;
  background-color: ${(props) => props.theme.accentColor};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 18px;
  padding: 5px 0px;
  font-size: 15px;
  margin-bottom: 10px;
  span:nth-child(1) {
    font-size: 20px;
  }
`;

const Loading = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  background-color: ${(props) => props.theme.subAccentColor};
  height: 80px;
  width: 100%;
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
`;

const OverviewItem = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  span {
    text-align: center;
    color: ${(props) => props.theme.textColor};
    margin: 5px 0px;
  }
  span:first-child {
    text-transform: uppercase;
    font-size: 13px;
  }
  span:nth-child(2) {
    font-size: 20px;
  }
`;

const Description = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300&display=swap");
  margin: 25px 0px;
  span {
    font-size: 20px;
    font-family: "Chakra Petch", sans-serif;
    line-height: 25px;
  }
`;

const Tabs = styled.div`
  height: 50px;
  width: 100%;
  margin: 20px 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

// <{isActive123:boolean}> : boolean 타입의 'isActive123' property를 추가한다.
const Tab = styled.span<{ isActive123: boolean }>`
  background-color: ${(props) => props.theme.subAccentColor};
  font-weight: ${(props) => (props.isActive123 ? "bold" : "nomal")};
  color: ${(props) =>
    props.isActive123 ? props.theme.accentColor : props.theme.textColor};
  width: 200px;
  height: 40px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  a {
    display: block;
  }
`;

interface RouteState {
  name: string;
}

interface ICoinProps {
  isDark: boolean;
}

function Coin({ isDark }: ICoinProps) {
  // react-router-dom v6가 되면서 사용법이 바뀌었다...
  // useParams : 파라미터의 정보를 가져온다.
  const { coinId } = useParams() as unknown as Params;
  // useLocation : react-router-dom 의 Link 에서 넘겨준 데이터를 받는다.
  // 새로 api를 받지 않고 기존에 있는 데이터를 사용함으로써, 사용자가 보기에 속도가 빠르게 느껴진다.
  const location = useLocation();
  // 아래의 state는 home 에서 만들어진 state이므로, (크롬 시크릿모드에서)home을 거치지 않고 바로 코인주소를 치게되면 에러가 난다.
  const state = location.state as RouteState;
  interface ITag {
    coin_counter: number;
    ico_counter: number;
    id: string;
    name: string;
  }

  // 타입스크립트 코드 베이스에 보면 인터페이스명 앞에 'I'를 붙힌다

  interface IInfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    // Array안에 타입이 또 있는경우 인터페이스를 따로 작성해주어야 한다.
    tags: ITag[]; // Object라고 되어있으나, 실제로는 Object가 아니다
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
  }
  interface IPriceDate {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
      };
    };
  }

  const PriceMatch = useMatch("/:coinId/price");
  const ChartMatch = useMatch("/:coinId/chart");

  /* React Query로 대체
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<IInfoData>();
  const [priceInfo, setPriceInfo] = useState<IPriceDate>();

  useEffect(() => {
    // 해당 코인에 대한 정보를 가져오는 api, 한번만 실행됨
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, []);
*/
  // key는 해당 페이지의 고유한 키이기 떄문에 중복되어선 안된다. queryKey는 Array의 타입으로 입력받기 때문에 다른 값의 Array로 주어 고유성을 보장한다.
  // { isLoading: infoLoading, data: infoData } => 객체디스트럭처링(Object Destructuring), 이 경우 변수명을 재정의 한다고 보면 된다.
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchInfoData(coinId) // 인자값을 넘겨줄 때 익명함수를 사용하여 인자값을 포함한 함수를 리턴하도록 한다.
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceDate>(
    ["tickers ", coinId],
    () => fetchTickers(coinId),
    { refetchInterval: 5000 } // 리프레쉬 간격
  );
  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>{infoLoading ? "Loading..." : `${coinId}`}</title>
      </Helmet>
      <Header>
        <Title>{infoLoading ? "Loading..." : `${coinId}`} </Title>
        <Link to={"/"}>
          <FontAwesomeIcon icon={faHouse} />
        </Link>
      </Header>

      <TodayPrice>
        {/* priceInfo? : typescript가 api에서 오는 것인걸 알고, 그렇다면 항상 있는 값이 아니므로 자동으로 붙여준다 */}
        {loading ? (
          <Loading>Loading....</Loading>
        ) : (
          <>
            <span> Today price</span>
            <span>USD : ${tickersData?.quotes.USD.price}</span>
          </>
        )}
      </TodayPrice>
      <Overview>
        <OverviewItem>
          <span>Rank</span>
          <span>{tickersData?.rank}</span>
        </OverviewItem>
        <OverviewItem>
          <span>Symbol</span>
          <span>{`${tickersData?.symbol}`}</span>
        </OverviewItem>
        <OverviewItem>
          <span>OPEN SOURCE</span>
          <span>{infoData?.open_source ? "Yes" : "NO"}</span>
        </OverviewItem>
      </Overview>
      <Description>
        <span>{infoData?.description}</span>
      </Description>
      <Overview>
        <OverviewItem>
          <span>Total Supply</span>
          <span>{tickersData?.total_supply}</span>
        </OverviewItem>
        <OverviewItem>
          <span>Max Supply</span>
          <span>${tickersData?.max_supply}</span>
        </OverviewItem>
      </Overview>
      {/*React-router-dom v6 부터는 상대경로가 지원된다*/}

      <Tabs>
        {/*isActive123 속성을 사용하여, 클릭한 링크를 체크하고, 클릭한 링크의 Tab을 css 효과를 주도록한다 (글자 색깔 변화)*/}
        <Tab isActive123={ChartMatch != null}>
          <Link to="chart">Chart</Link>
        </Tab>
        <Tab isActive123={PriceMatch != null}>
          <Link to="price">Price</Link>
        </Tab>
      </Tabs>

      <Routes>
        <Route
          path="chart"
          element={<Chart isDark={isDark} coinId={coinId as string} />}
        />
        <Route
          path="price"
          element={<Price isDark={isDark} coinId={coinId as string} />}
        />
      </Routes>
    </Container>
  );
}

export default Coin;
