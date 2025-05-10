import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { updateItemInArray } from "../state/storage";
import { prodAmount } from "../state/storage";
const Cart = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.image.clickedImages);
  const totalAmount = useSelector((state) => state.image.productAmounts);

  const productDataColtcn = (dataAtCart) => {
    dispatch(prodAmount(dataAtCart.price));
    const [yo] = data.filter((item) => item.id === dataAtCart.id);
    if (yo) {
      let u = JSON.parse(JSON.stringify(yo));
      u.itemCount = (u.itemCount || 0) + 1;
      dispatch(updateItemInArray(u));
    }
  };

  const Decproduct = (dataAtCart) => {
    dispatch(prodAmount(dataAtCart.price));
    const [yo] = data.filter((item) => item.id === dataAtCart.id);
    if (yo) {
      let u = JSON.parse(JSON.stringify(yo));
      u.itemCount = (u.itemCount || 0) + 1;
      dispatch(updateItemInArray(u));
    }
  };

  const cart = totalAmount.length;

  const sum = (num) => {
    const totalamt = num.reduce((n, a) => {
      return n + a;
    }, 0);
    return parseFloat(totalamt).toFixed(2);
  };
  return (
    <div>
      <Navbar />
      {!cart ? (
        <div className="h-[50vh] flex justify-center items-center text-4xl">
          Oops! Nothing here yet...
        </div>
      ) : (
        <>
          {" "}
          <div className=" flex justify-center  items-center my-[10vh]">
            <div className="flex gap-8  flex-col">
              <p className="text-2xl font-semibold">Your Cart</p>
              {data.map((item, i) => {
                return (
                  <div key={i} className="flex gap-10">
                    <img
                      className="w-[10vw] object-contain"
                      src={item.image}
                      alt=""
                    />
                    <div className="text-[1.2rem] flex flex-col gap-5 font-semibold">
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
                        <button className="bg-white px-[15px] cursor-pointer">
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" flex justify-center flex-col items-center gap-5 text-[1.2rem] font-semibold mr-24">
            {" "}
            Total : ${sum(totalAmount)}
            <div className=" cursor-pointer w-[15vw] text-center rounded-2xl px-5 py-2.5 bg-[#4e738e23]">
              Proceed to Buy
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
