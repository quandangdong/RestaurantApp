import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BiMinus, BiPlus } from "react-icons/bi";
import { UseStateValue } from "../context/stateProvider";
import { actionType } from "../context/reducer";

const CartItem = ({ keyMap, item, flag, setFlag }) => {
  const [{ cartItems }, dispatch] = UseStateValue();
  const [qty, setQty] = useState(item.qty);
  let items = [];

  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
  };

  const updateQty = (action, id) => {
    if (action.toLowerCase() === "add") {
      // cartItems.map((item) => {
      items.map((item) => {
        if (item.id === id) {
          setQty(qty + 1);
          item.qty += 1;
          setFlag(flag + 1);
        }
      });
      cartDispatch();
    } else {
      if (qty === 1) {
        setQty(qty - 1);
        // cartItems = cartItems.filter((item) => {
        cartItems.map((item) => {
          if (item.id === id) {
            item.qty = 0;
          }
        });

        items = cartItems.filter((item) => {
          return item.qty > 0;
        });
        setFlag(flag + 1);
        cartDispatch();
      } else {
        setQty(qty - 1);
        items.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
          }
        });
        setFlag(flag + 1);
        cartDispatch();
      }
    }
  };

  useEffect(() => {
    items = cartItems;
  }, [items, flag]);


  return (
    <div>
      {qty > 0 ? (
        <div
          key={keyMap}
          className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2"
        >
          <img
            src={item.imageURL}
            className="w-20 h-20 max-w-[60px] rounded-full object-contain"
            alt=""
          />

          {/* name section */}
          <div className="flex flex-col gap-2">
            <p className="text-base text-gray-50">{item.title}</p>
            <p className="text-sm block text-gray-300 font-semibold">
              ${item.price}
            </p>
          </div>

          {/* Button section */}
          <div className="group flex items-center gap-2 ml-auto cursor-pointer">
            <motion.div
              onClick={() => updateQty("minus", item.id)}
              whileTap={{ scale: 0.75 }}
            >
              <BiMinus className="text-gray-50" />
            </motion.div>

            <p className="w-5 h-5 rounded-sm bf-cartBg text-white flex items-center justify-center">
              {qty}
            </p>

            <motion.div
              onClick={() => updateQty("add", item.id)}
              whileTap={{ scale: 0.75 }}
            >
              <BiPlus className="text-gray-50" />
            </motion.div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CartItem;
