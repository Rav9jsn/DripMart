import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/logo.svg";
import cart from "../assets/cart.png";
import { addImage } from "../state/storage";
import { Link } from "react-router-dom";
import { prodAmount } from "../state/storage";
import { updateItemInArray } from "../state/storage";

const ProductDetail = () => {
  const totalAmount = useSelector((state) => state.image.productAmounts);
  const dataHai = useSelector((state) => state.image.clickedImages);
  const dispatch = useDispatch();
  const data = useLocation().state;
  const productDataColtcn = (dataAtCart) => {
    dispatch(prodAmount(dataAtCart.price));
    let itemCount = "itemCount";
    const [yo] = dataHai.filter((item) => item.id === dataAtCart.id);
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
      <div className="bg-cover bg-center bg-gradient-to-r from-indigo-100 to-indigo-50 pt-[10px]  sticky top-0 z-50 px-[8px] rounded-[10px]">
        <div className="flex justify-between items-center">
          {/* for left logo */}
          <Link className="w-[4%] cursor-pointer" to={"/"}>
            <img src={logo} alt="" />
          </Link>

          {/* for center */}
          <div className="text-3xl font-bold bg-gradient-to-l from-gray-400 to-gray-700 bg-clip-text text-transparent">
            Drip
            <p className="bg-gradient-to-r  from-gray-400 to-gray-700 bg-clip-text text-transparent  inline-block italic text-[33px]">
              Mart
            </p>
          </div>
          {/* for right cart */}
          <Link to={"/Cart"}>
            <div className="relative mx-1.5">
              {" "}
              <img className=" cursor-pointer" src={cart} alt="" />
              <p className=" text-white -top-1 right-0.5 bg-red-500 rounded-full absolute px-1 text-[12px] font-[700]">
                {totalAmount.length}
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex  md:flex-row flex-col items-center lg:gap-[250px] md:gap-[50px] gap-[10px]  justify-around">
        <img
          className="w-[23rem] mix-blend-darken object-contain	 hover:shadow hover:shadow-black rounded-4xl"
          src={data?.image}
          alt=""
        />
        <div className="flex flex-col  items-center text-center md:gap-[40px] gap-[10px] md:pt-[150px] lg:my-[50px]">
          <div className="text-[1.7rem] lg:w-[60%]  font-semibold">
            {data.title}
          </div>

          <div className="text-[1rem] px-[4vw]  text-left font-semibold">
            <p className="mb-4 ">About this item:-</p>
            {data.description}
            <p className="capitalize mt-4">Category:- {data.category}</p>
          </div>
          <div className="text-[1.5rem] font-semibold">{data.price} $</div>
          <button
            onClick={() => productDataColtcn(data)}
            className="font-bold bg-indigo-500 rounded-[8px] cursor-pointer text-white  py-[8px] px-[10px]"
          >
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
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default ProductDetail;
