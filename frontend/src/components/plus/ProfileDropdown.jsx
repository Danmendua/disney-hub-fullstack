import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiHeart,
  HiMiniArrowRightStartOnRectangle,
  HiMiniCog6Tooth,
  HiMiniUser,
} from "react-icons/hi2";
import { useAuthStore } from "../../store/authStore";
import { formatDate, formatYear } from "../../store/formatDate";
import ProfileEditModal from "./ProfileEditModal";

export default function DropDownMenu() {
  const { logout } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    user,
    handleFormSubmit,
    isLoading,
    successMessage,
    clearSuccessMessage,
    error,
  } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const imgRef = useRef(null);

  const dropDownProfile = [
    {
      name: "Favoritos",
      icon: HiHeart,
      path: "/watchlist",
    },
    {
      name: "Avatar",
      icon: HiMiniUser,
      path: "/settings",
    },
    {
      name: "Configurações",
      icon: HiMiniCog6Tooth,
      path: "/settings",
    },
  ];

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !imgRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleClose = () => {
    clearSuccessMessage();
    onClose();
  };

  return (
    <div className="relative hide-on-small select-none">
      <style>
        {`
          @media (max-width: 370px) {
            .hide-on-small {
              display: none;
            }
          }
        `}
      </style>
      <img
        draggable="false"
        ref={imgRef}
        src={user?.profile_picture}
        alt="Profile Image"
        className="w-[40px] rounded-full cursor-pointer"
        onClick={toggleDropdown}
      />
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute text-white right-0 mt-3 w-40 bg-[#121212] border-[1px] border-gray-700 bg-opacity-85 rounded-lg shadow-lg z-20 transition duration-300 ease-in-out"
        >
          <div className="flex flex-col text-center bg-blue-400/25 text-gray-400 rounded-t-lg">
            <div className="text-sm">{user?.nome}</div>
            <div className="text-xs">
              Online desde: {formatDate(user?.last_login)}
            </div>
            <div className="text-xs">
              Criado em: {formatYear(user?.created_at)}
            </div>
          </div>
          <hr className="my-1 mb-[-4px] border-slate-200/50 pb-2" />
          <ul className=" pb-2 text-[15px] font-semibold cursor-pointer">
            {dropDownProfile.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-2 bg-[length:200px_100px] hover:bg-gray-100/15 rounded-lg"
                onClick={() => {
                  if (item.name === "Configurações" || item.name === "Avatar") {
                    handleOpenModal();
                  } else {
                    handleNavigation(item.path);
                  }
                }}
              >
                <item.icon />
                {item.name}
              </div>
            ))}
            <hr className="my-1 mb-[-4px] border-slate-200/50" />
          </ul>
          <div
            className="flex items-center gap-3 text-red-600 px-4 py-2 hover:bg-gray-100/15 rounded-b-lg font-semibold cursor-pointer"
            onClick={handleLogout}
          >
            <HiMiniArrowRightStartOnRectangle />
            Logout
          </div>
        </div>
      )}
      <ProfileEditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        isLoading={isLoading}
        successMessage={successMessage}
        clearSuccessMessage={handleClose}
        error={error}
      />
    </div>
  );
}
