import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BuySubscriptionPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const plans = {
    monthly: {
      name: 'Monthly Plan',
      price: '$10',
      description: 'Billed every month. Cancel anytime.',
    },
    yearly: {
      name: 'Yearly Plan',
      price: '$99',
      description: 'Save 17%. Billed once a year.',
    },
  };

  const handleSubscribe = () => {
    setShowPaymentModal(true);
  };

  const handleFakePayment = () => {
    setIsProcessing(true);

    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  const handleDone = () => {
    setShowPaymentModal(false);
    setPaymentSuccess(false);
    navigate('/student');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 relative">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Choose Your Subscription
        </h2>

        <div className="space-y-4">
          {Object.entries(plans).map(([key, plan]) => (
            <div
              key={key}
              className={`border rounded-lg p-4 cursor-pointer transition ${
                selectedPlan === key
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-300 hover:border-indigo-400'
              }`}
              onClick={() => setSelectedPlan(key)}
            >
              <h3 className="text-lg font-semibold text-gray-800">{plan.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{plan.description}</p>
              <p className="text-xl font-bold text-indigo-600">{plan.price}</p>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubscribe}
          className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Subscribe Now
        </button>

        <p className="mt-4 text-xs text-gray-500 text-center">
          Your subscription will renew automatically unless canceled.
        </p>

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
              {!paymentSuccess ? (
                <>
                  <h3 className="text-xl font-bold mb-4 text-indigo-600">Enter Payment Details</h3>

                  <input
                    type="text"
                    placeholder="Card Number (e.g. 4242 4242 4242 4242)"
                    className="w-full mb-3 border border-gray-300 px-4 py-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Expiry (MM/YY)"
                    className="w-full mb-3 border border-gray-300 px-4 py-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-full mb-4 border border-gray-300 px-4 py-2 rounded"
                  />

                  <button
                    onClick={handleFakePayment}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Pay Now'}
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-green-600 mb-2">Payment Successful!</h3>
                  <p className="mb-4 text-gray-600">
                    Your {plans[selectedPlan].name} has been activated.
                  </p>
                  <button
                    onClick={handleDone}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  >
                    Done
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuySubscriptionPage;
