import { useCurrentUser } from "@/modules/auth/hooks/use-current-user";
import { UserRole } from "@/types/auth.types";
import React from "react";

const RequireRole = ({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole: UserRole | undefined;
}) => {
  // 1) Every user can see this content
  if (!requiredRole || requiredRole === UserRole.USER) return children;

  const user = useCurrentUser();

  if (!user?.role) return null;

  // 2) If user needs to be ADMIN
  if (requiredRole === UserRole.ADMIN && user.role === requiredRole)
    return children;

  return null; // If user doesnt meet role requirements hes not able to see content wrapped by this componet
};

export default RequireRole;
