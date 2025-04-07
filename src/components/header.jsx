import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="w-full flex justify-end p-4">
      {/* Large Division for all buttons */}
      <div className="bg-blue-500 p-2 rounded-lg flex space-x-6 hover:bg-blue-700">
        <Link
          to="/"
          className="bg-white text-blue-600 text-[17px] font-bold py-2 px-6 rounded-lg shadow hover:bg-blue-500 hover:text-white transition duration-300"
        >
          Home
        </Link>
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
      </div>
    </header>
  );
}
