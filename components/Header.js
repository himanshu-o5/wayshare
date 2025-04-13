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
import axios from "axios";

const Header = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { sessionUser, setSessionUser } = useContext(SessionUserContext);


  // useEffect(() => {
  //   if (sessionUser && sessionUser.id) {
  //     const registerUser = async () => {
  //       try {
  //           const response = await axios.post("/api/register/user/", {
  //             firstName: sessionUser.firstName,
  //             lastName: sessionUser.lastName,
  //             email: sessionUser.email,
  //             userId: sessionUser.id,
  //           });
  //           return response;
          
  //       } catch (error) {
  //         console.error("Error registering user:", error);
  //       }
  //     };
  //     registerUser();
  //   }
  // }, [sessionUser]);


  return (
    <header className="flex justify-between items-center border-b mx-8 border-[rgba(255,255,255,0.15)]">
      <div className="">
        <Link href="/" className="text-2xl font-light">
          Wayshare
        </Link>
        {sessionUser.userId ? <Link href="/rides" className="px-6">
          Rides
        </Link> : null}
      </div>
      {!isLoaded ? (
        <>Loading...</>
      ) : (
        <div className="flex justify-end items-center gap-4 h-16">
          <SignedOut>
            <SignInButton
              forceRedirectUrl="/user-type"
              className="hover:cursor-pointer"
            />
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
