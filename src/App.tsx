import "./scss/app.scss";

import { Home } from "./pages/Home";
import { NotFoundBlock } from "./components/NotFoundBlock";
import { Cart } from "./pages/Cart";
import { Routes, Route } from "react-router-dom";
import { Pizza } from "./pages/Pizza";
import { MainLayout } from "./layouts/MainLayout";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<MainLayout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<NotFoundBlock />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/pizza/:id" element={<Pizza />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
