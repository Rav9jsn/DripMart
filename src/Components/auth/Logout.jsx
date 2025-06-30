import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { clearCartData, fetchCartItems } from "../../state/storage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import cart_logo from "../../assets/cart.png";

const Logout = ({ setClickProfile, clickProfile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [numberCart, setnumberCart] = useState(0);
  const tokenValue = localStorage.getItem("token");
  const state = useSelector((state) => state.drip.data);
  const cart = () => {
    dispatch(fetchCartItems());
    if (state) {
      const { cartProducts } = state;
      if (Array.isArray(cartProducts)) {
        const TotalCartItems = cartProducts.reduce(
          (number, total) => total.quantity + number,
          0
        );
        setnumberCart(TotalCartItems);
      }
    }
  };

  useEffect(() => {
    if (tokenValue) {
      cart();
    }
  }, [state]);

  const Logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("adressHave");
      localStorage.removeItem("address");
      localStorage.removeItem("role");
      localStorage.removeItem("email");
      dispatch(clearCartData());
      navigate("/login", 500);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div
      onMouseLeave={() => setClickProfile(!clickProfile)}
     className="absolute z-30 right-4 top-16 backdrop-blur-3xl transition-all bg-indigo-100 opacity-95 border border-white/20 shadow-lg p-3 w-35 duration-200 rounded-xl"

    >
      <ul className="flex flex-col  gap-2 text-gray-800 font-medium">
        <li>
          <Link
            to="/userhomepage"
            className="block p-2 rounded hover:bg-gray-300 transition"
          >
            Home
          </Link>
        </li>
        <li className="hover:bg-gray-300 rounded  transition h-[40px]">
          <Link className=" rounded-300 cursor-pointer " to={"/Cart"}>
            <div className=" p-2  relative flex gap-0.5 ">
              {" "}
              <p>Cart</p>
              <img src={cart_logo} alt="" />
              <p className=" text-white top-0.5 right-11 bg-red-500 rounded-full absolute px-1 text-[12px] font-[800]">
                {numberCart ? numberCart : 0}
              </p>
            </div>
          </Link>
        </li>
        <li>
          <Link
            to="/orders"
            className="block hover:bg-gray-300 px-3 py-2 rounded  transition"
          >
            Orders
          </Link>
        </li>
        <li>
          <Link
            to="/favouritlist"
            className="block hover:bg-gray-300 p-2  rounded  transition"
          >
            Favourite List
          </Link>
        </li>
        <li>
          <button
            onClick={Logout}
            className="w-full text-left p-2  rounded hover:bg-red-300 text-red-600 transition"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Logout;
