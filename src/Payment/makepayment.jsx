import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Makepayment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardData, setCardData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const participants = state?.participants || [];
  const eventId = state?.eventId || '';

  const userId = state?.userId || localStorage.getItem('userId') || ''; 

  const [pricePerParticipant, setPricePerParticipant] = useState(500);
  const [loadingPrice, setLoadingPrice] = useState(true);

  useEffect(() => {
    if (!eventId) {
      setLoadingPrice(false);
      return;
    }

    const fetchEventPrice = async () => {
      try {
        const res = await fetch(`http://localhost:3001/Event/${eventId}`);
        if (!res.ok) throw new Error('Failed to fetch event');
        const data = await res.json();
        // Handle price correctly even if it's string or number
        const price = Number(data.price ?? data.cost ?? 500);
        setPricePerParticipant(Number.isFinite(price) && price >= 0 ? price : 500);
      } catch (err) {
        console.error('Failed to load event price:', err);
        setPricePerParticipant(500);
      } finally {
        setLoadingPrice(false);
      }
    };

    fetchEventPrice();
  }, [eventId]);

  // Validation Check - redirects if data is missing
  if (!participants || participants.length === 0 || !eventId || !userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-red-100 text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600">Missing booking information. Please try booking the event again.</p>
          <button 
            onClick={() => navigate('/home')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const subtotal = participants.length * pricePerParticipant;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (method) => {
    setIsProcessing(true);
    setPaymentMethod(method);

    // If method is free, amount is 0. If paid, amount is total.
    const amountToPay = method === 'free' ? 0 : total;

    try {
      const bookingData = {
        userId,
        eventId,
        participants,
        paymentMethod: method,
        amount: amountToPay,
        cardData: method === 'card' ? cardData : null
      };

      console.log("Sending booking data:", bookingData); 

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });

      const result = await response.json();

      if (response.ok) {
        navigate('/payment-success', {
          replace: true,
          state: {
            bookingId: result.bookingId,
            amount: amountToPay,
            participantsCount: participants.length
          }
        });
      } else {
        alert(`Booking/Payment failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Booking/Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFinalPayment = (method) => {
    if (method === 'card') {
      if (!cardData.cardholderName || !cardData.cardNumber || !cardData.expiryDate || !cardData.cvv) {
        alert('Please fill all card details');
        return;
      }
    }
    handlePayment(method);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-6xl grid md:grid-cols-12 overflow-hidden border border-gray-100">

        {/* Booking Summary */}
        <div className="md:col-span-5 bg-gray-50/80 p-8 border-r border-gray-100 flex flex-col h-full">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="bg-blue-600 w-2 h-6 rounded-full inline-block"></span>
            Booking Summary
          </h2>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar mb-6">
            <div className="space-y-4">
              {participants.map((p, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      Participant #{index + 1}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm">
                    <p className="text-gray-500">Name</p>
                    <p className="font-medium text-gray-800 text-right">{p.firstname} {p.middlename} {p.lastname}</p>
                    <p className="text-gray-500">Email</p>
                    <p className="font-medium text-gray-800 truncate text-right">{p.email}</p>
                    <p className="text-gray-500">Age</p>
                    <p className="font-medium text-gray-800 truncate text-right">{p.age}</p>
                    <p className="text-gray-500">Gender</p>
                    <p className="font-medium text-gray-800 truncate text-right">{p.gender}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-auto">
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Price per person</span>
                <span>₹{pricePerParticipant}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal ({participants.length} × ₹{pricePerParticipant})</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax & Fees (10%)</span>
                <span>₹{tax}</span>
              </div>
            </div>
            <div className="border-t border-dashed border-gray-300 my-4"></div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-800 text-lg">Total Amount</span>
              <span className="font-bold text-2xl text-blue-600">₹{total}</span>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        {pricePerParticipant > 0 ? (
          <div className="md:col-span-7 p-8 lg:p-10 bg-white">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Payment Method</h2>
              <p className="text-gray-500 text-sm">Select how you'd like to pay for your booking.</p>
            </div>

            <div className="space-y-4 mb-8">
              <button 
                className="group w-full flex items-center justify-between p-4 border rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 active:scale-[0.99]"
                onClick={() => handleFinalPayment('paytm')}
                disabled={isProcessing || loadingPrice}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">P</div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">Paytm UPI</p>
                    <p className="text-xs text-gray-500">Fast & Secure</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isProcessing && paymentMethod === 'paytm' ? 'border-blue-500' : 'border-gray-300'}`}>
                  {isProcessing && paymentMethod === 'paytm' && <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></div>}
                </div>
              </button>

              <button 
                className="group w-full flex items-center justify-between p-4 border rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 active:scale-[0.99]"
                onClick={() => handleFinalPayment('gpay')}
                disabled={isProcessing || loadingPrice}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 font-bold">G</div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">Google Pay</p>
                    <p className="text-xs text-gray-500">Instant transfer</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isProcessing && paymentMethod === 'gpay' ? 'border-black' : 'border-gray-300'}`}>
                  {isProcessing && paymentMethod === 'gpay' && <div className="w-2.5 h-2.5 rounded-full bg-black animate-pulse"></div>}
                </div>
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or pay with card</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {/* Card Form Inputs */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Cardholder Name</label>
                <input 
                  type="text" 
                  name="cardholderName"
                  placeholder="e.g. John Doe" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                  value={cardData.cardholderName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Card Number</label>
                <input 
                  type="text" 
                  name="cardNumber"
                  placeholder="0000 0000 0000 0000" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                  value={cardData.cardNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Expiry</label>
                  <input 
                    type="text" 
                    name="expiryDate"
                    placeholder="MM/YY" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                    value={cardData.expiryDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">CVV</label>
                  <input 
                    type="password" 
                    name="cvv"
                    placeholder="123" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                    value={cardData.cvv}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <button
                onClick={() => handleFinalPayment('card')}
                disabled={isProcessing || loadingPrice}
                className="mt-8 w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing && paymentMethod === 'card' ? 'Processing...' : `Pay Securely ₹${total}`}
              </button>
            </div>
          </div>
        ) : (
          <div className="md:col-span-7 p-8 lg:p-10 bg-white flex items-center justify-center">
            <button
              onClick={() => handleFinalPayment('free')}
              disabled={isProcessing}
              className="w-80 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isProcessing && paymentMethod === 'free' && <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse mr-2"></div>}
              Register for Free
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Makepayment;