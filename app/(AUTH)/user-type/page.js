"use client";
import React, { useEffect, useState } from "react";
import { User as UserIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const page = () => {
  const [showUserTypeOptions, setShowUserTypeOptions] = useState(false);
  const { user, isLoaded, isSignedIn } = useUser();

  const handleUser = async () => {
    const res = await fetch("/api/check-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.id }),
    });
    if (!res.ok) {
      console.log("Error fetching user data");
      return;
    }
    const data = await res.json();
    if (data.message !== "user does not exist") {
      window.location.href = "/";
    } else {
      setShowUserTypeOptions(true);
    }
  }

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      handleUser();
    }
  }, [isLoaded, isSignedIn, user]);

  const handleUserClick = async () => {
    const res = await fetch("/api/register/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.primaryEmailAddress.emailAddress,
        userId: user.id,
      }),
    });

    if (!res.ok) {
      console.log("Error creating user");
      return;
    }
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      {showUserTypeOptions && (
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* User Option */}
          <div
            onClick={handleUserClick}
            className="w-56 h-70 flex flex-col items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer"
          >
            <UserIcon
              size={48}
              className="text-green-600 dark:text-green-400"
            />
            <span className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
              User
            </span>
          </div>

          {/* Driver Option */}
          <Link href="/register/driver" passHref>
            <div className="w-56 h-70 flex flex-col items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer">
              <UserIcon
                size={48}
                className="text-green-600 dark:text-green-400"
              />
              <span className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
                Driver
              </span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );

};

export default page;
