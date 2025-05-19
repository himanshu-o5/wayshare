"use client";

import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply opacity-70 animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply opacity-70 animate-pulse"></div>

      {/* Central Card */}
      <div className="relative z-10 w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 mb-4">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Sign in to continue to{" "}
          <span className="font-semibold text-gray-800 dark:text-white">
            Wayshare
          </span>
        </p>
        <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
        <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            to="/sign-up"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
