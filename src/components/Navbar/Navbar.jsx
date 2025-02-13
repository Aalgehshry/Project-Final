
"use client";
import React, { useState, useContext } from "react";
import logo from "../../assets/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navabar() {
  const [isOpen, setIsOpen] = useState(false);
  let { userLogin, setuserLogin } = useContext(UserContext);
  let { numberItem, wishcount } = useContext(CartContext);
  let navigate = useNavigate();

  function singout() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/Login");
  }

  return (
    <>
      <nav className="bg-slate-300 z-20 border-gray-200 fixed top-0 left-0 right-0">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          {/* Logo and Toggle Button */}
          <div className="flex items-center gap-5">
            <Link to="" className="flex items-center space-x-3">
              <img src={logo} width={"120px"} className="h-8" alt="Logo" />
            </Link>
            <button
              className="md:hidden block text-gray-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              <i className="fa-solid fa-bars fa-xl"></i>
            </button>
          </div>

          {/* Links and Right Side Icons */}
          <ul
            className={`flex-col md:flex-row md:flex gap-3 ${
              isOpen ? "flex" : "hidden"
            } md:gap-3 items-center md:static absolute top-full left-0 w-full md:w-auto bg-slate-300 md:bg-transparent p-4 md:p-0`}
          >
            {userLogin != null ? (
              <>
                <li>
                  <Link className="text-slate-600" to="">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-600" to="wishlist">
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-600" to="cart">
                    Cart
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-600" to="products">
                    Products
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-600" to="categoreis">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-600" to="brands">
                    Brands
                  </Link>
                </li>
              </>
            ) : null}

            {/* Right Side Icons - Inside Toggle */}
            {userLogin != null && (
              <li className="flex gap-4 items-center md:hidden">
                <Link to="/cart" className="relative">
                  <span className="absolute top-[-10px] right-[-10px] flex p-1 justify-center items-center rounded-md size-5 bg-emerald-600 text-white">
                    {numberItem}
                  </span>
                  <i className="fa-solid fa-cart-shopping fa-xl"></i>
                </Link>

                <Link to="/wishlist" className="relative">
                  <span className="absolute top-[-10px] right-[-10px] flex p-1 justify-center items-center rounded-md size-5 bg-emerald-600 text-white">
                    {wishcount}
                  </span>
                  <i className="fa-solid fa-heart text-red-600 fa-xl"></i>
                </Link>

                <span onClick={singout} className="text-sm cursor-pointer">
                  Signout
                </span>
              </li>
            )}

            {/* Login/Register - Inside Toggle */}
            {userLogin == null && (
              <li className="md:hidden flex gap-4">
                <Link to="login" className="text-sm">
                  Login
                </Link>
                <Link to="register" className="text-sm">
                  Register
                </Link>
              </li>
            )}
          </ul>

          {/* Right Side Icons - Hidden in Small Screens */}
          {userLogin != null && (
            <div className="hidden md:flex items-center text-gray-700 space-x-6">
              <Link to="/cart" className="relative">
                <span className="absolute top-[-10px] right-[-10px] flex p-1 justify-center items-center rounded-md size-5 bg-emerald-600 text-white">
                  {numberItem}
                </span>
                <i className="fa-solid fa-cart-shopping fa-xl"></i>
              </Link>

              <Link to="/wishlist" className="relative">
                <span className="absolute top-[-10px] right-[-10px] flex p-1 justify-center items-center rounded-md size-5 bg-emerald-600 text-white">
                  {wishcount}
                </span>
                <i className="fa-solid fa-heart text-red-600 fa-xl"></i>
              </Link>

              <span onClick={singout} className="text-sm cursor-pointer">
                Signout
              </span>
            </div>
          )}

          {/* Login/Register - Hidden in Small Screens */}
          {userLogin == null && (
            <div className="hidden md:flex items-center gap-4">
              <Link to="login" className="text-sm">
                Login
              </Link>
              <Link to="register" className="text-sm">
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

