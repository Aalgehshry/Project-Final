import React, { useEffect } from "react";
import style from "./Categories.module.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";


export default function CategoriesSlider() {
  const [categories, setcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        // console.log(res.data.data);
        setcategories(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>

<div className="container mx-auto p-4">
      <h2 className="text-center text-3xl font-bold text-green-600 my-6">
        All Categories
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
        <div className="grid   grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link to={`/ProductsWithCategory/${category.name}`} >
            <div key={categories}
              className="bg-white product rounded-lg shadow-md p-6 flex flex-col items-center justify-center "
            >
              <img
                src={category.image}
                alt={category.image}
                className="object-contain mb-4" />
              <p className="text-lg font-semibold text-gray-700">{category.name}</p>
            </div>
            </Link>
          ))}
        </div>
      )}
    </div>
    
      
    </>
  );
}
