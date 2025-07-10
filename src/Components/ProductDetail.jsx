import { useLocation } from "react-router-dom";
import Navbar from "./Home/Navbar";
import { FaHeart } from "react-icons/fa";
import { useEffect } from "react";
import { addToCart, addToFavouritre, removeFav } from "../serviced";
import { useDispatch, useSelector } from "react-redux";
import useAddtocart from "../UseAddtocart";
import { fetchFavItems, updateFavouritesItem } from "../state/storage";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const {
    iconTimer,
    animtionforUntilAdd,
    addingItemId,
    message,
    removeFromCart,
    addtoCart,
  } = useAddtocart();

  const data = useLocation().state;
  const cart = useSelector((state) => state.drip.data?.cartProducts);
  const favProducts = useSelector(
    (state) => state.drip?.favItemsData?.favProducts
  );

  //////fav items id///////
  const favList = favProducts ? favProducts.map((fav) => fav.id) : "";
  const cartList = cart ? cart.map((cart) => cart.id) : "";
  useEffect(() => {
    dispatch(fetchFavItems());
  }, []);
  ///////////Add to favourit Function/////////
  const addTofav = async (id, favItem) => {
    dispatch(updateFavouritesItem({ id, favItem }));
    const favIdItem = favList && favList.find((favid) => favid === id);
    favIdItem ? await removeFav(id) : await addToFavouritre(id);
  };

  //////ADD to Cart/////
  const addtocartArr = async (id, data) => {
    addtoCart(id, data);
    await addToCart(id);
  };

  // Decrease Quantity
  const decQuantity = async (id) => {
    removeFromCart(id);
  };
  //////
  const getQuantity = (id) => {
    return (
      cart &&
      cart.map((item) => {
        return item.id === id && item.quantity;
      })
    );
  };

  return (
    <>
      <Navbar />
      <div className="flex relative md:flex-row flex-col pb-5 items-center lg:gap-[250px] md:gap-[50px] gap-[10px]  justify-around">
        <img
          className="sm:w-[21rem] w-[17rem] mix-blend-darken object-contain	 hover:shadow md:hover:shadow-black shadow-black rounded-4xl"
          src={data?.image}
          alt={data.title}
        />
        <FaHeart
          onClick={() => addTofav(Number(data.id), data)}
          className={`absolute md:top-9 sm:top-3 -top-1 text-3xl ${
            favList.includes(data.id) && "text-red-700"
          } hover:text-red-700 md:left-70 right-10 cursor-pointer text-[#565151] `}
        />
        <div className="flex flex-col  items-center text-center md:gap-[40px] gap-[10px]">
          <div className="text-[1.7rem] lg:w-[60%]  font-semibold">
            {data.title}
          </div>

          <div className="text-[1rem] px-[4vw]  text-left font-semibold">
            <p className="mb-4 ">About this item:-</p>
            {data.description}
            <p className="capitalize mt-4">Category:- {data.category}</p>
          </div>
          <div className="text-[1.5rem] font-semibold">
            ₹{(data.price * 80).toFixed(2)}
          </div>
          {cartList.includes(data.id) ? (
            <div
              className={`${
                animtionforUntilAdd && addingItemId === data.id
                  ? "bg-gray-300 opacity-20 animate-shake duration-150 text-indigo-300 "
                  : null
              } shadow-black  rounded-lg shadow flex items-center`}
            >
              <button
                className={`${
                  animtionforUntilAdd && addingItemId === data.id
                    ? "cursor-none"
                    : "cursor-pointer"
                } px-3 pb-1  font-bold text-4xl`}
                onClick={() => {
                  decQuantity(data.id, data.quantity);
                }}
              >
                -
              </button>
              <span className="px-3 shadow-indigo-200  shadow  text-black font-bold text-xl">
                {getQuantity(data.id)}
              </span>
              <button
                className={`px-3 font-bold text-3xl ${
                  animtionforUntilAdd && addingItemId === data.id
                    ? "cursor-none"
                    : "cursor-pointer"
                }`}
                onClick={() => addtocartArr(data.id)}
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                addtocartArr(data.id, data);
              }}
              disabled={addingItemId === data.id}
              className="sm:font-bold font-semibold duration-400 
                 rounded-[8px] text-white py-[8px] px-[9px]"
            >
              Add To Cart
            </button>
          )}

          <div>
            <p className="text-[1.1rem] font-semibold">
              Units Sold - {data.rating?.count}
            </p>
            <p className="text-[1.1rem] font-semibold">
              Rated {data.rating?.rate} / 5 by {data.rating?.count}+ Users
            </p>
            <div>
              {iconTimer && (
                <div className=" bg-gradient-to-r st:font-bold font-semibold animate-bounce md:left-[42vw] left-1/6 st:ml-0  mb:left-1/3 text-[#8D0B41] from-violet-200 to-pink-200 fixed z-10 top-25 mb:px-5 px-2 st:py-3 py-1 rounded-full">
                  <p>
                    🎉 Item <span>{message}</span> successfully!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default ProductDetail;
