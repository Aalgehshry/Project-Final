
import React, { useContext, useState } from "react";
import style from "./ResetPassword.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";

export default function ResetPassword() {
  let { userLogin, setUserLogin } = useContext(UserContext);
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function resetPassword(values) {
    setLoading(true);
    await axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
      .then((resp) => {
        console.log(resp);

        // التأكد من نجاح تغيير كلمة المرور
        if (resp.status === 200) {
          toast.success("Password changed successfully", { duration: 2000 });

          // الانتقال إلى صفحة تسجيل الدخول بعد 2 ثانية
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to change password. Please try again.", {
          duration: 2000,
        });
        setLoading(false);
      });
  }

  let validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    newPassword: yup
      .string()
      .required("Password is required")
      .matches(
        /^[A-Za-z0-9]{6,10}$/,
        "Password should be between 6 and 10 characters long and contain only letters and numbers"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: localStorage.getItem("userEmail"),
      newPassword: "",
    },
    validationSchema,
    onSubmit: resetPassword,
  });

  return (
    <>
      <div className="flex flex-col justify-center items-center lg:w-1/3 m-auto gap-y-3 mt-10 mb-6">
        <div className="h-24 w-24 rounded-full bg-green-600 flex justify-center items-center">
          <i className="fa-solid fa-lock text-white text-5xl"></i>
        </div>
        <h2 className="font-semibold text-xl">Enter your new password</h2>
        <form onSubmit={formik.handleSubmit} className="w-full">
          <div className="w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border-2 border-green-500 focus:outline-none focus:ring-0 focus:border-green-400 peer rounded-lg"
              placeholder=" Enter Your Email "
            />
          </div>
          {formik.errors.email && formik.touched.email && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              {formik.errors.email}
            </div>
          )}

          <div className="w-full mb-5 group">
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border-2 border-green-500 focus:outline-none focus:ring-0 focus:border-green-400 peer rounded-lg"
              placeholder=" Enter Your new password  "
            />
          </div>
          {formik.errors.newPassword && formik.touched.newPassword && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              {formik.errors.newPassword}
            </div>
          )}

          <button
            type="submit"
            className="btn focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-6"
          >
            {loading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Change Password"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
