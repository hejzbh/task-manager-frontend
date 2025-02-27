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

const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address.")
    .max(50, "E-mail should not exceed 50 characters."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(50, "Password should not exceed 50 characters."),
});

const LoginForm = () => {
  const { showToast } = useToasts();
  const router = useRouter();

  async function login(data: { email: string; password: string }) {
    try {
      // 1) If data is not defined (Impossible, but nice to have check.)
      if (!data?.email || !data.password) return;

      // 2) Login request
      const response = await axiosInstance
        .post(`/auth/login`, data)
        .catch((res) => {
          throw new Error(res.response.data.error); // custom error from backend
        });

      if (response?.data?.data?.user) {
        console.log("redirecting");
        showToast({
          message: "Welcome to the application",
          variant: "success",
        });
        router.push(ROUTES.DASHBOARD);
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
      title="Login into your account"
      schema={loginSchema}
      fields={authFormFields}
      onSubmit={login}
      className="lg:min-w-[550px]"
      formClassName="bg-[#4D388D]"
      fieldClassName="!text-white !bg-[unset]"
    >
      <Text>
        Don't have an account?{" "}
        <Link
          title="Display register form"
          className="text-textColors-link"
          href={ROUTES.REGISTER}
        >
          Register now.
        </Link>
      </Text>
    </Form>
  );
};

export default LoginForm;
