import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCartItems } from "../serviced";

// Async Action to fetch cart items
export const fetchCartItems = createAsyncThunk("fetchCart", async () => {
  try {
    return await getCartItems();
  } catch (err) {
    console.error("Error fetching cart items:", err);
  }
});

const dripSlice = createSlice({
  name: "drip",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {
    clearCartData: (state) => {
      state.data = null;
      state.isLoading = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        if (JSON.stringify(state.data) !== JSON.stringify(action.payload)) {
          state.data = action.payload;
        }
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearCartData } = dripSlice.actions;
export default dripSlice.reducer;
