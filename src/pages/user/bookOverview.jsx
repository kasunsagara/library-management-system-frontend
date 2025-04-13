import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BookOverview() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/books/" + bookId);
        setBook(res.data);
        setSelectedImage(res.data.images[0]);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch book:", err);
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  const handleBorrowBook = () => {
    navigate("/borrowBook", { state: { items: [{ bookId: book.bookId }] } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-8 border-blue-800"></div>
      </div>
    );
  }

  if (!book) {
    return <p className="text-center mt-10 text-red-600">Book not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 py-10 flex items-center justify-center">
      <div className="max-w-5xl mx-auto bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-md p-6">
        <h2 className="text-2xl text-center font-semibold text-gray-800 mb-6 border-b pb-2">Book Overview</h2>

        <div className="flex flex-col md:flex-row gap-8">
          <div>
            <img
              src={selectedImage}
              alt={book.bookName}
              className="w-48 h-64 object-cover rounded-md shadow-md mb-4"
            />
            <div className="flex gap-2 flex-wrap">
              {book.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-12 h-16 object-cover rounded cursor-pointer border ${
                    selectedImage === img ? "border-blue-500" : "border-gray-300"
                  }`}
                />
              ))}
            </div>
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

            {book.stock > 0 && (
              <button
                onClick={handleBorrowBook}
                className="mt-6 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
              >
                Borrow Book
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}




