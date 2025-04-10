import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash, FaPencilAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [booksLoaded, setBooksLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!booksLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/books")
        .then((res) => {
          setBooks(res.data);
          setBooksLoaded(true);
        })
        .catch((err) => {
          toast.error("Failed to load books");
          console.error(err);
        });
    }
  }, [booksLoaded]);

  if (!booksLoaded) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
        <div className="w-full h-full flex justify-center items-center">
          {/* Loading Spinner */}
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-8 border-blue-800"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-6 relative">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Books</h1>

        <Link
          to={"/librarian/books/addBook"}
          className="absolute top-0 right-0 mt-10 mr-10 flex items-center justify-center w-14 h-14 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-700 transition-all"
        >
          <FaPlus />
        </Link>

        {books.length === 0 ? (
          <p className="text-gray-600 mt-4">No books found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-400 rounded-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="text-left px-6 py-4 border border-gray-400 text-gray-800 font-medium">
                    Book ID
                  </th>
                  <th className="text-left px-6 py-4 border border-gray-400 text-gray-800 font-medium">
                    Title
                  </th>
                  <th className="text-left px-6 py-4 border border-gray-400 text-gray-800 font-medium">
                    Author
                  </th>
                  <th className="text-left px-6 py-4 border border-gray-400 text-gray-800 font-medium">
                    Published Date
                  </th>
                  <th className="text-left px-6 py-4 border border-gray-400 text-gray-800 font-medium">
                    Stock
                  </th>
                  <th className="text-left px-6 py-4 border border-gray-400 text-gray-800 font-medium">
                    Description
                  </th>
                  <th className="text-center px-6 py-4 border border-gray-400 text-gray-800 font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr
                    key={book.bookId}
                    className={`hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-100"
                    }`}
                  >
                    <td className="px-6 py-4 border border-gray-400 text-gray-700">
                      {book.bookId}
                    </td>
                    <td className="px-6 py-4 border border-gray-400 text-gray-700">
                      {book.bookName}
                    </td>
                    <td className="px-6 py-4 border border-gray-400 text-gray-700">
                      {book.authorName}
                    </td>
                    <td className="px-6 py-4 border border-gray-400 text-gray-700">
                      {book.publishedDate}
                    </td>
                    <td className="px-6 py-4 border border-gray-400 text-gray-700">
                      {book.stock}
                    </td>
                    <td className="px-6 py-4 border border-gray-400 text-gray-700 truncate max-w-xs">
                      {book.description}
                    </td>
                    <td className="px-6 py-4 border border-gray-400 text-gray-700 text-center">
                      <button
                        className="text-red-500 hover:text-red-700 mr-2"
                        title="Delete"
                        onClick={() => {
                          const confirmDelete = window.confirm("Are you sure you want to delete this book?");
                          if (!confirmDelete) return;

                          const token = localStorage.getItem("token");
                          axios
                            .delete(
                              import.meta.env.VITE_BACKEND_URL + `/api/books/${book.bookId}`,
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              }
                            )
                            .then((res) => {
                              console.log(res.data);
                              toast.success("Book deleted successfully");
                              setBooksLoaded(false);
                            })
                            .catch((err) => {
                              toast.error("Failed to delete book");
                              console.error(err);
                            });
                        }}
                      >
                        <FaTrash />
                      </button>
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit"
                        onClick={() => {
                          navigate("/librarian/books/editBook", {
                            state: { book: book },
                          });
                        }}
                      >
                        <FaPencilAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
