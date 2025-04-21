import React, { useContext } from "react";
import { Button} from "antd";
import "./header.css";
import SearchBox from "../searchBox/searchBox.jsx";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { CartContext } from "../../context/cartContext.js";
import Cookies from "js-cookie";

const Header = () => {
  const { cartItems } = useContext(CartContext);

  const initialValue = 0;
  const order = cartItems.reduce(  (accumulator, currentItem) => 
  accumulator + currentItem.quantity,
      initialValue)
  const navigate = useNavigate();
   const handleLogout = async () => {
     try {
       alert("LogOut Successfully");
       Cookies.remove("token");
       navigate("/");
     } catch (error) {
       console.error("Login error:", error.message);
       alert("Error during LogOut. Please try again.");
     } 
   };

  return (
    <div className="flex bg-[#666363] justify-between p-3 w-full fixed top-0 left-0">
      <h1 className="font-bold text-[white] mt-3 pl-4 mr-4">A&A Mart</h1>
      <div className="flex mt-1 w-screen">
        <span className="">
          <SearchBox />
        </span>
        {/* <Button
          type="text"
          className="header-button p-7 font-bold"
          id="btn"
          onClick={() => navigate("/login")}
        >
          LOGIN
        </Button> */}
        <Button
          type="text"
          className="header-button p-7 font-bold"
          id="btn"
          onClick={handleLogout}
        >
          LOG-OUT
        </Button>
        <Button
          type="text"
          className="header-button p-7 font-bold"
          id="btn"
          onClick={() => {
            navigate("/cart");
          }}
        >
          <div className="flex flex-col">
            <span className="ml-1">{order}</span>
            <ShoppingCartOutlined
              style={{ fontSize: "24px" }}
            ></ShoppingCartOutlined>
          </div>
          Cart
        </Button>
      </div>
    </div>
  );
};

export default Header;
