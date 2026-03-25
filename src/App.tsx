import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "~/components/organisms/Header";
import Footer from "~/components/organisms/Footer";
import HomePage from "~/pages/HomePage";
import ProductDetailPage from "~/pages/ProductDetailPage";
import CartPage from "~/pages/CartPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
