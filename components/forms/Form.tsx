"use client";
import React from "react";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";

type FormProps = {
  title: string;
  className?: string;
};

const Form = ({ className = "", title = "" }: FormProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className={`bg-[#4D388D] rounded-3xl p-10 border-gray-200 ${className}`}
    >
      {/** Title */}
      <Text size="xl" variant="h2">
        {title}
      </Text>
      {/** Inputs */}
      <div></div>
      {/** Submit BTN */}
      <Button variant="primary" textProps={{ size: "lg" }}>
        Submit
      </Button>
    </form>
  );
};

export default Form;
