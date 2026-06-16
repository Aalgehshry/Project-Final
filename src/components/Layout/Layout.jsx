import Navbar from "./../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto w-[80%] py-20 flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
