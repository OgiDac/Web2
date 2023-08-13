import React, { createContext, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import api from "../api/api";

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, [])

    const loginHandler = async(loginData) => {
        try {
            const result = await api.post("Auth/Login", loginData)
            if(!result) {
                return;
            }
            console.log(result.data)
            setToken(result.data);
            localStorage.setItem("token", result.data);
            navigate("home");
        } catch(e) {
            alert(e.message);
        }
    };

    const logoutHandler = () => {
        setToken(null);
        localStorage.clear();
        navigate("/");
    }

    const userType = () => {
        try {
            if(!token) {
                return null;
            }
            const decodedToken = jwtDecode(token);
            return decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        } catch(e) {
            console.log(e);
        }
    }

    const inType = (type) => {
        try {
            if(!token)
                return null;
            const tokenDecoded = jwtDecode(token);
            return tokenDecoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === type;
        } catch(e) {
            console.log(e);
        }
    }

    const googleLogin = async(data) => {
        try {
            const res = await api.post('auth/google-sign-in', {token: data.credential})
            if(!res)
                return;

            setToken(res.data);
            localStorage.setItem('token', res.data);
            navigate('/home');
        } catch (e){
            alert(e.response.data.Exception);
        }
    }

    return (
        <AuthContext.Provider
        value={{
            token: token,
            onLogout: logoutHandler,
            onLogin: loginHandler,
            type: userType,
            inType: inType,
            googleLogin: googleLogin
        }}>
            
            {
                props.children
            }       
        </AuthContext.Provider>
    );
}

export default AuthContext;
