"use client"
import React from 'react'
import Autocomplete from "react-google-autocomplete";


const InputItem = (props) => {
  return (
    <div className='p-4'>
      <Autocomplete
        placeholder={props.location}
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}
        onPlaceSelected={(place) => {
          console.log(place);
        }}
      />
    </div>
  );
}

export default InputItem
