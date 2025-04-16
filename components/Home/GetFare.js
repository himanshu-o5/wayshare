"use client"
import React from 'react'
import { SourceContext } from '@/context/SourceContext'
import { DestinationContext } from '@/context/DestinationContext'
import { SessionUserContext } from '@/context/SessionUserContext'

const GetFare = () => {

  const [fare, setFare] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const {source, setSource} = React.useContext(SourceContext);
  const {destination, setDestination} = React.useContext(DestinationContext);
  const {sessionUser, setSessionUser} = React.useContext(SessionUserContext);


  const handleCheckFare = (ride) => {
    // Implement the logic to check the fare here
    // For example, you might want to update the status of the ride in the database
    setSource({
      lat: ride.sourceCoordinates[0],
      lng: ride.sourceCoordinates[1],
      name: ride.source,
      label: ride.source,
    });
    setDestination({
      lat: ride.destinationCoordinates[0],
      lng: ride.destinationCoordinates[1],
      name: ride.destination,
      label: ride.destination,
    });
  }
  const handleAcceptFare = async (rideId) => {
    // Implement the logic to accept the fare here
    // For example, you might want to update the status of the ride in the database
    const response = await fetch("/api/accept-ride", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rideId: rideId,
        driverId: sessionUser.driverId, // Replace with actual driverId
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Fare accepted successfully:", data);
    fetchFare(); // Refresh the fare list after accepting a fare
  }

  const fetchFare = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/get-rides", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          driverId: sessionUser.driverId, // Replace with actual driverId
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFare(data);
    } catch (error) {
      console.error("Error fetching fare:", error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchFare();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (fare?.length === 0) {
    return <div>No fare available</div>;
  }

  if (fare?.length > 0) {
    return (
      <div>
        <h1>Fare</h1>
        <ul>
          {fare.map((ride) => (
            <>
              <li key={ride._id} className='flex justify-between items-center' onClick={() => handleCheckFare(ride)}>
                {ride.source} to {ride.destination} - {ride.amount}
              <button onClick={() => handleAcceptFare(ride._id)} className='cursor-pointer bg-green-500 rounded-md px-4 py-1'>Accept Fare</button>
              </li>
            </>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div>
      <h1>Fare</h1>
      <p>No fare available</p>
    </div>
  );
}

export default GetFare
