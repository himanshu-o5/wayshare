"use client"
import React, { useContext, useEffect, useState } from 'react'
import InputItem from './InputItem'
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';
import CarListOptions from './CarListOptions';

const SearchRide = () => {

  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [distance, setDistance] = useState();



  const calculateDistance = () => {
    const dist = google.maps.geometry.spherical.computeDistanceBetween(
      {lat: source.lat, lng: source.lng},
      {lat: destination.lat, lng: destination.lng}
    )

    setDistance(dist/1000);
  }

  const clearInput = (type) => {
    if(type === "source"){
      setSource(null);
    }
    else if(type === "destination"){
      setDestination(null);
    }
    setDistance(null);
  }

  return (
    <>
      <div className="p-2 md:p-6 border-[1px] border-slate-600 rounded-xl bg-white shadow-lg shadow-gray-700 text-black">
        <p className="text-[20px] font-bold">Get a ride</p>
        <InputItem location="Pickup Location" type="source" onClick={() => clearInput("source")}/>
        <InputItem location="Drop Location" type="destination" onClick={() => clearInput("destination")}/>
        <button
          className="p-3 bg-black w-full mt-5 text-white rounded-lg hover:cursor-pointer"
          onClick={() => calculateDistance()}
        >
          Search
        </button>
      </div>
      {distance? <CarListOptions distance={distance}/> : null}
    </>
  );
}

export default SearchRide
