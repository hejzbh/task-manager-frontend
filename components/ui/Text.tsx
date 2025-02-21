"use client";
import React from "react";

export type TextProps = {
  className?: string;
  variant?: "p" | "span" | "h1" | "h2";
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl";
  children?: React.ReactNode;
};

export const Text = React.memo(
  ({ className = "", variant = "p", size = "3xl", children }: TextProps) => {
    const Element = variant;
    const sizeClasses = {
      xs: "text-[0.725rem] sm:text-[0.75rem] md:text-[0.875rem]",
      sm: "text-[0.9rem] sm:text-[0.875rem] md:text-[0.95rem]",
      md: "text-[1.05rem] sm:text-[0.9375rem] md:text-[0.95rem] xl:text-[1.05rem]",
      lg: "text-[1.125rem] sm:text-[1.1rem] md:text-[1.225rem]",
      xl: "text-[1.4rem] sm:text-[1.25rem] md:text-[1.75rem] lg:text-[1.3rem]",
      "2xl": "text-[1.75rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[1.75rem]",
      "3xl": "text-[2rem] sm:text-[1.75rem] md:text-[2.25rem] lg:text-[2rem]",
      "4xl": "text-[1.4rem] sm:text-[2rem] md:text-[2.75rem] lg:text-[2.5rem]",
      "5xl": "text-[3rem] sm:text-[2.5rem] md:text-[3.25rem] lg:text-[3rem]",
      "6xl": "text-[3rem] sm:text-[3rem] md:text-[4rem] lg:text-[4.5rem]",
    };

    return (
      <Element
        style={{ lineHeight: "1.2" }}
        className={`${sizeClasses[size]} ${className}`}
      >
        {children}
      </Element>
    );
  }
);

export default Text;
