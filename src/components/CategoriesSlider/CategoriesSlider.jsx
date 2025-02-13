import React, { useEffect } from "react";
import style from "./CategoriesSlider.module.css";
import axios from "axios";
import { useState } from "react";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [CategoriesSlider, setCategoriesSlider] = useState([]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay:true,
    autoplaySpeed :1000,

  };

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        // console.log(res.data.data);
        setCategoriesSlider(res.data.data);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
    <h2 className="text-gray-600 font-semibold my-4 capitalize">shop populr caregories</h2>
      <Slider  {...settings}>
        { CategoriesSlider.map((category)=> <div key={CategoriesSlider}>
          <img src={category.image} className="w-full h-[200px] object-cover" alt="" />
         <h4>{category.name}</h4>
        </div> )}
      </Slider>
    </>
  );
}
