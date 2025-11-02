import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) =>{

    axios.defaults.withCredentials=true;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [userData,setUserData] = useState(null);

    const getAuthState=async()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/auth/is-auth');
            if(data.success){
                setIsLoggedIn(true);
                setUserData(data.userData);
            }
        } catch (error) {
            if(error.response && error.response.status===401){
                console.log("User is not Authenticated");
            }
            else{
                toast.error("An Unexpected Error Happened");
            }
        }
    }

    const getUserData = async ()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/user/profile');
            data.success?setUserData(data.userData):toast.error(data.message);
        } catch (error) {
            toast.error(data.message);
        }
    }

    useEffect(()=>{
        getAuthState();
    },[])

    const value={
        backendUrl,
        isLoggedIn,setIsLoggedIn,
        userData,setUserData,
        getUserData
    }
    return (
        <AppContext.Provider value={value}> 
            {props.children}
        </AppContext.Provider>
    )
}