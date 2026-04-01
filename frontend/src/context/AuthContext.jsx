'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import api from "@/api/api";

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [error, setError] = useState("");


    const registerUser = async (formData) => {
        try {
            const res = await api.post("/auth/register", formData);
            console.log("register res", res.data);

        } catch (err) {
            console.log(err);
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }

        }
    }

    const loginUser = async (formData) => {
        try {
            const res = await api.post("/auth/login", formData);
            console.log("login res", res.data);
            setUser(res.data.user)
            console.log('USER:', res.data.user);

        } catch (err) {
            console.log(err);
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }

        }
    }

    const logout = async () => {
        try {
            const res = await api.post("/auth/logout");
            console.log("login res", res.data);
            console.log('USER:', res.data.user);
            setUser(null)

        } catch (err) {
            console.log(err);
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    }
    const googleUserLogin = () => {
  window.location.href = "http://localhost:3000/auth/google";
};
    const currentUser = async () => {
        try {
            const res = await api.get("/auth/me");
            console.log("ME res", res.data);
            setUser(res.data)

        } catch (err) {
            console.log(err);
            if (err.response?.status == 401) {
      console.log('NO user Loggedin');
    }

        }
    }

     
    useEffect(() => {
        currentUser()
    }, [])



    return <AuthContext.Provider
        value={{
            user,
            registerUser,
            loginUser,
            error,
            setError,
            logout,
            googleUserLogin
        }}>
        {children}
    </AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}