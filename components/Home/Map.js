"use client";
import React, { useContext, useEffect, useState } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";

const containerStyle = {
  width: "100%",
  height: "75vh",
};


const Map = () => {
  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
  // });
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  })

  const [map, setMap] = React.useState(null);


  useEffect(() => {
    if(source?.length != [] && map){
      map.panTo({
        lat: source.lat,
        lng: source.lng,
      })
      setCenter({
        lat: source.lat,
        lng: source.lng,
      })
    }
  }, [source])

  useEffect(() => {
    if (destination?.length != [] && map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng,
      });
    }
  }, [destination]);


  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID }}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {source?.length != [] ? (
        <MarkerF
          position={{
            lat: source.lat,
            lng: source.lng,
          }}
          label={source.label}
          // icon={{
          //   // url: "/source.png",
          //   scaledSize: new window.google.maps.Size(30, 30),
          // }}
        />
      ) : null}

      {destination?.length != [] ? (
        <MarkerF
          position={{
            lat: destination.lat,
            lng: destination.lng,
          }}
          label={destination.label}
          // icon={{
          //   // url: "/destination.png",
          //   scaledSize: new window.google.maps.Size(30, 30),
          // }}
        />
      ) : null}

      <></>
    </GoogleMap>
  );
};

export default Map;
