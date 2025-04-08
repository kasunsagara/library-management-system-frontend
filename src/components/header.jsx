import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Example: Check token in localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    toast.success('Logout successful!');
    navigate('/');
  };

  return (
    <header className="w-full flex justify-end p-4">
      <div className="bg-blue-500 p-2 rounded-lg flex space-x-6 hover:bg-blue-700">
        <Link
          to="/"
          className="bg-white text-blue-600 text-[17px] font-bold py-2 px-6 rounded-lg shadow hover:bg-blue-500 hover:text-white transition duration-300"
        >
          Home
        </Link>

        {isLoggedIn ? (
          <>
            <Link
              to="/profile"
              className="bg-white text-blue-600 text-[17px] font-bold py-2 px-6 rounded-lg shadow hover:bg-blue-500 hover:text-white transition duration-300"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 text-[17px] font-bold py-2 px-6 rounded-lg shadow hover:bg-blue-500 hover:text-white transition duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-white text-blue-600 text-[17px] font-bold py-2 px-6 rounded-lg shadow hover:bg-blue-500 hover:text-white transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-blue-600 text-[17px] font-bold py-2 px-6 rounded-lg shadow hover:bg-blue-500 hover:text-white transition duration-300"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
