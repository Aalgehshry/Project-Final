
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  function fetchBrands() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .then((response) => {
        setBrands(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-3xl font-bold text-green-600 my-6">
        All Brands
      </h2>

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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <Link
              key={brand._id}
               to={`/ProductsWithBrand/${brand.name}`}
            >
              <div className="bg-white product rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
                <img
                  src={brand.image || "https://via.placeholder.com/150"}
                  alt={brand.name || "Brand"}
                  className="w-32 h-32 object-contain mb-4"
                />
                <p className="text-lg font-semibold text-gray-700">
                  {brand.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
