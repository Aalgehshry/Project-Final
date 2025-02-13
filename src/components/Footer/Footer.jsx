import React from 'react'

import Payment from '../../assets/images1.png'
import googleplay from '../../assets/images2.png'
// import googleplay from '../../assets/google-play-icon.png'

export default function Footer() {
  return (
    <>
  <footer className="bg-gray-200  bottom-0 right-0 left-0 p-5">
      <div className="container mx-auto">
        <h4 className="font-bold text-lg">Get The Fresh Cart App</h4>
        <p className="text-gray-600">
          We will send you a link, open it on your phone to download the app
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-green-500 border-opacity-50 pb-3">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Enter Your Email Here"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
          <div>
            <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
              Send App Link
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mt-4">
          <div className="flex items-center">
            <p className="text-gray-700 mr-4">Payment Partner</p>
            <img src={Payment} alt="Payment Partner" className="w-72 mix-blend-multiply" />
          </div>

          <div className="flex justify-end items-center">
            <p className="text-gray-700 mr-2">Get Deliveries With Fresh Cart</p>
            <img src={googleplay} alt="Google Play Store" className="w-20" />
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}
