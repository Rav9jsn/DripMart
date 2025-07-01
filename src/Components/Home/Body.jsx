import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  addToFavouritre,
  decQuantToCart,
  fetchAllProduct,
} from "../../serviced";
import { FaHeart } from "react-icons/fa";
import { getFavouriteList } from "../../serviced";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../../state/storage";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [iconTimer, setIconTimer] = useState(false);
  const [favProducts, setFavProducts] = useState(null);
  const [productData, setdata] = useState(null);
  const cart = useSelector((state) => state.drip.data?.cartProducts);

  // Fetching all favourite product
  const fetchData = async () => {
    try {
      const list = await getFavouriteList();
      setFavProducts(list.favProducts);
    } catch (err) {
      console.log("product related error", err);
    }
  };
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
    fetchProducts();
    fetchData();
    dispatch(fetchCartItems());
  }, []);
  //////fav items id///////
  const favList = favProducts ? favProducts.map((fav) => fav.id) : "";
  const cartList = cart ? cart.map((cart) => cart.id) : "";

  //////////Sucessfull item for add to cart/////
  const addedIcon = () => {
    setIconTimer(true);
    setTimeout(() => setIconTimer(false), 500);
  };

  ///////////Add to favourit Function/////////
  const addTofav = async (id) => {
    await addToFavouritre(id);
    fetchData();
  };

  //////ADD to Cart/////
  const addtocart = async (id) => {
    await addToCart(id);
    addedIcon();
    dispatch(fetchCartItems());
  };
  const refreshCart = () => {
    dispatch(fetchCartItems());
  };
  // Decrease Quantity
  const decQuantity = async (id) => {
    await decQuantToCart(id);
    refreshCart();
  };


  //////
  const getQuantity = (id)=>{

    return cart&&cart.map((item=>{
      return (item.id===id&&item.quantity)
    }))
  }  
  return (
    <>
      {productData ? (
        <>
          <div className="z-10 grid md:grid-cols-3 mb:grid-cols-2 grid-cols-1 items-center sm:gap-y-5 gap-y-2 ">
            {productData &&
              productData.map((data) => {
                return (
                  <div
                    className="flex flex-col relative  bg-indigo-100 justify-between items-center"
                    key={data.id}
                  >
                    <div className=" w-[90%] flex cursor-pointer rounded-2xl py-2 justify-center shadow md:shadow-indigo-100 hover:shadow-black shadow-black ">
                      <img
                        onClick={() => {
                          navigate(`/Home/${data.title.slice(1, 20)}`, {
                            state: data,
                          });
                        }}
                        className="sm:w-[80%] w-[70%]  mix-blend-darken  object-contain aspect-square "
                        src={data?.image}
                         loading="lazy"
                        alt={data.category}
                      />

                      <FaHeart
                        onClick={() => addTofav(Number(data.id))}
                        className={`absolute  md:top-1 top-1 text-3xl ${
                          favList.includes(data.id) && "text-red-700"
                        } hover:text-red-700 sm:right-10 md:right-5 lg:right-15 right-9 cursor-pointer text-[#565151] `}
                      />
                    </div>
                    <div className="sm:text-[1.3rem] text-center font-semibold">
                      {data.title.slice(0, 25)}...
                    </div>
                    <div className="text-[1.3rem] font-semibold">
                      ₹{(data.price * 80).toFixed(2)}
                    </div>
                    {cartList.includes(data.id) ? (
                      <div className=" shadow-black rounded-lg shadow flex items-center">
                        <button
                          className="px-3 pb-1 cursor-pointer font-bold text-4xl "
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
                          className="px-3 cursor-pointer font-bold text-3xl"
                          onClick={() => addtocart(data.id)}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          addtocart(data.id);
                        }}
                        className="sm:font-bold font-semibold duration-400 bg-indigo-500 rounded-[8px] cursor-pointer text-white  py-[8px] px-[9px]"
                      >
                        {" "}
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
                <p>🎉 Item added successfully!</p>
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
