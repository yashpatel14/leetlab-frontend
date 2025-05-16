import { create } from "zustand";
import  axiosInstance  from "../helpers/axiosInstance";
import { toast } from "sonner";


export const useActions = create((set) => ({
    isDeletingProblem: false,
    onDeleteProblem: async (id) => {
        try {
            set({ isDeletingProblem: true });
            const res = await axiosInstance.delete(`/problems/delete-problem/${id}`);
            toast(res.data.message);
        } catch (error) {
            console.log("Error deleting problem", error);
            toast("Error deleting problem");
        }
        finally{
            set({ isDeletingProblem: false });
        }
    }
}));