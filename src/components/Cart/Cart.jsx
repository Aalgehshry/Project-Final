import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  const {
    numberItem,
    setNumberItem,
    getLoggedUserCart,
    updateCartProductQuantity,
    deleteCartItem,
  } = useContext(CartContext);

  const [cartDetails, setCartDetails] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loadingStates, setLoadingStates] = useState({});

  useEffect(() => {
    async function getCartItem() {
      try {
        const response = await getLoggedUserCart();
        if (response?.data?.status === "success") {
          setCartDetails(response.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setPageLoading(false);
      }
    }

    getCartItem();
  }, [getLoggedUserCart]);

  async function updateProduct(id, count, action) {
    if (count <= 0) {
      return deleteItem(id);
    }

    setLoadingStates((prev) => ({
      ...prev,
      [id + action]: true,
    }));

    try {
      const response = await updateCartProductQuantity(id, count);
      if (response?.data?.status === "success") {
        setCartDetails(response.data.data);
        toast.success("Updated successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [id + action]: false,
      }));
    }
  }

  async function deleteItem(productId) {
    setActionLoading(true);
    setCurrentId(productId);

    try {
      const response = await deleteCartItem(productId);
      if (response?.data?.status === "success") {
        setCartDetails(response.data.data);
        setNumberItem(numberItem - 1);
        toast.success("Removed successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    } finally {
      setActionLoading(false);
      setCurrentId(null);
    }
  }

  if (pageLoading) {
    return (
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
    );
  }

  if (!cartDetails?.products?.length) {
    return (
      <h2 className="text-4xl font-semibold text-emerald-600 text-center">
        Cart is empty
      </h2>
    );
  }

  return (
    <div className="container py-5 my-5 p-5 bg-slate-300 rounded">
      <h2 className="text-center text-2xl text-emerald-600 font-bold my-4">
        Total Price: {cartDetails?.totalCartPrice} EGP
      </h2>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs uppercase bg-gray-800 text-gray-300">
            <tr>
              <th className="px-16 py-3">Image</th>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Qty</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {cartDetails.products.map((item) => (
              <tr key={item.product.id} className="bg-gray-800 border-b">
                <td className="p-4">
                  <img
                    src={item.product.imageCover}
                    className="w-16"
                    alt=""
                  />
                </td>

                <td className="px-6 py-4 text-white">
                  {item.product.title.split(" ").slice(0, 2).join(" ")}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        updateProduct(item.product.id, item.count - 1, "dec")
                      }
                      disabled={loadingStates[item.product.id + "dec"]}
                    >
                      -
                    </button>

                    <span className="mx-2">{item.count}</span>

                    <button
                      onClick={() =>
                        updateProduct(item.product.id, item.count + 1, "inc")
                      }
                      disabled={loadingStates[item.product.id + "inc"]}
                    >
                      +
                    </button>
                  </div>
                </td>

                <td className="px-6 py-4 text-white">
                  {item.price * item.count} EGP
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteItem(item.product.id)}
                    className="text-red-500"
                  >
                    {actionLoading && currentId === item.product.id
                      ? "Loading..."
                      : "Remove"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link to="/checkout">
          <button className="btn my-4">Checkout</button>
        </Link>
      </div>
    </div>
  );
}
