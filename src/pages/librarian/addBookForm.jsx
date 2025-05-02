import axios from "axios";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadMediaToSupabase from "../../utils/mediaUpload";

export default function AddBookForm() {
  const [bookId, setBookId] = useState("");
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  const bookNameRef = useRef(null);
  const authorRef = useRef(null);
  const dateRef = useRef(null);
  const imageRef = useRef(null);
  const stockRef = useRef(null);
  const descriptionRef = useRef(null);

  const navigate = useNavigate();

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef?.current?.focus();
    }
  };

  async function handleSubmit() {
    const promisesArray = [];

    for (let i = 0; i < imageFiles.length; i++) {
      promisesArray[i] = uploadMediaToSupabase(imageFiles[i]);
    }

    const imgUrls = await Promise.all(promisesArray);

    const book = {
      bookId,
      bookName,
      authorName,
      publishedDate,
      images: imgUrls,
      stock,
      description,
    };

    const token = localStorage.getItem("token");
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/books", book, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      navigate("/librarian/books");
      toast.success("Book added successfully");
    } catch (err) {
      toast.error("Failed to add book");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg p-8 m-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Add Book</h1>
        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Book ID</label>
            <input
              type="text"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, bookNameRef)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Book Name</label>
            <input
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, authorRef)}
              ref={bookNameRef}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Author Name</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, dateRef)}
              ref={authorRef}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Published Date</label>
            <input
              type="date"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, imageRef)}
              ref={dateRef}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Image Upload</label>
            <input
              type="file"
              onChange={(e) => setImageFiles(e.target.files)}
              onKeyDown={(e) => handleKeyDown(e, stockRef)}
              ref={imageRef}
              multiple
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, descriptionRef)}
              ref={stockRef}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              ref={descriptionRef}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:outline-none"
            onClick={handleSubmit}
          >
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
}
