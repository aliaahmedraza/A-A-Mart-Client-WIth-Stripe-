import React, { useContext } from "react";
import { CartContext } from "../../context/cartContext.js";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Empty, message } from "antd";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Item remove from the cart",
    });
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <Empty description="Your cart is empty" imageStyle={{ height: 120 }}>
          <Button type="primary" onClick={() => navigate("/dashboard")}>
            Continue Shopping
          </Button>
        </Empty>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center gap-4 p-4 border rounded-lg mb-4"
            >
              <div className="ml-12 w-[70%] h-[50%] rounded-md">
                <img
                  src={item.image}
                  alt={item.name}
                  className="md:w-1/4 rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600 mt-2">{item.description}</p>
                <p className="mt-2">
                  <strong>Color:</strong> {item.color}
                </p>
                <p className="text-green-600 mt-1">In Stock</p>

                <div className="flex items-center gap-3 mt-4">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value) || 1)
                    }
                    className="border px-2 py-1 rounded w-16"
                  />
                  {contextHolder}
                  <button
                    onClick={() => {
                      removeFromCart(item.id);
                      success();
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <DeleteOutlined />
                  </button>
                </div>
                <p className="mt-4 font-semibold">
                  Price: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <h3 className="text-xl font-bold">
              Subtotal ({cartItems.length} item{cartItems.length > 1 ? "s" : ""}
              ): ${subtotal.toFixed(2)}
            </h3>
          </div>
          <div className="flex justify-between">
            <Button
              type="primary"
              className="text-2xl font-bold mb-5 h-12"
              onClick={() => navigate("/dashboard")}
            >
              Home
            </Button>
            <Button
              type="primary"
              className="text-2xl font-bold mb-5 h-12"
              onClick={() => navigate("/order")}
            >
              Place Order
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
