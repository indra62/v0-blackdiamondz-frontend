"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"
import { Property } from "@/lib/component/property"

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

const taviraj = Taviraj({ subsets: ["latin"], weight: ["400"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["300"] })

const propertyTab = [
  { id: "buy", label: "Buy", type: "text", value: "Current" },
  { id: "sell", label: "Sell", type: "text", value: "Sold" },
]

// const categories = [
//   { id: "buy", label: "Buy", type: "text", value: "Current" },
//   { id: "sell", label: "Sell", type: "text", value: "Sold" },
//   {
//     id: "city",
//     label: "City",
//     type: "icon",
//     icon: (
//       <svg
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M3 21H21M6 18V9.99998M10 18V9.99998M14 18V9.99998M18 18V9.99998M20 21V6.99998L12 2.99998L4 6.99998V21"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     ),
//   },
//   {
//     id: "country",
//     label: "Country",
//     type: "icon",
//     icon: (
//       <svg
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M8 21V12M16 21V12M4 21H20M4 7H20M6 7L9 4M18 7L15 4M11 7V4H13V7M4 7V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V7"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     ),
//   },
//   {
//     id: "beachfront",
//     label: "Beachfront",
//     type: "icon",
//     icon: (
//       <svg
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M4 19H20M4 15L7 14C8.5 13.5 10.5 13.5 12 14C13.5 14.5 15.5 14.5 17 14L20 15M4 11L7 10C8.5 9.5 10.5 9.5 12 10C13.5 10.5 15.5 10.5 17 10L20 11"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     ),
//   },
//   {
//     id: "apartment",
//     label: "Apartment",
//     type: "icon",
//     icon: (
//       <svg
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M3 21H21M5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21M9 21V17C9 15.8954 9.89543 15 11 15H13C14.1046 15 15 15.8954 15 17V21M9 7H11M9 11H11M13 7H15M13 11H15"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     ),
//   },
//   {
//     id: "suburbs",
//     label: "Suburbs",
//     type: "icon",
//     icon: (
//       <svg
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M3 21H21M5 21V8L12 3L19 8V21M9 21V12H15V21"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     ),
//   },
//   {
//     id: "ocean-view",
//     label: "Ocean View",
//     type: "icon",
//     icon: (
//       <svg
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M3 16C3 16 7 10 12 10C17 10 21 16 21 16M3 12C3 12 7 6 12 6C17 6 21 12 21 12M3 20C3 20 7 14 12 14C17 14 21 20 21 20"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     ),
//   },
//   {
//     id: "pool",
//     label: "Pool",
//     type: "icon",
//     icon: (
//       <svg
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M4 15C4 15 5 14 7 14C9 14 10 15 12 15C14 15 15 14 17 14C19 14 20 15 20 15M4 19C4 19 5 18 7 18C9 18 10 19 12 19C14 19 15 18 17 18C19 18 20 19 20 19M4 11C4 11 5 10 7 10C9 10 10 11 12 11C14 11 15 10 17 10C19 10 20 11 20 11M12 4V7M15 5V8M9 5V8"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     ),
//   },
// ]

export default function Properties({
  data,
  properties,
  showFilters = true,
  showNavigation = true,
  propertyCount = 4,
  onFilterChange,
  currentPage,
  totalPages,
  onPageChange,
  onTypeChange,
  categories,
}) {
  const [selectedFilters, setSelectedFilters] = useState(["Current"])
  const [selectedType, setSelectedType] = useState([])
  const [activeTab, setActiveTab] = useState("Current")
  const [favorites, setFavorites] = useState([])
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

  const toggleFavorite = (propertyId) => {
    setFavorites((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    )
  }

  return (
    <div className="bg-[#211f17] text-white py-12">
      <div className="container mx-auto px-4">
        {/* Only show filters if showFilters prop is true */}
        {showFilters && (
          <div className="flex items-center justify-between pb-4 mb-8">
            <div className="flex gap-8">
              {propertyTab
                .filter((cat) => cat.type === "text")
                .map((category) => (
                  <div
                    key={category.id}
                    className={`cursor-pointer ${
                      activeTab === category.value
                        ? "text-[#BD9574]"
                        : "text-[#656565]"
                    }`}
                    onClick={() => toggleFilter(category.value)}
                  >
                    <span className="font-light text-lg">{category.label}</span>
                    {activeTab === category.value && (
                      <div className="w-full h-[2px] bg-[#BD9574] mt-2" />
                    )}
                  </div>
                ))}
            </div>

            <div className="flex gap-8">
              {categories
                .filter((cat) => cat.svg !== null)
                .map((category) => {
                  // Find the correct translation based on current language
                  // Assuming you have a currentLanguage variable or similar
                  const translation = category.translations.find(
                    (t) => t.languages_code === language // or use your current language code
                  )

                  return (
                    <div
                      key={category.id}
                      className={`flex flex-col items-center cursor-pointer ${
                        selectedType.includes(category.id)
                          ? "text-[#BD9574]"
                          : "text-[#656565]"
                      }`}
                      onClick={() => toggleType(category.id)}
                    >
                      <div
                        className="mb-1"
                        dangerouslySetInnerHTML={{ __html: category.svg }}
                      />
                      <span
                        className={`font-light text-xs ${
                          selectedType.includes(category.id)
                            ? "text-[#BD9574]"
                            : "text-[#656565]"
                        }`}
                      >
                        {translation?.name || category.slug}
                      </span>
                    </div>
                  )
                })}
            </div>
          </div>
        )}

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((property) => (
            <Property
              key={property.id}
              property={property}
              taviraj={taviraj}
              archivo={archivo}
            />
          ))}
        </div>

        {/* Navigation - only show if showNavigation prop is true */}
        {showNavigation && (
          <div className="flex items-center justify-between mt-12">
            <div className="flex gap-8">
              {Array.from({ length: totalPages + 1 }, (_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 ${
                    index === currentPage ? "bg-[#BD9574]" : "bg-[#656565]"
                  } transform rotate-45 cursor-pointer`}
                  onClick={() => onPageChange(index)}
                />
              ))}
            </div>

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
                className="flex items-center gap-2 bg-[#BD9574] text-[#211f17] px-6 py-2 rounded hover:bg-[#d4af37] transition-colors"
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