"use client"
import { CarListData } from '@/utils/CarListData'
import React from 'react'
import CarListItems from './CarListItems'
import { SessionUserContext } from '@/context/SessionUserContext'
import { SourceContext } from '@/context/SourceContext'
import { DestinationContext } from '@/context/DestinationContext'

const CarListOptions = ({distance}) => {

  const [activeIndex, setActiveIndex] = React.useState();
  const {sessionUser, setSessionUser} = React.useContext(SessionUserContext);
  const {source, setSource} = React.useContext(SourceContext);
  const {destination, setDestination} = React.useContext(DestinationContext);

  const handleSearchRideClick = () => {
    const selectedCar = CarListData[activeIndex];
    const totalAmount = (selectedCar.amount * distance).toFixed(2);

    const requestRideData = {
      userId: sessionUser.userId,
      firstName: sessionUser.firstName,
      lastName: sessionUser.lastName,
      source: source.name,
      sourceCoordinates: [source.lat, source.lng],
      destination: destination.name,
      destinationCoordinates: [destination.lat, destination.lng],
      date: new Date(),
      carSelected: selectedCar.name,
      distance: distance,
      amount: totalAmount,
    };
    // console.log(sessionUser);
    // console.log("Request Ride Data:", requestRideData);
    const requestRide = async () => {
      try {
          const response = await fetch("/api/request-ride", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestRideData),
          });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Ride Request Response:", data);
        return response;
      } catch (error) {
        console.error("Error Requesting Ride:", error);
      }
      finally {
        window.location.href = "/rides";
      }
    };
    requestRide();
  }

  return (
    <>
      <div className="py-4">
        <h2 className="text-[25px] m-3  px-3 font-bold">Recommended</h2>
        <div className="overflow-auto h-[350px]">
          {CarListData.map((item, index) => (
            <div
              className={`cursor-pointer p-2 px-4 rounded-md ${
                activeIndex == index ? "border-[1px] " : null
              }`}
              onClick={() => setActiveIndex(index)}
              key={index}
            >
              <CarListItems car={item} distance={distance} />
            </div>
          ))}
        </div>
        <button
          onClick={() => handleSearchRideClick()}
          className="px-5 py-3 border-2 rounded-md w-full mt-5 cursor-pointer font-bold"
        >
          Search Ride
        </button>
      </div>
    </>
  );
}

export default CarListOptions
