export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN PROGRESS",
  COMPLETED = "COMPLETED",
}

export type Task = {
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  createdAt: string;
};

export type TaskFormData = Omit<Task, "createdAt">;
