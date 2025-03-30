"use client"
import { CarListData } from '@/utils/CarListData'
import React from 'react'
import CarListItems from './CarListItems'

const CarListOptions = ({distance}) => {

  const [activeIndex, setActiveIndex] = React.useState();

  return (
    <div className="mt-5 p-5 overflow-auto h-[350px]">
      <h2 className="text-[25px] mb-3 font-bold">Reccomended</h2>
      {CarListData.map((item, index) => (
        <div
          className={`cursor-pointer p-2 px-4 rounded-md ${
            activeIndex == index ? "border-[1px] " : null
          }`}
          onClick={() => setActiveIndex(index)}
          key={index}
        >
          <CarListItems car={item} distance={distance}/>
        </div>
      ))}
    </div>
  );
}

export default CarListOptions
