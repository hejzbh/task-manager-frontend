import React from "react";

interface SeparatorProps {
  className?: string;
  direction?: "vertical" | "horizontal";
}

const Separator = ({
  className = "",
  direction = "horizontal",
}: SeparatorProps) => {
  return (
    <div
      className={`bg-gray-500 my-5 ${
        direction === "vertical"
          ? "w-[1px] min-h-[40px] h-full mx-3 md:mx-7"
          : "h-[1px] w-full"
      } ${className}`}
    ></div>
  );
};

export default Separator;
