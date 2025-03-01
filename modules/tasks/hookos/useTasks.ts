import { useContext } from "react";
import { TasksContext } from "../components/providers/TasksProvider";

export const useTasks = () => useContext(TasksContext);
