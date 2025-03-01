"use client";
import React from "react";
import Text from "@/components/ui/Text";
import Separator from "@/components/ui/Separator";
import { createTaskSchema } from "../../constants/task.schema";
import Form from "@/components/forms/Form";
import { taskFormFields } from "../../constants/taskFields";
import { TaskFormData } from "@/types/task.types";
import { useToasts } from "@/hooks/use-toasts";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal";
import { createTask } from "../../actions/createTask";

const CreateTaskModal = () => {
  const { showToast } = useToasts();
  const { closeModal } = useModal();
  const router = useRouter();

  async function onSubmit(taskData: TaskFormData) {
    if (!taskData) return;

    try {
      // 1) Create task
      await createTask(taskData);

      // 2) Refresh
      router.refresh();

      // 3) Show success msg & close modal
      showToast({
        message: "You've successfully created a new task",
        variant: "success",
      });
      closeModal();
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
        onSubmit={onSubmit}
        formClassName="!p-0"
      />
    </div>
  );
};

export default CreateTaskModal;
