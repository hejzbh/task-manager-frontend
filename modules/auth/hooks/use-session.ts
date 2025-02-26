"use server";
import { cookies } from "next/headers";
import { getUserByToken } from "../utils/getUserByToken";
import { axiosInstance } from "@/lib/axios";
import { NextRequest } from "next/server";

let refreshPromise: any = null; // Global variable for request (prevent multiple api calls because middleware can runs more than 5x times in 1 secodn)

export async function useSession(req?: NextRequest) {
  try {
    const cookiesStore = req ? req.cookies : await cookies();
    console.log(`Req: ${req?.cookies.get("accessToken")?.value}`);
    let accessToken = cookiesStore.get("accessToken")?.value;

    console.log(`Access: ${accessToken}`);

    // Handle refresh token on server
    if (!accessToken) {
      const refreshToken = cookiesStore.get("refreshToken")?.value;
      if (!refreshToken) return null;
      console.log("ima refresh");
      if (!refreshPromise) {
        refreshPromise = axiosInstance
          .post("/auth/refresh", { refreshToken })
          .then((res) => {
            const {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            } = res?.data?.data;

            cookiesStore.set(
              "accessToken",
              newAccessToken?.value,
              newAccessToken?.options
            );
            cookiesStore.set(
              "refreshToken",
              newRefreshToken?.value,
              newRefreshToken.options
            );

            return newAccessToken?.value;
          })
          .catch(() => null)
          .finally(() => {
            refreshPromise = null; // reset
          });
      }

      // wait until its done
      accessToken = await refreshPromise;
      if (!accessToken) return null;
    }

    const user = await getUserByToken(accessToken);

    console.log(`User: ${user}`);
    if (!user) return null;

    return { user, authenticated: true };
  } catch (err) {
    return null;
  }
}
