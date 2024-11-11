import React from "react";
import BackgroundBubbles from "../components/multicomponent/BackgroundBubbles";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import logoDisney from "../assets/images/logo.png";
import errorImage from "../assets/images/errorChar.png";

function NoPage() {
  const navigate = useNavigate();
  return (
    <div className="relative w-screen h-screen select-none">
      <BackgroundBubbles background="noPage" />
      <div className="relative z-10 flex justify-center items-center w-full h-full">
        <img
          src={errorImage}
          alt="Policial 404 error"
          className="w-40 md:w-60"
          draggable="false"
        />
        <div className="flex flex-col ">
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
          <h1 className="text-9xl -mb-3 ">404</h1>
          <h2 className="text-xl">Página não encontrada</h2>
          <div className="flex items-center space-x-2 justify-center pt-2">
            <button
              className="text-white hover:scale-110 transition-transform duration-200 ease-in-out"
              type="button"
              onClick={() => navigate("/")}
            >
              <HiOutlineArrowLeftCircle className="text-4xl" />
            </button>
            <span className="text-white">Voltar para o início</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoPage;
