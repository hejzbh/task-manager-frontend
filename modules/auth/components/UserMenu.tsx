"use client";
import React, { useState } from "react";
import { useCurrentUser } from "../hooks/use-current-user";
import { getNameFromEmail } from "../utils/helpers";
import Text from "@/components/ui/Text";
import Image from "next/image";

interface UserMenuProps {
  className?: string;
}

const UserMenu = ({ className = "" }: UserMenuProps) => {
  const [opened, setOpened] = useState<boolean>(false);

  const user = useCurrentUser();

  console.log(user);
  if (!user) return null;

  return (
    <div className={`relative ${className}`}>
      {/** Name & Photo (Trigger) */}
      <button
        onClick={() => setOpened((isOpened) => !isOpened)}
        title={`User info`}
        className="flex items-center space-x-3 hover:md:opacity-70 active:opacity-70 transition"
      >
        <Text size="xs" className="hidden md:block">
          {getNameFromEmail(user.email)}
        </Text>
        <Image
          loading="lazy"
          src="/images/user.webp"
          width={35}
          height={35}
          alt="User"
          className="rounded-full w-[37px] h-[37px] object-cover"
        />
      </button>

      {/** Menu */}
      <div
        className={`absolute top-[120%] left-0 w-full p-5 bg-red-300 ${
          !opened && "hidden"
        }`}
      ></div>
    </div>
  );
};

export default UserMenu;
