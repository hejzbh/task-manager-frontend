"use client";
import React from "react";
import { TextProps, Text } from "./Text";
import dynamic from "next/dynamic";

const Link = dynamic(() => import("next/link"), { ssr: false });

type ButtonProps = {
  className?: string;
  children: React.ReactNode;
  variant: "primary" | "secondary";
  dataTitle?: string;
  href?: string;
  textProps?: TextProps;
  onClick?: () => void;
};

const Button = ({
  className = "",
  children,
  variant = "secondary",
  textProps = { size: "2xl" },
  href,
  dataTitle = "Click",
  onClick = () => {},
}: ButtonProps) => {
  const defaultClass =
    "relative p-4 px-6 py-3 overflow-hidden border-2 border-purple-500 rounded-full shadow-md group active:opacity-70";

  if (href) {
    return (
      <Link
        className={`${defaultClass} ${className}`}
        href={href}
        title={dataTitle}
      >
        <AnimatedArrow />
        <Text {...textProps}>{children}</Text>
      </Link>
    );
  } else {
    return (
      <button
        className={`${defaultClass} ${className}`}
        onClick={onClick}
        title={dataTitle}
      >
        {" "}
        <AnimatedArrow />
        <Text {...textProps}>{children}</Text>
      </button>
    );
  }
};

function AnimatedArrow() {
  return (
    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 lg:group-hover:translate-x-0 ease">
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        ></path>
      </svg>
    </span>
  );
}

export default Button;
