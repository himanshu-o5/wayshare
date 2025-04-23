"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const RidePage = () => {
  const params = useParams();
  const rideId = params.rideId;

  const [rideDetails, setRideDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    console.log(rideDetails);
  }, [rideDetails]);


  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        const response = await fetch("/api/get-rides", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            rideId: rideId,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch ride details");
        }
        const data = await response.json();
        setRideDetails(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRideDetails();
  }, [rideId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

const {
  status,
  destination,
  source,
  date,
  driverName,
  carNumber,
  carColor,
  carType,
  carSelected,
  distance,
  amount,
  phone,
} = rideDetails;

return (
  <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-4 py-10">
    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">
          Accepted by {driverName}
        </h1>
        <p className="text-sm text-gray-400 mt-1 capitalize">
          Status: <span className="font-semibold text-white">{status}</span>
        </p>
      </div>

      <div className="space-y-4 text-sm sm:text-base text-gray-300">
        <div>
          <h2 className="text-lg font-semibold text-white mb-1">
            📍 Ride Info
          </h2>
          <p>
            <span className="font-semibold text-gray-400">From:</span> {source}
          </p>
          <p>
            <span className="font-semibold text-gray-400">To:</span>{" "}
            {destination}
          </p>
          <p>
            <span className="font-semibold text-gray-400">Distance:</span>{" "}
            {distance.toFixed(2)} km
          </p>
          <p>
            <span className="font-semibold text-gray-400">Amount:</span> ₹
            {amount.toFixed(2)}
          </p>
          <p>
            <span className="font-semibold text-gray-400">Date:</span>{" "}
            {new Date(date).toLocaleString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        {(status === "accepted" || status === "completed") && (
          <div>
            <h2 className="text-lg font-semibold text-white mt-4 mb-1">
              👤 Driver Info
            </h2>
            <p>
              <span className="font-semibold text-gray-400">Name:</span>{" "}
              {driverName}
            </p>
            <p>
              <span className="font-semibold text-gray-400">Phone:</span>{" "}
              {phone}
            </p>
          </div>
        )}

        <div>
          <h2 className="text-lg font-semibold text-white mt-4 mb-1">
            🚗 Car Details
          </h2>
          <p>
            <span className="font-semibold text-gray-400">Type:</span> {carType}
          </p>
          <p>
            <span className="font-semibold text-gray-400">Color:</span>{" "}
            {carColor}
          </p>
          <p>
            <span className="font-semibold text-gray-400">Model:</span>{" "}
            {carSelected}
          </p>
          <p>
            <span className="font-semibold text-gray-400">Number:</span>{" "}
            {carNumber}
          </p>
        </div>

        {status === "cancelled" && (
          <p className="text-red-500 font-semibold mt-4">
            ❌ This ride was cancelled.
          </p>
        )}

        {status === "pending" && (
          <p className="text-yellow-400 font-semibold mt-4">
            ⏳ Waiting for a driver to accept the ride...
          </p>
        )}
      </div>
    </div>
  </div>
);


};

export default RidePage;

