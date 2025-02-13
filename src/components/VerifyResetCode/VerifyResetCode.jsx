/* import React, { useState } from 'react'
import style from './VerifyResetCode.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function VerifyResetCode() {

const navigate=useNavigate()
  async function resetCode(values){
    await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values)
    .then((resp)=>{console.log(resp);
navigate('/ResetPassword')
    })
    .catch(()=>{})
  }

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
   onSubmit: resetCode,
  });

    
  return<>
  <div className="flex flex-col justify-center items-center w-1/3 m-auto gap-y-3 mt-10">
    <div className="h-24 w-24 rounded-full bg-green-600 flex justify-center items-center">
      <i className="fa-solid fa-lock text-white text-5xl"></i>
    </div>
    <h2 className="font-semibold text-xl">Enter security code to reset password</h2>
    <form onSubmit={formik.handleSubmit} className="w-full">
      <div className="w-full mb-5 group">
        <input
          type="text"
          name="resetCode"
          id="resetCode"
          value={formik.values.resetCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border-2 border-green-500 focus:outline-none focus:ring-0 focus:border-green-400 peer rounded-lg"
          placeholder=" Enter code "
        />
      </div>
      {formik.errors.resetCode && formik.touched.resetCode && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          {formik.errors.resetCode}
        </div>
      )}
      <button
        type="submit"
        className=" text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-6"
      >
        submit
      </button>
    </form>
  </div>
</>
}
 */


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function VerifyResetCode() {
  const navigate = useNavigate();
  const [code, setCode] = useState(new Array(6).fill(""));

  let[loading,setLoading]=useState(false)
  async function resetCode() {
    setLoading(true)
    const resetCode = code.join("");
    await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, { resetCode })
      .then((resp) => {
        console.log(resp);
        navigate('/ResetPassword');
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      });
  }

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    setCode([...code.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus on the next input
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      e.preventDefault();
      setCode([...code.map((d, idx) => (idx === index ? "" : d))]);
      e.target.previousSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetCode();
  };

  return (
    <div className="flex flex-col justify-center items-center lg:w-1/3 m-auto gap-y-3 mt-10 py-16">
      <div className="h-24 w-24 rounded-full bg-green-600 flex justify-center items-center">
        <i className="fa-solid fa-lock text-white text-5xl"></i>
      </div>
      <h2 className="font-semibold text-xl">Enter security code to reset password</h2>
      <form onSubmit={handleSubmit} className="w-full flex justify-center gap-2 mb-5">
        {code.map((data, index) => {
          return (
            <input
              key={index}
              type="text"
              name="resetCode"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-xl text-gray-900 bg-transparent border-2 border-green-500 focus:outline-none focus:ring-0 focus:border-green-400 peer rounded-lg"
            />
          );
        })}
      </form>
      <button
        onClick={handleSubmit}
        className="btn focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-6"
      >
        {loading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Submit"
              )}       
      </button>
    </div>
  );
}