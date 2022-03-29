import { useParams } from "react-router";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IChartProps {
  coinId: string;
  // isDark: boolean;
}
interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
// coinID 가져오기 방법 2 : coin 페이지에서 props로 받아오기 (현재 코드)
// function Chart({ coinId, isDark }: IChartProps) {
function Chart({ coinId }: IChartProps) {
  // coinID 가져오기 방법 1 : 파라미터 값을 가져오기
  // const params = useParams();
  // console.log(params);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => {
      return fetchCoinHistory(coinId);
    },
    { refetchInterval: 10000 }
  );
  const isDark = useRecoilValue(isDarkAtom); // 필요한 위치에 바로 사용한다 (테마 적용부분)
  return (
    <div>
      {isLoading ? (
        "Chart Loading...."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: data?.map((price) => {
                return {
                  x: price.time_close,
                  y: [price.open, price.high, price.low, price.close],
                };
              }),
            },
          ]}
          options={{
            chart: {
              height: 300,
              toolbar: { show: false },
              background: "transparent",
            },
            theme: { mode: isDark ? "dark" : "light" },
            yaxis: {
              show: false,
            },
            grid: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((date) => {
                return date.time_close;
                const chartDate = new Date(date.time_close);
              }),
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#81ecec",
                  downward: "#a29bfe",
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
