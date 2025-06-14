import logo from "../../assets/logo.svg";
import cart_logo from "../../assets/cart.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const totalAmount = useSelector((state) => state.image.productAmounts);
  const totalAmtToDec = useSelector((state) => state.image.minusProductAmounts);
  const cart =
    totalAmount.length - (totalAmtToDec?.length ? totalAmtToDec.length : 0);

  return (
    <div className="bg-cover bg-center bg-gradient-to-r from-indigo-100 to-indigo-50 py-[25px]  sticky top-0 z-50 px-[8px] rounded-b-[10px]">
      <div className="flex justify-between items-center">
        {/* for left logo */}
        <Link className="w-[31px] sm:w-[45px] cursor-pointer" to={"/"}>
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
        <div className="flex  gap-10">
          <Link to={'/signup'}>Signup</Link>
          <Link to={'/login'}> Login</Link>
          <Link to={"/Cart"}> 
            <div className="relative mx-1.5">
              {" "}
              <img className=" cursor-pointer" src={cart_logo} alt="" />
              <p className=" text-white -top-1 right-0.5 bg-red-500 rounded-full absolute px-1 text-[12px] font-[700]">
                {cart}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
