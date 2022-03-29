import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";

interface IPriceProps {
  coinId: string;
  isDark: boolean;
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

// coin 페이지에서 가져옴
function Price({ coinId, isDark }: IPriceProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", "price", coinId],
    () => {
      return fetchCoinHistory(coinId);
    },
    { refetchInterval: 10000 }
  );
  console.log(data);
  return (
    <div>
      {isLoading ? (
        "Price is Loading..."
      ) : (
        <ApexChart
          type="line"
          options={{
            chart: {
              height: 300,
              type: "line",
              toolbar: { show: false },
              zoom: {
                enabled: false,
              },
              background: "transparent",
              animations: {
                enabled: true,
                speed: 850,
                easing: "easeinout",
                dynamicAnimation: {
                  enabled: true,
                  speed: 800,
                },
              },
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
            colors: ["#74b9ff"],
          }}
          series={[
            {
              name: "price",
              data: data?.map((price) => price.close),
            },
          ]}
        />
      )}
    </div>
  );

  return <h1>Price</h1>;
}

export default Price;
