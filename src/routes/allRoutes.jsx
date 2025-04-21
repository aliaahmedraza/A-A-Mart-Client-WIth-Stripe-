import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoginPage from "../pages/login/login.jsx";
import SignupPage from "../pages/signUp/signUp.jsx";
import ForgotPasswordPage from "../pages/forgetPassword/forgetPassword.jsx";
import Dashboard from "../pages/dashboard/dashboard.jsx";
import ShoppingCart from "../pages/shoppingcart/shoppingcart.jsx";
import UpdatePasswordPage from "../pages/passwordUpdated/passwordUpdated.jsx";
import { CartProvider } from "../context/cartContext.js";
import { setAuthenticated } from "../redux/slices/privateRouterSlice";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import OrderPage from "../pages/order/order.jsx";
import CancelPage from "../pages/stripeResponsePages/CancelPage.jsx"
import SuccessPage from "../pages/stripeResponsePages/SuccessPage.jsx";

const PrivateRoute = () => {
  const isAuthenticated = useSelector(
    (state) => state.privateRouter.isAuthenticated
  );
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

const AllRoutes = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const expiryTime = decodedToken.exp * 1000;
        const currentTime = Date.now();

        if (currentTime > expiryTime) {
          dispatch(setAuthenticated(false));
        } else {
          dispatch(setAuthenticated(true)); 
        }
      } catch (error) {
        console.error("Error decoding the token:", error);
        dispatch(setAuthenticated(false));
      }
    } else {
      dispatch(setAuthenticated(false)); 
    }
  }, [dispatch]); 

  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgetpassword" element={<ForgotPasswordPage />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/updatepassword/:token" element={<UpdatePasswordPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel"  element={<CancelPage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
        </Route>
      </Routes>
    </CartProvider>
  );
};

export default AllRoutes;

