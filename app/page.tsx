"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      router.push(`/${storedRole}`);
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleRoleSelect = (role: string) => {
    localStorage.setItem("role", role);
    router.push(`/${role}`);
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Redirecting...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Gamified Job Portal</h1>

      {session?.user?.name && (
        <p className="mb-6 text-lg text-gray-700">Signed in as <strong>{session.user.name}</strong></p>
      )}

      <h2 className="text-2xl font-semibold mb-4">Choose your role to continue</h2>

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          onClick={() => handleRoleSelect("student")}
        >
          Student
        </button>
        <button
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
          onClick={() => handleRoleSelect("recruiter")}
        >
          Recruiter
        </button>
        <button
          className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600 transition"
          onClick={() => handleRoleSelect("admin")}
        >
          Admin
        </button>
      </div>
    </main>
  );
}
