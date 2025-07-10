import { useEffect } from "react";
import { removeFav } from "./serviced";
import Navbar from "./Components/Home/Navbar";
import { fetchFavItems, updateFavouritesItem } from "./state/storage";
import { useDispatch, useSelector } from "react-redux";

const Favourite = () => {
  const dispatch = useDispatch();
  const favProducts = useSelector(
    (state) => state.drip?.favItemsData?.favProducts
  );
  const removFavourite = async (id) => {
    try {
      dispatch(updateFavouritesItem({ id }));
      
      await removeFav(id);
    } catch (err) {
      console.error(`Failed to remove item ${id} from favorites:`, err);
    }
  };

  useEffect(() => {
    dispatch(fetchFavItems());
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-50 py-12 px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          ❤️ Your Favorite Items
        </h1>

        {/* Loading Skeleton */}
        {favProducts === null ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white/60 p-4 rounded-2xl animate-pulse shadow-xl space-y-4"
              >
                <div className="h-40 bg-gray-300 rounded-md"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : !favProducts || favProducts.length === 0 ? (
          // No Favourites Found
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-600 text-xl">No favourites yet 😔</p>
          </div>
        ) : (
          // Favourites List
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {favProducts.map((product) => (
              <div
                key={product.id}
                className="relative bg-white/70 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="h-52 bg-white p-4 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-40 object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-5 space-y-2">
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {product.title}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-blue-600">
                      ₹{(product.price * 80).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removFavourite(product.id)}
                      className="bg-red-100 text-red-600 hover:bg-red-600 hover:text-white px-3 py-1 rounded-full text-sm cursor-pointer transition-all duration-200"
                    >
                      ❌ Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Favourite;
