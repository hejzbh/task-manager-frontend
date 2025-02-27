"use client";
import { CurrentUserType } from "@/types/auth.types";
import React, { createContext, useEffect, useState } from "react";
import { useSession } from "../../hooks/use-session";

export const UserContext = createContext<CurrentUserType | null | undefined>(
  undefined
);

const CurrentUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<CurrentUserType | null | undefined>();

  useEffect(() => {
    useSession().then((res) => {
      if (res?.user) {
        setUser(res?.user);
      }
    });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default CurrentUserProvider;
