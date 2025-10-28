import { useState , useEffect} from 'react'
import './App.css'
import { Route,Routes,useLocation} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import LandingPage from './Pages/LandingPage/LandingPage'
import Login  from './Pages/LoginPage/Login.jsx';
import Signup from './Pages/SignupPage/Signup.jsx'
import HomePage from './Pages/HomePage/HomePage.jsx'
import Navbar2 from './Components/Navbar2/Navbar2.jsx'
import ProfileCard from './Components/ProfileCard/ProfileCard.jsx'
import DashBoard from './Pages/DashBoard/DashBoard.jsx'
import GroupMemberList from './Components/GroupMemberList/GroupMemberList.jsx'
import GroupMemberToDo from './Components/GroupMemberToDo/GroupMemberToDo.jsx'
import GroupPage from './Pages/GroupPage/GroupPage.jsx'

function App() {
  const location = useLocation();

  const showNavbar = location.pathname !== "/";


  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.documentElement.className = theme; // applies "light" or "dark" to <html>
  }, [theme]);
  
  return (
    <>
      {showNavbar && <Navbar2 theme={theme} toggleTheme={toggleTheme} />}
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='home' element={<HomePage theme={theme}/>}/>
        <Route path='ProfileCard' element={<ProfileCard />}/>
        <Route path='/profile' element={<DashBoard theme={theme}/>}/>
        <Route path='/group-member-list' element={<GroupMemberList />}/>
        <Route path='/group-member-to-do' element={<GroupMemberToDo />}/>
        <Route path='/groups' element={<GroupPage />}/>
      </Routes>

    </>
  )
}

export default App
