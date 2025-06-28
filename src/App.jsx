import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProductDetail from "./Components/ProductDetail ";
import ScrollToTop from "./Components/ScrollToTop";
import NotFound from "./Components/NotFound";
import Signup from "./Components/auth/Signup";
import Login from "./Components/auth/Login";
import RefreshHandler from "./RefreshHandler";
import Paymentsuccess from "./Paymentsuccess";
import AddressForm from "./Components/AddressForm";
import Adminhome from "./Components/admin/Adminhome";
import { lazy, Suspense } from "react";
const Homepage = lazy(() => import("./Components/Homepage"));
const Favourite = lazy(() => import("./Favourite"));
const Order = lazy(() => import("./Components/Order"));
const Cart = lazy(() => import("./Components/Cart"));

const App = () => {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="relative bg-gradient-to-r from-indigo-100 via-indigo-100 to-indigo-50 mb:px-[4vw] px-[0.5vw] flex flex-col lg:gap-10 gap-4">
        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
        <ScrollToTop />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setRole={setRole} />} />

          {/* Admin Routes */}
          {role === "admin" && (
            <>
              <Route
                path="/adminhome"
                element={<PrivateRoute element={<Adminhome />} />}
              />
              <Route path="*" element={<NotFound />} />
            </>
          )}

          {/* User Routes */}
          {role === "user" && (
            <>
              <Route
                path="/Cart/paymentsuccess"
                element={<PrivateRoute element={<Paymentsuccess />} />}
              />
              <Route
                path="/adressform"
                element={<PrivateRoute element={<AddressForm />} />}
              />
              <Route
                path="/home/:id"
                element={<PrivateRoute element={<ProductDetail />} />}
              />
              <Route
                path="/Cart"
                element={
                  <PrivateRoute
                    element={
                      <Suspense
                        fallback={
                          <div className="flex justify-center items-center h-[60vh]">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
                          </div>
                        }
                      >
                        <Cart />
                      </Suspense>
                    }
                  />
                }
              />
              <Route
                path="/userhomepage"
                element={
                  <PrivateRoute
                    element={
                      <Suspense
                        fallback={
                          <div className="flex justify-center items-center h-[60vh]">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
                          </div>
                        }
                      >
                        <Homepage />
                      </Suspense>
                    }
                  />
                }
              />

              <Route
                path="/favouritlist"
                element={
                  <PrivateRoute
                    element={
                      <Suspense
                        fallback={
                          <div className="flex justify-center items-center h-[60vh]">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
                          </div>
                        }
                      >
                        <Favourite />
                      </Suspense>
                    }
                  />
                }
              />
              <Route
                path="/orders"
                element={
                  <PrivateRoute
                    element={
                      <Suspense
                        fallback={
                          <div className="flex justify-center items-center h-[60vh]">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
                          </div>
                        }
                      >
                        <Order />
                      </Suspense>
                    }
                  />
                }
              />
              <Route path="*" element={<NotFound />} />
            </>
          )}
        </Routes>
        <Routes>
          {/* Your existing routes */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
