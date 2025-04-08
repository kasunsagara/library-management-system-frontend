import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [booksLoaded, setBooksLoaded] = useState(false);

  useEffect(() => {
    if (!booksLoaded) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/books").then((res) => {
        setBooks(res.data);
        console.log(res.data);
        setBooksLoaded(true);
      });
    }
  }, [booksLoaded]);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-6 relative">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-8">
  

        <h1 className="text-2xl font-bold text-gray-800 mb-6">Books</h1>
        <Link
        to={"/admin/books/addBook"}
        className="absolute top-0 right-0 mt-10 mr-10 flex items-center justify-center w-14 h-14 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-700 transition-all"
        >
        <FaPlus />
        </Link>
        {booksLoaded ? (
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
                  <th className="text-center px-6 py-4 border border-gray-400 text-gray-7800 font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-white"
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
                          const token = localStorage.getItem("token");
                          axios
                            .delete(
                              import.meta.env.VITE_BACKEND_URL +
                                `/api/books/${book.bookId}`,
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
                            });
                        }}
                      >
                        <FaTrash />
                      </button>
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit"
                        onClick={() => {
                          navigate("/admin/books/editBook", {
                            state: { book: book },
                          });
                        }}
                      >
                        <FaPencil />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-[60px] h-[60px] border-[4px] border-gray-200 border-b-[#3b82f6] animate-spin rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
}
