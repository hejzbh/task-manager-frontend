import { FormFieldType } from "@/types/form.types";
import { TaskStatus, TaskPriority } from "@/types/task.types";
export const taskFormFields: FormFieldType[] = [
  {
    name: "title",
    label: "Title",
    variant: "input",
    placeholder: "Enter task's title",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    variant: "input",
    placeholder: "Say something about...",
  },
  {
    name: "status",
    label: "Status",
    variant: "select",
    options: [TaskStatus.COMPLETED, TaskStatus.IN_PROGRESS, TaskStatus.PENDING],
  },
  {
    name: "priority",
    label: "Priority",
    variant: "select",
    options: [TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH],
  },
  {
    name: "dueDate",
    label: "Deadline (Due date)",
    variant: "input",
    inputType: "date",
  },
];
