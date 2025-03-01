import Text from "@/components/ui/Text";
import { Task } from "@/types/task.types";
import { truncString } from "@/utils/helpers";
import React from "react";

interface TaskCardProps {
  task: Task;
  className?: string;
}

const TaskCard = ({ task, className }: TaskCardProps) => {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("drag_start_task", JSON.stringify(task));
      }}
      className={`p-4 rounded-lg bg-bgColors-task ${className}`}
    >
      <Text>{truncString(task.title, 30)}</Text>
    </div>
  );
};

export default TaskCard;
