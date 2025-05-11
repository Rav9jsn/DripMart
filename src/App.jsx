import Home from "./Components/Home";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./Components/Cart";
import ProductDetail from "./Components/ProductDetail ";
import ScrollToTop from "./Components/ScrollToTop";
import NotFound from "./Components/NotFound";

const App = () => {
  return (
    <Router>
      <div className="relative bg-gradient-to-r from-indigo-100 via-indigo-100 to-indigo-50 mb:px-[4vw] px-[0.5vw]  flex flex-col lg:gap-10 gap-4">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home/:id" element={<ProductDetail />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
