import React from 'react'
import InputItem from './InputItem'

const SearchRide = () => {
  return (
    <div className='p-2 md:p-6 border-[2px] rounded-xl bg-white shadow-lg shadow-gray-700 text-black'>
      <p className='text-[20px] font-bold'>Get a ride</p>
      <InputItem location="Pickup Location"/>
      <InputItem location="Drop Location"/>
      <button className='bg-[#000000] text-white rounded-lg p-2 w-full mt-2'>Search</button>
    </div>
  )
}

export default SearchRide
