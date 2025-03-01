"use client";
import { Task, TaskStatus } from "@/types/task.types";
import React, { createContext, useState, useMemo, useEffect } from "react";

export const TasksContext = createContext<any>(undefined);

type TasksByStatusType = Map<TaskStatus, Task[]>;

const TasksProvider = ({
  children,
  tasks,
}: {
  children: React.ReactNode;
  tasks: Task[];
}) => {
  const [tasksByStatus, setTasksByStatus] = useState<TasksByStatusType>(
    new Map([
      [TaskStatus.PENDING, []],
      [TaskStatus.IN_PROGRESS, []],
      [TaskStatus.COMPLETED, []],
    ])
  );

  useEffect(() => {
    const updatedTasksByStatus = new Map(tasksByStatus);

    for (const task of tasks) {
      updatedTasksByStatus.get(task.status)?.push(task);
    }

    setTasksByStatus(updatedTasksByStatus);
  }, [tasks]);

  function moveTask(task: Task, newStatus: TaskStatus) {
    setTasksByStatus((prevTasksByStatus) => {
      const updatedTasksByStatus = new Map(prevTasksByStatus);

      // Uklanjanje iz starog statusa
      const oldStatusTasks = updatedTasksByStatus.get(task.status) ?? [];
      updatedTasksByStatus.set(
        task.status,
        oldStatusTasks.filter((t) => t._id !== task._id)
      );

      // Dodavanje u novi status
      const newStatusTasks = updatedTasksByStatus.get(newStatus) ?? [];
      updatedTasksByStatus.set(newStatus, [
        ...newStatusTasks,
        { ...task, status: newStatus },
      ]);

      return updatedTasksByStatus;
    });
  }
  const value = useMemo(
    () => ({
      [TaskStatus.PENDING]: tasksByStatus.get(TaskStatus.PENDING),
      [TaskStatus.IN_PROGRESS]: tasksByStatus.get(TaskStatus.IN_PROGRESS),
      [TaskStatus.COMPLETED]: tasksByStatus.get(TaskStatus.COMPLETED),
      moveTask,
    }),
    [tasksByStatus, tasks]
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};

export default TasksProvider;
