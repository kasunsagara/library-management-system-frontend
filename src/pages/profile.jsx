import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center px-4">
      {isLoading ? (
        <div className="relative">
          <div className="absolute inset-0 rounded-full h-32 w-32 opacity-30 blur-xl bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-500"></div>
          <div className="animate-spin rounded-full h-32 w-32 border-8 border-white border-t-accent shadow-2xl"></div>
        </div>
      ) : !isLoggedIn ? (
        <div className="bg-white/30 backdrop-blur-xl p-10 rounded-xl shadow-2xl text-center max-w-md w-full border border-white/20">
          <h2 className="text-3xl font-bold text-red-500 mb-3">Access Denied</h2>
          <p className="text-gray-800 text-lg">Please log in to view your profile.</p>
        </div>
      ) : (
        <div className="bg-white/30 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-full max-w-lg">
          <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
            Your Profile
          </h2>
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <img
                src={userData.profilePicture}
                alt="Profile"
                className="w-36 h-36 rounded-full shadow-lg hover:scale-[1.04] transition-transform duration-300 "
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-400 via-purple-400 to-blue-400 opacity-20 blur-lg z-[-1]"></div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-xl text-gray-900 font-medium">
                <span className="text-black font-bold">Full Name:</span>{" "}
                {userData.firstName} {userData.lastName}
              </p>
              <p className="text-xl text-gray-900 font-medium">
                <span className="text-black font-bold">Email:</span>{" "}
                {userData.email}
              </p>
              <p className="text-xl text-gray-900 font-medium">
                <span className="text-black font-bold">Role:</span>{" "}
                {userData.role}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
