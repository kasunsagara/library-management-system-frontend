import axios from 'axios'; 
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    profilePicture: '',
  });

  const emailRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const passwordRef = useRef(null);
  const profilePictureRef = useRef(null);

  const navigate = useNavigate();  // For programmatically navigating after successful signup

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeyDown = (event, nextInputRef) => {
    if (event.key === 'Enter') {
      nextInputRef?.current?.focus();
    }
  };

  const signup = async () => {
    const { firstName, lastName, email, password, profilePicture } = formData;

    try {
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        firstName,
        lastName,
        email,
        password,
        profilePicture:
          profilePicture ||
          'https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg',
      });

      if (res.data.error) {
        toast.error(res.data.message);
        return;
      }
      toast.success('Signup successful!');
      
      navigate('/login');  // Use navigate to go to login page after successful signup
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong!');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600">
      <div className="w-[450px] p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-blue-700 text-center mb-6">
          Sign Up Now
        </h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-blue-700 mb-1">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, lastNameRef)}
              className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              ref={firstNameRef}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-blue-700 mb-1">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, emailRef)}
              className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              ref={lastNameRef}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, passwordRef)}
              className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              ref={emailRef}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-blue-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, profilePictureRef)}
              className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              ref={passwordRef}
            />
          </div>
          <div>
            <label htmlFor="profilePicture" className="block text-sm font-medium text-blue-700 mb-1">
              Profile Picture (URL)
            </label>
            <input
              id="profilePicture"
              name="profilePicture"
              type="text"
              value={formData.profilePicture}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') signup();
              }}
              className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Optional"
              ref={profilePictureRef}
            />
          </div>
          <button
            type="button"
            onClick={signup}
            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">Already have an account?</span>
          <Link
            to="/login"
            className="ml-1 text-blue-500 hover:text-blue-700 font-semibold transition-all duration-200"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
