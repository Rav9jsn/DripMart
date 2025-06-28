import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart, addToFavouritre, fetchAllProduct } from "../../serviced";
import { FaHeart } from "react-icons/fa";
import { getFavouriteList } from "../../serviced";
import { useDispatch } from "react-redux";
import { fetchCartItems } from "../../state/storage";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [iconTimer, setIconTimer] = useState(false);
  const [favProducts, setFavProducts] = useState(null);
  const [productData, setdata] = useState(null);

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
  const check = async () => {
    try {
      const { data } = await fetchAllProduct();
      setdata(data);
    } catch (err) {
      console.log("fav list error", err);
    }
  };
  useEffect(() => {
    check();
    fetchData();
    dispatch(fetchCartItems());
  }, []);
  //////fav items id///////
  const favList = favProducts ? favProducts.map((fav) => fav.id) : "";

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
    const res = await addToCart(id);
    dispatch(fetchCartItems());
    addedIcon();
    console.log(res);
  };
  return (
    <>
      {productData ? (
        <>
          <div className="z-10 grid md:grid-cols-3 mb:grid-cols-2 grid-cols-1  sm:gap-y-5 gap-y-2 ">
            {productData &&
              productData.map((data) => {
                return (
                  <div
                    className="flex flex-col relative bg-indigo-100 justify-between items-center"
                    key={data.id}
                  >
                    <img
                      onClick={() => {
                        navigate(`/Home/${data.title.slice(1, 20)}`, {
                          state: data,
                        });
                      }}
                      className="w-[80%] mix-blend-darken hover:shadow hover:shadow-black cursor-pointer rounded-2xl object-contain aspect-square "
                      src={data?.image}
                      alt={data.category}
                    />

                    <FaHeart
                      onClick={() => addTofav(Number(data.id))}
                      className={`absolute top-5 text-3xl ${
                        favList.includes(data.id) && "text-red-700"
                      } hover:text-red-700 right-15 cursor-pointer text-[#565151] `}
                    />
                    <div className="sm:text-[1.3rem] text-center font-semibold">
                      {data.title.slice(0, 25)}...
                    </div>
                    <div className="text-[1.3rem] font-semibold">
                      ₹{(data.price*80).toFixed(2)} 
                    </div>
                    <button
                      onClick={() => {
                        addtocart(data.id);
                      }}
                      className="font-bold duration-400 bg-indigo-500 rounded-[8px] cursor-pointer text-white  py-[8px] px-[10px]"
                    >
                      {" "}
                      Add To Cart
                    </button>
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
