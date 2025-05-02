import { useRef, useState, useEffect } from "react";
import axios from "axios";
import uploadMediaToSupabase from '../../utils/mediaUpload';
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddLibrarianForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [profileImageFile, setProfileImageFile] = useState(null);

  // Input refs for navigating with Enter
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const fileRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    firstNameRef.current?.focus(); // Autofocus on first field
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef?.current?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl =
        "https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg";

      if (profileImageFile) {
        imageUrl = await uploadMediaToSupabase(profileImageFile);
      }

      const token = localStorage.getItem("token");

      await axios.post(
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

      navigate("/librarian/users");
      toast.success("Librarian added successfully!");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      });
      setProfileImageFile(null);
      firstNameRef.current?.focus();
    } catch (err) {
      console.error("Error adding librarian:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to add librarian.");
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
              onKeyDown={(e) => handleKeyDown(e, lastNameRef)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Last Name</label>
            <input
              ref={lastNameRef}
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, emailRef)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Email</label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, passwordRef)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Password</label>
            <input
              ref={passwordRef}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, fileRef)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Profile Picture</label>
            <input
              ref={fileRef}
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
      </div>
    </div>
  );
}
