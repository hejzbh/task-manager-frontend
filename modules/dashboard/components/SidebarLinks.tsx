"use client";
import Text from "@/components/ui/Text";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";

import { GrTask } from "react-icons/gr";
import { IconType } from "react-icons";
import RequireRole from "@/components/RequireRole";
import { UserRole } from "@/types/auth.types";

interface SidebarLinksProps {
  className?: string;
}

type SidebarLink = {
  name: string;
  href: string;
  Icon: IconType;
  requiredRole?: UserRole;
};

const links: SidebarLink[] = [
  { name: "Home", href: ROUTES.DASHBOARD, Icon: IoHomeOutline },
  { name: "Tasks", href: ROUTES.TASKS, Icon: GrTask },
  {
    name: "Users",
    href: ROUTES.USERS,
    Icon: FiUsers,
    requiredRole: UserRole.ADMIN,
  },
];

const SidebarLinks = ({ className = "" }: SidebarLinksProps) => {
  const pathname = usePathname();
  return (
    <ul className={`space-y-2 ${className}`}>
      {links?.map((link) => {
        const isActive = pathname === link.href;

        return (
          <RequireRole key={link.href} requiredRole={link.requiredRole}>
            <li
              className={`transition ${
                isActive
                  ? "bg-black/20"
                  : "hover:md:bg-black/20 active:bg-black/20"
              } rounded-lg`}
            >
              <Link
                href={link.href}
                className="p-3 flex items-center space-x-3 rounded-md"
                title={`Navigate to ${link.name}`}
              >
                <link.Icon className="text-lg" />
                <Text size="sm" className="text-textColors-label">
                  {link.name}
                </Text>
              </Link>
            </li>
          </RequireRole>
        );
      })}
    </ul>
  );
};

export default SidebarLinks;
