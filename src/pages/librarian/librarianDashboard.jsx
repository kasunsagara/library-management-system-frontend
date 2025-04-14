import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBook, FaUsers, FaHandHolding, FaUndo } from "react-icons/fa";

export default function LibrarianDashboard() {
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [borrowedBooks, setBorrowedBooks] = useState(0);
  const [returnedBooks, setReturnedBooks] = useState(0);

  const [loadingBooks, setLoadingBooks] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingBorrowed, setLoadingBorrowed] = useState(true);
  const [loadingReturned, setLoadingReturned] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Fetch all books
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/books", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTotalBooks(res.data.length);
        setLoadingBooks(false);
      })
      .catch(() => {
        toast.error("Failed to fetch books. Please try again.");
        setLoadingBooks(false);
      });

    // Fetch all users
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTotalUsers(res.data.length);
        setLoadingUsers(false);
      })
      .catch(() => {
        toast.error("Failed to fetch users. Please try again.");
        setLoadingUsers(false);
      });

    // Fetch all borrowed books
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/borrows", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setBorrowedBooks(res.data.length);
        setLoadingBorrowed(false);
      })
      .catch(() => {
        toast.error("Failed to fetch borrowed books. Please try again.");
        setLoadingBorrowed(false);
      });

    // Fetch all returned books
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/returns", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setReturnedBooks(res.data.length);
        setLoadingReturned(false);
      })
      .catch(() => {
        toast.error("Failed to fetch returned books. Please try again.");
        setLoadingReturned(false);
      });
  }, []);

  if (loadingBooks || loadingUsers || loadingBorrowed || loadingReturned) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
        <div className="w-full h-full flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-8 border-blue-800"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-8">
      <h1 className="text-2xl text-white font-bold mb-4 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 justify-items-center">
        {/* Total Books Card */}
        <div className="w-full bg-white rounded-lg shadow-md text-blue-600 p-6 flex items-center max-w-2xl hover:scale-[1.02] transition-transform duration-300">
          <div className="text-blue-600 text-5xl bg-blue-300 p-4 rounded-full">
            <FaBook />
          </div>
          <div className="ml-6">
            <h2 className="text-2xl font-bold">Total Books</h2>
            <p className="text-4xl font-bold mt-2">{totalBooks}</p>
          </div>
        </div>

        {/* Total Users Card */}
        <div className="w-full bg-white rounded-lg shadow-md text-blue-600 p-6 flex items-center max-w-2xl hover:scale-[1.02] transition-transform duration-300">
          <div className="text-blue-600 text-5xl bg-blue-300 p-4 rounded-full">
            <FaUsers />
          </div>
          <div className="ml-6">
            <h2 className="text-2xl font-bold">Total Users</h2>
            <p className="text-4xl font-bold mt-2">{totalUsers}</p>
          </div>
        </div>

        {/* Borrowed Books Card */}
        <div className="w-full bg-white rounded-lg shadow-md text-blue-600 p-6 flex items-center max-w-2xl hover:scale-[1.02] transition-transform duration-300">
          <div className="text-blue-600 text-5xl bg-blue-300 p-4 rounded-full">
            <FaHandHolding />
          </div>
          <div className="ml-6">
            <h2 className="text-2xl font-bold">Total Borrow Books</h2>
            <p className="text-4xl font-bold mt-2">{borrowedBooks}</p>
          </div>
        </div>

        {/* Returned Books Card */}
        <div className="w-full bg-white rounded-lg shadow-md text-blue-600 p-6 flex items-center max-w-2xl hover:scale-[1.02] transition-transform duration-300">
          <div className="text-blue-600 text-5xl bg-blue-300 p-4 rounded-full">
            <FaUndo />
          </div>
          <div className="ml-6">
            <h2 className="text-2xl font-bold">Total Returned Books</h2>
            <p className="text-4xl font-bold mt-2">{returnedBooks}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
