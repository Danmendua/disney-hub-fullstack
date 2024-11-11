import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundBubbles from "../components/multicomponent/BackgroundBubbles";
import disney from "../assets/videos/disney.mp4";
import BackToHome from "../components/multicomponent/BackToHome";
import TransparentCenter from "../components/multicomponent/TransparentCenter";
import { HiMiniEnvelope, HiMiniLockClosed } from "react-icons/hi2";
import Form from "../components/multicomponent/Form";
import SubmitButtonWithVideo from "../components/multicomponent/SubmitButtonWithVideo";
import { useAuthStore } from "../store/authStore";
import logoDisney from "../assets/images/logo.png";
import loginImage from "../assets/images/login.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);
  const { login, error } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, senha, lembrar);
      navigate("/plus");
    } catch (error) {
      toast.error(error ? error.message : "Erro ao fazer login");
    }
  };

  return (
    <div className="relative w-screen h-screen ">
      <BackgroundBubbles background="login" />
      <div className="relative z-10 flex flex-col justify-center items-center w-full h-full">
        <BackToHome />

        <div
          className="z-10 pb-2 flex items-center justify-center"
          id="Logo Disney"
        >
          <img
            draggable="false"
            src={logoDisney}
            alt="Logo Disney"
            className="pointer-events-none select-none w-48 md:w-56"
          />
        </div>

        <TransparentCenter className="md:w-[400px]">
          <div
            className="mt-5 flex items-center justify-center"
            id="Login Disney"
          >
            <img
              draggable="false"
              src={loginImage}
              alt="Login Disney"
              className="flex items-center justify-center pointer-events-none select-none w-16 md:w-20"
            />
          </div>
          <form className="mx-5" onSubmit={handleLogin}>
            <Form
              icon={<HiMiniEnvelope />}
              htmlFor="email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form
              icon={<HiMiniLockClosed />}
              htmlFor="senha"
              placeholder="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            {error && (
              <p className="text-red-500 font-semibold -mt-2 mb-2 text-start">
                {error}
              </p>
            )}
            <label className="flex justify-end select-none">
              <button
                type="button"
                onClick={() => navigate("/auth/forgot-password")}
                className="text-sm "
              >
                <span>Esqueci minha senha</span>
              </button>
            </label>

            <div className="flex items-start select-none">
              <div className="flex items-center h-5">
                <input
                  id="rememberButton"
                  type="checkbox"
                  checked={lembrar}
                  onChange={(e) => setLembrar(e.target.checked)}
                  className="w-4 h-4 text-purple-600 dark:text-slate-800 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-slate-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <label
                htmlFor="rememberButton"
                className="ms-2 text-sm text-black dark:text-white"
              >
                <div>Lembrar-me</div>
              </label>
            </div>

            <SubmitButtonWithVideo
              text="Login"
              src={disney}
              className="md:mt-7 mt-5"
            />
          </form>
          <div className="flex items-center justify-center mt-10 md:mt-20 text-gray-900 bg-gray-200 dark:bg-gray-700 bg- pt-2 pb-2 dark:text-white select-none z-20">
            <div className="opacity-50 text-sm">Não tem conta?</div>{" "}
            <button
              type="button"
              className="transform transition duration-100 hover:scale-110 opacity-60 hover:opacity-100 ml-3"
              onClick={() => navigate("/auth/register")}
            >
              <span>Registrar</span>
            </button>
          </div>
        </TransparentCenter>
      </div>
    </div>
  );
};

export default Login;
