import React from "react";
import disney from "../../assets/images/disney.png";
import marvel from "../../assets/images/marvel.png";
import nationalG from "../../assets/images/nationalG.png";
import pixar from "../../assets/images/pixar.png";
import starwars from "../../assets/images/starwar.png";

import disneyV from "../../assets/videos/disney.mp4";
import marvelV from "../../assets/videos/marvel.mp4";
import nationalGeographicV from "../../assets/videos/national-geographic.mp4";
import pixarV from "../../assets/videos/pixar.mp4";
import starwarsV from "../../assets/videos/star-wars.mp4";

export default function ProductionHouse() {
  const productionHouseList = [
    {
      id: 1,
      name: "Disney",
      image: disney,
      video: disneyV,
      path: "https://www.disneyplus.com/",
    },
    {
      id: 2,
      name: "Pixar",
      image: pixar,
      video: pixarV,
      path: "https://www.pixar.com/",
    },
    {
      id: 3,
      name: "Marvel",
      image: marvel,
      video: marvelV,
      path: "https://www.marvel.com/",
    },
    {
      id: 4,
      name: "Star Wars",
      image: starwars,
      video: starwarsV,
      path: "https://www.starwars.com/",
    },
    {
      id: 5,
      name: "National Geographic",
      image: nationalG,
      video: nationalGeographicV,
      path: "https://www.nationalgeographic.com/",
    },
  ];

  const handleNavigation = (path) => {
    window.open(path, "_blank");
  };

  return (
    <div className="flex gap-2 md:gap-7 p-2 px-5 md:px-16 select-none">
      {productionHouseList.map((item) => (
        <div
          key={item.id}
          onClick={() => handleNavigation(item.path)}
          className="relative border-2 border-gray-600 rounded-lg hover:scale-110 transition-all duration-100 ease-in-out cursor-pointer shadow-lg shadow-black/60 overflow-hidden hover:outline hover:-outline-offset-2 outline-2"
        >
          <video
            src={item.video}
            autoPlay
            loop
            playsInline
            muted
            className="w-full h-full object-cover absolute top-0 left-0 z-0 opacity-0 hover:opacity-50"
          />
          <img
            draggable="false"
            src={item.image}
            className="w-full h-full object-cover z-10 opacity-100 bg-gradient-to-t from-gray-800 to-gray-700"
          />
        </div>
      ))}
    </div>
  );
}
