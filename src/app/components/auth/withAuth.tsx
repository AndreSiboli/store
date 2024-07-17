"use client";

import { useContext, useEffect, useState } from "react";
import { NextComponentType } from "next";
import { useRouter } from "next/navigation";
import { IsValidToken } from "@/services/auth/token";
import PrivateLoading from "../layout/PrivateLoading";
import { UserContext } from "@/_contexts/UserContext";

export default function withAuth(Component: NextComponentType) {
  const DisplayName = (props: any) => {
    const [isAuth, setIsAuth] = useState(false);
    const { firstLoad } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        if (firstLoad) return;
        const auth = await IsValidToken();
        setIsAuth(auth);

        if (!auth) {
          router.push("/login");
        }
      };

      checkAuth();
    }, [router, firstLoad]);

    if (!isAuth) {
      return <PrivateLoading />;
    }

    return <Component {...props} />;
  };

  return DisplayName;
}
