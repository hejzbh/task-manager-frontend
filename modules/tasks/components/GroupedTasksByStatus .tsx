"use client";
import Separator from "@/components/ui/Separator";
import Text from "@/components/ui/Text";
import { Task, TaskStatus } from "@/types/task.types";
import React from "react";
import { useTasks } from "../hookos/useTasks";
import TaskCard from "./TaskCard";

interface Props {
  status: TaskStatus;
  className?: string;
}

const GroupedTasksByStatus = ({ className = "", status }: Props) => {
  const { [status]: tasks, moveTask } = useTasks();

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const task = e.dataTransfer.getData("drag_start_task");

        if (!task) return;

        moveTask(JSON.parse(task), status);
      }}
      className={`p-5 rounded-lg drop-shadow-md bg-[#030302] min-w-[350px] ${className}`}
    >
      <Text size="md">{status?.toUpperCase()}</Text>
      <Separator />
      <ul className="space-y-5">
        {tasks?.map((task: Task) => (
          <li key={task._id}>
            <TaskCard task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupedTasksByStatus;
