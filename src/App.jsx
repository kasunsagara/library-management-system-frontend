import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import SignupPage from './pages/signupPage'
import AdminHomePage from './pages/adminHomePage'
import UserHomePage from './pages/userHomePage'
import BookOverview from "./pages/user/bookOverview";
import Profile from './components/profile'
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

        <Route path="/admin/*" element={<AdminHomePage />} />

        <Route path="/user/*" element={<UserHomePage />} />

        <Route path="/bookInfo/:bookId" element={<BookOverview />} />

        <Route path="/profile" element={<Profile />} />
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
