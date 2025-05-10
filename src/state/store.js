import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./storage";

export const store = configureStore({
  reducer: { image: imageReducer },
});
