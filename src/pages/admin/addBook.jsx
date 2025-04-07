import axios from "axios";
import { useState } from "react";
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
  const navigate = useNavigate();

  async function handleSubmit() {
    const promisesArray = [];

    for (let i = 0; i < imageFiles.length; i++) {
      promisesArray[i] = uploadMediaToSupabase(imageFiles[i]);
    }

    const imgUrls = await Promise.all(promisesArray);

    const book = {
      bookId: bookId,
      bookName: bookName,
      authorName: authorName,
      publishedDate: publishedDate,
      images: imgUrls,
      stock: stock,
      description: description,
    };

    const token = localStorage.getItem("token");
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/books", book, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      navigate("/admin/books");
      toast.success("Book added successfully");
    } catch (err) {
      toast.error("Failed to add book");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Add Book 
        </h1>
        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Book ID</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter Book ID"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Book Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter Book Name"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Author Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter Author Name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Published Date</label>
            <input
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Image Upload</label>
            <input
              type="file"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              onChange={(e) => {
                setImageFiles(e.target.files);
              }}
              multiple
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Stock</label>
            <input
              type="number"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter Stock Quantity"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Description</label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter Book Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
