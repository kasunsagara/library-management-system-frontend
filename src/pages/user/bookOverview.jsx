import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BookOverview() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/books/" + bookId);
        setBook(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch book:", err);
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!book) return <p className="text-center mt-10 text-red-600">Book not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 py-10 flex items-center justify-center">
      <div className="max-w-5xl mx-auto bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Book Overview</h2>

        <div className="flex flex-col md:flex-row gap-8">
          <div>
            <img
              src={book.images[0]}
              alt={book.bookName}
              className="w-48 h-64 object-cover rounded-md shadow-md mr-6"
            />
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <div>
                <p className="font-medium">Book Name:</p>
                <p>{book.bookName}</p>
              </div>
              <div>
                <p className="font-medium">Author:</p>
                <p>{book.authorName}</p>
              </div>
              <div>
                <p className="font-medium">Published Date:</p>
                <p>{book.publishedDate}</p>
              </div>
              <div>
                <p className="font-medium">Book ID:</p>
                <p>{book.bookId}</p>
              </div>
              <div>
                <p className="font-medium">Availability:</p>
                <p className={book.stock > 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                  {book.stock > 0 ? `In Stock (${book.stock})` : "Out of Stock"}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="font-medium text-gray-800 mb-1">Description:</p>
              <p className="text-gray-700 leading-relaxed">{book.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
