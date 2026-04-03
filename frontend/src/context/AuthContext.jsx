'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import api from "@/api/api";
import { toast } from 'react-toastify';

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [error, setError] = useState("");


   const registerUser = async (formData) => {
  try {
    const res = await api.post("/auth/register", formData);

    toast.success(res.data.message);
    setError("");

    return true; // ✅
  } catch (err) {
    if (err.response?.data?.message) {
      setError(err.response.data.message);
    } else {
      setError("Something went wrong. Please try again.");
    }
    return false; // ❌
  }
};
    
   const loginUser = async (formData) => {
  try {
    const res = await api.post("/auth/login", formData);

    setUser(res.data.user);
    setError("");
    toast.success(res.data.message);

    return true; // ✅ success
  } catch (err) {
       console.log("FULL ERROR:", err.response);

  const message = err.response?.data?.message;

  if (Array.isArray(message)) {
    setError(message[0]); // take first element if array
  } else if (message) {
    setError(message); // use string if string
  } else {
    setError("Something went wrong. Please try again.");
  }

  return false;
  }
};

    const logout = async () => {
        try {
            const res = await api.post("/auth/logout");
            console.log("login res", res.data);
            console.log('USER:', res.data.user);
            setUser(null)
            toast.info(res.data.message)

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
  toast.success('User logged in with google')
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