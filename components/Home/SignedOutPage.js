import Link from 'next/link';
import React from 'react'

const SignedOutPage = () => {
  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="m-15 flex flex-col gap-10 justify-center align-middle">
        <div className="p-2 space-y-2 text-white text-6xl font-extrabold">
          <p className="">Welcome back</p>
          <p className="">to Wayshare</p>
        </div>
        <div className="p-2 space-y-6">
          <p className="">Log in to your account.</p>
          <div>
            <input
              type="text"
              className="px-5 py-2 w-[350px] border-1 border-bg-gray-50 rounded-l-3xl"
            />
            <Link
              href="/sign-in"
              className="px-5 py-3 border-gray-200 border-1 rounded-r-lg hover:cursor-pointer hover:bg-gray-50 hover:text-black"
            >
              Sign in
            </Link>
          </div>
          <p>
            Don't have an account?{" "}
            <Link href="sign-up" className="font-extrabold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default SignedOutPage
