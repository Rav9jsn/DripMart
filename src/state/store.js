import { configureStore } from "@reduxjs/toolkit";
import dripReducer from "./storage";

let store;

try {
  store = configureStore({
    reducer: { drip: dripReducer },
  });
} catch (err) {
  console.error("Redux store configuration failed:", err);
}

export { store };
