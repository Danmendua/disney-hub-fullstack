import { create } from "zustand";
import axios from "axios";
import { useMovieStore } from "./useMovieStore";
axios.defaults.withCredentials = true;
const API_URL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
import log from "../services/logger";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  setUser: (user) => set({ user }),

  register: async (email, senha, nome, genero, termos) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        senha,
        nome,
        genero,
        termos,
      });
      log.info("Usuário registrado com sucesso:", response.data.usuario);
      set({
        user: response.data.usuario,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      log.error("Erro ao registrar:", error);
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (email, senha, lembrar) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        senha,
        lembrar,
      });
      log.info("Usuário logado com sucesso:", response.data.usuario);
      set({
        user: response.data.usuario,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      log.error("Erro ao fazer login:", error);
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/user/logout`);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        favoriteMovies: [],
      });
      const resetMovies = useMovieStore.getState().resetMovies;
      resetMovies();
    } catch (error) {
      log.error("Erro ao fazer logout:", error);
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
    }
  },

  verifyAccount: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/auth/verify-account`, {
        code,
      });
      log.info("Conta verificada com sucesso:", response.data.usuario);
      set({
        user: response.data.usuario,
        isAuthenticated: true,
        isLoading: false,
      });

      return response.data.usuario;
    } catch (error) {
      log.error("Erro ao verificar a conta:", error);
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Erro ao verificar a conta",
        isLoading: false,
      });
      throw error;
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, {
        email,
      });
      log.info("Email enviado com sucesso:", response.data.message);
      set({ isLoading: false, error: null, message: response.data.message });
    } catch (error) {
      log.error("Erro ao enviar o email:", error);
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Erro ao enviar o email",
        isLoading: false,
      });
      throw error;
    }
  },

  resetPassword: async (token, senha, confirmarSenha) => {
    try {
      const response = await axios.put(
        `${API_URL}/auth/new-password/${token}`,
        {
          senha,
          confirmarSenha,
        }
      );
      log.info("Senha resetada com sucesso:", response.data.message);
      return response.data;
    } catch (error) {
      log.error("Erro ao resetar a senha:", error);
      set({
        error: error.response?.data?.message || error.message,
        isCheckingAuth: false,
        isAuthenticated: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get(`${API_URL}/check/user`, {
        withCredentials: true,
      });
      set({
        user: response.data.usuario,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      if (error.response?.status === 401) {
        set({
          error:
            "Usuário não autenticado, você pode fazer login ou registrar-se.",
          isCheckingAuth: false,
          isAuthenticated: false,
        });
      } else {
        set({
          error: error.response?.data?.message || error.message,
          isCheckingAuth: false,
        });
      }

      set({
        error: error.response?.data?.message || error.message,
        isCheckingAuth: false,
        isAuthenticated: false,
      });
      log.error("Error checking auth:", error);
    }
  },

  checkCookies: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check/cookie`, {
        withCredentials: true,
      });

      const { isAuthenticated, role, usuario } = response.data;

      if (isAuthenticated && role === "user") {
        set({
          isAuthenticated: true,
          user: usuario,
          isCheckingAuth: false,
        });
      } else {
        set({
          isAuthenticated: false,
          user: null,
          isCheckingAuth: false,
          error: null,
        });
      }
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isAuthenticated: false,
        isCheckingAuth: false,
      });
      log.error("Error checking cookies:", error);
    }
  },

  handleFormSubmit: async (formData) => {
    set({ isLoading: true, error: null });
    const data = new FormData();
    if (formData.nome) data.append("nome", formData.nome);
    if (formData.senha) data.append("senha", formData.senha);
    if (formData.novaSenha) data.append("novaSenha", formData.novaSenha);
    if (formData.genero) data.append("genero", formData.genero);
    if (formData.avatar) data.append("avatar", formData.avatar);

    try {
      const response = await axios.put(`${API_URL}/user/update-user`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      log.info("Perfil atualizado com sucesso:", response.data);
      set((state) => ({
        user: { ...state.user, ...response.data },
        isLoading: false,
        successMessage:
          "Informações atualizadas com sucesso. As mudanças estarão visíveis no próximo login ou ao recarregar a pagina.",
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      log.error("Erro ao atualizar perfil:", error);
      throw error;
    }
  },
  clearSuccessMessage: () => set({ successMessage: "" }),
}));
