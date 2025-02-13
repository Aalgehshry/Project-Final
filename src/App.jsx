import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Notfound from "./components/Notfound/Notfound";
import CounterContextProvider from "./Context/CounterContext";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CreateContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Checkout from "./components/Checkout/Checkout";
import Allorders from "./components/Allorders/Allorders";
import Wishlist from "./components/wishlist/wishlist";
import ProductsWithCategory from "./components/ProductsWithCategory/ProductsWithCategory";
import ProductsWithBrand from './components/ProductsWithBrand/ProductsWithBrand';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from "./components/ResetPassword/ResetPassword";
import VerifyResetCode from "./components/VerifyResetCode/VerifyResetCode";

let query = new QueryClient();

let x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            {" "}
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "categoreis",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {path: "productdetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ), },
      {path: "productsWithCategory/:categoryName",
        element: (
          <ProtectedRoute>
            <ProductsWithCategory />
          </ProtectedRoute>
        ), },
      {path: "productsWithBrand/:brandName",
        element: (
          <ProtectedRoute>
            <ProductsWithBrand />
          </ProtectedRoute>
        ), },

      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgotPassword", element: <ForgotPassword/> },
      { path: "resetPassword", element: <ResetPassword/> },
      { path: "verifyResetCode", element: <VerifyResetCode/> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "checkout", element: <Checkout /> },
      { path: "allorders", element: <Allorders /> },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={query}>
        <CounterContextProvider>
          <UserContextProvider>
            
              <CreateContextProvider>
                <RouterProvider router={x}></RouterProvider>
                <Toaster />
              </CreateContextProvider>
              <ReactQueryDevtools />
          
          </UserContextProvider>
        </CounterContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
