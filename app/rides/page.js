"use client";
import { SessionUserContext } from "@/context/SessionUserContext";
import React, { useContext, useState } from "react";

const page = () => {
  const { sessionUser, setSessionUser } = useContext(SessionUserContext);
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);

  

  const fetchRides = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/get-rides", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          userId: sessionUser.userId, 
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setRides(data);
    } catch (error) {
      console.error("Error fetching rides:", error);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    if(sessionUser.userId == undefined || sessionUser.userId == null){
      window.location.href = "/";
    }
    fetchRides();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (rides?.length === 0) {
    return <div>No rides available</div>;
  }
  const groupedRides = rides.reduce((acc, ride) => {
    acc[ride.status] = acc[ride.status] || [];
    acc[ride.status].push(ride);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Your Rides</h1>

      {Object.entries(groupedRides).map(([status, rideList]) => (
        <div key={status} className="mb-8">
          <h2 className="text-xl font-semibold capitalize mb-3 border-b border-gray-700 pb-1">
            {status}
          </h2>
          <ul className="space-y-2">
            {rideList.map((ride) => (
              <li
                key={ride._id}
                onClick={() => (window.location.href = `/rides/${ride._id}`)}
                className="p-4 bg-gray-900 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors shadow-md"
              >
                <div className="text-lg font-medium">
                  {ride.source} → {ride.destination}
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  Status: {ride.status}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

};

export default page;
