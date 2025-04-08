import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Welcome from "../components/welcome";
import { FaChartBar, FaBook } from "react-icons/fa";
import UserBooks from "./user/userBooks";
import UserDashboard from "./user/userDashboard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function UserHomePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setUser(response.data))
      .catch((error) => {
        toast.error("Failed to load user data.");
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="bg-gray-100 w-full h-screen flex">
      {/* Sidebar */}
      <div className="w-[20%] h-screen bg-blue-600  flex flex-col items-center py-8 shadow-lg">
        <img
        src="/logo.png" // <- Replace with your actual path
        alt="Logo"
        className="w-24 h-24 object-center rounded-full"
        />
        <h1 className="text-2xl font-bold text-white text-center mb-8">Library Management System</h1>
        <Link
          className="flex flex-row items-center mb-6 text-[17px] text-white hover:bg-blue-400 hover:rounded-lg py-2 px-4 transition-all duration-300"
          to="/user/dashboard"
        >
          <FaChartBar className="mr-3 text-xl" /> Dashboard
        </Link>

        <Link
          className="flex flex-row items-center mb-6 text-[17px] text-white hover:bg-blue-400 hover:rounded-lg py-2 px-4 transition-all duration-300"
          to="/user/books"
        >
          <FaBook className="mr-3 text-xl" /> Books
        </Link>
      </div>

      {/* Main Content */}
      <div className="w-[80%] h-screen overflow-auto bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
        <Header />
        {user !== null ? (
          <Routes>
            <Route path="/" element={<Welcome user={user} />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/books" element={<UserBooks />} />
          </Routes>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            {/* Loading Spinner */}
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-600"></div>
          </div>
        )}
      </div>
    </div>
  );
}
