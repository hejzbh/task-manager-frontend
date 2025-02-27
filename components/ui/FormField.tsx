"use client";
import React, { useMemo } from "react";
import { UseFormRegister } from "react-hook-form";
import { FormFieldType } from "@/types/form.types";
import dynamic from "next/dynamic";

const Text = dynamic(() => import("@/components/ui/Text"));

type FormFieldProps = {
  className?: string;
  errorMsg?: string | null | undefined;
  register: UseFormRegister<any>;
} & FormFieldType;

const FormField = React.memo(
  ({
    className = "",
    name,
    label,
    placeholder,
    variant,
    inputType = "text",
    required,
    register,
    errorMsg,
    options = [],
  }: FormFieldProps) => {
    const commonProps = useMemo(
      () => ({
        id: name,
        placeholder,
        className: `w-full rounded-lg text-sm border p-3  text-[#FFFCF2] bg-[#27272A] outline-none resize-none ${
          errorMsg ? "border-error" : "border-gray-600"
        } ${className}`,
        "aria-describedby": errorMsg ? `${name}-error` : undefined,
        ...register(name, { required }),
      }),
      [name, placeholder, errorMsg, register]
    );

    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        {/** Label */}
        <label htmlFor={name} className="text-textColors-label font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        {/** Input */}
        {variant === "input" && <input type={inputType} {...commonProps} />}

        {/** Textarea */}
        {variant === "textarea" && (
          <textarea rows={4} cols={4} {...commonProps} />
        )}

        {/** Select */}
        {variant === "select" && (
          <select {...commonProps}>
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}

        {/** Error */}
        {errorMsg && (
          <Text size="sm" className="text-textColors-error">
            {errorMsg}
          </Text>
        )}
      </div>
    );
  }
);

export default FormField;
