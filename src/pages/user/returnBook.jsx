import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function ReturnBook() {
  const { state } = useLocation();
  const selectedBorrow = state?.borrow;
  const [returnedIds, setReturnedIds] = useState(new Set());
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/returns`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const ids = new Set(res.data.map((r) => r.borrowId));
        setReturnedIds(ids);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleReturn = (borrowId) => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/returns`,
        { borrowId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        toast.success("Book returned successfully!");
        setReturnedIds(new Set([...returnedIds, borrowId]));
        navigate("/user/returns");
      })
      .catch((err) => {
        toast.error("Return failed");
        console.error(err);
      });
  };

  if (!selectedBorrow || returnedIds.has(selectedBorrow.borrowId)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
        <p className="text-center text-white text-xl font-semibold">
          {returnedIds.has(selectedBorrow?.borrowId)
            ? "This borrow record has already been returned."
            : "No borrow record selected."}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Return Book</h2>

        <div className="space-y-2">
          <p className="text-[17px] font-semibold text-gray-800">
            Borrow ID:{" "}
            <span className="font-medium text-gray-600">
              {selectedBorrow.borrowId}
            </span>
          </p>
          <p className="text-[17px] font-semibold text-gray-800">
            Borrower:{" "}
            <span className="font-medium text-gray-600">
              {selectedBorrow.name}
            </span>
          </p>
          <p className="text-[17px] font-semibold text-gray-800">
            Due Date:{" "}
            <span className="font-medium text-gray-600">
              {new Date(selectedBorrow.dueDate).toLocaleDateString()}
            </span>
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Borrowed Book
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedBorrow.borrowedBooks.map((book, i) => (
              <div
                key={i}
                className="flex items-center p-3 border border-gray-300 rounded-md bg-white shadow-sm"
              >
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-14 h-20 object-cover rounded border mr-4"
                />
                <div>
                  <p className="text-gray-800 text-sm">Book Name: {book.name}</p>
                  <p className="text-gray-800 text-sm">Book ID: {book.id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            className="mt-4 px-6 py-2 rounded-lg font-semibold bg-green-600 hover:bg-green-700 text-white transition duration-200"
            onClick={() => handleReturn(selectedBorrow.borrowId)}
          >
            Return Book
          </button>
        </div>
      </div>
    </div>
  );
}
