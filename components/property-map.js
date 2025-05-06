"use client"

import { useState, useMemo } from "react"
import { Archivo, Taviraj } from "next/font/google"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"

const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"] })
const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400"] })

export default function PropertyMap({ onClose, property, type }) {
  const [mapType, setMapType] = useState("Map")

  // NOTE: To use Google Maps, you must set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env file.
  // Example: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
  // The @react-google-maps/api will automatically use this key if you use useJsApiLoader.

  const { isLoaded } = useJsApiLoader({
    id: 'google-maps-script',
    googleMapsApiKey: 'AIzaSyAU7qoKGLlzkWmLTUOOXyv48tLOGljBXm0'
  })

  const handleMapTypeChange = (type) => {
    setMapType(type)
  }

  return (
    <div className="fixed inset-0 bg-[#211f17] z-50 flex flex-col">
      {/* Property Info - Updated with correct font sizes */}
      <div className="container mx-auto px-4 py-6">
        <div className="text-[#e2dbcc] text-[14px] mb-4">
          <span>{type}</span>
        </div>

        <div className="flex justify-between items-start">
          <div>
            <h1
              className={`${taviraj.className} text-[#bd9574] text-[64px] font-light leading-[125%] tracking-[0px] mb-0`}
            >
              {property?.name || "Sunny Vista"}
            </h1>
          </div>
          <div className="text-right">
            <p
              className={`${archivo.className} text-[#e2dbcc] font-[300] text-[16px] leading-[150%] tracking-[0px] mb-2`}
            >
              {property?.address_street + ", " + property?.address_suburb ||
                "5408/101 Bathurst Street, Sydney, 2000."}
            </p>
            <p
              className={`${archivo.className} text-[#e2dbcc] font-[300] text-[16px] leading-[150%] tracking-[0px]`}
            >
              {property?.address_state + ", " + property?.address_postcode ||
                "Sydney, 2000"}
            </p>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        {/* Map Image - Different based on selected map type */}
        <div className="h-full w-full">
          {
            /* Only render Google Map after API is loaded */
            console.log("nandha lagi", property?.geo_lat + property?.geo_lon)
          }
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={
                property?.geo_lat && property?.geo_lon
                  ? { lat: property?.geo_lat, lng: property?.geo_lon }
                  : { lat: -33.8688, lng: 151.2093 }
              }
              zoom={16}
              mapTypeId={mapType === "Satellite" ? "satellite" : "roadmap"}
              options={{
                disableDefaultUI: true,
                zoomControl: true,
                fullscreenControl: true,
                streetViewControl: true,
                mapTypeControl: true,
                scaleControl: true,
              }}
            >
              {/* Custom Black Diamondz Pin Marker */}
              <Marker
                position={
                  property?.geo_lat && property?.geo_lon
                    ? { lat: property?.geo_lat, lng: property?.geo_lon }
                    : { lat: -33.8688, lng: 151.2093 }
                }
                icon={{
                  url: "/smallLogoBD.png",
                  scaledSize: { width: 32, height: 32 },
                  anchor: { x: 16, y: 32 },
                }}
              />
            </GoogleMap>
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              Loading Map...
            </div>
          )}
        </div>
      </div>

      {/* Back Button - Moved below the map */}
      <div className="py-6 flex justify-center bg-[#211f17]">
        <button
          onClick={onClose}
          className="flex items-center justify-center gap-2 px-8 py-3 border border-[#656565] text-[#bd9574] hover:bg-[#2c2920] transition-colors"
          id="go-back-button"
        >
          <ArrowLeft size={20} />
          <span className={`${archivo.className} font-light`}>Go Back</span>
        </button>
      </div>
    </div>
  )
}
