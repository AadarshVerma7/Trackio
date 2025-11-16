import { useState , useEffect, useContext} from 'react'
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
import { ToastContainer} from 'react-toastify';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'
import PublicRoute from './Components/PublicRoute/PublicRoute.jsx'
import { AppContext } from './context/AppContext.jsx'
import { ContactUs } from './Pages/ContactUs/ContactUs.jsx'
import { set } from 'react-hook-form'
import JoinGroup from './Pages/JoinGroup/JoinGroup.jsx'
import AllGroups from './Pages/AllGroups/AllGroups.jsx'
import ResetPassword from './Pages/ResetPassword/ResetPassword.jsx'

function App() {
  const location = useLocation();

  const [scrollToAbout, setScrollToAbout] = useState(false);

  const {isLoggedIn} = useContext(AppContext);

  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.documentElement.className = theme; // applies "light" or "dark" to <html>
  }, [theme]);

  const hideNavbarPaths = ['/','/forgot-password'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);
  
  return (
    <>
    <ToastContainer />
      {showNavbar && (<Navbar2 onAboutClick={() => setScrollToAbout(true)} theme={theme} toggleTheme={toggleTheme} />)}
      <Routes>
        <Route path='/' element={<PublicRoute><LandingPage /></PublicRoute>}/>
        <Route path='/home' element={<ProtectedRoute><HomePage scrollToAbout={scrollToAbout} setScrollToAbout={setScrollToAbout} theme={theme}/></ProtectedRoute>}/>
        <Route path='/profileCard' element={<ProtectedRoute><ProfileCard /></ProtectedRoute>}/>
        <Route path='/profile' element={<ProtectedRoute><DashBoard theme={theme}/></ProtectedRoute>}/>
        <Route path='/groups/:groupId' element={<ProtectedRoute><GroupPage theme={theme}/></ProtectedRoute>}/>
        <Route path='/groups' element={<ProtectedRoute><AllGroups theme={theme}/></ProtectedRoute>}/>
        <Route path='/contact' element={<ContactUs theme={theme}/>}/>
        <Route path='/join' element={<ProtectedRoute><JoinGroup /></ProtectedRoute>}/>
        <Route path='/forgot-password' element={<ResetPassword theme={theme}/>}/>
      </Routes>

    </>
  )
}

export default App
