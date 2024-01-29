import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const useSessionGuard = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!sessionData) {
      void router.replace("/login"); // Redirect to the login page if there's no session
    }
  }, [sessionData, router]);
};
