"use client"

import { useState, useMemo } from "react"
import { Archivo, Taviraj } from "next/font/google"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import PropertyTeamMembersCarousel from "@/components/property-teamMembersCarousel";



const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })

export default function PropertyAgents({ onClose, property, type }) {

  return (
    <div className="relative bg-[#211f17] z-50 flex flex-col px-10">
      {/* Property Info - Updated with correct font sizes */}
      <div className="container mx-auto px-4 py-6">
        <div
          className={`${archivo.className} text-[#e2dbcc] text-[16px] leading-[150%] mb-4`}
        >
          <span>{type}</span>
        </div>

        <div className="flex justify-between items-start">
          <div>
            <h1
              className={`${taviraj.className} text-[#bd9574] text-[32px] font-light leading-[125%] tracking-[0px] mb-0`}
            >
              {property?.name || ""}
            </h1>
          </div>
          <div className="text-right">
            <p
              className={`${archivo.className} text-[#e2dbcc] font-[300] text-[16px] leading-[150%] tracking-[0px] mb-2`}
            >
              {property?.address_street + ", " + property?.address_suburb || ""}
            </p>
            <p
              className={`${archivo.className} text-[#e2dbcc] font-[300] text-[16px] leading-[150%] tracking-[0px]`}
            >
              {property?.address_state + ", " + property?.address_postcode.toString().padStart(4, "0") ||
                ""}
            </p>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        {/* Map Image - Different based on selected map type */}
        <div className="h-[400px] w-full text-[#e2dbcc]">
          {property?.agents?.length > 0 ? (
            <>
              <PropertyTeamMembersCarousel
                data={property}
              />
            </>
          ) : (
            <section className="flex justify-center items-center h-[400px] bg-[#211f17]">
              No Agent Found
            </section>
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
