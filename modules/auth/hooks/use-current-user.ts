import { useContext } from "react";
import { UserContext } from "../components/providers/CurrentUserProvider";
import { CurrentUserType } from "@/types/auth.types";

export const useCurrentUser = () => useContext(UserContext) as CurrentUserType;
