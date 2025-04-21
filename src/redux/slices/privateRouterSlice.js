import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: false, 
};

const privateRouterSlice = createSlice({
  name: "privateRouter",
  initialState,
  reducers: {
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});
export const { setAuthenticated } = privateRouterSlice.actions;
export default privateRouterSlice.reducer;
