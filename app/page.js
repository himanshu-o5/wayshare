"use client";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import { useState } from "react";
// import { LoadScript } from "@react-google-maps/api";
import SignedOutPage from "@/components/Home/SignedOutPage";
import { SessionUserContext } from "@/context/SessionUserContext";
import Header from "@/components/Header";
import { DirectionRoutePointContext } from "@/context/DirectionRoutePointContext";
import { useJsApiLoader } from "@react-google-maps/api";
import UserPage from "@/components/UserPage";

export default function Home() {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);
  // const [sessionUser, setSessionUser] = useState([]);
  const [directionRoutePoints, setDirectionRoutePoints] = useState([]);

  const { mapLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
    libraries: ["places"], // optional if you use autocomplete etc.
  });

  return (
    <div className="">
      <SourceContext.Provider value={{ source, setSource }}>
        <DestinationContext.Provider value={{ destination, setDestination }}>
          {/* <SessionUserContext.Provider value={{ sessionUser, setSessionUser }}> */}
            <DirectionRoutePointContext.Provider value={{directionRoutePoints, setDirectionRoutePoints}}>
              {/* <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}
                libraries={["places"]}
              > */}
                {/* Showing header */}
                <Header />
                <SignedIn>
                  <UserPage mapLoaded />
                </SignedIn>
                <SignedOut>
                  <SignedOutPage />
                </SignedOut>
              {/* </LoadScript> */}
            </DirectionRoutePointContext.Provider>
          {/* </SessionUserContext.Provider> */}
        </DestinationContext.Provider>
      </SourceContext.Provider>
    </div>
  );
}
