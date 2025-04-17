import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PayFine() {
  const { returnId } = useParams();
  const [returnData, setReturnData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFineDetails = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/returns/${returnId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setReturnData(res.data);
      } catch (err) {
        console.error("Error fetching fine:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFineDetails();
  }, [returnId, token]);

  if (loading) {
    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-8 border-blue-800"></div>
        </div>
      ); 
  }

  if (!returnData) {
    return <p className="text-center py-6 text-red-500">Return record not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 py-10 flex items-center justify-center">
    <div className="max-w-xl mx-auto p-8 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Pay Fine</h2>
      <p className="mb-4 text-lg">
        <strong>Return ID:</strong> {returnData.returnId}
      </p>
      <p className="mb-4 text-lg">
        <strong>Fine Amount:</strong>{" "}
        {returnData.fine > 0 ? `Rs. ${returnData.fine}` : "No Fine"}
      </p>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Payment Instructions:</h3>
        <ul className="list-disc pl-6 mt-2 text-gray-700">
          <li>Pay using a valid credit or debit card</li>
          <li>Ensure sufficient balance</li>
          <li>Double check details</li>
          <li>Transaction fee may apply</li>
        </ul>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Credit Card Number</label>
          <input
            type="text"
            className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent px-3 py-2 rounded-md"
            placeholder="1234 5678 9012 3456"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Expiry Date</label>
            <input
              type="text"
              className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent px-3 py-2 rounded-md"
              placeholder="MM/YY"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">CVV</label>
            <input
              type="password"
              className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent px-3 py-2 rounded-md"
              placeholder="123"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white font-medium px-6 py-2 w-full rounded hover:bg-green-700"
        >
          Pay Now
        </button>
      </div>
    </div>
    </div>
  );
}
