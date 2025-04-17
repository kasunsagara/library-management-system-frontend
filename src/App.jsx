import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import SignupPage from './pages/signupPage'
import LibrarianHomePage from './pages/librarianHomePage'
import UserHomePage from './pages/userHomePage'
import BookOverview from './pages/user/bookOverview'
import Profile from './components/profile'
import BorrowBook from './pages/user/borrowBook'
import ReturnBook from './pages/user/returnBook'
import PayFine from './pages/user/payFine'
import { Toaster } from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-primary'>
    <BrowserRouter>
    <Toaster position="top-right"/>
    <Routes path="/*">
        <Route path="/*" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/librarian/*" element={<LibrarianHomePage />} />
        <Route path="/user/*" element={<UserHomePage />} />
        <Route path="/bookInfo/:bookId" element={<BookOverview />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/borrowBook" element={<BorrowBook />} />
        <Route path="/returnBook" element={<ReturnBook />} />
        <Route path="/fine/:returnId" element={<PayFine />} />
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
