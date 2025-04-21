import React, { createContext, useState } from "react";
import { message } from "antd";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
const addToCart = (product) => {
  setCartItems((prev) => {
    const existingProduct = prev.find((item) => item.id === product.id);
    if (existingProduct) {
      return prev.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    }
    return [...prev, { ...product, quantity: 1 }];
  });
  message.info("Item added to the cart successfully!");
};
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };
  const emptyCart = () => {
    setCartItems([])
  };
  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity,emptyCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
