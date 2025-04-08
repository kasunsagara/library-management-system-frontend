import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageSlider from "../../components/imgeSlider"; // Assuming you have the ImageSlider component for images
import { addToCart } from "../../utils/cartFunction";
import toast from "react-hot-toast";

export default function BookOverview() {
  const params = useParams();
  const bookId = params.id;
  const [book, setBook] = useState(null);
  const [status, setStatus] = useState("loading"); // not-found, found
  const navigate = useNavigate();

  useEffect(() => {
    console.log(bookId);
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/books/" + bookId)
      .then((res) => {
        console.log(res.data);
        if (res.data == null) {
          setStatus("not-found");
        } else {
          setBook(res.data);
          setStatus("found");
        }
      })
      .catch((error) => {
        console.error(error);
        setStatus("not-found");
      });
  }, [bookId]);

  function onAddToCartClick() {
    const token = localStorage.getItem("token"); // Assuming you store the token in localStorage

    if (!token) {
      toast.error("You need to log in to add items to the cart.");
      navigate("/login");
      return;
    }

    addToCart(book.bookId, 1, token); // Add to cart with the book's ID
    toast.success(`${book.bookName} added to cart`);
  }

  function onBuyNowClick() {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

    if (!token) {
      toast.error("You need to log in to make a purchase.");
      navigate("/login"); // Redirect to login page
      return;
    }

    navigate("/shipping", {
      state: {
        items: [
          {
            bookId: book.bookId,
            qty: 1
          }
        ]
      }
    });
  }

  return (
    <div
      className="w-full h-[calc(100vh-100px)] flex justify-center items-center relative"
      style={{
        backgroundImage: "url('/background2.png')", // Change this to your desired background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="max-w-5xl p-5 rounded-lg shadow-lg bg-white backdrop-filter backdrop-blur-lg bg-opacity-30">
        {status === "loading" && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative">
              {/* Outer Glow Effect */}
              <div className="absolute inset-0 rounded-full h-32 w-32 bg-gradient-to-tr from-accent to-secondary opacity-30 blur-lg"></div>

              {/* Spinner */}
              <div className="animate-spin rounded-full h-32 w-32 border-[6px] border-gray-300 border-t-accent border-t-8 shadow-lg"></div>
            </div>
          </div>
        )}

        {status === "not-found" && (
          <div className="flex flex-col items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
              <p className="text-xl text-gray-600 mb-6">Book not found</p>
              <button
                onClick={() => window.history.back()}
                className="px-6 py-2 bg-secondary hover:bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-all bg-gradient-to-r from-red-400 to-red-600 hover:from-red-300 hover:to-red-500 p-3 mt-4 shadow-md transform hover:scale-105"
              >
                Go Back
              </button>
            </div>
          </div>
        )}

        {status === "found" && (
          <div className="w-full h-full flex items-center justify-center p-4">
            <div className="w-[37%] h-full p-4">
              <ImageSlider images={book.images} />
            </div>
            <div className="w-[63%] h-full p-4">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{book.bookName}</h1>
              <h2 className="text-xl text-gray-600 mb-6">by {book.authorName}</h2>
              <p className="text-lg text-gray-700 mb-6">Published: {book.publishedDate}</p>
              <p className="text-xl text-black mb-6">
                <span className="text-gray-200">Stock: {book.stock}</span>
              </p>
              <p className="text-lg text-gray-700 line-clamp-3">{book.description}</p>
              <button
                onClick={onAddToCartClick}
                className="bg-secondary hover:bg-accent text-white font-semibold p-2 rounded-lg mr-2 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-300 hover:to-blue-500 mt-4 shadow-md transition-transform transform hover:scale-105"
              >
                Add to cart
              </button>
              <button
                onClick={onBuyNowClick}
                className="bg-secondary hover:bg-accent text-white font-semibold p-2 rounded-lg bg-gradient-to-r from-green-400 to-green-600 hover:from-green-300 hover:to-green-500 mt-4 shadow-md transition-transform transform hover:scale-105"
              >
                Buy Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
