"use server";
import { cookies } from "next/headers";
import { getUserByToken } from "../utils/getUserByToken";
import { axiosInstance } from "@/lib/axios";

let refreshPromise: any = null; // Globalna varijabla za cache refresh requesta

export async function useSession() {
  try {
    const cookiesStore = await cookies();

    let accessToken = cookiesStore.get("accessToken")?.value;

    // Handle refresh token on server
    if (!accessToken) {
      console.log("nema accesa");
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
    if (!user) return null;

    return { user, authenticated: true };
  } catch (err) {
    return null;
  }
}
