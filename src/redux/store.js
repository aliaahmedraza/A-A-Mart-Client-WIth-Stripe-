import { configureStore } from "@reduxjs/toolkit";
import privateRouterReducer from "../redux/slices/privateRouterSlice.js";

const store = configureStore({
  reducer: {
    privateRouter: privateRouterReducer, 
  },
});

export default store;
