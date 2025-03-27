"use client"
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
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import { useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import SignedOutPage from "@/components/Home/SignedOutPage";

export default function Home() {
  const [source, setSource] = useState([]); 
  const [destination, setDestination] = useState([]); 

  return (
    <>
      <SourceContext.Provider value={{ source, setSource }}>
        <DestinationContext.Provider value={{ destination, setDestination }}>
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}
            libraries={["places"]}
          >
            <SignedIn>
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <SearchRide />
                </div>
                <div className="col-span-2">
                  <Map />
                </div>
              </div>
            </SignedIn>
            <SignedOut>
              <SignedOutPage />
            </SignedOut>
          </LoadScript>
        </DestinationContext.Provider>
      </SourceContext.Provider>
    </>
  );
}
