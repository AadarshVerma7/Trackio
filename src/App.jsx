import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import LandingPage from './Pages/LandingPage/LandingPage'
import Login  from './Pages/LoginPage/Login.jsx';
import Signup from './Pages/SignupPage/Signup.jsx'
import HomePage from './Pages/HomePage/HomePage.jsx'


function App() {
  const[showLogin,setShowLogin] = useState(false);
  const[showSignup,setShowSignup] = useState(false);
  
  return (
    <>
      <Navbar onLoginClick={() => setShowLogin(true)} onSignupClick={() => setShowSignup(true)}/>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='home' element={<HomePage />}/>
      </Routes>

      {showLogin && (
        <div className="overlay">
          <Login close={() => setShowLogin(false)} />
        </div>
      )}

      {showSignup && (
        <div className='overlay'>
          <Signup close2={() => setShowSignup(false)} />
        </div>
      )
      }
    </>
  )
}

export default App
