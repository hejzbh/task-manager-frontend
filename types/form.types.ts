export type FormFieldType = {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  variant: "input" | "textarea" | "select" | "date-picker";
  inputType?: "email" | "password" | "text" | "date";
  options?: string[];
};
