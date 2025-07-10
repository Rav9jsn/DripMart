import { addToCart, decQuantToCart, deletItemFromCart } from "./serviced";
import { updateCartQuantity } from "./state/storage";
import { useState } from "react";
import { useDispatch } from "react-redux";

const useAddtocart = () => {
  const [iconTimer, setIconTimer] = useState(false);
  const [addingItemId, setAddingItemId] = useState(null);
  const [message, setmessage] = useState("");
  const [animtionforUntilAdd, setanimtionforUntilAdd] = useState(false);
  const dispatch = useDispatch();
  //////////Sucessfull item for add to cart/////
  const addedIcon = () => {
    setIconTimer(true);
    setTimeout(() => setIconTimer(false), 500);
  };

  const addtoCart = async (id, data) => {
    if (addingItemId === id) return;

    setAddingItemId(id);
    setanimtionforUntilAdd(true);
    setmessage("Added");
    const pData = { ...data, quantity: 1 };
    addedIcon();
    dispatch(updateCartQuantity({ id, type: "inc", pData }));
    await addToCart(id);
    setTimeout(() => {
      setAddingItemId(null);
      setanimtionforUntilAdd(false);
    }, 100);
  };

  const itemoneThenDelte = async (id = 0, num) => {
    if (id && num === 1) {
      await deletItemFromCart(id);
    }
  };
  // remove item fron cart
  const removeFromCart = async (id, quantity) => {
    if (addingItemId === id) return;
    setAddingItemId(id);
    setanimtionforUntilAdd(true);
    setmessage("Removed");
    addedIcon();
    itemoneThenDelte(id, quantity);
    await decQuantToCart(id);

    setTimeout(() => {
      setAddingItemId(null);
      setanimtionforUntilAdd(false);
      dispatch(updateCartQuantity({ id, type: "dec" }));
    }, 100);
  };
  return {
    iconTimer,
    animtionforUntilAdd,
    addingItemId,
    message,
    addtoCart,
    removeFromCart,
  };
};

export default useAddtocart;
