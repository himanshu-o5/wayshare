import React from 'react'
import Map from "@/components/Home/Map";
import GetFare from './Home/GetFare';

const DriverPage = (mapLoaded) => {
  return (
    <div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <GetFare />
          </div>
          <div className="col-span-2">
            {mapLoaded ? <Map /> : <p>Loading map...</p>}
          </div>
        </div>
    </div>
  )
}

export default DriverPage
