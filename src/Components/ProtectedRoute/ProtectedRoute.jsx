import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn, isLoading } = useContext(AppContext);

    // 1. If still checking backend, show a loader (or nothing)
    if (isLoading) {
        return <div className="h-screen w-full flex items-center justify-center bg-black text-white">Loading...</div>; 
    }

    // 2. If check is done and NOT logged in, go to Landing Page
    if (!isLoggedIn) {
        return <Navigate to='/' replace />;
    }

    // 3. If logged in, show the page
    return children;
}

export default ProtectedRoute;