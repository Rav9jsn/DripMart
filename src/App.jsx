import Homepage from "./Components/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./Components/Cart";
import ProductDetail from "./Components/ProductDetail ";
import ScrollToTop from "./Components/ScrollToTop";
import NotFound from "./Components/NotFound";
import Signup from "./Components/auth/Signup";
import Login from "./Components/auth/Login";

const App = () => {
  return (
    <Router>
      <div className="relative bg-gradient-to-r from-indigo-100 via-indigo-100 to-indigo-50 mb:px-[4vw] px-[0.5vw]  flex flex-col lg:gap-10 gap-4">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home/:id" element={<ProductDetail />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
