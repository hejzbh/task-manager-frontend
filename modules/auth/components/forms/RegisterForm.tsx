"use client";
import React from "react";
import Form from "@/components/forms/Form";
import { z } from "zod";
import Text from "@/components/ui/Text";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { authFormFields } from "../../constants/authFields";

const registerSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address.")
    .max(50, "E-mail should not exceed 50 characters."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(50, "Password should not exceed 50 characters."),
});

const RegisterForm = () => {
  async function register() {}

  return (
    <Form
      title="Create your account"
      schema={registerSchema}
      fields={authFormFields}
      className="lg:min-w-[550px]"
      onSubmit={register}
    >
      <Text>
        Already have an account?{" "}
        <Link
          className="text-textColors-link"
          title="Display Login Form"
          href={ROUTES.LOGIN}
        >
          Log in here.
        </Link>
      </Text>
    </Form>
  );
};

export default RegisterForm;
