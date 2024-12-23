import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import authService from "../../appwrite/auth";

export const RequireAuth = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null: loading, false: not logged in, true: logged in

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await authService.account.get(); // Check for an active session
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);
  console.log("Isloggedin->", isLoggedIn);

  if (isLoggedIn === null) {
    // Show a loader while checking authentication
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
