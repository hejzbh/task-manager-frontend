import React from "react";
import Link from "next/link";
import Image from "next/image";
import ROUTES from "@/constants/routes";
import Text from "./Text";

const Logo = ({ className = "" }: { className: string }) => {
  return (
    <Link
      href={ROUTES.DASHBOARD}
      title="Go to home"
      className={`flex items-center space-x-3 active:opacity-70 ${className}`}
    >
      <Image
        loading="lazy"
        src={"/images/logo.webp"}
        alt="Logo"
        width={50}
        height={70}
      />
      <Text className="font-semibold">{process.env.NEXT_PUBLIC_SITENAME}</Text>
    </Link>
  );
};

export default Logo;
