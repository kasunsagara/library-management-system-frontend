import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBook, FaUsers } from "react-icons/fa";

export default function AdminDashboard() {
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/books", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTotalBooks(res.data.length))
      .catch(() => toast.error("Failed to fetch books. Please try again."));

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTotalUsers(res.data.length))
      .catch(() => toast.error("Failed to fetch users. Please try again."));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 gap-6">
          {/* Books Card */}
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-6 rounded-2xl shadow-md flex items-center hover:scale-[1.02] transition-transform max-w-2xl">
            <div className="text-white text-5xl bg-white/10 p-4 rounded-full">
              <FaBook />
            </div>
            <div className="ml-6">
              <h2 className="text-xl font-semibold">Total Books</h2>
              <p className="text-3xl font-bold mt-2">{totalBooks}</p>
            </div>
          </div>

          {/* Users Card */}
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-6 rounded-2xl shadow-md flex items-center hover:scale-[1.02] transition-transform max-w-2xl">
            <div className="text-white text-5xl bg-white/10 p-4 rounded-full">
              <FaUsers />
            </div>
            <div className="ml-6">
              <h2 className="text-xl font-semibold">Total Users</h2>
              <p className="text-3xl font-bold mt-2">{totalUsers}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
