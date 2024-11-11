import React, { useState } from "react";
import BackgroundBubbles from "../components/multicomponent/BackgroundBubbles";
import BackToHome from "../components/multicomponent/BackToHome";
import TransparentCenter from "../components/multicomponent/TransparentCenter";
import Form from "../components/multicomponent/Form";
import { HiArrowSmallLeft, HiMiniEnvelope } from "react-icons/hi2";
import { useAuthStore } from "../store/authStore";
import pixar from "../assets/videos/pixarLamps.mp4";
import SubmitButtonWithVideo from "../components/multicomponent/SubmitButtonWithVideo";
import logoDisney from "../assets/images/logo.png";
import forgotImage from "../assets/images/fotgotPassword.png";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const { error, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    if (!error) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="relative w-screen h-screen">
      <BackgroundBubbles background="forgotPassword" />
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

        <TransparentCenter className="md:w-[600px]">
          <div
            className="mt-5 flex items-center justify-center"
            id="Register Disney"
          >
            <img
              draggable="false"
              src={forgotImage}
              alt="Register Disney"
              className="flex items-center justify-center pointer-events-none select-none w-60 md:w-96"
            />
          </div>
          {!isSubmitted ? (
            <div className="flex items-center justify-center">
              <form
                onSubmit={handleSubmit}
                className="mx-auto text-center max-w-sm px-5 space-y-4"
              >
                <p className="text-black dark:text-gray-300 text-sm md:text-lg">
                  Preencha o e-mail de cadastro e te enviaremos um link para
                  redefinir sua senha.
                </p>
                <Form
                  icon={<HiMiniEnvelope />}
                  htmlFor="email"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <SubmitButtonWithVideo
                  text="Enviar"
                  src={pixar}
                  className="md:mt-2 mt-5"
                />
                {error && (
                  <p className="text-red-500 font-semibold text-center">
                    {error}
                  </p>
                )}
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center ">
              <div className="h-10 w-10 md:h-12 md:w-12 bg-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <HiMiniEnvelope className="h-6 w-6 md:h-8 md:w-8 text-gray-300" />
                <span className="absolute top-0 right-0 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </div>

              <p className="text-center text-black dark:text-gray-300 text-base md:text-lg mx-20">
                Se a conta com o email {email} existir, você receberá um email
                para redefinir sua senha.
              </p>
            </div>
          )}
          <div className="flex items-center justify-center mt-10 md:mt-10 text-gray-900 bg-gray-200 dark:bg-gray-700 bg- pt-2 pb-2 dark:text-white select-none z-20">
            <HiArrowSmallLeft className="opacity-50 text-sm" />
            <div className="ml-1 opacity-50 text-sm">Voltar para o </div>{" "}
            <button
              type="button"
              className="transform transition duration-100 hover:scale-110 opacity-60 hover:opacity-100 ml-2"
              onClick={() => navigate("/auth/login")}
            >
              <span>Login</span>
            </button>
          </div>
        </TransparentCenter>
      </div>
    </div>
  );
}

export default ForgotPassword;
