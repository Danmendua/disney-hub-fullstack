import React from "react";

export default function CustomAccordion() {
  return (
    <ul className="items-center justify-between w-full p-5 font-medium rtl:text-right border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3 max-w-2xl mx-auto mb-5 shadow shadow-blue-800 rounded-xl bg-blue-100 dark:bg-gray-800 dark:text-white text-gray-600 divide-y divide-blue-800">
      <li>
        <details className="group">
          <summary className="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
            <svg
              className="w-5 h-5 text-gray-500 transition group-open:rotate-90"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              ></path>
            </svg>
            <span>É o site da Disney+?</span>
          </summary>

          <article className="px-4 pb-4">
            <div>
              <p className="mb-2 text-gray-600 dark:text-gray-400">
                Já de antemão, eu te confirmo: Não! Mas você pode acessar o site
                e conferir por conta própria!
              </p>
              <ul className="ml-6 list-disc text-gray-500 dark:text-gray-300">
                <li>
                  O site foi feito com intuito de portifólio, mas é completo e
                  você pode usar como preferir!
                </li>
                <li>
                  O intuito do site é favoritar os filmes para te lembrar de
                  assisti-los depois!
                </li>
                <li>
                  Você pode utilizar o site tanto no computador/web quanto pelo
                  celular ou tablets!
                </li>
                <li>
                  Qualquer dúvida, remoções ou direitos, não exite em me chamar!
                </li>
              </ul>
            </div>
          </article>
        </details>
      </li>
      <li>
        <details className="group">
          <summary className="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
            <svg
              className="w-5 h-5 text-gray-500 transition group-open:rotate-90"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              ></path>
            </svg>
            <span>Quais formas de pagamento posso utilizar?</span>
          </summary>

          <article className="px-4 pb-4">
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              O site é totalmente gratuito. Foi colocado os valores apenas para
              mostrar a integração, mas não está disponível a forma de
              pagamento. Caso queira fazer alguma doação colaborativa, pode me
              chamar no{" "}
              <a
                href="https://www.linkedin.com/in/danmendesd/"
                target="true"
                className="hover:text-white ml-1"
              >
                LinkedIn
              </a>
            </p>
          </article>
        </details>
      </li>
      <li>
        <details className="group">
          <summary className="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
            <svg
              className="w-5 h-5 text-gray-500 transition group-open:rotate-90"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              ></path>
            </svg>
            <span>Onde posso assistir ao Disney+?</span>
          </summary>

          <article className="px-4 pb-4">
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Diretamente pelo site deles:{" "}
              <a href="https://www.disneyplus.com/">Disney Plus</a>
            </p>
          </article>
        </details>
      </li>
    </ul>
  );
}
