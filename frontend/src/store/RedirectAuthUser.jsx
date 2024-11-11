import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "./authStore";
import { useEffect } from "react";

const RedirectAuthUser = () => {
  const { isAuthenticated, checkCookies, user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    checkCookies();
    if (isAuthenticated) {
      if (
        user?.email_verified === false &&
        location.pathname === "/auth/verify-account"
      ) {
        return;
      }
      if (user?.email_verified === true) {
        navigate("/plus");
      }
    }
  }, [isAuthenticated, user, location.pathname, navigate, checkCookies]);

  return <Outlet />;
};

export default RedirectAuthUser;
