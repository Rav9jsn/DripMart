import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCartItems, getFavouriteList } from "../serviced";

// Async Action to fetch cart items
export const fetchCartItems = createAsyncThunk("fetchCart", async () => {
  try {
    const { message } = await getCartItems();
    if (message) return { message };
    let { cartProducts, totalPrice } = await getCartItems();
    const prod = cartProducts.filter((item) => item.quantity !== 0);
    cartProducts = prod;
    return { cartProducts, totalPrice };
  } catch (err) {
    console.error("Error fetching cart items:", err);
  }
});
export const fetchFavItems = createAsyncThunk("fetchFav", async () => {
  try {
    const { message } = await getFavouriteList();
    if (message) return null;

    return await getFavouriteList();
  } catch (err) {
    console.error("Error fetching cart items:", err);
  }
});

const dripSlice = createSlice({
  name: "drip",
  initialState: {
    isLoading: false,
    isLoadingFav: false,
    data: null,
    isError: false,
    isErrorFav: false,
    favItemsData: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        const { message } = action.payload;
        if (!message) {
          state.isLoading = false;

          if (JSON.stringify(state.data) !== JSON.stringify(action.payload)) {
            state.data = action.payload;
          }
        }
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    // For Favourite Items
    builder
      .addCase(fetchFavItems.pending, (state) => {
        state.isLoadingFav = true;
        state.isErrorFav = false;
      })
      .addCase(fetchFavItems.fulfilled, (state, action) => {
        state.isLoadingFav = false;
        state.favItemsData = action.payload;
      })
      .addCase(fetchFavItems.rejected, (state) => {
        state.isLoadingFav = false;
        state.isErrorFav = true;
      });
  },
  reducers: {
    clearCartData: (state) => {
      state.data = null;
      state.isLoading = false;
      state.isError = false;
    },

    updateCartQuantity: (state, action) => {
      const { id, type, pData } = action.payload;
      const item =
        state.data &&
        state.data.cartProducts &&
        state.data.cartProducts.find((i) => i.id === id);

      if (item) {
        if (type === "inc") {
          item.quantity += 1;
          state.data.totalPrice = state.data.cartProducts.reduce(
            (acc, i) => i.price * i.quantity + acc,
            0
          );
        } else if (type === "dec" && item.quantity >= 0) {
          item.quantity -= 1;
          state.data.totalPrice = state.data.cartProducts.reduce(
            (acc, i) => i.price * i.quantity + acc,
            0
          );
          if (item.quantity == 0) {
            state.data.cartProducts = state.data.cartProducts.filter(
              (item) => item?.id !== id
            );
          }
        }
      } else {
        if (!state.data) {
          state.data = {};
          state.data.cartProducts = [];
          state.data.totalPrice = 0;
        }
        state.data.cartProducts.push(pData);
      }
    },
    deleteOneItem: (state, action) => {
      const id = action.payload;
      state.data.cartProducts = state.data.cartProducts.filter(
        (item) => item?.id !== id
      );
      console.log(state.data.cartProducts);
      state.data.totalPrice = state.data.cartProducts.reduce(
        (acc, i) => i.price * i.quantity + acc,
        0
      );
    },
    updateFavouritesItem: (state, acton) => {
      const { id } = acton.payload;
      if (!state.favItemsData) {
        state.favItemsData = {};
        state.favItemsData.favProducts = [];
      }
      const favIdItem =
        state.favItemsData.favProducts &&
        state.favItemsData.favProducts.find((fav) => fav.id === id);
      if (favIdItem) {
        state.favItemsData.favProducts = state.favItemsData.favProducts.filter(
          (item) => item.id !== id
        );
      } else {
        const { favItem } = acton.payload;
        state.favItemsData.favProducts.push(favItem);
      }
    },
  },
});

export const {
  clearCartData,
  updateCartQuantity,
  updateFavouritesItem,
  deleteOneItem,
} = dripSlice.actions;
export default dripSlice.reducer;
