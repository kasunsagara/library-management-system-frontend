import { Link } from "react-router-dom";

export default function BookCard(props) {
  const { book } = props;

  return (
    <div className="w-[700px] bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-md p-8 m-4 flex items-start hover:scale-[1.02] transition-transform duration-300">
      {/* Book Cover */}
      <img
        src={book.images[0]}
        alt={book.bookName}
        className="w-32 h-44 object-cover rounded-md shadow-md mr-6"
      />

      {/* Book Info */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-[25px] font-bold text-blue-800 mb-1">{book.bookName}</h2>
          <p className="text-[16px] text-gray-900">Author Name: {book.authorName}</p>
          <p className="text-[16px] text-gray-900">Published: {book.publishedDate}</p>
          <p className="text-[16px] text-gray-900">Book ID: {book.bookId}</p>
        </div>

        <div className="mt-4 flex justify-between items-end">
          <p
            className={`font-semibold ${
              book.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {book.stock > 0 ? `Available (${book.stock})` : "Out of Stock"}
          </p>
          <Link
            to={`/bookInfo/${props.book.bookId}`}
            className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-md text-sm transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
