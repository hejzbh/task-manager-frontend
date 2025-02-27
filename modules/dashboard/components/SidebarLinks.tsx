"use client";
import Text from "@/components/ui/Text";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { GrTask } from "react-icons/gr";
import { IconType } from "react-icons";

interface SidebarLinksProps {
  className?: string;
}

type SidebarLink = {
  name: string;
  href: string;
  Icon: IconType;
};

const links: SidebarLink[] = [
  { name: "Home", href: ROUTES.DASHBOARD, Icon: IoHomeOutline },
  { name: "Tasks", href: ROUTES.TASKS, Icon: GrTask },
];

const SidebarLinks = ({ className = "" }: SidebarLinksProps) => {
  const pathname = usePathname();
  return (
    <ul className={`${className}`}>
      {links?.map((link) => {
        const isActive = pathname === link.href;

        return (
          <li className={""} key={link.href}>
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
        );
      })}
    </ul>
  );
};

export default SidebarLinks;
