"use client";
import React, { useContext, useEffect, useState } from "react";
import { DirectionsRenderer, DirectionsService, GoogleMap, MarkerF, OverlayView, OverlayViewF, useJsApiLoader } from "@react-google-maps/api";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import { DirectionRoutePointContext } from "@/context/DirectionRoutePointContext";

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
  const {directionRoutePoints, setDirectionRoutePoints} = useContext(DirectionRoutePointContext);

  const [center, setCenter] = useState({
    lat: 20.5937,
    lng: 78.9629,
  });

  const [map, setMap] = React.useState(null);
  // const [directionRoutePoints, setDirectionRoutePoints] = useState([]);


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

    if(source.length != [] && destination.length != []){
      directionRoute();
    }

  }, [source])

  useEffect(() => {
    if (destination?.length != [] && map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng,
      });
    }

    if(source.length != [] && destination.length != []){
      directionRoute();
    }

  }, [destination]);


  const directionRoute = () => {
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route({
      origin: {lat: source.lat, lng: source.lng},
      destination: {lat: destination.lat, lng: destination.lng},
      travelMode: google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if(status === google.maps.DirectionsStatus.OK){
        console.log(result)
        setDirectionRoutePoints(result);
      }
      else{
        console.error("Error in Routing Direction on map");
      }
    })
  }


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
      zoom={7}
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
          icon={{
            url: "/locationUserMarker.png",
            scaledSize: new window.google.maps.Size(20, 20),
          }}
        >
          <OverlayViewF 
          position={{
            lat: source.lat,
            lng: source.lng,
          }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[15px]">{(source.label)}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      ) : null}

      {destination?.length != [] ? (
        <MarkerF
          position={{
            lat: destination.lat,
            lng: destination.lng,
          }}
          // label={destination.label}
          icon={{
            url: "/locationDestinationMarker.png",
            scaledSize: new window.google.maps.Size(30, 30),
          }}
        >
          <OverlayViewF 
          position={{
            lat: destination.lat,
            lng: destination.lng,
          }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[15px]">{(destination.label)}</p>
            </div>
          </OverlayViewF>
          </MarkerF>
      ) : null}

      {directionRoutePoints?.length != [] ? (
        <DirectionsRenderer
        directions={directionRoutePoints}
        options={{
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: "#000",
            strokeWeight: 5
          }
        }}
        />) : null}
    </GoogleMap>
  );
};

export default Map;
