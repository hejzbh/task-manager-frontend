import React from "react";
import Logo from "@/components/ui/Logo";
import UserMenu from "@/modules/auth/components/UserMenu";
import CreateTaskButton from "@/modules/tasks/components/CreateTaskButton";
import Separator from "@/components/ui/Separator";

interface HeaderProps {
  className?: string;
}

const Header = ({ className = "" }: HeaderProps) => {
  return (
    <header
      className={`bg-bgColors-header h-16 p-5 sticky top-0 flex items-center justify-between ${className}`}
    >
      <Logo />
      <div className="flex items-center">
        Filters
        <Separator direction="vertical" />
        <CreateTaskButton />
        <Separator direction="vertical" />
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
