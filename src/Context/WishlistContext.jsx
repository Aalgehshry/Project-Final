import axios from "axios";
import { useEffect, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { WishlistContext } from "./WishlistContext";

export default function WishlistContextProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  const api = useMemo(() =>
    axios.create({
      baseURL: "https://ecommerce.routemisr.com/api/v1",
    }), []
  );

  useEffect(() => {
    const interceptor = api.interceptors.request.use((config) => {
      config.headers.token = localStorage.getItem("userToken");
      return config;
    });
    return () => api.interceptors.request.eject(interceptor);
  }, [api]);

  const getWishlist = useCallback(async () => {
    try {
      const res = await api.get("/wishlist");
      setWishlistItems(res.data.data);
      setWishlistCount(res.data.count);
      return res;
    } catch (error) {
      console.log(error);
    }
  }, [api]);

  const addProductToWishlist = async (productId) => {
    try {
      const res = await api.post("/wishlist", { productId });
      await getWishlist();
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const removeProductFromWishlist = async (productId) => {
    try {
      const res = await api.delete(`/wishlist/${productId}`);
      setWishlistItems(res.data.data);
      setWishlistCount(res.data.count);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getWishlist();
    }
  }, [getWishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        getWishlist,
        addProductToWishlist,
        removeProductFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

WishlistContextProvider.propTypes = {
  children: PropTypes.node,
};
