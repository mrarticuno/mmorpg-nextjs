import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  if (sessionData) {
    void router.push("/");
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <button onClick={() => signIn()}>Login</button>
    </div>
  );
}
