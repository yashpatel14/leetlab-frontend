
import { create } from "zustand";
import  axiosInstance  from "../helpers/axiosInstance.js";
import { toast } from "sonner";

export const useProblemStore = create((set, get) => ({
  isProblemLoading: false,
  isProblemsLoading: false,
  problems: [],
  problem: null,
  solvedProblems: [],

  getAllProblems: async () => {
    try {
      set({ isProblemsLoading: true });
      const res = await axiosInstance.get("/problems/get-all-problems");

    //   console.log(res)

      set({ problems: res.data.data });

     
    } catch (error) {
      console.log("Error getting all problems", error);
      toast("Error getting all problems");
    } finally {
      set({ isProblemsLoading: false });
    }
  },

  getProblemById: async (id) => {
    try {
      set({ isProblemLoading: true });
      const res = await axiosInstance.get(`/problems/get-problem/${id}`);

      set({ problem: res.data.data });

      toast(res.data.message);
    } catch (error) {
      console.log("Error getting problem", error);
      toast("Error getting problem");
    } finally {
      set({ isProblemLoading: false });
    }
  },

  getSolvedProblemByUser: async () => {
    try {
      const res = await axiosInstance.get("/problems/get-solved-problems");

      set({ solvedProblems: res.data.data });
    } catch (error) { 
      console.log("Error getting solved problems", error);
      toast("Error getting solved problems");
    }
  },

}));
