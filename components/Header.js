"use client";
import React, { useContext, useEffect } from "react";
import Link from "next/link";
import {
  useUser,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { SessionUserContext } from "@/context/SessionUserContext";

const Header = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { sessionUser, setSessionUser } = useContext(SessionUserContext);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setSessionUser({
        id: user.id,
        email: user.primaryEmailAddress.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        hasImage: user.hasImage,
        imageURL: user.imageUrl
      });
    }
  }, [isLoaded, isSignedIn, user]);

  return (
    <header className="flex justify-between items-center border-b mx-8 border-[rgba(255,255,255,0.15)]">
      <div className="">
        <Link href="/" className="text-2xl font-light">
          Wayshare
        </Link>
      </div>
      {!isLoaded ? (
        <>Loading...</>
      ) : (
        <div className="flex justify-end items-center gap-4 h-16">
          <SignedOut>
            <SignInButton className="hover:cursor-pointer" />
            <SignUpButton className="hover:cursor-pointer" />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      )}
    </header>
  );
};

export default Header;
