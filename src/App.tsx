import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";
import ProductDetailPage from "~/pages/ProductDetailPage";
import CartPage from "~/pages/CartPage";
import IconButton from "./components/atoms/IconButton/IconButton";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Footer />
      {/* <IconButton
        svgName="icn_close"
        ariaLabel="Close"
        onClick={() => alert("IconButton clicked!")}
      /> */}
    </BrowserRouter>
  );
}

export default App;
