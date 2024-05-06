import React from "react";
import { Outlet } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { jwtDecode } from "jwt-decode"; 

const useAuth = () => {
    const token = localStorage.getItem("auth");
    if (token) {
        return jwtDecode(token);
    } else {
        return null;
    }
};

export const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <HomePage />;
};
