"use client";
import React from "react";
import Text from "@/components/ui/Text";
import Separator from "@/components/ui/Separator";
import { createTaskSchema } from "../constants/task.schema";
import Form from "@/components/forms/Form";
import { taskFormFields } from "../constants/taskFields";
import { TaskFormData } from "@/types/task.types";
import { useToasts } from "@/hooks/use-toasts";
import { axiosInstance } from "@/lib/axios";

const CreateTaskModal = () => {
  const { showToast } = useToasts();

  async function createTask(taskData: TaskFormData) {
    if (!taskData) return;

    try {
      // 1) Make api request
      const response = await axiosInstance.post(`/tasks`, taskData);
    } catch (err: any) {
      showToast({
        variant: "error",
        message: err.message,
      });
    }
  }

  return (
    <div>
      <Text size="lg">Create new task</Text>
      <Separator />
      <Form
        fields={taskFormFields}
        schema={createTaskSchema}
        onSubmit={createTask}
        formClassName="!p-0"
      />
    </div>
  );
};

export default CreateTaskModal;
