"use client";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import { useContext, useEffect, useState } from "react";
// import { LoadScript } from "@react-google-maps/api";
import SignedOutPage from "@/components/Home/SignedOutPage";
import { SessionUserContext } from "@/context/SessionUserContext";
import Header from "@/components/Header";
import { DirectionRoutePointContext } from "@/context/DirectionRoutePointContext";
import { useJsApiLoader } from "@react-google-maps/api";
import UserPage from "@/components/UserPage";
import { set } from "mongoose";
import DriverPage from "@/components/DriverPage";

export default function Home() {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);
  const { sessionUser, setSessionUser } = useContext(SessionUserContext);
  const { isLoaded, isSignedIn, user } = useUser();
  // const [sessionUser, setSessionUser] = useState([]);
  const [directionRoutePoints, setDirectionRoutePoints] = useState([]);

  const { mapLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
    libraries: ["places"], // optional if you use autocomplete etc.
  });

  useEffect(() => {
    const fetchUser = async () => {
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
        setSessionUser({
          userType: data.message,
          ...data.user, 
        });
      } else {
        window.location.href = "/user-type";
      }
    };
    if (isLoaded && isSignedIn) {
      fetchUser();
    }
  }, [user, isLoaded, isSignedIn]);

  useEffect(() => {
    console.log(sessionUser);
  }, [sessionUser]); // Log sessionUser whenever it changes

  return (
    <div className="">
      <SourceContext.Provider value={{ source, setSource }}>
        <DestinationContext.Provider value={{ destination, setDestination }}>
          {/* <SessionUserContext.Provider value={{ sessionUser, setSessionUser }}> */}
          <DirectionRoutePointContext.Provider
            value={{ directionRoutePoints, setDirectionRoutePoints }}
          >
            {/* <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}
                libraries={["places"]}
              > */}
            {/* Showing header */}
            <Header />
            <SignedIn>
              {sessionUser == {} ? null :
                sessionUser.userType == "user" 
                  ? <UserPage mapLoaded /> 
                  : <DriverPage mapLoaded /> 
              }
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
