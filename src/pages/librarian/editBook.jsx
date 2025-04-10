import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import uploadMediaToSupabase from "../../utils/mediaUpload";
export default function EditBook() {
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
      <div className="bg-white w-full max-w-lg p-10 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Edit Book
        </h1>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Book ID</label>
            <input
              disabled
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              value={bookId}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Book Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Author Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Published Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Upload Images</label>
            <input
              type="file"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              onChange={(e) => setImageFiles(e.target.files)}
              multiple
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Stock</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Description</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
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