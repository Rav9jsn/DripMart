// Set API base URL from environment variables
const apiUrl = import.meta.env.VITE_BASE_URL;

// Create a new user account
export const createAccount = async (user) => {
  try {
    const api = await fetch(`${apiUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await api.json();
  } catch (err) {
    console.error("createAccount", err);
  }
};

// Log in an existing user
export const userLogin = async (user) => {
  try {
    const api = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const res = await api.json();
    return res;
  } catch (err) {
    console.error("userLogin", err);
  }
};

// Retrieve JWT token from localStorage
const getToken = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

// Generate headers with optional JSON content-type
const headers = (json = false) => ({
  ...(json && { "Content-Type": "application/json" }),
  Authorization: getToken(),
});

// Fetch all available products
export const fetchAllProduct = async () => {
  try {
    const api = await fetch(`${apiUrl}/product`, {
      method: "GET",
      headers: headers(),
    });
    return await api.json();
  } catch (err) {
    console.error("fetchAllProduct", err);
  }
};

// Add product to favourites
export const addToFavouritre = async (id) => {
  try {
    const api = await fetch(`${apiUrl}/favourites/${id}`, {
      method: "POST",
      headers: headers(true),
      body: JSON.stringify({ id }),
    });
    return await api.json();
  } catch (err) {
    console.error("addToFavouritre", err);
  }
};

// Fetch user's favourite product list
export const getFavouriteList = async () => {
  try {
    const api = await fetch(`${apiUrl}/favourites`, {
      method: "GET",
      headers: headers(),
    });
    return await api.json();
  } catch (err) {
    console.error("getFavouriteList", err);
  }
};

// Remove product from favourites
export const removeFav = async (id) => {
  try {
    const api = await fetch(`${apiUrl}/favourites/${id}`, {
      method: "PUT",
      headers: headers(true),
      body: JSON.stringify({ id }),
    });
    return await api.json();
  } catch (err) {
    console.error("removeFav", err);
  }
};

// Add product to cart
export const addToCart = async (id) => {
  try {
    const api = await fetch(`${apiUrl}/cart/${id}`, {
      method: "POST",
      headers: headers(true),
      body: JSON.stringify({ id }),
    });
    return await api.json();
  } catch (err) {
    console.error("addToCart", err);
  }
};

// Fetch all items in the cart
export const getCartItems = async () => {
  try {
    const api = await fetch(`${apiUrl}/cart`, {
      method: "GET",
      headers: headers(),
    });
    return await api.json();
  } catch (err) {
    console.error("getCartItems", err);
  }
};

// Decrease quantity of a cart item
export const decQuantToCart = async (id) => {
  try {
    const api = await fetch(`${apiUrl}/cart/${id}`, {
      method: "PUT",
      headers: headers(true),
      body: JSON.stringify({ id }),
    });
    return await api.json();
  } catch (err) {
    console.error("decQuantToCart", err);
  }
};

// Delete item from the cart
export const deletItemFromCart = async (id) => {
  try {
    const api = await fetch(`${apiUrl}/cart/deleteitem/${id}`, {
      method: "PUT",
      headers: headers(true),
      body: JSON.stringify({ id }),
    });
    return await api.json();
  } catch (err) {
    console.error("deletItemFromCart", err);
  }
};

// Clear the entire cart
export const clearCart = async () => {
  try {
    const api = await fetch(`${apiUrl}/cart`, {
      method: "PUT",
      headers: headers(true),
      body: JSON.stringify({}),
    });
    return await api.json();
  } catch (err) {
    console.error("clearCart", err);
  }
};

const adressHave = localStorage.getItem("adressHave");
const address =
  adressHave === "true" && JSON.parse(localStorage.getItem("address"));

// Checkout using Razorpay payment gateway
export const paymentCheckout = async (amount) => {
  try {
    const apiKey = await fetch(`${apiUrl}/pay/getkey`, {
      method: "GET",
      headers: headers(),
    });
    const { key } = await apiKey.json();

    const api = await fetch(`${apiUrl}/pay`, {
      method: "POST",
      headers: headers(true),
      body: JSON.stringify({ amount }),
    });

    if (!api.ok) {
      const err = await api.text();
      throw new Error(`API Error: ${api.status} ${err}`);
    }

    const { order } = await api.json();

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "DripMart",
      description: "Test Transaction",
      image:
        "https://portfolio-ravi-kumars-projects-62aaa132.vercel.app/static/media/raviKumarProfile%20(1).ccbefff4fbff2eb3e5a4.webp",
      order_id: order.id,
      callback_url: `${apiUrl}/pay/paymentverification`,
      prefill: {
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        contact: address.phone,
      },
      notes: {},
      theme: {
        color: "#76A0E5",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();

    return order;
  } catch (err) {
    console.error("paymentCheckout", err);
  }
};

// Save user's address on the server
export const sendAddToServer = async (address) => {
  try {
    const res = await fetch(`${apiUrl}/auth/saveadress`, {
      method: "POST",
      headers: headers(true),
      body: JSON.stringify({ address }),
    });
    return await res.json();
  } catch (err) {
    console.error("sendAddToServer", err);
  }
};

// Create a new order
export const orderCreate = async (amount) => {
  try {
    const res = await fetch(`${apiUrl}/order`, {
      method: "POST",
      headers: headers(true),
      body: JSON.stringify({ amount }),
    });
    return await res.json();
  } catch (err) {
    console.error("orderCreate", err);
  }
};

// Fetch all orders for the user
export const getOrders = async () => {
  try {
    const res = await fetch(`${apiUrl}/order/getOrder`, {
      method: "GET",
      headers: headers(),
    });
    return await res.json();
  } catch (err) {
    console.error("getOrders", err);
  }
};
