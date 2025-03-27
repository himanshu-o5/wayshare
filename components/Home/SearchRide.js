"use client"
import React, { useContext, useEffect } from 'react'
import InputItem from './InputItem'
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';

const SearchRide = () => {

  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);


  useEffect(() => {
    if(source) console.log(source);
    if(destination) console.log(destination);
  }, [source, destination])


  return (
    <div className='p-2 md:p-6 border-[2px] rounded-xl bg-white shadow-lg shadow-gray-700 text-black'>
      <p className='text-[20px] font-bold'>Get a ride</p>
      <InputItem location="Pickup Location" type="source"/>
      <InputItem location="Drop Location" type="destination"/>
      <button className='p-3 bg-black w-full mt-5 text-white rounded-lg hover:cursor-pointer'>Search</button>
    </div>
  )
}

export default SearchRide
