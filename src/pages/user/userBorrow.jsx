import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserBorrow() {
  const [borrows, setBorrows] = useState([]);
  const [returnedIds, setReturnedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBorrowsAndReturns = async () => {
      try {
        const [borrowRes, returnRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/borrows`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/returns`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setBorrows(borrowRes.data);

        const ids = new Set(returnRes.data.map((r) => r.borrowId));
        setReturnedIds(ids);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowsAndReturns();
  }, [token]);

  const handleReturnBook = (borrow) => {
    if (returnedIds.has(borrow.borrowId)) return; // Block navigation
    navigate("/returnBook", { state: { borrow } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
        <div className="w-full h-full flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-8 border-blue-800"></div>
        </div>
      </div>
    );
  }

  if (borrows.length === 0) {
    return <p className="text-center py-4 text-gray-100">No borrow records found.</p>;
  }

  return (
    <div className="overflow-x-auto px-4 py-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <h1 className="text-2xl text-white font-bold mb-4 text-center">My Borrow Records</h1>
      <table className="min-w-full text-sm bg-white border border-gray-400">
        <thead>
          <tr className="bg-gray-200 text-gray-800">
            <th className="border border-gray-400 px-6 py-4 text-left">Borrow ID</th>
            <th className="border border-gray-400 px-6 py-4 text-left">Borrow Date</th>
            <th className="border border-gray-400 px-6 py-4 text-left">Due Date</th>
            <th className="border border-gray-400 px-6 py-4 text-left">Name</th>
            <th className="border border-gray-400 px-6 py-4 text-left">Address</th>
            <th className="border border-gray-400 px-6 py-4 text-left">Phone</th>
            <th className="border border-gray-400 px-6 py-4 text-left">Book</th>
            <th className="border border-gray-400 px-6 py-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {borrows.map((borrow) => {
            const isReturned = returnedIds.has(borrow.borrowId);
            return (
              <tr key={borrow.borrowId} className="hover:bg-gray-100">
                <td className="border border-gray-400 px-6 py-4">{borrow.borrowId}</td>
                <td className="border border-gray-400 px-6 py-4">
                  {new Date(borrow.borrowDate).toLocaleDateString()}
                </td>
                <td className="border border-gray-400 px-6 py-4">
                  {new Date(borrow.dueDate).toLocaleDateString()}
                </td>
                <td className="border border-gray-400 px-6 py-4">{borrow.name}</td>
                <td className="border border-gray-400 px-6 py-4">{borrow.address}</td>
                <td className="border border-gray-400 px-6 py-4">{borrow.phone}</td>
                <td className="border border-gray-400 px-6 py-4">
                  <ul className="space-y-2">
                    {borrow.borrowedBooks.map((book, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <img
                          src={book.image}
                          alt={book.name}
                          className="w-8 h-12 object-cover rounded shadow-sm"
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
                  <button
                    onClick={() => handleReturnBook(borrow)}
                    disabled={isReturned}
                    className={`text-white px-2.5 py-0.5 rounded transition duration-200 ${
                      isReturned
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-700"
                    }`}
                  >
                    {isReturned ? "Returned" : "Return"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
