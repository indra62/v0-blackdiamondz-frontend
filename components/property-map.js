"use client"

import { useState } from "react"
import { Archivo, Taviraj } from "next/font/google"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
// Update import statements to use kebab-case
import Header from "@/components/header"

const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"] })
const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400"] })

export default function PropertyMap({ onClose, propertyName, propertyAddress, propertyCity }) {
  const [mapType, setMapType] = useState("Map")

  // Function to handle map type change
  const handleMapTypeChange = (type) => {
    setMapType(type)
  }

  return (
    <div className="fixed inset-0 bg-[#211f17] z-50 flex flex-col">
      {/* Use the existing Header component */}
      <Header />

      {/* Property Info - Updated with correct font sizes */}
      <div className="container mx-auto px-4 py-6">
        <div className="text-[#e2dbcc] text-[14px] mb-4">
          <span>House | Beachfront</span>
        </div>

        <div className="flex justify-between items-start">
          <div>
            <h1
              className={`${taviraj.className} text-[#bd9574] text-[64px] font-light leading-[125%] tracking-[0px] mb-0`}
            >
              {propertyName || "Sunny Vista"}
            </h1>
          </div>
          <div className="text-right">
            <p
              className={`${archivo.className} text-[#e2dbcc] font-[300] text-[16px] leading-[150%] tracking-[0px] mb-2`}
            >
              {propertyAddress || "5408/101 Bathurst Street, Sydney, 2000."}
            </p>
            <p className={`${archivo.className} text-[#e2dbcc] font-[300] text-[16px] leading-[150%] tracking-[0px]`}>
              {propertyCity || "Sydney, 2000"}
            </p>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        {/* Map Type Toggle */}
        <div className="absolute top-4 left-4 z-10 bg-white rounded-sm flex">
          <button
            className={`px-4 py-2 text-sm ${mapType === "Map" ? "bg-gray-200" : "bg-white"}`}
            onClick={() => handleMapTypeChange("Map")}
          >
            Map
          </button>
          <button
            className={`px-4 py-2 text-sm ${mapType === "Satellite" ? "bg-gray-200" : "bg-white"}`}
            onClick={() => handleMapTypeChange("Satellite")}
          >
            Satellite
          </button>
        </div>

        {/* Fullscreen Button */}
        <div className="absolute top-4 right-4 z-10">
          <button className="bg-white p-2 rounded-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4H20V20H4V4Z" stroke="black" strokeWidth="1.5" />
              <path d="M9 9H15V15H9V9Z" stroke="black" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
          <button className="bg-white p-2 rounded-sm">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 0V16M0 8H16" stroke="black" strokeWidth="1.5" />
            </svg>
          </button>
          <button className="bg-white p-2 rounded-sm">
            <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 1H16" stroke="black" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        {/* Compass */}
        <div className="absolute left-4 bottom-16 z-10">
          <button className="bg-white p-2 rounded-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="8" stroke="black" strokeWidth="1.5" />
              <path d="M12 4V20M4 12H20" stroke="black" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        {/* Map Image - Different based on selected map type */}
        <div className="h-full w-full">
          {mapType === "Map" ? (
            <Image src="/placeholder.svg?key=uzm9n" alt="Map showing property location" fill className="object-cover" />
          ) : (
            <Image
              src="/placeholder.svg?key=pd7ai"
              alt="Satellite view of property location"
              fill
              className="object-cover"
            />
          )}

          {/* Black Diamondz Logo Pin */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full z-20 animate-bounce">
            <div className="relative w-12 h-16">
              {/* Black Pin Background */}
              <svg width="48" height="64" viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24 0C10.745 0 0 10.745 0 24C0 42 24 64 24 64C24 64 48 42 48 24C48 10.745 37.255 0 24 0Z"
                  fill="black"
                />
              </svg>

              {/* Black Diamondz Logo */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-6 h-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smallLogoBD-zxDglqhR7Dv3zdEHln30LxjDUQXDD7.png"
                  alt="Black Diamondz Logo"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </div>
            </div>
          </div>
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
