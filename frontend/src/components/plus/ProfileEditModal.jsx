import React, { useState } from "react";
import Form from "../multicomponent/Form";
import { HiMiniLockClosed, HiMiniUser } from "react-icons/hi2";
import FileUploadButton from "../multicomponent/FileUploadButton";
import { ImSpinner2 } from "react-icons/im";
import PasswordStrengthMeter from "../multicomponent/PasswordStrengthMeter";

export default function ProfileEditModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  successMessage,
  clearSuccessMessage,
  error,
}) {
  const [formData, setFormData] = useState({
    nome: "",
    senha: "",
    novaSenha: "",
    genero: "",
    avatar: null,
  });

  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "novaSenha") {
      setShowPasswordStrength(true);
    }
  };

  const handleFileChange = (file) => {
    setFormData((prev) => ({ ...prev, avatar: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.senha && !formData.novaSenha) {
      setFormError("Para alterar a senha, forneça a nova senha.");
      return;
    }
    if (!formData.senha && formData.novaSenha) {
      setFormError("Para alterar a senha, insira a senha atual.");
      return;
    }

    setFormError(null);
    await onSubmit(formData);
  };

  if (!isOpen) return null;

  const handleClose = () => {
    clearSuccessMessage();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50">
      <div
        className={`${
          error
            ? "shadow-[5px_5px_0px_0px_rgba(255,0,0,0.5)]"
            : "shadow-[5px_5px_0px_0px_rgba(14,165,233,0.5)]"
        } bg-gradient-to-br from-rose-300/50 to-emerald-500/70 dark:from-slate-900/50 dark:to-slate-800/70 rounded-lg sm:w-80 md:w-96 p-5`}
      >
        <h2 className="text-2xl mb-4 text-center font-semibold">
          Editar Informações do Perfil
        </h2>
        {successMessage ? (
          <div className="text-center text-white mt-4">
            <p>{successMessage}</p>
            <button
              onClick={handleClose}
              className="mt-4 relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Fechar
              </span>
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <Form
                icon={<HiMiniUser />}
                htmlFor="nome"
                placeholder="Nome"
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
              />
              <Form
                icon={<HiMiniLockClosed />}
                htmlFor="senha"
                placeholder="Senha Antiga"
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
              />
              <Form
                icon={<HiMiniLockClosed />}
                htmlFor="novaSenha"
                placeholder="Nova Senha"
                type="password"
                name="novaSenha"
                value={formData.novaSenha}
                onChange={handleChange}
              />
              {showPasswordStrength && (
                <div className="mb-12 -mt-10">
                  <PasswordStrengthMeter password={formData.novaSenha} />
                </div>
              )}
              <div className="flex pb-5 mt-5 md:mt-4">
                <span className="inline-flex items-center px-5 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <HiMiniUser />
                </span>
                <select
                  name="genero"
                  value={formData.genero}
                  onChange={handleChange}
                  className="rounded-none rounded-e-lg bg-gray-50 border border-gray-400 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
                >
                  <option value="" hidden>
                    Selecione o gênero
                  </option>
                  <option value="Feminino">Feminino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <FileUploadButton onFileChange={handleFileChange} />
              {formError && (
                <p className="text-red-500 font-semibold -mt-2 mb-2 text-start">
                  {formError}
                </p>
              )}
              {error && (
                <p className="text-red-500 font-semibold -mt-2 mb-2 text-start">
                  {error}
                </p>
              )}
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Cancelar
                </button>

                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 rounded-lg">
                    <ImSpinner2 className="w-7 h-7 text-lg animate-spin text-white" />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="relative inline-flex items-center justify-center p-0.5  overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                  >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Salvar
                    </span>
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
