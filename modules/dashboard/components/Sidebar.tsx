import React from "react";
import SidebarLinks from "./SidebarLinks";
import Separator from "@/components/ui/Separator";
import Shortcut from "@/components/ui/Shortcut";

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
      <Shortcut keys={["CTRL", "D"]} />
    </aside>
  );
};

export default Sidebar;
