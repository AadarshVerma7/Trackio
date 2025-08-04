import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import LandingPage from './Pages/LandingPage/LandingPage'
import Login  from './Pages/LoginPage/Login.jsx';
import Signup from './Pages/SignupPage/Signup.jsx'
import HomePage from './Pages/HomePage/HomePage.jsx'


function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='home' element={<HomePage />}/>
      </Routes>

    </>
  )
}

export default App
