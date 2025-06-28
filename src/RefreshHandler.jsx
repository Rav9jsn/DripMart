import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RefreshHandler = ({ setIsAuthenticated }) => {
  const role= localStorage.getItem("role");
  const tokenValue = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (tokenValue) {
        setIsAuthenticated(true);
        if (location.pathname === "/login" || location.pathname === "/signup") {
          
          if(role==='user'){

            navigate("/userhomepage", { replace: false });
          }else{

            navigate("/adminhome", { replace: false });
          }
        }
      }
    } catch (err) {
      console.error("Error in RefreshHandler:", err);
    }
  }, [location, navigate, setIsAuthenticated, tokenValue,role]);

  return null;
};

export default RefreshHandler;
