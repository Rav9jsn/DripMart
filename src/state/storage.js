// src/features/imageSlice.js
import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
  name: "image",
  initialState: {
    clickedImages: [],
    productAmounts: [],
    minusProductAmounts: [],
  },
  reducers: {
    minusbtnUpdate: (state, action) => {
      const updateData = action.payload;
      const index = state.clickedImages.findIndex(
        (item) => item.id === updateData.id
      );
      if (index !== -1) {
        state.clickedImages[index] = updateData;
      }
    },
    updateItemInArray: (state, action) => {
      const updatedItem = action.payload;
      const index = state.clickedImages.findIndex(
        (item) => item.id === updatedItem.id
      );
      if (index !== -1) {
        state.clickedImages[index] = updatedItem;
      }
    },
    addImage: (state, action) => {
      state.clickedImages.push(action.payload);
    },
    prodAmount: (state, action) => {
      state.productAmounts.push(action.payload);
    },
    prodAmountforDec: (state, action) => {
      state.minusProductAmounts.push(action.payload);
    },
    clearAmounts: (state) => {
      state.clickedImages = [];
      state.productAmounts = [];
      state.minusProductAmounts = [];
    },
  },
});

export const {
  addImage,
  prodAmount,
  updateItemInArray,
  minusbtnUpdate,
  prodAmountforDec,
  clearAmounts,
} = imageSlice.actions;
export default imageSlice.reducer;
