
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    numberItem,
    setNumberItem,
    getLoggedUserCart,
    updateCartProductQuantity,
    deleteCartItem,
  } = useContext(CartContext);

  const [cartDetails, setCartDetails] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [currentId, setcurrentId] = useState(0);
  const [loadingStates, setLoadingStates] = useState({});

  async function getCartItem() {
    try {
      const response = await getLoggedUserCart();
      if (response.data.status === "success") {
        setCartDetails(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }

  async function updateProduct(id, count, action) {
    if (count <= 0) {
      deleteItem(id);
      return;
    }

    // ✅ تفعيل الـ spinner للزر المحدد (إما + أو -)
    setLoadingStates((prev) => ({
      ...prev,
      [`${id}-${action}`]: true,
    }));

    try {
      let response = await updateCartProductQuantity(id, count);

      if (response?.data?.status === "success") {
        setCartDetails((prevDetails) => ({
          ...prevDetails,
          products: prevDetails.products.map((product) =>
            product.product.id === id ? { ...product, count: count } : product
          ),
        }));

        toast.success("Product updated successfully");
      } else {
        toast.error("Product update failed");
      }
    } catch (error) {
      console.error("Update Product Error:", error);
      toast.error("An error occurred while updating the product");
    } finally {
      // ✅ إيقاف الـ spinner للزر المحدد بعد انتهاء العملية
      setLoadingStates((prev) => ({
        ...prev,
        [`${id}-${action}`]: false,
      }));
    }
  }

  async function deleteItem(productId) {
    setLoading(true);
    setcurrentId(productId);
    let response = await deleteCartItem(productId);
    if (response?.data?.status === "success") {
      setNumberItem(numberItem - 1);
      setCartDetails(response.data.data);
      toast.success("Product removed successfully");
    } else {
      toast.error("Failed to remove product");
    }
    setLoading(false);
  }

  useEffect(() => {
    getCartItem();
  }, []);

  return (
    <>
      {cartDetails?.products.length > 0 ? (
        <>
          <h2 className="text-center text-2xl text-emerald-600 font-bold capitalize my-4">
            Total Price: {cartDetails?.totalCartPrice} EGP
          </h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-400 uppercase bg-gray-800">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">Product</th>
                  <th scope="col" className="px-6 py-3">Qty</th>
                  <th scope="col" className="px-6 py-3">Price</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartDetails?.products?.map((product) => (
                  <tr
                    key={product.product.id}
                    className="border-b bg-gray-800 dark:border-gray-700"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={product.product.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">
                      {product.product.title.split(" ").slice(0, 2).join(" ")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateProduct(
                              product.product.id,
                              product.count - 1,
                              "decrement"
                            )
                          }
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                          type="button"
                          disabled={loadingStates[`${product.product.id}-decrement`]}
                        >
                          {loadingStates[`${product.product.id}-decrement`] ? (
                            <i className="fas fa-spinner fa-spin"></i>
                          ) : (
                            "-"
                          )}
                        </button>

                        <span>{product.count}</span>

                        <button
                          onClick={() =>
                            updateProduct(
                              product.product.id,
                              product.count + 1,
                              "increment"
                            )
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                          type="button"
                          disabled={loadingStates[`${product.product.id}-increment`]}
                        >
                          {loadingStates[`${product.product.id}-increment`] ? (
                            <i className="fas fa-spinner fa-spin"></i>
                          ) : (
                            "+"
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">
                      {product.price * product.count} EGP
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteItem(product.product.id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        {Loading && currentId === product.product.id ? (
                          <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                          "Remove"
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to={`/checkout`}>
              <button className="btn my-3">Checkout</button>
            </Link>
          </div>
        </>
      ) : (
        <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1"></div>
          <div className="sk-cube sk-cube2"></div>
          <div className="sk-cube sk-cube3"></div>
          <div className="sk-cube sk-cube4"></div>
          <div className="sk-cube sk-cube5"></div>
          <div className="sk-cube sk-cube6"></div>
          <div className="sk-cube sk-cube7"></div>
          <div className="sk-cube sk-cube8"></div>
          <div className="sk-cube sk-cube9"></div>
        </div>
      )}
    </>
  );
}
