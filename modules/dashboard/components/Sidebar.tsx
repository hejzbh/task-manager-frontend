import React from "react";
import SidebarLinks from "./SidebarLinks";
import Separator from "@/components/ui/Separator";
import CreateTaskButton from "@/modules/tasks/components/CreateTaskButton";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className = "" }: SidebarProps) => {
  return (
    <aside
      className={`bg-bgColors-sidebar h-full p-5 min-w-[250px] hidden lg:block ${className}`}
    >
      <SidebarLinks />
      <Separator />
      <CreateTaskButton
        includeShortcut
        className="flex flex-col-reverse w-full justify-center items-center"
      />
    </aside>
  );
};

export default Sidebar;
