import axios from "axios";
import { useEffect, useState } from "react";
import { deleteBook } from "../utils/cartFunction";

export default function Cart({ bookId }) {
  const [book, setBook] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/books/" + bookId)
        .then((response) => {
          if (response.data != null) {
            setBook(response.data);
            setLoaded(true);
          } else {
            deleteBook(bookId);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [loaded, bookId]);

  if (!loaded) {
    return (
      <tr>
        <td colSpan="3" className="text-center py-3 text-sm text-gray-500">Loading book data...</td>
      </tr>
    );
  }

  return (
    <tr className="text-sm text-gray-800 bg-red-300 hover:bg-gray-100 border border-gray-500">
      <td className="p-2 text-center border border-gray-500">
        <img
          src={book?.images[0]}
          alt="Book cover"
          className="w-16 h-20 object-cover border"
        />
      </td>
      <td className="p-2 border border-gray-500">{book?.bookName}</td>
      <td className="p-2 border border-gray-500">{bookId}</td>
    </tr>
  );
}
