// src/features/imageSlice.js
import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
  name: "image",
  initialState: {
    clickedImages: [],
    productAmounts: [],
  },
  reducers: {
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
  },
});

export const { addImage, prodAmount, updateItemInArray } = imageSlice.actions;
export default imageSlice.reducer;
