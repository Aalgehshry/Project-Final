import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

export default function Wishlist() {
  let { getWishlist, removeFromWishlist, addProductToCart,
    setNumberItem,
    numberItem, } = useContext(CartContext);
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null); 
   const [loadings, setLoadings] = useState(false);
    const [currentId, setCurrentId] = useState(0);

  async function getWishlistItems() {
    setLoading(true);
    try {
      let { data } = await getWishlist();
      setWishlist(data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
    setLoading(false);
  }

  async function addToCart(id) {
    setCurrentId(id);
    setLoadings(true);
    let response = await addProductToCart(id);
    if (response.data.status === "success") {
      setNumberItem(numberItem + 1);
      setLoadings(false);
      toast.success(response.data.message);
    } else {
      setLoadings(false);
      toast.error(response.data.message);
    }
  }
  

  async function removeItem(id) {
    setRemovingId(id); 
    try {
      await removeFromWishlist(id);
      getWishlistItems(); 
    } catch (error) {
      console.error("Error removing item:", error);
    }
    setRemovingId(null); 
  }


  
  useEffect(() => {
    getWishlistItems();
  }, []);

  return (
    <div className="container py-5 my-5 p-5 bg-slate-300 rounded">
  <h2 className="text-4xl font-semibold text-emerald-600 text-center">
    My wish List
  </h2>

  {loading ? (
    <div >
       
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
   
    </div>
  ) : wishlist && wishlist.data.length > 0 ? (
    wishlist.data.map((product, index) => (
      <div key={index} className="flex justify-between mb-4">
        <div className="row-auto border-b my-3 flex items-center p-2">
          <div className="md:w-1/6 px-2">
            <img
              alt={product.imageCover}
              className="w-full rounded-md"
              src={product.imageCover}
            />
          </div>
          <div className="md:w-5/6 px-2 flex justify-between">
            <div>
              <h5>{product.title.split(" ").slice(0, 2).join(" ")}</h5>
              <h6 className="text-emerald-400">{product.price} EGP</h6>
              <button
                onClick={() => removeItem(product._id)}
                className="text-red-500 text-sm m-0 p-0"
                disabled={removingId === product._id} // تعطيل الزر أثناء التحميل
              >
                {removingId === product._id ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  <>🗑 Remove</>
                )}
              </button>
            </div>
            <div>
            <button onClick={() => addToCart(product.id)} className="btn w-6 mt-4">
                {loadings && currentId === product.id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Add To Cart"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <h2 className="text-center text-xl text-gray-700 mt-5">
      Your Wishlist is Empty
    </h2>
  )}
</div>

  );
}
