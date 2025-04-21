import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./cards.css";
import { Button,message} from "antd";
import { CartContext } from "../../context/cartContext.js";
const Cards = () => {

  const [cardsData, setCardsData] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Item add to the card successfully",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/product");
        if (Array.isArray(response.data.products)) {
          setCardsData(response.data.products);
        } else {
          console.error("Error: products data is not an array.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const imagePaths = [
    "/p1.jpg",
    "/p2.jpeg",
    "/p3.jpg",
    "/p4.jpeg",
    "/p5.jpeg",
    "/p6.jpeg",
    "/p7.jpeg",
    "/p8.jpg",
  ];

  return (
    <div id="cards">
      <div className="flex flex-wrap justify-center gap-4 mt-32 mb-32">
        {cardsData?.length > 0 ? (
          cardsData.map((card, index) => (
            <div
              key={card._id}
              className="flex flex-col bg-white rounded-lg shadow-md w-80 overflow-hidden"
            >
              <img
                alt={card.title}
                src={imagePaths[index % imagePaths.length]}
                className="ml-12 w-[70%] h-[50%] rounded-md"
              />
              <div className="p-4 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800">
                  {card.title}
                </h3>
                <p className="text-gray-600 my-2">{card.description}</p>
                <p className="text-gray-800 font-bold">${card.price}</p>
                <div className="flex justify-between">
                  <a
                    href={card.link}
                    className="mt-5 text-blue-500 hover:underline"
                  >
                    See more
                  </a>
                  {contextHolder}
                  <Button
                    type="primary"
                    className=" mt-3 font-medium text-white"
                    onClick={() => {
                      addToCart({
                        id: card._id,
                        name: card.title,
                        description: card.description,
                        price: card.price,
                        image: imagePaths[index % imagePaths.length],
                        color: "Silver",
                      });
                      success();
                    }}
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No products available</p>
        )}
      </div>
    </div>
  );
};

export default Cards;

