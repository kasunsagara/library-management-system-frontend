import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LibrarianUsers() {
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
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
        <div className="w-full h-full flex justify-center items-center">
            {/* Loading Spinner */}
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-8 border-blue-800"></div>
          </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-6 relative">
        <h1 className="text-2xl text-white font-bold mb-4 text-center">Users Records</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm bg-white border border-gray-400">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="border border-gray-400 px-6 py-4 text-left">
                  Profile Picture
                </th>
                <th className="border border-gray-400 px-6 py-4 text-left">
                  Full Name
                </th>
                <th className="border border-gray-400 px-6 py-4 text-left">
                  Email
                </th>
                <th className="border border-gray-400 px-6 py-4 text-left">
                  User Role
                </th>
                <th className="border border-gray-400 px-6 py-4 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => (
                <tr
                  key={user._id}
                  className={`hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-white" : "bg-white"
                  }`}
                >
                  <td className="border border-gray-400 px-6 py-4">
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </td>
                  <td className="border border-gray-400 px-6 py-4">
                    {`${user.firstName} ${user.lastName}`}
                  </td>
                  <td className="border border-gray-400 px-6 py-4">
                    {user.email}
                  </td>
                  <td className="border border-gray-400 px-6 py-4">
                    {user.role}
                  </td>
                  <td className="border border-gray-400 px-6 py-4 text-center">
                    <button
                      onClick={() => handleDeleteUser(user.email)}
                      className="text-white px-2.5 py-0.5 rounded bg-red-500 hover:bg-red-700 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
}
