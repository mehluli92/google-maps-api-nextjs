'use client'
import React, {useEffect, useState } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { mapOptions } from './MapConfiguration'
import { fromAddress, setDefaults, fromLatLng } from 'react-geocode'

export default function GeocodeComponent({ isLoaded, selectedAddress, changedAddress }) {
    const [coordinates, setCoordinates] = useState({ lat: -26.1836101, lng: 28.0444317 })
    const [loading, setLoading] = useState(false)
    const [zoom, setZoom] = useState(7)

    const containerStyle = {
        width: '100%',
        height: '400px',
    }

    const defaultCenter = {
        lat: -26.1836101,
        lng: 28.0444317,
    }

    // Geocoding function: Converts address to coordinates
    const handleGeocode = async (address) => {
        setLoading(true)
        try {
            const { results } = await fromAddress(address)
            const { lat, lng } = results[0].geometry.location
            setCoordinates({ lat, lng })
            setZoom(11)
        } catch (error) {
            console.error("Geocoding error:", error)
        } finally {
            setLoading(false)
        }
    }

    // Reverse Geocoding function: Converts coordinates to an address
    const handleReverseGeocode = async (latitude, longitude) => {
        setLoading(true)
        try {
            const { results } = await fromLatLng(latitude, longitude)
            const address = results[0].formatted_address
            changedAddress(address)
        } catch (error) {
            console.error("Reverse geocoding error:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleMapClick = (event) => {
      const lat = event.latLng.lat()
      const lng = event.latLng.lng()
      setCoordinates({ lat, lng })
      setZoom(11)
      handleReverseGeocode(lat, lng)
    }

    useEffect(() => {
        setDefaults({
            key: mapOptions.googleMapApiKey, // Google maps API kew
            language: 'en',
            region: 'es',
        })
    }, [])

    useEffect(() => {
        if (selectedAddress) {
          handleGeocode(selectedAddress)
        }
    }, [selectedAddress])

    return isLoaded && (
        <div className='pr-4'>
            <div style={{ marginBottom: '20px' }} className="mt-4">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    coordinates.lat && coordinates.lng && (
                        <div className="mt-4">
                            <p className='font-normal'>Generated Coordinates: {coordinates.lat}, {coordinates.lng}</p>
                        </div>
                    )
                )}
            </div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={coordinates.lat ? coordinates : defaultCenter}
                zoom={zoom}
                onClick={handleMapClick}
            >
                {coordinates.lat && coordinates.lng && (
                    <Marker position={coordinates} key={coordinates.lat + coordinates.lng} />
                )}
            </GoogleMap>
        </div>
    )
}
