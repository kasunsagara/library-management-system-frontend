import { useEffect, useState } from "react";
import axios from "axios";

export default function UserBorrow() {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get token from localStorage (or wherever you store JWT)
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/borrows", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBorrows(response.data);
      } catch (error) {
        console.error("Error fetching borrow data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrows();
  }, [token]);

  if (loading) {
    return <p className="text-center py-4 text-gray-600">Loading borrow records...</p>;
  }

  if (borrows.length === 0) {
    return <p className="text-center py-4 text-gray-500">No borrow records found.</p>;
  }

  return (
    <div className="overflow-x-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 text-center">My Borrow Records</h1>
      <table className="min-w-full text-sm border border-gray-300 bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="border px-4 py-2 text-left">Borrow ID</th>
            <th className="border px-4 py-2 text-left">Borrow Date</th>
            <th className="border px-4 py-2 text-left">Due Date</th>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Address</th>
            <th className="border px-4 py-2 text-left">Phone</th>
            <th className="border px-4 py-2 text-left">Book</th>
          </tr>
        </thead>
        <tbody>
          {borrows.map((borrow) => (
            <tr key={borrow.borrowId} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{borrow.borrowId}</td>
              <td className="border px-4 py-2">
                {new Date(borrow.borrowDate).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">
                {new Date(borrow.dueDate).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">{borrow.name}</td>
              <td className="border px-4 py-2">{borrow.address}</td>
              <td className="border px-4 py-2">{borrow.phone}</td>
              <td className="border px-4 py-2">
                <ul className="space-y-2">
                  {borrow.borrowedBooks.map((book, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <img
                        src={book.image}
                        alt={book.name}
                        className="w-8 h-12 object-cover rounded shadow-sm"
                      />
                      <span>{book.name}</span>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

;
