import React, { useEffect } from 'react'
import RecentProducts from '../RecentProducts/RecentProducts'

export default function Products() {

  useEffect(() => {
    document.title = "Products";
  }, []);


  return (

    <RecentProducts/>
   
  )
}
