import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Plus from "../pages/auth/Plus";

import Watchlist from "../pages/auth/Watchlist";
import Movies from "../pages/auth/Movies";

import VerifyAccount from "../pages/VerifyAccount";
import ForgotPassword from "../pages/ForgotPassword";
import NewPassword from "../pages/NewPassword";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
import ProtectedRoutes from "../store/ProtectedRoutes";
import RedirectAuthUser from "../store/RedirectAuthUser";
import NoPage from "../pages/NoPage";

function App() {
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {}, [isAuthenticated, user]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/new-password/:token" element={<NewPassword />} />
        <Route element={<RedirectAuthUser />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/verify-account" element={<VerifyAccount />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/plus" element={<Plus />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/movies/:id" element={<Movies />} />
        </Route>
        <Route
          path="*"
          element={
            <>
              <NoPage />
            </>
          }
        />
      </Routes>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}

export default App;
