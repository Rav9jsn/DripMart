import logo from "../../assets/logo.svg";
import cart_logo from "../../assets/cart.png";
import { Link } from "react-router-dom";
import Logout from "../auth/Logout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../../state/storage";

const Navbar = () => {
  const state = useSelector((state) => state.drip.data);
  const [clickProfile, setClickProfile] = useState(false);
  const [numberCart, setnumberCart] = useState(0);

  const dispatch = useDispatch();
  const tokenValue = localStorage.getItem("token");

  const NameFirstletter =
    localStorage.getItem("name") && localStorage.getItem("name").charAt(0);
  const showProfile = () => {
    setClickProfile(!clickProfile);
  };
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

  return (
    <div className="bg-white/30 backdrop-blur-md shadow-md border-b border-white/20 py-5 sticky top-0 z-50 px-2 sm:px-4 rounded-xl transition-all duration-300">
      <div className="flex justify-between items-center">
        {/* for left logo */}
        <Link
          className="w-[31px] sm:w-[45px] cursor-pointer"
          to={"/userhomepage"}
        >
          <img src={logo} alt="" />
        </Link>

        {/* for center */}
        <div className="sm:text-3xl  text-2xl font-bold bg-gradient-to-l from-gray-400 to-gray-700 bg-clip-text text-transparent">
          Drip
          <p className="bg-gradient-to-r  from-gray-400 to-gray-700 bg-clip-text text-transparent  inline-block italic sm:text-[33px]">
            Mart
          </p>
        </div>
        {/* for right cart */}
        <div className="flex items-center sm:gap-10">
          

          <Link to={"/Cart"}>
            <div className="relative sm:block hidden mx-1.5">
              {" "}
              <img className=" cursor-pointer" src={cart_logo} alt="" />
              <p className=" text-white -top-1 right-0.5 bg-red-500 rounded-full absolute px-1 text-[12px] font-[700]">
                {numberCart ? numberCart : 0}
              </p>
            </div>
          </Link>

          {tokenValue && (
            <div
              onMouseEnter={showProfile}
              onClick={showProfile}
              className="w-10 h-10 bg-indigo-400 hover:bg-indigo-500 cursor uppercase text-2xl mb-1 font-bold text-white flex items-center justify-center rounded-full"
            >
              {NameFirstletter}
            </div>
          )}
          {clickProfile && (
            <Logout
              setClickProfile={setClickProfile}
              clickProfile={clickProfile}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
