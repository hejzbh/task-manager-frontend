import { FormFieldType } from "@/types/form.types";

export const authFormFields: FormFieldType[] = [
  {
    name: "email",
    label: "E-Mail",
    variant: "input",
    placeholder: "example@provider.com",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    variant: "input",
    inputType: "password",
    placeholder: "********",
    required: true,
  },
];
