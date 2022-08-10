import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UseStateValue } from "../context/stateProvider";
import CartContainer from "./CartContainer";
import HomeContainer from "./HomeContainer";
import MenuContainer from "./MenuContainer";
import RowContainer from "./RowContainer";

const MainContainer = () => {

  const [{ foodItems, cartShow }, dispatch] = UseStateValue();
  const [scrollValue, setScrollValue] = useState(200);

  useEffect(() => {}, [scrollValue, cartShow]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />

      {/* Hotest dishes */}
      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p
            className="text-2xl text-headingColor capitalize font-semibold relative before:absolute 
          before:content before:w-32 before:h-1 before:rounded-lg 
          before:bg-gradient-to-tr from-orange-400 to-orange-600
          before:-bottom-4 before:left-0
          transition_all ease-in-out duration-100"
          >
            Our Fresh & Healthy Fruits
          </p>

          <div className="hidden md:flex gap-3 items-center right-0">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all
          duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(scrollValue-200)}
            >
              <MdChevronLeft className="text-lg text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all
          duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(scrollValue+200)}
            >
              <MdChevronRight className="text-lg text-white" />
            </motion.div>
          </div>
        </div>

        <RowContainer
          flag={true}
          scrollValue={scrollValue}
          data={foodItems?.filter((food) => food.category === "softdrinks")}
        /> 
      </section>

      <MenuContainer />
      
      {cartShow && (
        <CartContainer />
      )}
    </div>
  );
};

export default MainContainer;
