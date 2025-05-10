import { useLocation } from "react-router-dom";

const ProductDetail = () => {
  const data = useLocation().state;
  console.log(data);

  return (
    <div>
      <div className="text-3xl text-center my-5 animate-pulse  font-bold bg-gradient-to-l from-gray-400 to-gray-700 bg-clip-text text-transparent">
        Drip
        <p className="bg-gradient-to-r  from-gray-400 to-gray-700 bg-clip-text text-transparent  inline-block italic text-[33px]">
          Mart
        </p>
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
          <button className="font-bold bg-indigo-500 rounded-[8px] cursor-pointer text-white  py-[8px] px-[10px]">
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
    </div>
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
