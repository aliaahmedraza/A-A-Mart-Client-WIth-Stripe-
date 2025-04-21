import React, { useState, useContext, useEffect, useCallback } from "react";
import { CartContext } from "../../context/cartContext.js";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { loadStripe } from "@stripe/stripe-js";

export default function OrderPage() {
  const { cartItems, emptyCart } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const apiURL = process.env.REACT_APP_BACKEND_URL;
  const calculateTotalPrice = useCallback(
    () =>
      cartItems.reduce((sum, item) => {
        const priceNum = typeof item.price === 'string'
          ? parseFloat(item.price) || 0
          : item.price || 0;
        return sum + priceNum * (item.quantity || 0);
      }, 0),
    [cartItems]
  );

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [calculateTotalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cartItems.length) {
      setMessage({ type: "error", text: "Your cart is empty." });
      return;
    }

    try {
      const stripe = await loadStripe(
        process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
      );

      const response = await fetch(
        `${apiURL}/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ products: cartItems }),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to create session");
      }

      const sessionData = await response.json();

      const result = await stripe.redirectToCheckout({ sessionId: sessionData.id });

      if (result.error) {
        setMessage({ type: "error", text: result.error.message });
      } else {
        emptyCart();
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.message });
    }
  };
    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Place Your Order
        </h1>

        {message && (
          <div
            className={`p-4 mb-4 text-center rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <ul className="space-y-4 mb-4">
          {cartItems.map((item, i) => {
              const priceNum = typeof item.price === 'string'
                ? parseFloat(item.price) || 0
                : item.price || 0;
              return (
                <li
                  key={i}
                  className="flex flex-col justify-between bg-gray-100 p-4 rounded-lg border-2"
                > 
                  <h1><strong>Items Details</strong></h1>
                  <div className="flex justify-between  ">
                    <span>{item.name}</span>
                    <span className="h-10 w-10"><img alt={item.name} src={item.image}/></span>
                  </div>
                  <span>Quantity: {item.quantity} </span>
                  <span>
                    SubTotal: {item.quantity} × ${priceNum.toFixed(2)}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mb-6 text-right font-bold">
            Total: ${totalPrice.toFixed(2)}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Place Order
          </button>
        </form>

        <Button
          type="default"
          onClick={() => navigate("/dashboard")}
          className="mt-4 w-full"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
