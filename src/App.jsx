import { lazy, Suspense } from "react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProductDetail from "./Components/ProductDetail ";
import ScrollToTop from "./Components/ScrollToTop";
import Signup from "./Components/auth/Signup";
import Login from "./Components/auth/Login";
import RefreshHandler from "./RefreshHandler";
import LoadingSpinner from "./Loadingspinner ";
import Homepage from "./Components/Homepage";

const NotFound = lazy(() => import("./Components/NotFound"));
const Paymentsuccess = lazy(() => import("./Paymentsuccess"));
const Favourite = lazy(() => import("./Favourite"));
const Order = lazy(() => import("./Components/Order"));
const Cart = lazy(() => import("./Components/Cart"));
const AddressForm = lazy(() => import("./Components/AddressForm"));
const Adminhome = lazy(() => import("./Components/admin/Adminhome"));

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
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setRole={setRole} />} />

          {role === "admin" && (
            <>
              <Route
                path="/adminhome"
                element={
                  <PrivateRoute
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Adminhome />
                      </Suspense>
                    }
                  />
                }
              />
              <Route
                path="*"
                element={
                  <PrivateRoute
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <NotFound />
                      </Suspense>
                    }
                  />
                }
              />
            </>
          )}

          {role === "user" && (
            <>
              <Route
                path="/Cart/paymentsuccess"
                element={
                  <PrivateRoute
                    element={
                      <Suspense fallback={<Paymentsuccess />}>
                        <Cart />
                      </Suspense>
                    }
                  />
                }
              />

              <Route
                path="/adressform"
                element={
                  <PrivateRoute
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <AddressForm />
                      </Suspense>
                    }
                  />
                }
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
                      <Suspense fallback={<LoadingSpinner />}>
                        <Cart />
                      </Suspense>
                    }
                  />
                }
              />
              <Route
                path="/userhomepage"
                element={<PrivateRoute element={<Homepage />} />}
              />
              <Route
                path="/favouritlist"
                element={
                  <PrivateRoute
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
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
                      <Suspense fallback={<LoadingSpinner />}>
                        <Order />
                      </Suspense>
                    }
                  />
                }
              />
              <Route
                path="*"
                element={
                  <PrivateRoute
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <NotFound />
                      </Suspense>
                    }
                  />
                }
              />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
