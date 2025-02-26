"use client";
import { useToasts } from "@/hooks/use-toasts";
import React from "react";
import Text from "@/components/ui/Text";

const ToastsProvider = () => {
  const { toasts } = useToasts();

  if (!toasts.length) return null;

  return (
    <div className={`absolute top-5 left-[50%] translate-x-[-50%] !z-[20000]`}>
      {toasts?.map((toast, i) => (
        <div
          className={`min-w-[250px] p-4 rounded-2xl shadow-lg absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
            toast.variant === "error" ? "bg-error" : "bg-success"
          }`}
          key={toast.id}
          style={{
            top: `${i * 30}px`,
            zIndex: 20000 - i,
            opacity: 1 - i * 0.2,
          }}
        >
          <Text size="md">{toast.message}</Text>
        </div>
      ))}
    </div>
  );
};

export default ToastsProvider;
