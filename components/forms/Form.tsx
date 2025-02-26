"use client";
import React from "react";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFieldType } from "@/types/form.types";
import dynamic from "next/dynamic";

const FormField = dynamic(() => import("@/components/ui/FormField"));

type FormProps = {
  title: string;
  className?: string;
  fields: FormFieldType[];
  onSubmit: (data?: any) => Promise<any>;
  defaultValues?: any; // TODO: Add type
  schema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
  children?: React.ReactNode;
};

const Form = ({
  className = "",
  title = "",
  children,
  schema,
  defaultValues,
  fields = [],
  onSubmit = async () => {},
}: FormProps) => {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <div
      className={`${
        children ? "flex flex-col items-center space-y-5" : ""
      } ${className}`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`bg-[#4D388D] rounded-3xl p-10 w-full border-gray-200`}
      >
        {/** Title */}
        <Text size="lg" variant="h2">
          {title}
        </Text>

        {/** Fields */}
        <div className="my-10 space-y-3">
          {fields?.map((field) => (
            <FormField
              key={field.name}
              {...field}
              register={register}
              errorMsg={formState.errors[field.name]?.message as string}
            />
          ))}
        </div>

        {/** Submit BTN */}
        <Button
          variant="primary"
          className=" float-right"
          textProps={{ size: "md" }}
        >
          Submit
        </Button>
      </form>

      {children}
    </div>
  );
};

export default Form;
