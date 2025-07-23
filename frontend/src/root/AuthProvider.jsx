import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../lib/axiosInstance";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);

    const fetchCurrentUser = async () => {
        try {
            const res = await axiosInstance.get("/api/v1/users/current-user")
            setUser(res.data.data);
        } catch (err) {
            setUser(null);
            if (window.location.pathname !== "/sign-in") {
                window.location.href = "/sign-in";
            }
        } finally {
            setAuthChecked(true);
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/users/logout`, {}, {
                withCredentials: true
            });
            setUser(null);
        } catch (err) {
            console.error("Logout failed", err);
        } finally {
            window.location.href = "/sign-in";
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, authChecked, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
