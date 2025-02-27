"use client";
import React from "react";
import Form from "@/components/forms/Form";
import { z } from "zod";
import Text from "@/components/ui/Text";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { authFormFields } from "../../constants/authFields";
import { useToasts } from "@/hooks/use-toasts";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";

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
  const { showToast } = useToasts();
  const router = useRouter();

  async function register(data: { email: string; password: string }) {
    try {
      // 1) If data is not defined (Impossible, but nice to have check.)
      if (!data?.email || !data.password) return;

      // 2) Register request
      const response = await axiosInstance
        .post(`/auth/register`, data)
        .catch((res) => {
          throw new Error(res.response.data.error); // custom error from backend
        });

      if (response?.data?.success) {
        showToast({
          message:
            response?.data?.message ||
            "You've successfully created account. Log in.",
          variant: "success",
        });
        router.push(ROUTES.LOGIN);
      }
      // 3)
    } catch (err: any) {
      // Show error message
      showToast({
        message: err.message,
        variant: "error",
      });
    }
  }
  return (
    <Form
      title="Create your account"
      schema={registerSchema}
      fields={authFormFields}
      className="lg:min-w-[550px]"
      formClassName="bg-[#4D388D]"
      fieldClassName="!text-white !bg-[unset]"
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
