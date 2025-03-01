import { TASK_STATUSES } from "@/types/task.types";
import React from "react";
import GroupedTasksByStatus from "./GroupedTasksByStatus ";

interface TasksListProps {
  className?: string;
}

const TasksList = ({ className = "" }: TasksListProps) => {
  return (
    <ul
      className={`flex items-start space-x-20 overflow-y-scroll ${className}`}
    >
      {TASK_STATUSES?.map((status) => (
        <li key={status}>
          {" "}
          <GroupedTasksByStatus status={status} />
        </li>
      ))}
    </ul>
  );
};

export default TasksList;
