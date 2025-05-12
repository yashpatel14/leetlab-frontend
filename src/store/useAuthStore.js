import { create } from "zustand";
import  axiosInstance  from "../helpers/axiosInstance.js";
import { toast } from "sonner";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigninUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/users/check");
      console.log("checkauth response", res.data);

      set({ authUser: res.data.data });
    } catch (error) {
      console.log("❌ Error checking auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post("/users/register", data);
      set({ authUser: res.data.data });

      toast(res.data.message);
    } catch (error) {
      console.log("Error signing up", error);
      toast("Error signing up");
    } finally {
      set({ isSigninUp: false });
    }
  },
  login: async (data) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post("/users/login", data);
      set({ authUser: res.data.data });
      toast(res.data.message);
    } catch (error) {
      console.log("Error logging in", error);
      toast("Error logging in");
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/users/logout");
      set({ authUser: null });

      toast("Logout successful");
    } catch (error) {
      console.log("Error logging out", error);
      toast("Error logging out");
    }
  },
}));
