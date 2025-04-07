import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { BsGraphUp, BsBook, BsCart4, BsPeopleFill } from "react-icons/bs";
import AdminBooks from "./admin/adminBooks";
import AddBook from "./admin/addBook";
import EditProductForm from "./admin/editProductForm";
import WelcomeAdmin from "./admin/welcomeAdmin";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function AdminHomePage() {
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
          to="/admin/dashboard"
        >
          <BsGraphUp className="mr-3 text-xl" /> Dashboard
        </Link>

        <Link
          className="flex flex-row items-center mb-6 text-[17px] text-white hover:bg-blue-400 hover:rounded-lg py-2 px-4 transition-all duration-300"
          to="/admin/books"
        >
          <BsBook className="mr-3 text-xl" /> Books
        </Link>

        <Link
          className="flex flex-row items-center mb-6 text-[17px] text-white hover:bg-blue-400 hover:rounded-lg py-2 px-4 transition-all duration-300"
          to="/admin/orders"
        >
          <BsCart4 className="mr-3 text-xl" /> Orders
        </Link>

        <Link
          className="flex flex-row items-center text-[17px] text-white hover:bg-blue-400 hover:rounded-lg py-2 px-4 transition-all duration-300"
          to="/admin/customers"
        >
          <BsPeopleFill className="mr-3 text-xl" /> Customers
        </Link>
      </div>

      {/* Main Content */}
      <div className="w-[80%] h-screen overflow-auto bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
        <Header />
        {user !== null ? (
          <Routes>
            <Route path="/" element={<WelcomeAdmin user={user} />} />
            <Route path="/" element={<h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>} />
            <Route path="/books" element={<AdminBooks />} />
            <Route path="/books/addBook" element={<AddBook />} />
            <Route path="/products/editProduct" element={<EditProductForm />} />
            <Route path="/customers" element={<h1 className="text-3xl font-semibold text-gray-800">Customers</h1>} />
            <Route path="/*" element={<h1 className="text-3xl font-semibold text-gray-800">404 - Page Not Found</h1>} />
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
