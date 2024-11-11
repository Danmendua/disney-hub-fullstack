import React from "react";
import { useNavigate } from "react-router-dom";

export default function Table() {
  const navigate = useNavigate();
  const xTable = (
    <svg
      className="flex-shrink-0 w-4 mr-1 ml-1 h-6 text-red-600/60"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 14"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
      />
    </svg>
  );

  const yTableGray = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-shrink-0 w-6 h-6 text-gray-500"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
  const yTableGreen = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-shrink-0 w-6 h-6 text-sky-400"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );

  return (
    <div className="">
      <div>
        <h2 className="text-2xl font-bold tracki text-center mt-12 sm:text-5xl ">
          Que plano você vai escolher?
        </h2>
        <p className="max-w-3xl mx-auto mt-4 text-center">
          Você pode alterar ou cancelar seu plano quando quiser.
        </p>
      </div>
      <div className="mt-12 container space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
        <div className="relative p-8  border border-gray-600 text-gray-400 rounded-2xl shadow-sm flex flex-col">
          <div className="flex-1">
            <h3 className="text-xl font-semibold ">Padrão</h3>
            <p className="mt-4 flex items-baseline ">
              <span className="text-5xl font-extrabold tracking-tight">
                R$999,99
              </span>
              <span className="ml-1 text-xl font-semibold">/mês</span>
            </p>
            <p className="mt-2 text-xs">R$ 999,99/mês (inclui impostos)**</p>
            <ul role="list" className="mt-6 space-y-6">
              <li className="flex">
                {yTableGray}
                <span className="ml-3">
                  Favorite seus filmes para assistir mais tarde
                </span>
              </li>
              <li className="flex">
                {xTable}
                <span className="ml-3 ">Gameficação de cinéfilo</span>
              </li>
              <li className="flex">
                {xTable}
                <span className="ml-3 ">Atualizações futuras</span>
              </li>
            </ul>
          </div>
          <button
            type="button"
            className="text-gray-900 focus:outline-none bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
            onClick={() => navigate("/auth/register")}
          >
            <span>Compre já! (ou não)</span>
          </button>
        </div>
        <div className="relative p-8  border border-gray-200 rounded-2xl shadow-sm flex flex-col">
          <div className="flex-1">
            <h3 className="text-xl font-semibold ">Premium</h3>
            <p className="absolute top-0 py-1.5 px-4 bg-sky-500 text-white rounded-full text-xs font-semibold uppercase tracking-wide  transform -translate-y-1/2">
              Mais popular
            </p>
            <p className="mt-4 flex items-baseline ">
              <span className="text-5xl font-extrabold tracking-tight">
                R$0,00
              </span>
              <span className="ml-1 text-xl font-semibold">/mês</span>
            </p>
            <p className="mt-2 text-xs">Zero impostos!</p>
            <ul role="list" className="mt-6 space-y-6">
              <li className="flex">
                {yTableGreen}
                <span className="ml-3">
                  Favorite seus filmes para assistir mais tarde
                </span>
              </li>
              <li className="flex">
                {yTableGreen}
                <span className="ml-3 ">Gameficação de cinéfilo</span>
              </li>
              <li className="flex">
                {yTableGreen}
                <span className="ml-3 ">Futuras atualizações</span>
              </li>
              <li className="flex">
                {yTableGreen}
                <span className="ml-3 ">Ser extremamente atraente</span>
              </li>
              <li className="flex">
                {yTableGreen}
                <span className="ml-3 ">
                  Só se inscreve quem é inteligente!
                </span>
              </li>
            </ul>
          </div>
          <button
            type="button"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 text-white mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
            onClick={() => navigate("/auth/register")}
          >
            <span>Registre totalmente grátis!</span>
          </button>
        </div>
      </div>
    </div>
  );
}
