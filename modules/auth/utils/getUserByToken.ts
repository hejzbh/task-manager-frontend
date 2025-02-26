"use server";
import { axiosInstance } from "@/lib/axios";

const cache = new Map();
let userPromise: Promise<any> | null = null;

export const getUserByToken = async (token: string) => {
  if (!token) return null;

  if (userPromise) return userPromise;

  const cachedUser = cache.get(token);
  if (cachedUser) return cachedUser;

  userPromise = axiosInstance
    .get("/auth/profile", { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      const { user } = response?.data?.data || {};
      if (!user) throw new Error("User not found");

      cache.set(token, user);
      return user;
    })
    .catch((err) => {
      console.error(err);
      return null;
    })
    .finally(() => {
      userPromise = null;
    });

  return userPromise;
};
