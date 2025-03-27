import Map from "@/components/Home/Map";
import SearchRide from "@/components/Home/SearchRide";
import Image from "next/image";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <SignedIn>
            <SearchRide />
          </SignedIn>
        </div>
        <div className="col-span-2">
          <Map />
        </div>
      </div>
    </>
  );
}
