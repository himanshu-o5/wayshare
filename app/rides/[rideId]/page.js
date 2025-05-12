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
    const fetchRideDetails = async () => {
      try {
        const response = await fetch("/api/get-rides", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            rideId: rideId,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch ride details");
        const data = await response.json();
        setRideDetails(data);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-[1.02]">
        {/* Header */}
        <header className="bg-gradient-to-r from-green-800 to-green-600 dark:from-green-900 dark:to-green-700 text-white p-6">
          <h1 className="text-3xl font-extrabold">
            Accepted by <span className="underline">{driverName}</span>
          </h1>
          <p className="mt-1 text-lg opacity-90">
            Status:{" "}
            <span
              className={`inline-block px-2 py-1 rounded-full font-semibold ${
                {
                  accepted:
                    "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200",
                  completed:
                    "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200",
                  cancelled:
                    "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200",
                  pending:
                    "bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200",
                }[status]
              }`}
            >
              {status.toUpperCase()}
            </span>
          </p>
        </header>

        {/* Body */}
        <div className="p-8 space-y-8 text-gray-700 dark:text-gray-300">
          {/* Ride & Car Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
            {/* Ride Info */}
            <section className="pt-4 md:pt-0 md:pr-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">📍</span>
                <h2 className="text-xl font-semibold">Ride Info</h2>
              </div>
              <ul className="space-y-2">
                {[
                  ["From", source],
                  ["To", destination],
                  ["Distance", `${distance.toFixed(2)} km`],
                  ["Amount", `₹${amount.toFixed(2)}`],
                  [
                    "Date",
                    new Date(date).toLocaleString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                  ],
                ].map(([label, value]) => (
                  <li key={label} className="flex justify-between">
                    <span className="font-medium">{label}:</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Car Details */}
            <section className="pt-8 md:pt-0 md:pl-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🚗</span>
                <h2 className="text-xl font-semibold">Car Details</h2>
              </div>
              <ul className="space-y-2">
                {[
                  ["Type", carType],
                  ["Color", carColor],
                  ["Model", carSelected],
                  ["Number", carNumber],
                ].map(([label, value]) => (
                  <li key={label} className="flex justify-between">
                    <span className="font-medium">{label}:</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Driver Info */}
          {(status === "accepted" || status === "completed") && (
            <div className="pt-8">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">👤</span>
                <h2 className="text-xl font-semibold">Driver Info</h2>
              </div>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="font-medium">Name:</span>
                  <span>{driverName}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Phone:</span>
                  <a
                    href={`tel:${phone}`}
                    className="underline hover:text-green-500"
                  >
                    {phone}
                  </a>
                </li>
              </ul>
            </div>
          )}

          {/* Status Messages */}
          {status === "cancelled" && (
            <p className="text-red-600 font-semibold text-center">
              ❌ This ride was cancelled.
            </p>
          )}
          {status === "pending" && (
            <p className="text-yellow-600 font-semibold text-center">
              ⏳ Waiting for a driver to accept the ride…
            </p>
          )}
        </div>
      </div>
    </div>
  );


};

export default RidePage;
