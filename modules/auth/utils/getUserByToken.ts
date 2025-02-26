"use server";
import { axiosInstance } from "@/lib/axios";

// For developers from company that I'm applying for (explanation):

// In-memory cache for storing user data per token (Prevent unecessary api requests that MIDDLEWARE can cause)
// I want to mention this is good solution for fronnted (to keep somethig in memory), but we should avoid this on BACKEND!! Because it can cause MEMORY LEAK

const cache = new Map();
let userPromise: any = null;

export const getUserByToken = async (token: string) => {
  if (!token) return null;

  if (userPromise) return userPromise;

  const cachedUser = cache.get(token);

  if (cachedUser) return cachedUser;

  // Exlpanation: Because this unction is used in middleware that runs for each request (maybe 10times in 1 second) we dont wwant to make an 10+ api calls,
  // "userPromise" ensures that simultaneous requests for the same token wait for the same API response, improving performance and reducing backend load

  userPromise = axiosInstance
    .get("/auth/profile", { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      const { user } = response?.data?.data || {};
      if (!user) throw new Error("User not found");

      return user;
    })
    .catch(() => null)
    .finally(() => {
      userPromise = null;
    });

  cache.clear(); // Someone can spam different tokens and fill memory (we need to care about details :))
  cache.set(token, userPromise);

  return userPromise;
};
