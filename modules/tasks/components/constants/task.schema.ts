import { z } from "zod";

import { TaskPriority, TaskStatus } from "@/types/task.types";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title should be at least 1 character long" })
    .max(50, { message: "Title shouldn't exceed TITLE_MAX_LENGTH characters" }),
  description: z
    .string()
    .max(50, {
      message: "Description shouldn't exceed DESC_MAX_LENGTH characters",
    })
    .optional(),
  status: z
    .enum([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED])
    .default(TaskStatus.PENDING),
  priority: z
    .enum([TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH])
    .default(TaskPriority.LOW),
  dueDate: z.string().optional(),
});
