import React, { useState, useRef } from "react";

export default function FileUploadButton({ onFileChange }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
      if (onFileChange) onFileChange(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="mb-3">
      <label className="block font-medium mb-1">
        Foto de Perfil (JPG, JPEG, PNG)
      </label>

      <input
        ref={fileInputRef}
        type="file"
        name="avatar"
        accept="image/jpeg, image/png, image/jpg"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={handleButtonClick}
        className=" bg-blue-500 relative inline-flex items-center justify-center p-0.5  overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          {selectedFile ? selectedFile.name : "Escolher Arquivo"}
        </span>
      </button>

      {filePreview && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Pré-visualização:</p>
          <img
            src={filePreview}
            alt="Preview do Avatar"
            className="w-24 h-24 rounded-full object-cover mx-auto shadow-lg"
          />
        </div>
      )}
    </div>
  );
}
