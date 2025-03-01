import { axiosInstance } from "@/lib/axios";
import { cookies } from "next/headers";
import React from "react";
import TasksProvider from "@/modules/tasks/components/providers/TasksProvider";
import TasksList from "@/modules/tasks/components/TasksList";

async function getTasks() {
  try {
    const nextCookies = await cookies();
    const response = await axiosInstance.get("/tasks", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${nextCookies.get("accessToken")?.value}`,
      },
    });

    return response?.data?.data?.tasks;
  } catch (err: any) {
    return [];
  }
}

async function TasksPage() {
  const tasks = await getTasks();

  return (
    <TasksProvider tasks={tasks}>
      <TasksList />
    </TasksProvider>
  );
}

export default TasksPage;
