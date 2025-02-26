"use client";
import React from "react";

export type TextProps = {
  className?: string;
  variant?: "p" | "span" | "h1" | "h2";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  children?: React.ReactNode;
};

const sizeClasses = {
  xs: "text-[0.725rem] sm:text-[0.75rem] md:text-[0.875rem]",
  sm: "text-[0.8rem] sm:text-[0.875rem] md:text-[0.95rem]",
  md: "text-[1rem] sm:text-[1.1rem] md:text-[1.150rem]",
  lg: "text-[1.180rem] sm:text-[1.35rem] md:text-[1.45rem] xl:text-[1.55rem]",
  xl: "text-[1.5rem] sm:text-[1.6rem] md:text-[1.75rem] xl:text-[1.9rem]",
  "2xl": "text-[1.3rem] sm:text-[1.5rem] md:text-[2rem] xl:text-[2.4rem]",
  "3xl": "text-[2.2rem] sm:text-[2.7rem] md:text-[3.4rem] xl:text-[4.2rem]",
};

export const Text = React.memo(
  ({ className = "", variant = "p", size = "xs", children }: TextProps) => {
    const Element = variant;

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
