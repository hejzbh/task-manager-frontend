"use server";

import { cookies } from "next/headers";

export const getSession = async () => {
  try {
    const accessToken = (await cookies()).get("accessToken");

    console.log(accessToken);
    console.log("✅✅✅");
    if (!accessToken) return false;

    return accessToken ? true : false;
  } catch {
    return null;
  }
};
