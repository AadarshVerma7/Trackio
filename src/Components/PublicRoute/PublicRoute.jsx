import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const PublicRoute = ({children})=>{
    const {isLoggedIn} = useContext(AppContext);
    return isLoggedIn?<Navigate to='/home' replace /> : children;
}

export default PublicRoute;