import React from "react";
import BackgroundBubbles from "../components/multicomponent/BackgroundBubbles";
import BackToHome from "../components/multicomponent/BackToHome";
import TransparentCenter from "../components/multicomponent/TransparentCenter";
import FormCode from "../components/multicomponent/FormCode";
import logoDisney from "../assets/images/logo.png";
import verificarImage from "../assets/images/verificar.png";

function VerifyAccount() {
  return (
    <div className="relative w-screen h-screen">
      <BackgroundBubbles background="verifyAccount" />
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
              src={verificarImage}
              alt="Register Disney"
              className="flex items-center justify-center pointer-events-none select-none w-36 md:w-48"
            />
          </div>
          <p className="text-center text-black dark:text-gray-300 mb-5 md:mb-6 text-sm md:text-base">
            Preencha com o código de 6 dígitos enviado para o seu e-mail.
          </p>
          <div className="flex justify-center">
            <FormCode />
          </div>
        </TransparentCenter>
      </div>
    </div>
  );
}

export default VerifyAccount;
