"use client";

import { checkIsValidToken } from "@/services/authServices";
import { checkIsPublicRoute } from "@/utils/checkPublicRoute";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, createContext, useLayoutEffect } from "react";

interface PrivateRouteType {}

export const PrivateRouteContext = createContext({} as PrivateRouteType);

export function PrivateRouteProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useLayoutEffect(() => {
    async function isAuth() {
      const isValidToken = await checkIsValidToken();

      if (checkIsPublicRoute(pathname)) {
        if ((pathname === "/login" || pathname === "/signup") && isValidToken)
          return router.push("/");
        return;
      }
      if (isValidToken) return;

      router.push("/login");
    }

    isAuth();
  }, [pathname]);

  return (
    <PrivateRouteContext.Provider value={{}}>
      {children}
    </PrivateRouteContext.Provider>
  );
}
