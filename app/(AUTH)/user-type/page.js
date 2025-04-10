"use client";
import React, { useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { SessionUserContext } from "@/context/SessionUserContext";
import Link from "next/link";

const page = () => {
  const [showUserTypeOptions, setShowUserTypeOptions] = useState(false);
  const { user, isLoaded, isSignedIn } = useUser();
  const { sessionUser, setSessionUser } = useContext(SessionUserContext);

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
      // setSessionUser({
      //   id: user.id,
      //   email: user.primaryEmailAddress.emailAddress,
      //   firstName: user.firstName,
      //   lastName: user.lastName,
      //   hasImage: user.hasImage,
      //   imageURL: user.imageUrl,
      //   userType: data.message,
      // });
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
    // setSessionUser({
    //   id: user.id,
    //   email: user.primaryEmailAddress.emailAddress,
    //   firstName: user.firstName,
    //   lastName: user.lastName,
    //   hasImage: user.hasImage,
    //   imageURL: user.imageUrl,
    //   userType: "user",
    // });
    window.location.href = "/";
  };

  

  return (
    <div>
      {showUserTypeOptions && (
        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-center">Select User Type</h1>
            <button
              onClick={handleUserClick}
              className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
            >
              User
            </button>
            <button className="bg-green-500 text-white py-2 px-4 rounded cursor-pointer">
              <Link href="/register/driver">Driver</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
