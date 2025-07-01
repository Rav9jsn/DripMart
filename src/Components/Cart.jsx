import Navbar from "./Home/Navbar";
import { useSelector, useDispatch } from "react-redux";
import Footer from "./Footer";
import { useEffect } from "react";
import { fetchCartItems } from "../state/storage";
import { orderCreate } from "../serviced";

import {
  addToCart,
  clearCart,
  decQuantToCart,
  deletItemFromCart,
  paymentCheckout,
} from "../serviced";
import { MdOutlineClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const adressHave = localStorage.getItem("adressHave");
  const address =
    adressHave === "true" && JSON.parse(localStorage.getItem("address"));
  const dispatch = useDispatch();
  const platformfee = 80;
  const navigate = useNavigate();
  const cart = useSelector((state) => state.drip.data?.cartProducts);
  const total = useSelector((state) => state.drip.data?.totalPrice) * 80;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchCartItems());
    }
  }, []);

  const refreshCart = () => {
  dispatch(fetchCartItems());
  deliveryCharge();
};

  const addtocart = async (id) => {
    await addToCart(id);
   refreshCart();
  };

  const decQuantity = async (id, num) => {
    await decQuantToCart(id);
    itemoneThenDelte(id, num);
    refreshCart();
  };
  const deleItem = async (id) => {
    await deletItemFromCart(id);
   refreshCart();
  };

  const itemoneThenDelte = (id = 0, item) => {
    if (id && item === 1) {
      deleItem(id);
    }
  };

  const deliveryCharge = () => {
    let charge = 80;
    if (total === 500 || total > 500) {
      charge = 0;
      return charge;
    }
    return charge;
  };
  const charge = deliveryCharge();

  const DelteAllCart = async () => {
    await clearCart();
    dispatch(fetchCartItems());
  };

  const onPay = async () => {
    const totalfull = total && platformfee + total + charge;
    if (adressHave && adressHave === "true") {
      if (total) {
        await paymentCheckout(totalfull);
        await orderCreate(totalfull);
      }
    } else {
      navigate("/adressform");
    }
  };
  const getTotalAmount = () => platformfee + total + charge;

  return (
    <>
      <Navbar />
      <div>
        {cart ? (
          <div className="flex md:flex-row flex-col lg:justify-around justify-between gap-7 st:gap-10 relative lg:px-10 ">
            <div className="flex flex-col  justify-center items-center gap-6 ">
              <div className="font-bold st:text-3xl text-2xl"> Your Cart Items</div>
              <div
                onClick={() => DelteAllCart()}
                className="cursor-pointer font-bold w-[6.5rem] py-1 text-center ml-auto backdrop-blur-2xl shadow-md shadow-gray-400 px-5"
              >
                Clear All
              </div>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center relative lg:w-[31rem] md:w-[25rem] w-full  border border-gray-300 rounded-lg py-2 st:px-11 px-1  shadow-sm"
                >
                  {/* Left: Product Image */}
                  <div className=" mb-4 md:mb-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="lg:w-[11rem] w-[7rem] object-contain mix-blend-darken"
                    />
                  </div>

                  {/* Right: Product Details */}
                  <div className="flex  w-full flex-col ml-6 ">
                    <MdOutlineClose
                      onClick={() => deleItem(item.id, item.quantity)}
                      className="right-2 w-5 rounded-md  text-2xl cursor-pointer top-3 absolute"
                    />
                    <h3 className="sm:text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Category:</span>{" "}
                      {item.category}
                    </p>

                    <p className="text-base font-semibold mb-1">
                      ₹{(item.price * 80).toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 ">
                      <button
                        className="px-3 pb-1 cursor-pointer font-bold text-4xl "
                        onClick={() => {
                          decQuantity(item.id, item.quantity);
                        }}
                      >
                        -
                      </button>
                      <span className="px-3 font-bold text-xl">
                        {item.quantity}
                      </span>
                      <button
                        className="px-3 cursor-pointer font-bold text-3xl"
                        onClick={() => addtocart(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* For Total price */}
            <div className="flex-col flex gap-6">
              <div>
                {address && (
                  <div className="flex  items-start gap-2 p-4 border border-gray-300 rounded-xl shadow-md  w-full lg:w-[37vw] md:w-[37vw]">
                    <svg
                      className="w-6 h-6 text-indigo-600 mt-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 11c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3 1.344 3 3 3zm0 0c-3.314 0-6 2.686-6 6v4h12v-4c0-3.314-2.686-6-6-6z"
                      />
                    </svg>
                    <div className="text-sm capitalize text-gray-700">
                      <h2 className="text-base font-semibold text-gray-800 mb-1">
                        Shipping Address
                      </h2>
                      {`${address.address}, ${address.city}, ${address.state} - ${address.pincode}`}
                      <br />
                      <span className="text-gray-600 font-medium">
                        Phone:
                      </span>{" "}
                      {address.phone}
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full lg:w-[37vw] md:w-[37vw] top-[20vh] h-[45vh] sticky  right-[10rem]  shadow-md shadow-indigo-400 rounded-lg border border-[#80808028] p-5">
                <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
                  Price Details
                </h2>

                <div className="flex justify-between font-semibold text-sm mb-2">
                  <span>Price ({cart && cart.length} items)</span>
                  <span>{total && total.toFixed(2)}</span>
                </div>

                {/* For free Delivery above 500rs */}
                <div className="flex justify-between text-sm mb-2 text-green-600">
                  <span>Delivery Charge</span>
                  <span>{charge ? `₹${charge}` : "Free"}</span>
                </div>

                <div className="flex font-semibold justify-between text-sm mb-2">
                  <span>Platform Fee</span>
                  <span>₹{platformfee}</span>
                </div>

                <div className="border-t border-gray-300 my-3"></div>

                <div className="flex justify-between text-base font-semibold text-gray-900">
                  <span>Total Amount</span>
                  <span>
                    ₹{total && getTotalAmount().toFixed(2)}
                  </span>
                </div>
                <div className="flex mt-12  justify-center  text-base font-semibold text-gray-900">
                  <button
                    onClick={() => onPay()}
                    className="w-36 py-1 font-bold border-indigo-500 cursor-pointer rounded-2xl bg-[#7788998a] ]200 border-2"
                  >
                    Proceed to pay
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Your Cart is Empty 🛒
            </h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              to="/userhomepage"
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              Go to Home
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
