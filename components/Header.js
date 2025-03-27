import React from 'react'
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="flex justify-between items-center border-b mx-8 border-[rgba(255,255,255,0.15)]">
      <div className="">
        <Link href="/" className="text-2xl font-light">
          Wayshare
        </Link>
      </div>
      <div className="flex justify-end items-center gap-4 h-16">
        <SignedOut>
          <SignInButton className="hover:cursor-pointer" />
          <SignUpButton className="hover:cursor-pointer" />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}

export default Header
