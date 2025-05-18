"use client"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"
import { Property } from "@/lib/component/property"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400", "500"] })

export default function TeamListing({ agentProperties, status }) {
  const currentListings =
    agentProperties?.filter(
      (property) => property?.status === status
    ) || []
  return (
    <div className="py-11 overflow-hidden">
      <div className="flex items-center justify-center mb-8">
        <div className="h-[1px] bg-[#656565]/30 flex-grow"></div>
        <h2
          className={`${archivo.className} text-[#E2DBCC] text-[20px] font-normal leading-[120%] px-6`}
        >
          {status === "Current"
            ? `Current Listings (${currentListings.length})`
            : `Recent Sales (${currentListings.length})`}
        </h2>
        <div className="h-[1px] bg-[#656565]/30 flex-grow"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
        {currentListings.map((property) => {
          return (
            <Property
              key={property.id}
              property={property}
              taviraj={taviraj}
              archivo={archivo}
            />
          )
        })}
      </div>
    </div>
  )
}
