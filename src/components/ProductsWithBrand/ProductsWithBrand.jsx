import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";

export default function ProductsWithBrand() {
  let { brandName } = useParams(); // جلب اسم الماركة من الـ URL
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(true); 
  const [loadingProductId, setLoadingProductId] = useState(null); 
  let { addProductToCart } = useContext(CartContext);

  // دالة لجلب كل المنتجات وتصفيتها حسب الماركة
  async function allProducts() {
    try {
      const resp = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      let ProductsWithSameBrand = resp.data.data.filter(
        (product) => product.brand.name === brandName
      );
      setProducts(ProductsWithSameBrand);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true); 
    allProducts();
  }, [brandName]);

  const handleAddToCart = async (productId) => {
    setLoadingProductId(productId); 
    try {
      await addProductToCart(productId);
    } finally {
      setLoadingProductId(null); 
    }
  };

  return (
    <div className="row">
      {loading ? (
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
      ) : products.length > 0 ? (
        products.map((product) => (
          <div className="w-full lg:w-1/6" key={product.id}>
            <div className="product  p-4 ">
              <Link to={`/productdetails/${product.id}/${product.brand.name}`}>
                <img src={product.imageCover} alt="" className="w-full" />
                <h3 className="text-green-600">{product.brand.name}</h3>
                <h3 className="mb-3 font-medium">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="row justify-between px-3">
                  <span>{product.price} EGP</span>
                  <span>
                    <i className="fas fa-star text-yellow-400"></i>{" "}
                    {product.ratingsAverage}
                  </span>
                </div>
              </Link>
              <button
                onClick={() => handleAddToCart(product.id)}
                className="btn"
                disabled={loadingProductId === product.id} 
              >
                {loadingProductId === product.id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Add to cart"
                )}
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full p-11">
          <h1 className="font-bold text-center text-2xl text-red-700">
            No Products Found for This Brand
          </h1>
        </div>
      )}
    </div>
  );
}
