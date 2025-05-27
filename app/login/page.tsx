"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-400 to-orange-400">
      <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-3xl p-10 w-full max-w-md text-white">
        <h1 className="text-4xl font-extrabold text-center mb-4">Welcome to Job Portal</h1>
        <p className="text-center text-white/80 mb-8">Get started with your career today!</p>
        
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex items-center justify-center gap-3 w-full bg-white text-black font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
        >
          <FcGoogle className="text-xl" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
