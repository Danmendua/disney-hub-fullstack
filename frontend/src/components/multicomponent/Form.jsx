import React from "react";

export default function Form({ icon, htmlFor, ...inputProps }) {
  return (
    <div className="max-w-sm mt-5 md:mt-4 flex-col text-black dark:text-white select-none">
      <div className="flex pb-5">
        <span className="inline-flex items-center px-5 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          {icon}
        </span>
        <input
          {...inputProps}
          className="rounded-none rounded-e-lg bg-gray-50 border border-gray-400 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
        />
      </div>
    </div>
  );
}
