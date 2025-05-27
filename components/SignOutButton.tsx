"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => {
        localStorage.removeItem("role");
        signOut();
      }}
      className="ml-4 px-4 py-1 bg-red-500 text-white rounded"
    >
      Sign Out
    </button>
  );
}
