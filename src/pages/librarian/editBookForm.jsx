import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import uploadMediaToSupabase from "../../utils/mediaUpload";
export default function EditBookForm() {
  const location = useLocation()
  const navigate = useNavigate()
  const book = location.state.book
  if(book == null){
    navigate("/librarian/books")
  }
  const [bookId, setBookId] = useState(book.bookId);
  const [bookName, setBookName] = useState(book.bookName);
  const [authorName, setAuthorName] = useState(book.authorName);
  const [publishedDate, setPublishedDate] = useState(book.publishedDate);
  const [imageFiles, setImageFiles] = useState([]);
  const [stock, setStock] = useState(book.stock);
  const [description, setDescription] = useState(book.description);
  
  console.log(location)
  async function handleSubmit(){
    
    const promisesArray = []
    let imgUrls = book.images
    if(imageFiles.length > 0){
      for(let i=0; i<imageFiles.length; i++){
        promisesArray[i] = uploadMediaToSupabase(imageFiles[i])
      }
      
      imgUrls = await Promise.all(promisesArray)
    }
    const bookData = {
      bookId: bookId,
      bookName: bookName,
      authorName: authorName,
      publishedDate: publishedDate,
      images: imgUrls,
      stock: stock,
      description: description,
    };
    const token = localStorage.getItem("token")
    try{
      await axios.put(import.meta.env.VITE_BACKEND_URL+"/api/books/"+book.bookId,bookData,{
        headers : {
          Authorization : "Bearer "+token
        }
      })
      navigate("/librarian/books")
      toast.success("Book updated successfully")
    }catch(err){
      toast.error("Failed to update book")
    }
    
  }
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg p-8 m-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Edit Book
        </h1>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Book ID</label>
            <input
              disabled
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
              value={bookId}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Book Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Author Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Published Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Upload Images</label>
            <input
              type="file"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
              onChange={(e) => setImageFiles(e.target.files)}
              multiple
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Stock</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Description</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:outline-none"
            onClick={handleSubmit}
          >
            Update Book
          </button>
        </div>
      </div>
    </div>
  );
}  