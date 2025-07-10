import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToFavouritre, fetchAllProduct, removeFav } from "../../serviced";
import { FaHeart } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartItems,
  fetchFavItems,
  updateFavouritesItem,
} from "../../state/storage";
import useAddtocart from "../../UseAddtocart";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    iconTimer,
    animtionforUntilAdd,
    addingItemId,
    message,
    addtoCart,
    removeFromCart,
  } = useAddtocart();

  const [productData, setdata] = useState(null);
  const cart = useSelector((state) => state.drip.data?.cartProducts);
  const favProducts = useSelector(
    (state) => state.drip?.favItemsData?.favProducts
  );

  ////////// Fetching All Product //////////
  const fetchProducts = async () => {
    try {
      const { data } = await fetchAllProduct();
      setdata(data);
    } catch (err) {
      console.log("fav list error", err);
    }
  };
  useEffect(() => {
    dispatch(fetchCartItems());
    dispatch(fetchFavItems());
    fetchProducts();
  }, []);
  //////fav items id///////
  const favList = favProducts ? favProducts.map((fav) => fav.id) : "";
  const cartList = cart ? cart.map((cart) => cart.id) : "";
  ///////////Add to favourit Function/////////
  const addTofav = async (id, favItem) => {
    dispatch(updateFavouritesItem({ id, favItem }));
    const favIdItem = favList && favList.find((favid) => favid === id);
    favIdItem ? await removeFav(id) : await addToFavouritre(id);
  };
  //////ADD to Cart/////
  const addtocartArr = async (id, data) => {
    await addtoCart(id, data);
  };
  // Decrease Quantity
  const decQuantity = async (id) => {
    await removeFromCart(id);
  };

  //////getQuantity///
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
      {productData && cart ? (
        <>
          <div className="z-10 grid md:grid-cols-3 mb:grid-cols-2 grid-cols-1 items-center sm:gap-y-5 gap-y-2 ">
            {productData &&
              productData.map((data) => {
                return (
                  <div
                    className="flex flex-col relative  bg-indigo-100 justify-between items-center"
                    key={data.id}
                  >
                    <div className=" w-[90%] flex cursor-pointer rounded-2xl py-2 justify-center shadow md:shadow-indigo-100 hover:shadow-black  ">
                      <img
                        onClick={() => {
                          navigate(`/Home/${data.title.slice(1, 20)}`, {
                            state: data,
                          });
                        }}
                        className="sm:w-[80%] w-[70%]  mix-blend-darken  object-contain aspect-square "
                        src={data?.image}
                        alt={data.category}
                      />

                      <FaHeart
                        onClick={() => addTofav(Number(data.id), data)}
                        className={`absolute  md:top-1 top-1 text-3xl ${
                          favList.includes(data.id) && "text-red-700"
                        } hover:text-red-700 duration-500 sm:right-10 md:right-5 lg:right-15 right-9 cursor-pointer text-[#565151] `}
                      />
                    </div>
                    <div className="sm:text-[1.3rem] text-center font-semibold">
                      {data.title.slice(0, 20)}...
                    </div>
                    <div className="text-[1.3rem] font-semibold">
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
                        rounded-[8px] text-white py-[8px] px-[9px] bg-indigo-500"
                      >
                        Add To Cart
                      </button>
                    )}
                  </div>
                );
              })}
          </div>
          <div>
            {iconTimer && (
              <div className=" bg-gradient-to-r st:font-bold font-semibold animate-bounce md:left-[42vw] left-1/6 st:ml-0  mb:left-1/3 text-[#8D0B41] from-violet-200 to-pink-200 fixed z-10 top-25 mb:px-5 px-2 st:py-3 py-1 rounded-full">
                <p>
                  🎉 Item <span>{message}</span> successfully!
                </p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex sm:flex-row flex-col sm:justify-between items-center gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse sm:w-[30%] w-[90%] aspect-square rounded-xl bg-[#8080805d]"
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Body;
