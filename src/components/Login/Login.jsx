import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from './../../Context/UserContext';


export default function Login() {
  let {userLogin, setuserLogin} = useContext(UserContext)
  let navigate = useNavigate();
  const [ApliError, setApliError] = useState("");
  const [IsLoading, setIsLoading] = useState(false);

  function handleLogin(value) {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, value)
      .then(function (res) {
        setIsLoading(false);
        if (res.data.message == "success") {
          localStorage.setItem("userToken", res.data.token);
          setuserLogin(res.data.token)
          navigate("/");
        }
      })
      .catch(function (res) {
        setIsLoading(false);
        // console.log(res.response.data.message);
        setApliError(res.response.data.message);
      });
  }

  let myValidation = yup.object().shape({
    email: yup.string().email("not valid email").required("email is required"),
    password: yup
      .string()
      .required("password is required")
      .min(6, "password min length is 6"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: myValidation,
    onSubmit: handleLogin,
  });

  return (
    <>
      {ApliError ? (
        <div className="w-1/2 mx-auto bg-red-600 p-3 text-white font-bold rounded-lg">
          {ApliError}
        </div>
      ) : null}

   <div className=" min-h-80 mt-11 container">

      <h2 className=" font-bold text-2xl text-center my-4 text-emerald-700">
        Login Now
      </h2>
      <form onSubmit={formik.handleSubmit} className="">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none
              focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300
             transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
            peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600
              peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
              peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Email
          </label>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg "
              role="alert"
            >
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none
              focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300
             transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
            peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600
              peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
              peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your password
          </label>
          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg "
              role="alert"
            >
              <span className="font-medium">{formik.errors.password}</span>
            </div>
          ) : null}
        </div>

        <div className="flex gap-4 items-center">
          <button
            type="submit"
            className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {IsLoading ? <i className="fas fa-spinner fa-spin "></i> : "Login"}
          </button>
          <Link to={"/register"}>
            <span className="text-blue-600 underline">
              don't you have an account? Register Now
            </span>
          </Link>

          <Link to={"/forgotPassword"}>
            <span className="text-blue-600 underline  ms-[600px]">
            forget your password ?
            </span>
          </Link>
        </div>
      </form>
   </div>


       
    </>
  );
}
