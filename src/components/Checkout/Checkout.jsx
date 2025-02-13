import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { CartContext } from "../../Context/CartContext";

export default function Checkout() {

 let {Checkout,cartId} = useContext(CartContext)

 let formik = useFormik({
   initialValues: {
     details: "",
     phone: "",
     city: "",
   },
   onSubmit:()=> handleCheckout(cartId,`http://localhost:5173`),
 });



 async function handleCheckout(cardId,url) {
  
 let {data} =   await Checkout(cardId,url,formik.values)
 console.log(data.session.url);
 window.location.href=data.session.url
 
  }
  


  return (
    <>
      <h2 className=" font-bold text-2xl text-center my-4 text-emerald-700">
        Checkout Now
      </h2>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="details"
            name="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none
              focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300
             transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
            peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600
              peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
              peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your details
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none
              focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300
             transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
            peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600
              peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
              peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your phone
          </label>
          {formik.errors.phone && formik.touched.phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg "
              role="alert"
            >
              <span className="font-medium">{formik.errors.password}</span>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none
              focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300
             transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
            peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600
              peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
              peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your city
          </label>
        </div>

        <div className="flex gap-4 items-center">
          
          <button
            type="submit"
            className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          > Checkout</button>
        </div>
      </form>
    </>
  );
}
