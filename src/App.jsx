import Home from "./Components/Home";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./Components/Cart";
import ProductDetail from "./Components/ProductDetail ";

const App = () => {
  return (
    <Router>
      <div className="relative bg-gradient-to-r from-indigo-100 to-indigo-50 px-[4vw] flex flex-col gap-10">
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/home/:id" element={<ProductDetail />} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
