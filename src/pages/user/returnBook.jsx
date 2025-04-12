import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function ReturnBook() {
  const { state } = useLocation();
  const selectedBorrow = state?.borrow;
  const [returnedIds, setReturnedIds] = useState(new Set());
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/returns`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const ids = new Set(res.data.map(r => r.borrowId));
        setReturnedIds(ids);
      })
      .catch(err => console.error(err));
  }, []);

  const handleReturn = (borrowId) => {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/returns`, { borrowId }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        toast.success("Book returned successfully!");
        setReturnedIds(new Set([...returnedIds, borrowId]));
      })
      .catch(err => {
        toast.error("Return failed");
        console.error(err);
      });
  };

  if (!selectedBorrow) {
    return <p className="text-center text-white py-4">No borrow record selected.</p>;
  }

  return (
    <div className="p-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 min-h-screen">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Return Book</h2>
      <div className="bg-white rounded p-4 shadow-md">
        <h3 className="font-semibold text-gray-800">Borrow ID: {selectedBorrow.borrowId}</h3>
        <p>Name: {selectedBorrow.name}</p>
        <p>Due Date: {new Date(selectedBorrow.dueDate).toLocaleDateString()}</p>
        <div className="flex flex-wrap gap-4 mt-2">
          {selectedBorrow.borrowedBooks.map((book, i) => (
            <div key={i} className="flex items-center gap-2">
              <img src={book.image} className="w-12 h-16 object-cover" alt={book.name} />
              <div>
                <p>{book.name}</p>
                <p className="text-xs text-gray-500">{book.id}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          className={`mt-4 px-4 py-2 rounded text-white ${
            returnedIds.has(selectedBorrow.borrowId)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={returnedIds.has(selectedBorrow.borrowId)}
          onClick={() => handleReturn(selectedBorrow.borrowId)}
        >
          {returnedIds.has(selectedBorrow.borrowId) ? "Returned" : "Return Book"}
        </button>
      </div>
    </div>
  );
}
