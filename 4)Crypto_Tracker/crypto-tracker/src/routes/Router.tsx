import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coins from "./Coins";
import Coin from "./Coin";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* :coinID -> url이 변수값을 갖는다는것을 의미한다 */}
        <Route path="/:coinId" element={<Coin />} />
        <Route path="/" element={<Coins />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;