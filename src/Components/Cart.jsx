import Navbar from "./Home/Navbar"
import { useSelector, useDispatch } from "react-redux";
import { updateItemInArray, minusbtnUpdate } from "../state/storage";
import { prodAmount, prodAmountforDec, clearAmounts } from "../state/storage";
import { Link } from "react-router-dom";
import confirm_image from "../assets/img_confirm.webp";
import { useState } from "react";
import Footer from "./Footer";

const Cart = () => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState(false);
  const data = useSelector((state) => state.image.clickedImages);
  const totalAmount = useSelector((state) => state.image.productAmounts);
  const totalAmtToDec = useSelector((state) => state.image.minusProductAmounts);
  let cart =
    totalAmount.length - (totalAmtToDec?.length ? totalAmtToDec.length : 0);
  const sum = (num) => {
    const totalamt = num.reduce((n, a) => {
      return Number(n) + a;
    }, 0);
    return Number(totalamt).toFixed(2);
  };
  const result = totalAmtToDec
    ? sum(totalAmount) - sum(totalAmtToDec)
    : sum(totalAmount);
  const productDataColtcn = (dataAtCart) => {
    dispatch(prodAmount(dataAtCart.price));
    const [yo] = data.filter((item) => item.id === dataAtCart.id);
    if (yo) {
      let u = JSON.parse(JSON.stringify(yo));
      u.itemCount = (u.itemCount || 0) + 1;
      dispatch(minusbtnUpdate(u));
    }
  };

  const DecProduct = (dataAtCart) => {
    dispatch(prodAmountforDec(dataAtCart.price));
    const [yo] = data.filter((item) => item.id === dataAtCart.id);
    if (yo) {
      let u = JSON.parse(JSON.stringify(yo));
      u.itemCount = (u.itemCount || 0) - 1;
      dispatch(updateItemInArray(u));
    }
  };

  const buy = () => {
    if (cart > 0) {
      dispatch(clearAmounts());
      cart = 0;
      setOrder(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <Navbar />
      {!cart && !order ? (
        <div className="h-[50vh] flex  flex-col gap-10 justify-center items-center st:text-3xl text-2xl">
          Oops! Nothing here yet...
          <div className="bg-[#4e738e23] px-4 st:py-3 py-1 rounded-lg">
            <Link
              to={"/"}
              className=" st:text-3xl text-2xl font-bold text-[#f8faff] hover:text-[#4e738e60]"
            >
              Go To Home
            </Link>
          </div>
        </div>
      ) : (
        !order && (
          <>
            {" "}
            <div className=" flex justify-center  items-center my-[10vh]">
              <div className="flex gap-8 px-[2vw] flex-col">
                <p className="text-2xl sm:text-left text-center font-semibold">
                  Your Cart
                </p>
                {data.map((item, i) => {
                  return item.itemCount ? (
                    <div key={i} className="flex gap-10">
                      <img
                        className="md:w-[10vw] mix-blend-darken w-[9rem] object-contain"
                        src={item.image}
                        alt=""
                      />

                      <div className="st:text-[1.2rem] flex flex-col gap-5 font-semibold">
                        <p>{item.title}</p>
                        <p>Price: {item.price} $</p>
                        <div className="flex text-2xl gap-5 items-center ">
                          {" "}
                          <button
                            onClick={() => productDataColtcn(item)}
                            className="bg-white px-[15px] cursor-pointer"
                          >
                            +
                          </button>
                          {item.itemCount}
                          <button
                            onClick={() => DecProduct(item)}
                            className="bg-white px-[15px] cursor-pointer"
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
            <div className=" flex justify-center flex-col items-center gap-5 text-[1.2rem] font-semibold ">
              {" "}
              Total : $
              {(Math.round((result + Number.EPSILON) * 100) / 100).toFixed(2)}
              <div
                onClick={buy}
                className=" cursor-pointer lg:w-[15vw] text-center rounded-2xl px-5 py-2.5 bg-[#4e738e23]"
              >
                Proceed to Buy
              </div>
            </div>
          </>
        )
      )}
      {order && (
        <div
          onClick={buy}
          className="flex st:gap-5 px-[2vw] gap-2 flex-col justify-center items-center"
        >
          <img
            className="st:w-[25rem] mix-blend-darken w-[20rem] object-contain rounded-[20%] "
            src={confirm_image}
            alt=""
          />
          <p className="font-semibold text-center text-2xl">
            Order Placed Sucessfully!!
          </p>
          <p className=" text-[1.1rem] text-center tracking-wider">
            We have sent you and order confirmation email.
          </p>
          <Link
            to={"/"}
            className=" mb:text-4xl text-2xl font-semibold bg-white px-4 py-2 rounded-2xl text-[#4e738e]"
          >
            Go To Home
          </Link>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Cart;
