
import React from 'react';
import Lottie from 'lottie-react';
import successAnimation from '../Data/success confetti.json';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <div className="w-64 h-64">
        <Lottie animationData={successAnimation}  autoplay={true} />
      </div>
      <h2 className="text-2xl font-bold text-green-600 mt-6">Payment Successful!</h2>
      <p className="text-gray-600 mt-2">Thank you for registering. We’ll see you at the event!</p>
      <Link
        to="/"
        className="mt-6 inline-block bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700 transition"
      >
        Explore More Events
      </Link>
    </div>
  );
};

export default PaymentSuccess;
