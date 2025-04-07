import { Route, Routes } from 'react-router-dom';
import LoginPage from './loginPage';
import SignupPage from './signupPage';

export default function HomePage() {
  return (
    <div className="h-screen w-full">
      <div className='w-full h-[calc(100vh-100px)]'>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </div>
  ); 
}
