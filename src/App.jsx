import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import LandingPage from './Pages/LandingPage/LandingPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
      </Routes>
    </>
  )
}

export default App
