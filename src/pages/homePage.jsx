import { Route, Routes } from 'react-router-dom';
import Header from '../components/Header';

export default function HomePage() {
  return (
    <div className="h-screen w-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <Header />
      <div className="w-full h-[calc(100vh-100px)] flex items-center justify-center">
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center space-y-6 flex flex-col items-center justify-center">
                <img
                  src="/logo.png" // <- Replace with your actual path
                  alt="Logo"
                  className="w-28 h-28 object-center rounded-full"
                />
                <h1 className="text-5xl font-bold text-white">Welcome to the Library Management System</h1>
                <p className="text-lg text-white opacity-80">
                  Your one stop solution for managing books, borrowers, and everything in between.
                </p>
                <p className="text-lg text-white opacity-80">Please login or sign up to continue.</p>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
