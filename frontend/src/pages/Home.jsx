import React from "react";
import ButtonsWithVideo from "../components/multicomponent/ButtonsWithVideo";
import HomeZoomEffect from "../components/home/HomeZoomEffect";
import starwars from "../assets/videos/star-wars.mp4";
import banner from "../assets/images/original.png";
import bannersm from "../assets/images/originalsm.png";
import lastPhoto from "../assets/images/frontpage.png";
import { HiChevronUp } from "react-icons/hi2";
import Accordion from "../components/home/Accordion";
import Footer from "../components/multicomponent/Footer";
import Table from "../components/home/Table";

export default function Home() {
  return (
    <HomeZoomEffect>
      <div className="absolute w-full h-48 bg-gradient-to-t from-transparent via-custom-blue to-transparent -translate-y-1/2"></div>
      <div className="absolute flex flex-col items-center justify-center w-full bg-custom-blue pt-52 min-1086:pt-0 ">
        <ButtonsWithVideo
          target="/auth/login"
          text="ENTRAR"
          src={starwars}
          className="right-0 size-1086:top-14 size-1086:ml-14 size-1086:w-[200px] size-1086:h-[50px] size-1086:left-28
      bg-[#0063e5] absolute
        w-[150px] h-[50px] top-5 left-1/2 transform -translate-x-1/2"
        />
        <div
          className="size-1600:top-36 size-1600:m-14 size-1600:w-1/3 size-1600:h-auto size-1600:items-start size-1600:justify-start
        between-1250-1600:top-32 between-1250-1600:m-14 between-1250-1600:w-1/3 between-1250-1600:h-auto 
        between-1086-1250:top-16 between-1086-1250:m-14 between-1086-1250:size-96 between-1086-1250:h-auto
        max-687:text-xs text-white
        size-96 top-20 w-full mx-auto h-auto
        left-0 absolute"
        >
          <h1 className="m-4 font-bold  max-1086:text-center min-688:text-2xl">
            Os melhores filmes e séries da Marvel, Pixar e muito mais.
          </h1>
          <p className="m-4 max-1086:text-center">
            Filmes de ação, aventura, animações e comédia originais de toda a
            Disney, além de gameficações.
          </p>
        </div>
        <picture className="w-full max-w-full">
          <source media="(min-width: 1086px)" srcSet={banner} />
          <source media="(max-width: 768px)" srcSet={bannersm} />
          <img
            draggable="false"
            src={bannersm}
            alt="Banner"
            className="w-full max-w-full"
          />
        </picture>

        <Table />

        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="mb-4 mt-12 font-bold min-688:text-2xl">
            Quando e onde quiser
          </h1>
          <p className="">
            Aproveite seus favoritos em qualquer momento, em qualquer lugar.
          </p>
          <img
            draggable="false"
            src={lastPhoto}
            alt="Banner"
            className="w-full h-full"
          />
        </div>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <HiChevronUp className=" bottom-0 right-0 size-10 md:size-14 md:bottom-0 m-5 animate-bounce opacity-40" />
        </button>

        <h1 className="mb-4 font-bold min-688:text-2xl">
          Perguntas Frequentes
        </h1>
        <Accordion />
        <Footer />
      </div>
    </HomeZoomEffect>
  );
}
