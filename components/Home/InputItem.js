"use client"
import { DestinationContext } from '@/context/DestinationContext';
import { DirectionRoutePointContext } from '@/context/DirectionRoutePointContext';
import { SourceContext } from '@/context/SourceContext';
import React, { useContext } from 'react'
import Autocomplete from "react-google-autocomplete";


const InputItem = (props) => {

  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const { directionRoutePoints, setDirectionRoutePoints } = useContext(DirectionRoutePointContext);


  const getLongitudeAndLatitude = (place) => {
    console.log(place.place_id, props.type);
    const placeId = place.place_id;
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails({ placeId }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place.geometry.location) {
        console.log(place.geometry.location.lat(), place.geometry.location.lng());
        if(props.type === "source") {
          setSource({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.formatted_address,
          })
        }
        else if(props.type === "destination") {
          setDestination({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.formatted_address,
          });
        }
      }
      else{
        if(props.type === "source") {
          setSource(null);
        }
        else if(props.type === "destination") {
          setDestination(null);
        }
        console.error("Error in getting longitude and latitude");
      }
    });
  }

  return (
    <div className="p-4 bg-slate-200 rounded-lg shadow-md mt-3 flex items-center gap-4">
      <Autocomplete
        placeholder={props.location}
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}
        onPlaceSelected={(place) => {
          console.log(place);
          getLongitudeAndLatitude(place);
        }}
        onChange={(e) => {
          setDirectionRoutePoints([]);
          if(props.type === "source") {
            setSource("");
          }
          else if(props.type === "destination") {
            setDestination("");
          }
        }}
        className='w-full m-0 border-none outline-none bg-slate-200 rounded-md'
      />
    </div>
  );
}

export default InputItem
