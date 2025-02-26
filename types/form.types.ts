export type FormFieldType = {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  variant: "input" | "textarea" | "select";
  inputType?: "email" | "password" | "text";
};
