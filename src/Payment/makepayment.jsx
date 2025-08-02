import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Makepayment = () => {

  const { state: participants } = useLocation();
  const navigate = useNavigate();

  const handleFinalPayment = () => {
    navigate('/payment-success',{ replace: true });
  };

  if (!participants || participants.length === 0) {
    return <div className="p-10 text-center text-xl text-red-600">No participants provided.</div>;
  }

  const subtotal = participants.length * 500;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-6xl grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Participant Summary</h2>
          <div className="space-y-4 text-gray-700 max-h-[500px] overflow-y-auto pr-2">
            {participants.map((p, index) => (
              <div key={index} className="border-b pb-3">
                <p><strong>First Name:</strong> {p.firstName}</p>
                <p><strong>Middle Name:</strong> {p.middleName}</p>
                <p><strong>Last Name:</strong> {p.lastName}</p>
                <p><strong>Age:</strong> {p.age}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between mb-2 text-sm">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between mb-2 text-sm">
              <span>Tax</span>
              <span>₹{tax}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Choose Payment Method</h2>

          <button className="w-full bg-blue-600 text-white font-medium py-3 rounded-md mb-4 hover:bg-blue-700 transition" onClick={handleFinalPayment} >
            Pay with Paytm UPI
          </button>

          <button className="w-full bg-black text-white font-medium py-3 rounded-md mb-4 hover:bg-gray-800 transition" onClick={handleFinalPayment} >
            Pay with Google Pay
          </button>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Card Payment</h3>
            <input type="text" placeholder="Cardholder Name" className="mb-3 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <input type="text" placeholder="Card Number" className="mb-3 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <div className="flex gap-4 mb-3">
              <input type="text" placeholder="MM/YY" className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <input type="password" placeholder="CVV" className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <button
              onClick={handleFinalPayment}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-md shadow flex items-center justify-center gap-2"
            >
              Pay ₹{total}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Makepayment;
