import React from 'react'
import Map from "@/components/Home/Map";
import SearchRide from "@/components/Home/SearchRide";
// import { useJsApiLoader } from "@react-google-maps/api";


// //   const { mapLoaded } = useJsApiLoader({
// //     id: "google-map-script",
// //     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
// //     libraries: ["places"], // optional if you use autocomplete etc.
// //   });

const UserPage = (mapLoaded) => {
  return (
    <div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <SearchRide />
          </div>
          <div className="col-span-2">
            {mapLoaded ? <Map /> : <p>Loading map...</p>}
          </div>
        </div>
    </div>
  );
}

export default UserPage
