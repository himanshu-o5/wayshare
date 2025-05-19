"use client";
import { SessionUserContext } from "@/context/SessionUserContext";
import React, { useContext, useState, useEffect } from "react";

const Page = () => {
  const { sessionUser } = useContext(SessionUserContext);
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
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setRides(data);
    } catch (error) {
      console.error("Error fetching rides:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!sessionUser?.userId) {
      window.location.href = "/";
    } else {
      fetchRides();
    }
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (rides?.length === 0) return <div className="p-6">No rides available</div>;

  const groupedRides = rides.reduce((acc, ride) => {
    acc[ride.status] = acc[ride.status] || [];
    acc[ride.status].push(ride);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Your Rides</h1>

      {Object.entries(groupedRides).map(([status, rideList]) => (
        <div key={status} className="mb-8">
          <h2 className="text-xl font-semibold capitalize mb-3 border-b border-gray-300 dark:border-gray-700 pb-1">
            {status}
          </h2>
          <ul className="space-y-2">
            {rideList.map((ride) => (
              <li
                key={ride._id}
                onClick={() => (window.location.href = `/rides/${ride._id}`)}
                className="p-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors shadow-md"
              >
                <div className="text-lg font-medium">
                  {ride.source} → {ride.destination}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
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

export default Page;
