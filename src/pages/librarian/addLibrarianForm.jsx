import { useState } from "react";
import axios from "axios";
import uploadMediaToSupabase from '../../utils/mediaUpload';

export default function AddLibrarianForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      let imageUrl = "https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"; // default fallback
      
      if (profileImageFile) {
        imageUrl = await uploadMediaToSupabase(profileImageFile);
      }

      const token = localStorage.getItem("token"); // Assumes you store JWT after login

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        {
          ...formData,
          profilePicture: imageUrl,
          role: "librarian"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage("Librarian added successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      });
      setProfileImageFile(null);
    } catch (err) {
      console.error("Error adding librarian:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to add librarian.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg p-8 m-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Add Librarian</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  setProfileImageFile(e.target.files[0]);
                }
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
          >
            Add Librarian
          </button>
        </form>

        {message && (
          <div className="mt-4 text-green-600 text-center font-medium">{message}</div>
        )}

        {error && (
          <div className="mt-4 text-red-600 text-center font-medium">{error}</div>
        )}
      </div>
    </div>
  );
}
