import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundBubbles from "../components/multicomponent/BackgroundBubbles";
import marvel from "../assets/videos/marvel.mp4";
import BackToHome from "../components/multicomponent/BackToHome";
import TransparentCenter from "../components/multicomponent/TransparentCenter";
import { HiMiniEnvelope, HiMiniLockClosed, HiMiniUser } from "react-icons/hi2";
import SubmitButtonWithVideo from "../components/multicomponent/SubmitButtonWithVideo";
import Form from "../components/multicomponent/Form";
import PasswordStrengthMeter from "../components/multicomponent/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import logoDisney from "../assets/images/logo.png";
import registerImage from "../assets/images/register.png";

const Register = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [genero, setGenero] = useState("");
  const [termos, setTermos] = useState(false);
  const { register, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await register(email, senha, nome, genero, termos);
      navigate("/auth/verify-account");
    } catch (error) {
      toast.error(
        "Erro! Verifique se todos os dados preenchidos corretamente."
      );
    }
  };

  return (
    <div className="relative w-screen h-screen select-none">
      <BackgroundBubbles background="register" />
      <div className="relative z-10 flex flex-col justify-center items-center w-full h-full">
        <BackToHome />
        <div
          className="z-10 pb-2 flex items-center justify-center"
          id="Logo Disney"
        >
          <img
            src={logoDisney}
            alt="Logo Disney"
            className="pointer-events-none select-none w-48 md:w-56"
          />
        </div>
        <TransparentCenter className="md:w-[400px]">
          <div
            className="mt-5 flex items-center justify-center"
            id="Register Disney"
          >
            <img
              src={registerImage}
              alt="Register Disney"
              className="flex items-center justify-center pointer-events-none select-none w-28 md:w-32"
            />
          </div>

          <form className="mx-5" onSubmit={handleSignUp}>
            <Form
              icon={<HiMiniUser />}
              htmlFor="nome"
              placeholder="Nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
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

            <div className="flex pb-5 mt-5 md:mt-4">
              <span className="inline-flex items-center px-5 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <HiMiniUser />
              </span>
              <select
                required
                id="genres"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-400 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
              >
                <option value="" hidden>
                  Selecione o gênero
                </option>
                <option value="Feminino">Feminino</option>
                <option value="Masculino">Masculino</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
            {error && (
              <p className="text-red-500 font-semibold -mt-2 mb-2 text-center">
                {error}
              </p>
            )}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="termos"
                  aria-describedby="termos"
                  type="checkbox"
                  checked={termos}
                  onChange={(e) => setTermos(e.target.checked)}
                  className="w-4 h-4 text-purple-600 dark:text-slate-800 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-slate-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="termos"
                  className="font-light text-gray-500 dark:text-gray-300"
                >
                  Eu aceito os{" "}
                  <a
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    href="#"
                  >
                    Termos e condições
                  </a>
                </label>
              </div>
            </div>

            <SubmitButtonWithVideo
              text="Registrar"
              src={marvel}
              className="md:mt-7 mt-5"
            />
            <PasswordStrengthMeter password={senha} />
          </form>
          <div className="flex items-center justify-center mt-10 md:mt-20 text-gray-900 bg-gray-200 dark:bg-gray-700 bg- pt-2 pb-2 dark:text-white select-none z-20">
            <div className="opacity-50 text-sm">Já tem uma conta?</div>{" "}
            <a
              className="transform transition duration-100 hover:scale-110 opacity-50 hover:opacity-100 ml-3"
              href="/auth/login"
            >
              Faça o Login
            </a>
          </div>
        </TransparentCenter>
      </div>
    </div>
  );
};

export default Register;
