import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addImage } from "../state/storage";
import { prodAmount } from "../state/storage";
import { useSelector } from "react-redux";
import { updateItemInArray } from "../state/storage";

const Body = () => {
  const dispatch = useDispatch();
  const [iconTimer, setIconTimer] = useState(false);
  const clickedImages = useSelector((state) => state.image.clickedImages);
  const navigate = useNavigate();
  const [data, setdata] = useState(null);
  useEffect(() => {
    const check = async () => {
      try {
        const fetc = await fetch("https://fakestoreapi.com/products");
        const fetching = await fetc.json();
        setdata(fetching);
      } catch (err) {
        console.log(err);
      }
    };
    check();
  }, []);
  const addedIcon = () => {
    setIconTimer(true);
    setTimeout(() => setIconTimer(false), 500);
  };
  const productDataColtcn = (data) => {
    let itemCount = "itemCount";
    dispatch(prodAmount(data.price));
    const [yo] = clickedImages.filter((item) => item.id === data.id);
    if (yo) {
      let u = JSON.parse(JSON.stringify(yo));
      u.itemCount = (u.itemCount || 0) + 1;
      dispatch(updateItemInArray(u));
    } else {
      data[itemCount] = 1;
      dispatch(addImage(data));
    }
  };

  return (
    <>
      {" "}
      {data ? (
        <>
          <div className="z-10 grid md:grid-cols-3 mb:grid-cols-2 grid-cols-1  sm:gap-y-5 gap-y-2 ">
            {data &&
              data.map((data, i) => {
                return (
                  <div
                    className="flex flex-col bg-indigo-100 justify-between items-center"
                    key={data.id}
                  >
                    <img
                      onClick={() => {
                        navigate(`/Home/${data.title.slice(1, 20)}`, {
                          state: data,
                        });
                      }}
                      className="w-[90%] mix-blend-darken hover:shadow hover:shadow-black cursor-pointer rounded-2xl object-contain aspect-square "
                      src={data?.image}
                      alt={data.category}
                    />
                    <div className="sm:text-[1.3rem] text-center font-semibold">
                      {data.title.slice(0, 25)}...
                    </div>
                    <div className="text-[1.3rem] font-semibold">
                      {data.price} $
                    </div>
                    <button
                      onClick={() => {
                        productDataColtcn(data), addedIcon();
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
