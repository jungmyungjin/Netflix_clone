import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coins from "./Coins";
import Coin from "./Coin";

// interface IRouterProps {
// toggleDark: () => void;
// isDark: boolean;
// }

// function Router({ toggleDark, isDark }: IRouterProps) {
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* :coinID -> url이 변수값을 갖는다는것을 의미한다 */}
        {/*  /* -> 하위 경로가 있다는 것을 의미한다. */}
        {/*<Route path="/:coinId/*" element={<Coin isDark={isDark} />} />*/}
        <Route path="/:coinId/*" element={<Coin />} />
        <Route path="/" element={<Coins />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
