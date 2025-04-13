import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function BorrowBookForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.items || [];

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [books, setBooks] = useState([]);

  const nameRef = useRef(null);
  const addressRef = useRef(null);
  const phoneRef = useRef(null);

  useEffect(() => {
    if (cart.length === 0) {
      toast.error("No items received.");
      return;
    }

    // Fetch all book details from backend
    Promise.all(
      cart.map((item) =>
        axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/api/books/${item.bookId}`)
          .then((res) => res.data)
          .catch(() => null)
      )
    ).then((fetchedBooks) => {
      const validBooks = fetchedBooks.filter((book) => book !== null);
      setBooks(validBooks);
    });

    // Optional: Calculate borrow quote
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/borrows/quote`, {
        borrowedBooks: cart,
      })
      .catch((err) => {
        toast.error("Failed to calculate borrow total");
        console.error(err);
      });
  }, [cart]);

  const validateInputs = () => {
    if (!name.trim()) {
      toast.error("Please enter your name.");
      return false;
    }
    if (!address.trim()) {
      toast.error("Please enter your address.");
      return false;
    }
    if (!phone.trim() || !/^\d{10}$/.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return false;
    }
    return true;
  };

  const createBorrow = () => {
    if (!validateInputs()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to borrow books.");
      navigate("/login");
      return;
    }

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/borrows`,
        {
          borrowedBooks: cart,
          name,
          address,
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Books borrowed successfully!");
        navigate("/user/borrows");
      })
      .catch((err) => {
        toast.error("Failed to borrow books. Please try again.");
        console.error(err);
      });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <div className="w-full max-w-2xl bg-white rounded shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
          Borrower Information
        </h2>

        {books.length > 0 && (
          <div className="mb-6">
            <h3 className="text-md font-semibold text-gray-700 mb-2">
              Books to Borrow
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {books.map((book) => (
                <div
                  key={book._id}
                  className="flex items-center p-3 border border-gray-300 rounded-md bg-white shadow-sm"
                >
                  <img
                    src={book.images?.[0]}
                    alt={book.bookName}
                    className="w-20 h-20 object-cover rounded border mr-4"
                  />
                  <div>
                    <p className="text-gray-700 text-sm">
                      Book Name: {book.bookName}
                    </p>
                    <p className="text-gray-700 text-sm">
                      Book ID: {book.bookId}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="name" className="block font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            ref={nameRef}
            type="text"
            className="mt-1 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addressRef.current?.focus();
              }
            }}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block font-medium text-gray-700">
            Address
          </label>
          <textarea
            id="address"
            ref={addressRef}
            className="mt-1 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent px-3 py-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                phoneRef.current?.focus();
              }
            }}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block font-medium text-gray-700">
            Phone Number
          </label>
          <input
            id="phone"
            ref={phoneRef}
            type="text"
            className="mt-1 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent px-3 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                createBorrow();
              }
            }}
          />
        </div>

        <button
          onClick={createBorrow}
          disabled={cart.length === 0}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded w-full transition"
        >
          Submit Borrow Request
        </button>
      </div>
    </div>
  );
}
