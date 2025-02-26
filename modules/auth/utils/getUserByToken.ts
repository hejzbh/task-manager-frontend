"use server";
import { axiosInstance } from "@/lib/axios";

const cache = new Map();
let userPromise: Promise<any> | null = null;

export const getUserByToken = async (token: string) => {
  console.log(`Token : ${token}`);
  if (!token) return null;

  console.log(`UserPromise : ${userPromise !== null}`);
  if (userPromise) return userPromise;

  const cachedUser = cache.get(token);
  console.log(`CachedUser : ${cachedUser}`);

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
