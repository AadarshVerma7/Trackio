import { useState } from 'react'
import './App.css'
import { Route,Routes,useLocation} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import LandingPage from './Pages/LandingPage/LandingPage'
import Login  from './Pages/LoginPage/Login.jsx';
import Signup from './Pages/SignupPage/Signup.jsx'
import HomePage from './Pages/HomePage/HomePage.jsx'
import Navbar2 from './Components/Navbar2/Navbar2.jsx'

function App() {
  const location = useLocation();

  const showNavbar = location.pathname !== "/";

  return (
    <>
      {showNavbar && <Navbar2 />}
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='home' element={<HomePage />}/>
      </Routes>

    </>
  )
}

export default App
