import React from "react";
import style from "./Layout.module.css";

import Footer from "./../Footer/Footer";
import { Outlet } from "react-router-dom";
import Navabar from "./../Navbar/Navbar";
export default function Layout() {
  return (
    <>
      <Navabar />
      <div className=" container mx-auto w-[80%] py-20 ">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
