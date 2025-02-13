import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CreateContextProvider(props) {
  const [wishcount, setWishCount] = useState(0);
  const [cartId, setCartId] = useState(null);
  const [numberItem, setNumberItem] = useState(0);

  function getHeaders() {
    return { token: localStorage.getItem("userToken") };
  }

  // ✅ إضافة منتج إلى السلة
  async function addProductToCart(productId) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers: getHeaders() }
      );
      if (response.data.status === "success") {
        setNumberItem(response.data.numOfCartItems);
      }
      return response;
    } catch (err) {
      console.error("Error adding product to cart:", err);
    }
  }

  // ✅ جلب بيانات السلة للمستخدم المسجل
   function getLoggedUserCart() {
    return  axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
        { headers: getHeaders() })
      .then((response)=>{

        if (response.data.status === "success") {
          setNumberItem(response.data.numOfCartItems);
          setCartId(response.data.data._id);
        }
        // console.log(response.data.data._id);
        
        return response;
      })
    .catch (()=>{
      console.error("Error fetching cart:", err);
    })
  }


  async function updateCartProductQuantity(productId, count) {
    try {
      let response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers: getHeaders() }
      );
      return response;
    } catch (error) {
      console.error("Error updating product quantity:", error);
    }
  }
  
  async function deleteCartItem(productId) {
    try {
      let response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers: getHeaders() }
      );
      return response;
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  }

  // async function Checkout(cartId, url, formData) {
  //   return axios
  //     .post(
  //      ` https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,

  //      { headers: getHeaders()},
  //       {
  //         shippingAddress: formData,
  //       }
  //     )
  //     .then((res) => res)
  //     .catch((err) => err);
  // }

  // ✅ تفريغ السلة بالكامل
  
  async function Checkout(cardId, url, formData) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=${url}`,
        { shippingAddress: formData }, // البيانات المُرسلة
        { headers: getHeaders() }      // الهيدرز
      )
      .then((res) => res)
      .catch((err) => {
        console.error(err);
        return err;
      });
  }

  async function clearCart() {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { headers: getHeaders() }
      );
      if (response.data.status === "success") {
        setNumberItem(0);
        setCartId(null);
      }
      return response;
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  }

  // ✅ جلب قائمة الأمنيات (Wishlist)
  async function getWishlist() {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { headers: getHeaders() }
      );
      setWishCount(response.data.count || 0);
      return response;
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  }

  // ✅ إضافة منتج إلى قائمة الأمنيات
  async function addToWishlist(productId) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers: getHeaders() }
      );
      await getWishlist();
      return response;
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  }

  // ✅ إزالة منتج من قائمة الأمنيات
  async function removeFromWishlist(productId) {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: getHeaders() }
      );
      await getWishlist();
      return response;
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getLoggedUserCart();
      getWishlist();
    }
  }, []);

  return (
    <CartContext.Provider
    value={{
      Checkout,
      addProductToCart,
      getLoggedUserCart,
      addToWishlist,
      removeFromWishlist,
      getWishlist,
      updateCartProductQuantity,  // ✅ تم إصلاح الاسم وتمرير الدالة
      deleteCartItem,             // ✅ تم إصلاح الاسم وتمرير الدالة
      setWishCount,
      clearCart,
      
      wishcount,
      numberItem,
      cartId,
      setNumberItem,
    }}
  >
    {props.children}
  </CartContext.Provider>
  
  );
}
