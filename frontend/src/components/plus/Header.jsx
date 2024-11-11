import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { HiHome, HiStar, HiMiniCog6Tooth, HiMiniStar } from "react-icons/hi2";
import { HiPlus, HiDotsVertical } from "react-icons/hi";
import HeaderItem from "./HeaderItem";
import DropdownMenu from "./ProfileDropdown";
export default function Header() {
  const navigate = useNavigate();

  const [toggle, setToggle] = useState(false);

  const menu = [
    {
      name: "HOME",
      icon: HiHome,
      path: "/plus",
      className: "text-white",
    },
    {
      name: "FAVORITOS",
      icon: HiPlus,
      path: "/watchlist",
      className: "text-white",
    },
    {
      name: "404NOTFOUND",
      icon: HiStar,
      path: "/404",
      className: "text-gray-500",
    },
  ];
  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <div className="flex items-center justify-between p-5 select-none fixed top-0 w-full bg-black/50 z-50">
      <div className="flex gap-8 items-center ">
        <img
          draggable="false"
          src={logo}
          alt="Logo Disney"
          className="w-20 md:w-28 object-cover pointer-events-none "
        />
        <div className="hidden md:flex gap-8">
          {menu.map((item, index) => (
            <div key={index} onClick={() => handleNavigation(item.path)}>
              <HeaderItem
                name={item.name}
                Icon={item.icon}
                className={item.className}
              />
            </div>
          ))}
        </div>
        <div className="flex md:hidden gap-5 z-10">
          {menu.map(
            (item, index) =>
              index < 3 && (
                <div key={index} onClick={() => handleNavigation(item.path)}>
                  <HeaderItem
                    name={""}
                    Icon={item.icon}
                    className={item.className}
                  />
                </div>
              )
          )}
          <div className="md:hidden" onClick={() => setToggle(!toggle)}>
            <HeaderItem name={""} Icon={HiDotsVertical} />
            {toggle ? (
              <div className="absolute left-32 mt-3 bg-black/70 border-[1px] border-gray-700 p-3 px-5 py-4 bg-opacity-85 rounded-lg z50">
                {menu.map(
                  (item, index) =>
                    index > 2 && (
                      <div
                        key={index}
                        onClick={() => handleNavigation(item.path)}
                      >
                        <HeaderItem
                          name={item.name}
                          Icon={item.icon}
                          className={item.className}
                        />
                      </div>
                    )
                )}
                <div className="block profile-menu show-only-small">
                  <HeaderItem name="CONFIGURAÇÕES" Icon={HiMiniCog6Tooth} />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 370px) {
          .hide-on-small {
            display: none;
          }
        }
        @media (min-width: 371px) {
          .show-only-small {
            display: none;
          }
        }
      `}</style>
      <DropdownMenu />
    </div>
  );
}
