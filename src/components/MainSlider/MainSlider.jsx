import React from 'react'
import style from "./MainSlider.module.css"
import Slider from "react-slick";
import image1 from "../../assets/slider-image-1.jpeg"
import image2 from "../../assets/slider-image-2.jpeg"
import image3 from "../../assets/slider-image-3.jpeg"
import image4 from "../../assets/grocery-banner.png"
import image5 from "../../assets/grocery-banner-2.jpeg"


export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed :2000,

  };


  return <>

      <div className="row my-5">
        <div className="w-3/4 ">

      <Slider  {...settings}>
        <img src={image3} className='w-full h-[400px] boject-cover' alt="" />
        <img src={image4} className='w-full h-[400px] boject-cover' alt="" />
        <img src={image5} className='w-full h-[400px] boject-cover' alt="" />

      </Slider>
        </div>
        <div className="w-1/4">
        <img src={image1} className='w-full h-[200px]' alt="" />
        <img src={image2} className='w-full h-[200px]' alt=""  />
        </div>
      </div>
      </>
}
