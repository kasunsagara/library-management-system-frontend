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
      <h1 className="text-2xl text-white font-bold mb-4 text-center">Books Records</h1> 

        <Link
          to={"/librarian/books/addBook"}
          className="absolute top-0 right-0 mr-6 flex items-center justify-center w-14 h-14 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-700 transition-all"
        >
          <FaPlus />
        </Link>

        {books.length === 0 ? (
          <p className="text-gray-600 mt-4">No books found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm bg-white border border-gray-400">
              <thead>
                <tr className="bg-gray-200 text-gray-800">
                  <th className="border border-gray-400 px-6 py-4 text-left">
                    Book ID
                  </th>
                  <th className="border border-gray-400 px-6 py-4 text-left">
                    Title
                  </th>
                  <th className="border border-gray-400 px-6 py-4 text-left">
                    Author
                  </th>
                  <th className="border border-gray-400 px-6 py-4 text-left">
                    Published Date
                  </th>
                  <th className="border border-gray-400 px-6 py-4 text-left">
                    Stock
                  </th>
                  <th className="border border-gray-400 px-6 py-4 text-left">
                    Description
                  </th>
                  <th className="border border-gray-400 px-6 py-4 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr
                    key={book.bookId}
                    className={`hover:bg-gray-100 ${
                      index % 2 === 0 ? "bg-white" : "bg-white"
                    }`}
                  >
                    <td className="border border-gray-400 px-6 py-4">
                      {book.bookId}
                    </td>
                    <td className="border border-gray-400 px-6 py-4">
                      {book.bookName}
                    </td>
                    <td className="border border-gray-400 px-6 py-4">
                      {book.authorName}
                    </td>
                    <td className="border border-gray-400 px-6 py-4">
                      {book.publishedDate}
                    </td>
                    <td className="border border-gray-400 px-6 py-4">
                      {book.stock}
                    </td>
                    <td className="border border-gray-400 px-6 py-4 truncate max-w-xs">
                      {book.description}
                    </td>
                    <td className="border border-gray-400 px-6 py-4 text-center">
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
  );
}
