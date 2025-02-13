import React from 'react'
import  axios  from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function  () {
 
function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let productInfo = useQuery({
    queryKey: ["recentProduct"],
    queryFn: getProducts,
      staleTime:7000,
  //  gcTime:4000,
    // // retry:4,
    // // retryDelay:3000,
    // // refetchInterval:2000,
    // // refetchIntervalInBackground:true
    // refetchOnWindowFocus:true
  });

 return productInfo
}
