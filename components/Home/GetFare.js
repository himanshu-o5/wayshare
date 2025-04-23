"use client"
import React from 'react'
import { SourceContext } from '@/context/SourceContext'
import { DestinationContext } from '@/context/DestinationContext'
import { SessionUserContext } from '@/context/SessionUserContext'

const GetFare = () => {
  // Some state variables and context to use
  const [fare, setFare] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const {source, setSource} = React.useContext(SourceContext);
  const {destination, setDestination} = React.useContext(DestinationContext);
  const {sessionUser, setSessionUser} = React.useContext(SessionUserContext);


  // Function to handle which draws the route on map
  const handleCheckFare = (ride) => {
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

  // Function to handle accepting the fare
  const handleAcceptFare = async (rideId) => {
    const response = await fetch("/api/accept-ride", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rideId: rideId,
        driverId: sessionUser.driverId
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Fare accepted successfully:", data);
    fetchFare(); 
  }

  // Function that will render available rides to show to driver
  const fetchFare = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/get-rides", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          driverId: sessionUser.driverId,
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

  // Fetch fare when the component mounts
  React.useEffect(() => {
    fetchFare();
  }, []);


  // Mislaneous checks
  if (loading) {
    return <div>Loading...</div>;
  }

  if (fare?.length === 0) {
    return <div>No fare available</div>;
  }

  if (fare?.length > 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Available Fares</h1>
        <ul>
          {fare.map((ride) => (
            <div
              key={ride._id}
              onClick={() => handleCheckFare(ride)}
              className="m-3 border-gray-800 border-1 flex flex-col md:flex-row justify-between items-start md:items-center bg-black hover:bg-gray-900 transition-colors rounded-2xl p-4 mb-3 shadow-lg cursor-pointer"
            >
              <div className="flex-1">
                {console.log(ride)}
                <h3 className="text-lg font-semibold text-white">
                  {ride.firstName + (ride.lastName ? " " + ride.lastName : "")}
                </h3>
                <p className="text-sm text-gray-300 mt-1">
                  <span className="block">
                    Source:{" "}
                    <span className="font-medium text-white">
                      {ride.source}
                    </span>
                  </span>
                  <span className="block">
                    Destination:{" "}
                    <span className="font-medium text-white">
                      {ride.destination}
                    </span>
                  </span>
                  <span className="block">
                    Amount:{" "}
                    <span className="text-green-400 font-semibold">
                      {ride.amount}
                    </span>
                  </span>
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent parent click
                  handleAcceptFare(ride._id);
                }}
                className="mt-3 md:mt-0 md:ml-4 bg-green-500 hover:bg-green-600 text-black font-medium rounded-lg px-4 py-2 transition-colors shadow-md"
              >
                Accept Fare
              </button>
            </div>
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
