"use client"

import { useRef, useEffect, useState } from "react";
import { Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"
import { Property } from "@/lib/component/property"
import DynamicCarousel from "@/lib/component/DynamicCarousel"

/**
 * Properties Component
 *
 * Displays a grid of property listings with filtering capabilities.
 * Supports pagination, favorites, and different view modes.
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.showFilters - Whether to display the filter options
 * @param {boolean} props.showNavigation - Whether to display pagination controls
 * @param {number} props.propertyCount - Number of properties to display
 */

const taviraj = Taviraj({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const propertyTab = [
  { id: "buy", label: "Buy", type: "text", value: "Current" },
  { id: "sell", label: "Sell", type: "text", value: "Sold" },
]

export default function Properties({
  data,
  showFilters = true,
  showNavigation = false,
  propertyCount = 4,
  onFilterChange,
  currentPage,
  totalPages,
  onPageChange,
  onTypeChange,
  categories,
  isMobileView,
}) {
  const [selectedFilters, setSelectedFilters] = useState(["Current"])
  const [selectedType, setSelectedType] = useState([])
  const [activeTab, setActiveTab] = useState("Current")
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language")
      if (storedLanguage) {
        setLanguage(storedLanguage)
      }
    }
  }, [])

  const translationCategories =
    categories?.translations?.find((t) => t.languages_code === language) ||
    categories?.translations?.[0]

  const toggleFilter = (filterId) => {
    if (filterId === "Current" || filterId === "Sold") {
      setActiveTab(filterId)
      // Call the parent component's filter handler
      if (onFilterChange) {
        onFilterChange(filterId, selectedType)
      }
    } else {
      setSelectedFilters((prev) =>
        prev.includes(filterId)
          ? prev.filter((id) => id !== filterId)
          : [...prev, filterId]
      )
    }
  }

  const toggleType = (filterId) => {
    const updatedTypes = selectedType.includes(filterId)
      ? selectedType.filter((id) => id !== filterId)
      : [...selectedType, filterId]

    setSelectedType(updatedTypes)
    if (onTypeChange) {
      onTypeChange(updatedTypes) // Only pass the updated types
    }
  }

  return (
    <div className="bg-[#211f17] text-white py-12">
      <div>
        {/* Properties Grid */}
        <DynamicCarousel
          buttonLabel="See All Properties"
          infinite={true}
          showButton={true}
        >
          {data.map((property) => (
              <Property
                key={property.id}
                property={property}
                taviraj={taviraj}
                archivo={archivo}
              />
          ))}
        </DynamicCarousel>

        {/* Navigation - only show if showNavigation prop is true */}
        {showNavigation && (
          <div className={`flex items-center justify-between mt-12`}>
            {!isMobileView && (
              <div className="flex gap-8">
                {Array.from({ length: totalPages }, (_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 ${
                      index === currentPage ? "bg-[#BD9574]" : "bg-[#656565]"
                    } transform rotate-45 cursor-pointer`}
                    onClick={() => onPageChange(index)}
                  />
                ))}
              </div>
            )}

            <div className="flex items-center gap-4">
              <button
                className={`p-2 border border-[#656565] rounded ${
                  currentPage === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:border-[#BD9574] hover:text-[#BD9574]"
                } transition-colors`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18l-6-6 6-6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                className={`p-2 border border-[#656565] rounded ${
                  currentPage === totalPages - 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:border-[#BD9574] hover:text-[#BD9574]"
                } transition-colors`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <Link
                href="/buy"
                className="flex items-center gap-2 bg-[#BD9574] text-[#211f17] px-6 py-2 rounded hover:bg-[#BD9574] transition-colors"
              >
                <span className="font-light text-[16px]">
                  See All Properties
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
