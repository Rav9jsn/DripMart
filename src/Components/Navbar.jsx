import logo from "../assets/logo.svg";
import cart from "../assets/cart.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const totalAmount = useSelector((state) => state.image.productAmounts);

  return (
    <div className="bg-cover bg-center bg-gradient-to-r from-indigo-100 to-indigo-50 py-[25px]  sticky top-0 z-50 px-[8px] rounded-[10px]">
      <div className="flex justify-between items-center">
        {/* for left logo */}

        <img className="w-[4%] cursor-pointer" src={logo} alt="" />

        {/* for center */}
        <div className="text-3xl font-bold bg-gradient-to-l from-gray-400 to-gray-700 bg-clip-text text-transparent">
          Drip
          <p className="bg-gradient-to-r  from-gray-400 to-gray-700 bg-clip-text text-transparent  inline-block italic text-[33px]">
            Mart
          </p>
        </div>
        {/* for right cart */}
        <Link to={"/Cart"}>
          <div className="relative mx-1.5">
            {" "}
            <img className=" cursor-pointer" src={cart} alt="" />
            <p className=" text-white -top-1 right-0.5 bg-red-500 rounded-full absolute px-1 text-[12px] font-[700]">
              {totalAmount.length}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
