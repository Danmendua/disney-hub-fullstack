import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Preloader from "../components/multicomponent/Preloader";
import { useAuthStore } from "../store/authStore";

const ProtectedRoutes = () => {
  const { checkAuth, isAuthenticated, user, isCheckingAuth } = useAuthStore();
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      await checkAuth();
    };
    initializeAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isCheckingAuth) {
      const timeout = setTimeout(() => {
        setShowPreloader(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [isCheckingAuth]);

  if (isCheckingAuth || showPreloader) {
    return <Preloader />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  if (!user?.email_verified) {
    return <Navigate to="/auth/verify-account" replace />;
  }
  return <Outlet context={{ user }} />;
};

export default ProtectedRoutes;
