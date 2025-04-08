import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

export default function AdminUsers() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleDeleteUser = async (email) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      await axios.delete(import.meta.env.VITE_BACKEND_URL + `/api/users/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(userData.filter((user) => user.email !== email));
      toast.success("Customer deleted successfully");
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast.error("Failed to delete customer.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
        <div className="w-[60px] h-[60px] border-[4px] border-gray-200 border-b-[#3b82f6] animate-spin rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-6 relative">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Users</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-400 rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-left px-6 py-4 border border-gray-400 text-gray-800 font-medium">
                  Profile Picture
                </th>
                <th className="text-left px-6 py-4 border border-gray-400 text-gray-800 font-medium">
                  Full Name
                </th>
                <th className="text-left px-6 py-4 border border-gray-400 text-gray-800 font-medium">
                  Email
                </th>
                <th className="text-left px-6 py-4 border border-gray-400 text-gray-800 font-medium">
                  User Role
                </th>
                <th className="text-center px-6 py-4 border border-gray-400 text-gray-800 font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => (
                <tr
                  key={user._id}
                  className={`hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-4 border border-gray-400">
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 border border-gray-400 text-gray-700">
                    {`${user.firstName} ${user.lastName}`}
                  </td>
                  <td className="px-6 py-4 border border-gray-400 text-gray-700">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 border border-gray-400 text-gray-700">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 border border-gray-400 text-center">
                    <button
                      onClick={() => handleDeleteUser(user.email)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
