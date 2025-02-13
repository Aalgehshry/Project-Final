
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useProduct from "../../Hooks/useProduct";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function RecentProducts() {
  const {
    addProductToCart,
    setNumberItem,
    numberItem,
    addToWishlist,
    removeFromWishlist,
  } = useContext(CartContext);

  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlistId, setWishlistId] = useState(null);
  
  const { data, isError, isLoading, error } = useProduct();

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  async function handleToggleWishlist(productId) {
    setWishlistId(productId); 
    setWishlistLoading(true); 

    try {
      if (wishlist.includes(productId)) {
        await removeFromWishlist(productId);
        const updatedWishlist = wishlist.filter((id) => id !== productId);
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        toast.success("💔 Removed from Wishlist!");
      } else {
        await addToWishlist(productId);
        const updatedWishlist = [...wishlist, productId];
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        toast.success("❤️ Added to Wishlist!");
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    } finally {
      setWishlistLoading(false); // إيقاف الـ spinner
      setWishlistId(null); // إعادة ضبط الـ ID
    }
  }

  async function addToCart(id) {
    setCurrentId(id);
    setLoading(true);
    let response = await addProductToCart(id);
    if (response.data.status === "success") {
      setNumberItem(numberItem + 1);
      setLoading(false);
      toast.success(response.data.message);
    } else {
      setLoading(false);
      toast.error(response.data.message);
    }
  }

  if (isError) {
    return <h2>{error}</h2>;
  }

  if (isLoading) {
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

  return (
    <div className="row">
      {data?.data?.data.map((product) => (
        <div key={product.id} className="w-1/4 md:w-1/2 lg:w-1/4 p-4 sm:w-full">
          <div className="product p-2 my-2">
            <Link to={`/productdetails/${product.id}/${product.category.name}`}>
              <img src={product.imageCover} className="w-full" alt={product.title} />
              <h3 className="text-emerald-500">{product.category.name}</h3>
              <h3 className="mb-1 font-semibold">
                {product.title.split(" ").slice(0, 2).join(" ")}
              </h3>
              <div className="flex justify-between p-3">
                <span>{product.price} EGP</span>
                <span>
                  <i className="fas fa-star text-yellow-400"></i> {product.ratingsAverage}
                </span>
              </div>
            </Link>
            <div className="flex justify-center items-center">
              
              <button onClick={() => addToCart(product.id)} className="btn w-6 mt-4">
                {loading && currentId === product.id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Add To Cart"
                )}
              </button>

              <span
                onClick={() => handleToggleWishlist(product.id)}
                style={{
                  cursor: "pointer",
                  color: wishlist.includes(product.id) ? "red" : "black",
                }}
              >
                {wishlistLoading && wishlistId === product.id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <i className="fa-solid fa-heart fa-xl"></i>
                )}
              </span>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

