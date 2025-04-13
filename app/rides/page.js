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
  return (
    <div>
      <h1>Rides</h1>
      <ul>
        {rides.map((ride) => (
          <li key={ride._id}>
            {ride.source} to {ride.destination} - {ride.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
