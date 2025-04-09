import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BookCard from "../../components/BookCard"; // Adjust path if needed

export default function UserBooks() {
  const [books, setBooks] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (loadingStatus === "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/books")
        .then((res) => {
          setBooks(res.data);
          setLoadingStatus("loaded");
        })
        .catch(() => toast.error("Error loading books"));
    }
  }, []);

  function search(e) {
    const query = e.target.value;
    setQuery(query);
    setLoadingStatus("loading");

    const endpoint =
      query === "" ? "/api/books" : `/api/books/search/${query}`;

    axios
      .get(import.meta.env.VITE_BACKEND_URL + endpoint)
      .then((res) => {
        setBooks(res.data);
        setLoadingStatus("loaded");
      })
      .catch(() => toast.error("Error loading books"));
  }

  return (
    <div className="w-full h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 relative flex flex-col items-center">
      {/* Search Input */}
      <div className="absolute w-full flex justify-center z-50">
        <input
          type="text"
          className="w-1/2 p-3 mt-2 rounded-lg bg-white backdrop-filter backdrop-blur-lg bg-opacity-40 text-white placeholder:text-gray-100 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Search Books by Title"
          onChange={search}
          value={query}
        />
      </div>

      {/* Books List */}
      {loadingStatus === "loaded" && (
        <div className="w-full h-full flex flex-col items-center pt-24 pb-10 relative z-10">
          {books.length > 0 ? (
            books.map((book) => (
              <BookCard key={book.bookId} book={book} />
            ))
          ) : (
            <p className="text-white mt-10 text-xl">No books found.</p>
          )}
        </div>
      )}

      {/* Loading Spinner */}
      {loadingStatus === "loading" && (
        <div className="w-full h-screen flex items-center justify-center z-10">
          <div className="relative">
            <div className="absolute inset-0 rounded-full h-32 w-32 bg-gradient-to-tr from-blue-400 to-blue-600 opacity-30 blur-lg"></div>
            <div className="animate-spin rounded-full h-32 w-32 border-[6px] border-gray-300 border-t-blue-500 border-t-8 shadow-lg"></div>
          </div>
        </div>
      )}
    </div>
  );
}
