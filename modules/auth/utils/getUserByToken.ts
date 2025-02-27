"use server";
import { axiosInstance } from "@/lib/axios";
import { CurrentUserType } from "@/types/auth.types";

const cache = new Map();
let userPromise: Promise<CurrentUserType> | null = null;

export const getUserByToken = async (
  token: string
): Promise<CurrentUserType | null> => {
  if (!token) return null;

  if (userPromise) return userPromise;

  const cachedUser = cache.get(token);

  if (cachedUser) return cachedUser;

  userPromise = axiosInstance
    .get("/auth/profile", { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      console.log(`✅✅✅ ${response.data.data} Uspjesno!!`);
      const { user } = response?.data?.data || {};
      if (!user) throw new Error("User not found");

      cache.set(token, user);
      return user;
    })
    .catch((err) => {
      console.log(`👿Error`, err);
      return null;
    })
    .finally(() => {
      userPromise = null;
    });

  return userPromise;
};
