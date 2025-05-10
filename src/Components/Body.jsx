import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addImage } from "../state/storage";
import { prodAmount } from "../state/storage";
import { useSelector } from "react-redux";
import { updateItemInArray } from "../state/storage";

const Body = () => {
  const dispatch = useDispatch();
  const clickedImages = useSelector((state) => state.image.clickedImages);
  const [data, setdata] = useState(null);
  const navigate = useNavigate();
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
      <div className="z-10 grid grid-cols-3 gap-y-5 ">
        {data &&
          data.map((data, i) => {
            return (
              <div className="flex flex-col gap-2 items-center" key={data.id}>
                <img
                  onClick={() => {
                    navigate(`/Home/${data.title.slice(1, 20)}`, {
                      state: data,
                    });
                  }}
                  className="w-[90%] cursor-pointer rounded-2xl object-contain aspect-square "
                  src={data?.image}
                  alt=""
                />
                <div className="text-[1.3rem] font-semibold">
                  {data.title.slice(0, 25)}...
                </div>
                <div className="text-[1.3rem] font-semibold">
                  {data.price} $
                </div>
                <button
                  onClick={() => productDataColtcn(data)}
                  className="font-bold bg-indigo-500 rounded-[8px] cursor-pointer text-white  py-[8px] px-[10px]"
                >
                  {" "}
                  Add To Cart
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Body;
