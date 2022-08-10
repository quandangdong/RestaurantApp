import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { MdAdd, MdLogout, MdShoppingBasket } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { actionType } from "../context/reducer";
import { UseStateValue } from "../context/stateProvider";
import { app } from "../firebase.config";
import avatar from "../img/avatar.png";
import Logo from "../img/logo.png";

const navbarOption = ["Home", "Menu", "About Us", "Services"];
const userOption = ["New Item", "Log out"];
const firebaseAuth = getAuth(app);
const provider = new GoogleAuthProvider();

const Header = () => {
  const [{ user, cartShow, cartItems }, dispatch] = UseStateValue();
  const [isMenuShow, setIsMenuShow] = useState(false);
  let navigate = useNavigate();

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenuShow(!isMenuShow);
    }
  };

  const logout = () => {
    setIsMenuShow(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const handleNavbarMenuOptionClick = (option) => {
    setIsMenuShow(false);

    switch (option.toLowerCase()) {
      case "home":
        break;
      case "menu":
        break;
      case "about us":
        break;
      case "services":
        break;

      default:
        break;
    }
  };

  const _HandleUserOptionClick = (option) => {
    setIsMenuShow(false);
    switch (option.toLowerCase()) {
      case "new item":
        navigate("/createItem");
        break;
      case "log out":
        logout();
        break;

      default:
        break;
    }
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/* Desktop and tablet */}
      <div className="hidden md:flex w-full h-full justify-between items-center">
        <Link to={"/createItem"} className="flex items-center gap-2">
          <img className="w-10 object-cover" src={Logo} alt="logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>

        <div className="flex">
          {navbarOption && (
            <motion.ul
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              className="flex gap-8 items-center"
            >
              {navbarOption.map((option, idx) => (
                <li
                  key={idx}
                  className="text-base text-textColor
                 hover:text-headingColor duration-100
                  transition-all ease-in-out cursor-pointer"
                  onClick={() => handleNavbarMenuOptionClick(option)}
                >
                  {option}
                </li>
              ))}
            </motion.ul>
          )}

          <div
            className="relative flex items-center justify-center text-2xl ml-8 text-textColor cursor-pointer"
            onClick={showCart}
          >
            <MdShoppingBasket />

            {cartItems &&
              cartItems.filter((item) => {
                return item.qty > 0;
              }).length > 0 && (
                <div
                  className="absolute -top-3 -right-3 
             bg-red-600 flex justify-center items-center text-white rounded-full w-5 h-5"
                >
                  <p className="text-xs font-semibold">
                    {
                      cartItems.filter((item) => {
                        return item.qty > 0;
                      }).length
                    }
                  </p>
                </div>
              )}
          </div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : avatar}
              className="cursor-pointer
              w-10 min-w-[40px]
              h-10 min-h-[40px] 
              ml-8
              rounded-full"
              alt="userImage"
              onClick={login}
            />

            {isMenuShow && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="absolute rounded-lg -left-16 w-36 shadow-lg bg-primary top-12"
              >
                <ul>
                  {userOption.map((option, idx) => (
                    <li
                      className="px-4 py-2 flex items-center gap-1 cursor-pointer hover:bg-slate-200"
                      key={idx}
                      onClick={() => _HandleUserOptionClick(option)}
                    >
                      {option.toLowerCase() === "log out" ? "Log out" : option}
                      {option === "New Item" ? <MdAdd /> : <MdLogout />}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex justify-between items-center md:hidden w-full h-full p-4">
        <div className="relative flex items-center justify-center text-2xl ml-8 text-textColor cursor-pointer">
          <MdShoppingBasket />

          {cartItems && cartItems.length > 0 && (
            <div
              className="absolute -top-3 -right-3 
              bg-red-600 flex justify-center items-center text-white rounded-full w-5 h-5"
            >
              <p className="text-xs font-semibold">2</p>
            </div>
          )}
        </div>

        <Link to={"/createItem"} className="flex items-center gap-2">
          <img className="w-10 object-cover" src={Logo} alt="logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : avatar}
            className="cursor-pointer
              w-10 min-w-[40px]
              h-10 min-h-[40px] 
              ml-8
              rounded-full"
            alt="userImage"
            onClick={login}
          />

          {isMenuShow && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="absolute rounded-lg -left-16 w-36 shadow-lg bg-primary top-12"
            >
              <ul>
                <li
                  className="px-4 py-2 flex items-center gap-1 cursor-pointer hover:bg-slate-200"
                  onClick={() => setIsMenuShow(!isMenuShow)}
                >
                  {userOption[0]}
                  <MdAdd />
                </li>

                {/* option of navbar in mobile UI */}
                {navbarOption.map((option, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2 flex
                    items-center gap-1 cursor-pointer hover:bg-slate-200"
                    onClick={() => handleNavbarMenuOptionClick(option)}
                  >
                    {option}
                  </li>
                ))}

                <li
                  className="px-4 py-2 flex
                  items-center gap-1 cursor-pointer hover:bg-slate-200"
                  onClick={logout}
                >
                  {userOption[1]}
                  <MdLogout />
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
