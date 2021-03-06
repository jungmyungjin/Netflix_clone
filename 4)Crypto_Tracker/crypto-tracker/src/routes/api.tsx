const BASE_URL = "https://api.coinpaprika.com/v1";

// fetchCoins 함수는 JSON 데이터를 리턴해야한다.
export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => {
    return response.json();
  });
}
export function fetchInfoData(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) => {
    return response.json();
  });
}

export function fetchTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) => {
    return response.json();
  });
}

export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 2; // 2주 전
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((response) => {
    return response.json();
  });
}

/* async / await 를 사용한 버전
export function fetchCoins() {
  return fetch("https://api.coinpaprika.com/v1/coins").then((response) => {
    response.json();
  });
}
 */
