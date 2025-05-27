"use client";

import { signIn, useSession } from "next-auth/react";

export default function SignInButton() {
  const { data: session } = useSession();

  if (session) return null;

  return (
    <button
      onClick={() => signIn("google")}
      style={{ padding: "10px", backgroundColor: "green", color: "white" }}
    >
      Sign In with Google
    </button>
  );
}
