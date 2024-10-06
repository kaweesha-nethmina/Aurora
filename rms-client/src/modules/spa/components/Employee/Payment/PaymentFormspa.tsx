import React, { useState } from 'react';

interface PaymentDetails {
  id: number;
  serviceCategory: string;
  paymentMethod: string;
  amount: number;
}

const PaymentFormspa = () => {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    id: 0,
    serviceCategory: '',
    paymentMethod: '',
    amount: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(paymentDetails);
    // Logic to handle the form submission
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-lg font-bold mb-4">Payment Form</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="serviceCategory">
          Service Category
        </label>
        <input
          id="serviceCategory"
          name="serviceCategory"
          value={paymentDetails.serviceCategory}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="paymentMethod">
          Payment Method
        </label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={paymentDetails.paymentMethod}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select Payment Method</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="Online">Online</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="amount">
          Amount
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          value={paymentDetails.amount}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
};

export default PaymentFormspa;
