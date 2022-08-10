import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";

import { motion } from "framer-motion";
import { actionType } from "../context/reducer";
import { UseStateValue } from "../context/stateProvider";
import CartItem from "./CartItem";

import EmptyCart from "../img/emptyCart.svg";
const CartContainer = () => {
  const [{ cartShow, cartItems }, dispatch] = UseStateValue();
  const [flag, setFlag] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  useEffect(() => {
    const itemTotal = cartItems?.reduce((total, item) => {
      return total + item.qty * item.price;
    }, 0);
    setSubTotal(itemTotal);

    const finalTotal = itemTotal + 2.5;
    setFinalTotal(finalTotal);
  }, [flag, finalTotal, cartItems]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>

        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100
           rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
          onClick={clearCart}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {/* bottom section */}
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-screen bg-cartBg rounded-t-[2rem] flex flex-col justify-between">
          {/* cart Items section */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none ">
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  flag={flag}
                  setFlag={setFlag}
                />
              ))}
          </div>

          {/* Cart total section */}
          <div
            className="w-full bg-cartTotal rounded-t-[2rem] flex flex-col
           items-center justify-center gap-8 px-8 py-8"
          >
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-lg">Sub Total</p>
              <p className="text-gray-200 text-lg font-semibold">{`$ ${parseFloat(
                subTotal
              ).toFixed(2)}`}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-lg">Delivery</p>
              <p className="text-gray-200 text-lg">$2.5</p>
            </div>

            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">{`$ ${parseFloat(
                finalTotal
              ).toFixed(2)}`}</p>
            </div>

            <motion.button
              whileTap={{ scale: 0.8 }}
              type="button"
              className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg
              my-2 hover:shadow-lg transition-all duration-150 ease-out "
            >
              Check out
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
