// PaymentSuccess.js (updated)
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const PaymentSuccess = () => {
  const { state } = useLocation();
  const bookingId = state?.bookingId;
  const amount = state?.amount;
  const participantsCount = state?.participantsCount;



  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">Thank you for your booking.</p>

          {bookingId && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-600">Booking ID: <span className="font-medium">{bookingId}</span></p>
              <p className="text-sm text-gray-600">Amount Paid: <span className="font-medium">₹{amount}</span></p>
              <p className="text-sm text-gray-600">Participants: <span className="font-medium">{participantsCount}</span></p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Link
              to="/home"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Back to Home
            </Link>

            <a href={`http://localhost:3001/api/tickets/download/${bookingId}`}>
              Download Ticket
            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;