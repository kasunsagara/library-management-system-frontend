import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserReturn() {
  const [borrows, setBorrows] = useState([]);
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [borrowRes, returnRes] = await Promise.all([
          axios.get(import.meta.env.VITE_BACKEND_URL + "/api/borrows", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(import.meta.env.VITE_BACKEND_URL + "/api/returns", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setBorrows(borrowRes.data);
        setReturns(returnRes.data);
      } catch (error) {
        console.error("Error fetching borrow/return data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const getReturnDetails = (borrowId) => {
    return returns.find((r) => r.borrowId === borrowId);
  };

  const handlePayFine = (returnId) => {
    navigate(`/fine/${returnId}`);
  };  

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-8 border-blue-800"></div>
      </div>
    );
  }

  if (borrows.length === 0) {
    return (
      <p className="text-center py-4 text-gray-100 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
        No borrow records found.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto px-4 py-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 min-h-screen">
      <h1 className="text-2xl text-white font-bold mb-4 text-center">My Return Records</h1>
      <table className="min-w-full text-sm bg-white border border-gray-400">
        <thead>
          <tr className="bg-gray-200 text-gray-800">
            <th className="border border-gray-400 px-6 py-4 text-left">Return ID</th>
            <th className="border border-gray-400 px-6 py-4 text-left">Borrow ID</th>
            <th className="border border-gray-400 px-6 py-4 text-left">Borrow Date</th>
            <th className="border border-gray-400 px-6 py-4 text-left">Due Date</th>
            <th className="border border-gray-400 px-6 py-4 text-left">Return Date</th>
            <th className="border border-gray-400 px-6 py-4 text-left">Fine</th>
            <th className="border border-gray-400 px-6 py-4 text-left">Status</th>
            <th className="border border-gray-400 px-6 py-4 text-left">Books</th>
            <th className="border border-gray-400 px-6 py-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {borrows.map((borrow) => {
            const returnInfo = getReturnDetails(borrow.borrowId);
            const isReturned = !!returnInfo;

            return (
              <tr key={borrow.borrowId} className="hover:bg-gray-100">
                <td className="border border-gray-400 px-6 py-4">
                  {isReturned ? returnInfo.returnId : "-"}
                </td>
                <td className="border border-gray-400 px-6 py-4">{borrow.borrowId}</td>
                <td className="border border-gray-400 px-6 py-4">
                  {new Date(borrow.borrowDate).toLocaleDateString()}
                </td>
                <td className="border border-gray-400 px-6 py-4">
                  {new Date(borrow.dueDate).toLocaleDateString()}
                </td>
                <td className="border border-gray-400 px-6 py-4">
                  {isReturned ? new Date(returnInfo.returnDate).toLocaleDateString() : "-"}
                </td>
                <td className="border border-gray-400 px-6 py-4">
                  {isReturned ? (returnInfo.fine > 0 ? `Rs. ${returnInfo.fine}` : "No Fine") : "-"}
                </td>
                <td className="border border-gray-400 px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      isReturned ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                    }`}
                  >
                    {isReturned ? "Returned" : "Not Returned"}
                  </span>
                </td>
                <td className="border border-gray-400 px-6 py-4">
                  <ul className="space-y-2">
                    {borrow.borrowedBooks.map((book, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <img
                          src={book.image}
                          alt={book.name}
                          className="w-8 h-12 object-cover rounded shadow"
                        />
                        <div className="flex flex-col">
                          <span>{book.name}</span>
                          <span>{book.id}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border border-gray-400 px-6 py-4 text-center">
                  {!isReturned ? (
                    <button
                      disabled
                      className="text-white px-2.5 py-0.5 rounded bg-yellow-400 transition duration-200 cursor-not-allowed"
                    >
                      Pending 
                    </button>
                  ) : returnInfo.fine > 0 ? (
                    <button
                      onClick={() => handlePayFine(returnInfo.returnId)}
                      className="text-white px-2.5 py-0.5 rounded bg-red-500 hover:bg-red-700 transition duration-200"
                    >
                      Pay Fine
                    </button>
                  ) : (
                    <button
                      disabled
                      className="text-white px-2.5 py-0.5 rounded bg-gray-400 transition duration-200 cursor-not-allowed"
                    >
                      All Clear
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
