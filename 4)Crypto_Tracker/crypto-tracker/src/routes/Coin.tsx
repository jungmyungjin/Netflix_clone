import { useParams, useLocation } from "react-router";
import styled from "styled-components";
import { useState, useEffect } from "react";

// type 정의 방법1
interface Params {
  coinId: string;
}

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
const Loading = styled.span`
  text-align: center;
  display: block;
  margin: 50px auto;
`;

interface RouteState {
  name: string;
}

function Coin() {
  // react-router-dom v6가 되면서 사용법이 바뀌었다...
  // useParams : 파라미터의 정보를 가져온다.
  const { coinId } = useParams() as unknown as Params;
  const [loading, setLoading] = useState(true);
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

  const [info, setInfo] = useState<IInfoData>();
  const [priceInfo, setPriceInfo] = useState<IPriceDate>();

  interface IPriceData {}

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

  return (
    <Container>
      <Header>
        <Title> {state ? `코인 ${state.name}` : "Loading..."}</Title>
      </Header>
      {/* priceInfo? : typescript가 api에서 오는 것인걸 알고, 그렇다면 항상 있는 값이 아니므로 자동으로 붙여준다 */}
      {loading ? (
        <Loading>Loading....</Loading>
      ) : (
        `USD : ${priceInfo?.quotes.USD.price}`
      )}
    </Container>
  );
}

export default Coin;
