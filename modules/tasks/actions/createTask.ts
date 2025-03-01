import { axiosInstance } from "@/lib/axios";
import { TaskFormData } from "@/types/task.types";

export async function createTask(taskData: TaskFormData) {
  try {
    // 1) Verify missing data
    if (!taskData) return;

    // 2) Make api call
    const response = await axiosInstance
      .post("/tasks", taskData)
      .catch((res) => {
        throw new Error(res?.data?.error);
      });

    // 3) Return newly created task
    return response?.data?.data?.task;
  } catch (err: any) {
    throw new Error(err);
  }
}
