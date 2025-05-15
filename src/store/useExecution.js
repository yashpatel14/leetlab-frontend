import { create } from "zustand";
import  axiosInstance  from "../helpers/axiosInstance";
import { toast } from "sonner";


export const useExecutionStore = create((set, get) => ({
    isExecuting: false,
    submission: null,


    executeCode:async ( source_code, language_id, stdin, expected_outputs, problemId)=>{
        try {
            set({isExecuting:true});
            console.log("Submission:",JSON.stringify({
                source_code,
                language_id,
                stdin,
                expected_outputs,
                problemId
            }));
            const res = await axiosInstance.post("/execute-code/" , { source_code, language_id, stdin, expected_outputs, problemId });

            set({submission:res.data.data});
      
            toast(res.data.message);
        } catch (error) {
            console.log("Error executing code",error);
            toast("Error executing code");
        }
        finally{
            set({isExecuting:false});
        }
    }
}));