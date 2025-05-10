import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/logo.svg";
import cart from "../assets/cart.png";
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
    const [yo] = dataHai.filter((item) => item.id === dataAtCart.id);
    if (yo) {
      let u = JSON.parse(JSON.stringify(yo));
      u.itemCount = (u.itemCount || 0) + 1;
      dispatch(updateItemInArray(u));
    }
  };
  console.log(data);

  return (
    <>
      <div className="bg-cover bg-center  pt-[10px]  sticky top-0 z-50 px-[8px] rounded-[10px]">
        <div className="flex justify-between items-center">
          {/* for left logo */}

          <img className="w-[4%] cursor-pointer" src={logo} alt="" />

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
      <div className="flex gap-[250px]  justify-around">
        <img
          className="w-[32%] object-contain	  rounded-4xl"
          src={data?.image}
          alt=""
        />
        <div className="flex flex-col  items-center text-center gap-[40px] my-[50px]">
          <div className="text-[1.7rem] w-[60%]  font-semibold">
            {data.title}
          </div>

          <div className="text-[1rem] text-left font-semibold">
            <p className="mb-4">About this item:-</p>
            {data.description}
            <p className="capitalize">Category:- {data.category}</p>
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
              Rated {data.rating?.rate}/5 by {data.rating?.count}+ Users
            </p>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default ProductDetail;

// category
// :
// "women's clothing"
// description
// :
// "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look."
// id
// :
// 17
// image
// :
// "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg"
// price
// :
// 39.99
// rating
// :
// count
// :
// 679
// rate
// :
// 3.8
// [[Prototype]]
// :
// Object
// title
// :
// "Rain Jacket Women Windbreaker Striped Climbing Raincoats"
