import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { actionType } from "../context/reducer";
import { UseStateValue } from "../context/stateProvider";
import NotFound from "../img/NotFound.svg";

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();
  const [{ cartItems }, dispatch] = UseStateValue();

  const [items, setItems] = useState(cartItems);

  const handleAddToCartData = (food) => {
    const existedItem = cartItems.find((item) => {
      return item.id === food.id;
    });
    if (existedItem) {
      items.map((item) => {
        if (item.id === food.id) {
          item.qty += 1;
        }
      });
      setItems(items);
    } else {
      setItems([...items, food]);
    }
  };

  const addToCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  useEffect(() => {
    addToCart();
    // eslint-disable-next-line
  }, [items]);

  return (
    <div
      className={`w-full flex items-center gap-3 my-12 scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      } `}
      ref={rowContainer}
    >
      {data && data.length > 0 ? (
        data.map((food) => (
          <div
            key={food.id}
            className="w-300 min-w-[300px] md:w-340 md:min-w-[340px] h-auto bg-cardOverlay rounded-lg p-2 my-12 
      backdrop-blur-lg hover:drop-shadow-lg flex flex-col justify-between"
          >
            <div className="w-full flex items-center justify-between">
              <motion.img
                whileHover={{ scale: 1.2 }}
                src={food?.imageURL}
                alt=""
                className="w-40 h-40 object-contain -mt-8 drop-shadow-2xl"
              />
              <motion.div
                onClick={() => handleAddToCartData(food)}
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full mr-2 bg-red-600 flex items-center 
            justify-center cursor-pointer hover:shadow-md"
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>
            <div className="w-full flex flex-col items-end justify-end">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {food?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {" "}
                {`${food.calories ? food.calories : 0} Calories`}{" "}
              </p>

              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$</span> {food?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} alt="asda" className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
