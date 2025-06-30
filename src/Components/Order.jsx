import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../serviced";
import Navbar from "./Home/Navbar";

const Order = () => {
  const [order, setOrder] = useState(null);

  const getOrder = async () => {
    const order = await getOrders();
    setOrder(order);
  };

  useEffect(() => {
    getOrder();
  }, []);

  if (!order) {
    return (
      <div> <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="animate-pulse space-y-4 w-full max-w-md">
          <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
      </div> 
    );
  }

  if (!order.succes) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="shadow-2xl rounded-2xl p-10 max-w-md w-full bg-white/80 backdrop-blur-md border border-white/40 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            No Orders Yet 😕
          </h1>
          <p className="text-gray-600 text-sm mb-6">
            Looks like you haven't placed any orders yet.
          </p>
          <Link
            to="/userhomepage"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
          >
            Shop Now 🛍️
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-4">
        {order.succes && (
          <div className="">
            <div className="flex flex-col gap-14">
              {order.itemsAllData.map((items, i) => {
                const { amount, date } = order.amountAndDate[i];
                const deliveryDate = new Date(date);
                deliveryDate.setDate(deliveryDate.getDate() + 7);

                return (
                  <div key={i} className="max-w-4xl w-full mx-auto backdrop-blur-lg shadow-2xl rounded-[2rem] p-8 border-white/20 transition-all duration-300">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      🧾 Order Summary
                    </h2>

                    <div className="text-sm text-gray-600 mb-4">
                      <span className="font-semibold">Placed on:</span>{" "}
                      <div>
                        {new Date(date).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </div>
                    </div>

                    <div className="space-y-6">
                      {items.map((item, i) => (
                        <div
                          key={i}
                          className="flex flex-col sm:flex-row items-center md:items-start justify-between   bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition md:gap-6"
                        >
                          <div className="flex items-center gap-4 w-full md:w-2/3">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-16 h-16 md:w-20 md:h-20 rounded-xl"
                            />
                            <div className="flex flex-col">
                              <h3 className="text-md md:text-lg font-semibold text-gray-800">
                                {item.title}
                              </h3>
                              <p className="text-sm text-gray-500">
                                ₹{(item.price * 80).toFixed(2)} x{" "}
                                {item.quantity}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col ml-auto items-end md:items-center md:w-1/3 text-right md:text-left">
                            <div className="font-bold text-indigo-600 text-lg md:text-xl">
                              ₹{(item.price * 80 * item.quantity).toFixed(2)}
                            </div>
                            <p className="text-xs text-green-600 mt-1 md:ml-0 sm:ml-10 md:mt-2">
                              🚚 Delivered on:{" "}
                              {deliveryDate.toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 text-right text-lg font-semibold text-gray-800 border-t pt-4">
                      Total Paid: ₹{Number(amount).toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Order;
