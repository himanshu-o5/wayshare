"use client";
import Map from "@/components/Home/Map";
import SearchRide from "@/components/Home/SearchRide";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import { useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import SignedOutPage from "@/components/Home/SignedOutPage";
import { SessionUserContext } from "@/context/SessionUserContext";
import Header from "@/components/Header";
import { DirectionRoutePointContext } from "@/context/DirectionRoutePointContext";

export default function Home() {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);
  const [sessionUser, setSessionUser] = useState([]);
  const [directionRoutePoints, setDirectionRoutePoints] = useState([]);

  return (
    <div className="">
      <SourceContext.Provider value={{ source, setSource }}>
        <DestinationContext.Provider value={{ destination, setDestination }}>
          <SessionUserContext.Provider value={{ sessionUser, setSessionUser }}>
            <DirectionRoutePointContext.Provider value={{directionRoutePoints, setDirectionRoutePoints}}>
              <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}
                libraries={["places"]}
              >
                {/* Showing header */}
                <Header />
                {/* Then all other elements */}
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
            </DirectionRoutePointContext.Provider>
          </SessionUserContext.Provider>
        </DestinationContext.Provider>
      </SourceContext.Provider>
    </div>
  );
}
