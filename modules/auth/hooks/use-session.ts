import { cookies } from "next/headers";
import { getUserByToken } from "../utils/getUserByToken";
import { axiosInstance } from "@/lib/axios";

let refreshPromise: any = null; // Globalna varijabla za cache refresh requesta

export async function useSession() {
  try {
    const cookiesStore = await cookies();

    let accessToken = cookiesStore.get("accessToken")?.value;

    if (!accessToken) {
      const refreshToken = cookiesStore.get("refreshToken")?.value;
      if (!refreshToken) return null;

      // Ako je refresh već u toku, čekaj da se završi
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

            return newAccessToken?.value; // Vraća novi token
          })
          .catch(() => null)
          .finally(() => {
            refreshPromise = null; // Resetujemo nakon završetka
          });
      }

      // Čekaj da refreshPromise završi i uzmi rezultat
      accessToken = await refreshPromise;
      if (!accessToken) return null; // Ako refresh nije uspio, vraćamo null
    }

    const user = await getUserByToken(accessToken);
    if (!user) return null;

    return { user, authenticated: true };
  } catch (err) {
    return null;
  }
}
