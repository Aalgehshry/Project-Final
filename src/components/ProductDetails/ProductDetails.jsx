// import React, { useEffect, useState } from "react";
// import style from "./ProductDetails.module.css";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import Slider from "react-slick";
// import RecentProducts from "../RecentProducts/RecentProducts";


// export default function ProductDetails() {
//   const [product, setproduct] = useState(null);
//   const [relatedProduct, setrelatedProduce] = useState([])
//   let { id, category } = useParams();
//   var settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay:true,
//     autoplaySpeed :3000,

//   };

//   function getProducts(id) {
//     axios
//       .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
//       .then((res) => {
//         setproduct(res.data.data);
//         // console.log(res.data.data);
//       })
//       .catch((res) => {
//         console.log(res);
//       });
//   }

//   function getAllProducts() {
//     axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((res) => {
     
//       // console.log(res.data.data);
//       let related = res.data.data.filter(
//         (product) => product.category.name == category );
//       // console.log(related);
//       setrelatedProduce(related)
//     });
//   }
//    const {
//      addProductToCart,
//      setNumberItem,
//      numberItem,
//      addToWishlist,
//      removeFromWishlist,
//    } = useContext(CartContext);

//   const [currentId, setCurrentId] = useState(0);
//   const [wishlist, setWishlist] = useState([]);
//   const [wishlistLoading, setWishlistLoading] = useState(false);
//   const [wishlistId, setWishlistId] = useState(null);
  
//   const { data, isError, isLoading, error } = setproduct();

//   useEffect(() => {
//     const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//     setWishlist(storedWishlist);
//   }, []);

//   async function handleToggleWishlist(productId) {
//     setWishlistId(productId); 
//     setWishlistLoading(true); 

//     try {
//       if (wishlist.includes(productId)) {
//         await removeFromWishlist(productId);
//         const updatedWishlist = wishlist.filter((id) => id !== productId);
//         setWishlist(updatedWishlist);
//         localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//         toast.success("💔 Removed from Wishlist!");
//       } else {
//         await addToWishlist(productId);
//         const updatedWishlist = [...wishlist, productId];
//         setWishlist(updatedWishlist);
//         localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//         toast.success("❤️ Added to Wishlist!");
//       }
//     } catch (error) {
//       console.error("Error toggling wishlist:", error);
//     } finally {
//       setWishlistLoading(false); // إيقاف الـ spinner
//       setWishlistId(null); // إعادة ضبط الـ ID
//     }
//   }

//   async function addToCart(id) {
//     setCurrentId(id);
//     setLoading(true);
//     let response = await addProductToCart(id);
//     if (response.data.status === "success") {
//       setNumberItem(numberItem + 1);
//       setLoading(false);
//       toast.success(response.data.message);
//     } else {
//       setLoading(false);
//       toast.error(response.data.message);
//     }
//   }
    
//   useEffect(() => {
//     getProducts(id);
//     getAllProducts();
//   }, [id, category]);

//   return (
//     <>
//       <div className="row items-center">
//         <div className="w-1/4">
//         <Slider {...settings}>
//             {product?.images.map((src, index) => (
//               <img key={index} src={src} className="w-full" alt="Product" />
//             ))}
//           </Slider>
//         </div>
//         <div className="w-3/4 p4 ">
//           <h3 className="font-semibold capitalize text-2xl">
//             {product?.title}
//           </h3>
//           <h4 className="text-gray-700 my-4">{product?.description}</h4>
//           <h4>{product?.category.name}</h4>
//           <div className=" flex justify-between p-3 my-5">
//             <span>{product?.price} EGP</span>
//             <span>
              
//               <i className="fas fa-star text-yellow-400 "></i>{" "}
//               {product?.ratingsAverage}
//             </span>
//             <span
//                 onClick={() => handleToggleWishlist(product.id)}
//                 style={{
//                   cursor: "pointer",
//                   color: wishlist.includes(product.id) ? "red" : "black",
//                 }}
//               >
//                 {wishlistLoading && wishlistId === product.id ? (
//                   <i className="fas fa-spinner fa-spin"></i>
//                 ) : (
//                   <i className="fa-solid fa-heart fa-xl"></i>
//                 )}
//               </span> <span><i className="fa-solid fa-heart fa-xl"></i></span>

//           </div>
          
//           <button onClick={() => addToCart(product.id)} className="btn w-6 mt-4">
//                 {loading && currentId === product.id ? (
//                   <i className="fas fa-spinner fa-spin"></i>
//                 ) : (
//                   "Add To Cart"
//                 )}
//               </button>
//         </div>
//       </div>

        
//     </>
//   );
// }

import React, { useEffect, useState, useContext } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import RecentProducts from "../RecentProducts/RecentProducts";

export default function ProductDetails() {
  const [product, setproduct] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlistId, setWishlistId] = useState(null);

  let { id, category } = useParams();
  const {
    addProductToCart,
    setNumberItem,
    numberItem,
    addToWishlist,
    removeFromWishlist,
  } = useContext(CartContext);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  function getProducts(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setproduct(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getAllProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((res) => {
      let related = res.data.data.filter(
        (product) => product.category.name === category
      );
      setRelatedProduct(related);
    });
  }

  useEffect(() => {
    getProducts(id);
    getAllProducts();
  }, [id, category]);

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
      } else {
        await addToWishlist(productId);
        const updatedWishlist = [...wishlist, productId];
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    } finally {
      setWishlistLoading(false);
      setWishlistId(null);
    }
  }

  async function addToCart(id) {
    setCurrentId(id);
    setLoading(true);
    let response = await addProductToCart(id);
    if (response.data.status === "success") {
      setNumberItem(numberItem + 1);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }

  if (!product) return   <div className="sk-cube-grid">
  <div className="sk-cube sk-cube1"></div>
  <div className="sk-cube sk-cube2"></div>
  <div className="sk-cube sk-cube3"></div>
  <div className="sk-cube sk-cube4"></div>
  <div className="sk-cube sk-cube5"></div>
  <div className="sk-cube sk-cube6"></div>
  <div className="sk-cube sk-cube7"></div>
  <div className="sk-cube sk-cube8"></div>
  <div className="sk-cube sk-cube9"></div>
</div>;

  return (
    <>
    <div className="row items-center">
      <div className="w-1/4">
        <Slider {...settings}>
          {product?.images.map((src, index) => (
            <img key={index} src={src} className="w-full" alt="Product" />
          ))}
        </Slider>
      </div>
      <div className="w-3/4 p4 ">
        <h3 className="font-semibold capitalize text-2xl">{product?.title}</h3>
        <h4 className="text-gray-700 my-4">{product?.description}</h4>
        <h4>{product?.category.name}</h4>
        <div className=" flex justify-between p-3 my-5">
          <span>{product?.price} EGP</span>
          <span>
            <i className="fas fa-star text-yellow-400 "></i>{" "}
            {product?.ratingsAverage}
          </span>
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

        <button
          onClick={() => addToCart(product.id)}
          className="btn w-6 mt-4"
        >
          {loading && currentId === product.id ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            "Add To Cart"
          )}
        </button>
      </div>
    </div>

    <div className="row ">
      <RecentProducts/>
      </div> 
    </>
  );
}

