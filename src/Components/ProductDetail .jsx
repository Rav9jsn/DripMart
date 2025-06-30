import { useLocation } from "react-router-dom";
import Navbar from "./Home/Navbar";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { addToCart, addToFavouritre, getFavouriteList } from "../serviced";
import { fetchCartItems } from "../state/storage";
import { useDispatch } from "react-redux";

const ProductDetail = () => {
   const dispatch = useDispatch();
     const [iconTimer, setIconTimer] = useState(false);

  const data = useLocation().state;
  const [favProducts, setFavProducts] = useState(null);
  // Fetching all favourite product
  const fetchData = async () => {
    try {
      const list = await getFavouriteList();
      setFavProducts(list.favProducts);
    } catch (err) {
      console.log("product related error", err);
    }
  };
  //////fav items id///////
  const favList = favProducts ? favProducts.map((fav) => fav.id) : "";
  useEffect(() => {
    fetchData();
  }, []);
  ///////////Add to favourit Function/////////
  const addTofav = async (id) => {
    await addToFavouritre(id);
    fetchData();
  };
   //////////Sucessfull item for add to cart/////
  const addedIcon = () => {
    setIconTimer(true);
    setTimeout(() => setIconTimer(false), 500);
  };
  //////////add to cart 
   const addtocart = async (id) => {
      const res = await addToCart(id);
      dispatch(fetchCartItems());
      addedIcon();
      console.log(res);
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
          onClick={() => addTofav(Number(data.id))}
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
          <div className="text-[1.5rem] font-semibold">₹{(data.price*80).toFixed(2)}</div>
          <button onClick={() => {
                        addtocart(data.id);
                      }} className="font-bold bg-indigo-500 rounded-[8px] cursor-pointer text-white  py-[8px] px-[10px]">
            {" "}
            Add To Cart
          </button>
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
                <p>🎉 Item added successfully!</p>
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
