'use client'
import GeocodeComponent from "./components/GeocodeComponent"
import { useJsApiLoader } from '@react-google-maps/api'
import { mapOptions } from "./components/MapConfiguration"
import { useState } from "react"

export default function Home() {
  const [address, setAddress] = useState('')

  const changedAddress = (data) => {
    console.log('Clicked address value: ',data)
    setAddress(data)
  }

  const { isLoaded } = useJsApiLoader({
    id: mapOptions.googleMapApiKey,
    googleMapsApiKey: mapOptions.googleMapApiKey,
  })

  return (
    <div className="px-6 mb-8">
      <div className="my-4 justify-center">
        <h3
        className="font-semibold text-lg"
        >
          Mehluli Nokwara Interview on google maps.
        </h3>
      </div>
      <div
      className="mb-4"
      >
      <label className="capitalize" for="address">enter complete street address</label>
      <input 
      type="text" 
      id="address" 
      name="address" 
      placeholder="27 Princess Place, Parktown, Johannesburg, South Africa" 
      class="border border-gray-300 rounded p-2 w-full mb-4"
      value={address}
      onChange={(e)=>setAddress(e.target.value)}
      />

      </div>

      <GeocodeComponent
      selectedAddress={address}
      isLoaded={isLoaded}
      changedAddress={changedAddress}
      />
    </div>
  );
}
