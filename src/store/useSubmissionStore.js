import { create } from "zustand";
import  axiosInstance  from "../helpers/axiosInstance";
import { toast } from "sonner";

export const useSubmissionStore = create((set, get) => ({
  isLoading: false,
  submissions: [],
  submission: null,
  submissionCount: null,

  getAllSubmissions: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/submission/get-all-submissions");

      set({ submissions: res.data.data });

      toast(res.data.message);
    } catch (error) {
      console.log("Error getting all submissions", error);
      toast("Error getting all submissions");
    } finally {
      set({ isLoading: false });
    }
  },

  getSubmissionForProblem: async (problemId) => {
    try {
      const res = await axiosInstance.get(
        `/submission/get-submission/${problemId}`
      );

      set({ submission: res.data.data });

      

    } catch (error) {
      console.log("Error getting submissions for problem", error);

      toast("Error getting submissions for problem");
      
    } finally {
      set({ isLoading: false });
    }
  },

  getSubmissionCountForProblem: async (problemId) => {
    try {
      const res = await axiosInstance.get(
        `/submission/get-submissions-count/${problemId}`
      );                

      set({ submissionCount: res.data.data });
    } catch (error) {
      console.log("Error getting submission count for problem", error);
      toast("Error getting submission count for problem");
    }
  },
}));
