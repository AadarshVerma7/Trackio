import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const PublicRoute = ({ children }) => {
    const { isLoggedIn, isLoading } = useContext(AppContext);

    // 1. Wait for check
    if (isLoading) {
        return <div className="h-screen w-full flex items-center justify-center bg-black text-white">Loading...</div>;
    }

    // 2. If already logged in, redirect to Home (Dashboard)
    if (isLoggedIn) {
        return <Navigate to='/home' replace />;
    }

    // 3. If not logged in, allow access to Landing/Login/Signup
    return children;
}

export default PublicRoute;