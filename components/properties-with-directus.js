/**
 * Properties Component with Directus Integration
 *
 * This component fetches and displays property listings from Directus CMS.
 * It includes filtering, pagination, and favorites functionality.
 */
"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["400"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["300"] })

// Category definitions remain the same as before
const categories = [
  { id: "buy", label: "Buy", type: "text" },
  { id: "sell", label: "Sell", type: "text" },
  // ... other categories
]

export default function PropertiesWithDirectus({ showFilters = true, showNavigation = true, propertyCount = 4 }) {
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedFilters, setSelectedFilters] = useState(["buy"])
  const [activeTab, setActiveTab] = useState("buy")
  const [properties, setProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [favorites, setFavorites] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const itemsPerPage = 4

  // Fetch properties from our API route that connects to Directus
  useEffect(() => {
    async function fetchProperties() {
      try {
        setIsLoading(true)
        const response = await fetch("/api/properties")

        if (!response.ok) {
          throw new Error("Failed to fetch properties")
        }

        const result = await response.json()
        setProperties(result.data)
        setError(null)
      } catch (err) {
        console.error("Error fetching properties:", err)
        setError("Failed to load properties. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperties()
  }, [])

  // Filter properties whenever selected filters or properties change
  useEffect(() => {
    // This is a simplified filter implementation
    // In a real app, you might want to filter on the server side
    const newFilteredProperties = properties.filter((property) => {
      // Example filtering logic - adjust based on your actual data structure
      if (selectedFilters.includes("buy") && property.status !== "for_sale") {
        return false
      }
      if (selectedFilters.includes("sell") && property.status !== "for_rent") {
        return false
      }
      // Add more filter conditions as needed
      return true
    })

    setFilteredProperties(newFilteredProperties)
    setCurrentPage(0)
  }, [selectedFilters, properties])

  // Calculate which properties to show based on pagination and count limits
  const displayProperties = showNavigation
    ? filteredProperties.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : filteredProperties.slice(0, propertyCount)

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage)

  // Pagination handlers
  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev))
  }

  // Filter toggle handler
  const toggleFilter = (filterId) => {
    if (filterId === "buy" || filterId === "sell") {
      setActiveTab(filterId)
      setSelectedFilters((prev) => [filterId, ...prev.filter((id) => id !== "buy" && id !== "sell")])
    } else {
      setSelectedFilters((prev) =>
        prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId],
      )
    }
  }

  // Favorite toggle handler
  const toggleFavorite = (propertyId) => {
    setFavorites((prev) => (prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]))
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-[#211f17] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#E2DBCC]">Loading properties...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="bg-[#211f17] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-400">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-[#BD9574] text-[#211f17] hover:bg-[#d4af37]"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#211f17] text-white py-12">
      <div className="container mx-auto px-4">
        {/* Filters section */}
        {showFilters && (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-4 mb-8 gap-4">
            {/* Text filters */}
            <div className="flex gap-8">
              {categories
                .filter((cat) => cat.type === "text")
                .map((category) => (
                  <div
                    key={category.id}
                    className={`cursor-pointer ${activeTab === category.id ? "text-[#BD9574]" : "text-[#656565]"}`}
                    onClick={() => toggleFilter(category.id)}
                  >
                    <span className="font-light text-lg">{category.label}</span>
                    {activeTab === category.id && <div className="w-full h-[2px] bg-[#BD9574] mt-2" />}
                  </div>
                ))}
            </div>

            {/* Icon filters */}
            <div className="flex flex-wrap gap-8">
              {categories
                .filter((cat) => cat.type === "icon")
                .map((category) => (
                  <div
                    key={category.id}
                    className={`flex flex-col items-center cursor-pointer ${
                      selectedFilters.includes(category.id) ? "text-[#BD9574]" : "text-[#656565]"
                    }`}
                    onClick={() => toggleFilter(category.id)}
                  >
                    <div className="mb-1">{category.icon}</div>
                    <span
                      className={`font-light text-xs ${
                        selectedFilters.includes(category.id) ? "text-[#BD9574]" : "text-[#656565]"
                      }`}
                    >
                      {category.label}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Properties Grid */}
        {displayProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProperties.map((property) => (
              <Link
                key={property.id}
                href={`/property/${property.id}`}
                className="block bg-[#211f17] overflow-hidden hover:opacity-95 transition-opacity"
              >
                {/* Property Card Content */}
                <div className="relative h-[200px] mb-4">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.name}
                    width={375}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Property details */}
                <div className="flex justify-between items-center mb-2">
                  <div className="text-[#E2DBCC] text-[16px] font-light">
                    {property.type} | {property.location}
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      toggleFavorite(property.id)
                    }}
                    className="text-[#E2DBCC] hover:text-[#BD9574] transition-colors"
                  >
                    <Heart
                      className={`w-6 h-6 ${favorites.includes(property.id) ? "fill-[#BD9574] stroke-[#BD9574]" : ""}`}
                    />
                  </button>
                </div>

                <h3
                  className={`${taviraj.className} font-normal text-[32px] text-white leading-[120%] tracking-[0%] mb-2`}
                >
                  {property.name}
                </h3>

                <div className="text-[#E2DBCC] text-[16px] font-light mb-1">{property.address}</div>
                <div className="text-[#E2DBCC] text-[16px] font-light mb-4">
                  {property.city}, {property.postcode}
                </div>

                <div className="text-[#BD9574] text-[16px] font-light mb-6">{property.price}</div>

                {/* Property features */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  {/* Feature icons */}
                  {/* ... (feature icons remain the same) */}
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-0">{/* ... (action buttons remain the same) */}</div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-[#E2DBCC]">No properties found matching your criteria.</p>
          </div>
        )}

        {/* Pagination */}
        {showNavigation && totalPages > 0 && (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-12 gap-4">
            <div className="flex gap-8 justify-center">
              {Array.from({ length: totalPages }, (_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 ${index === currentPage ? "bg-[#BD9574]" : "bg-[#656565]"} transform rotate-45 cursor-pointer`}
                  onClick={() => setCurrentPage(index)}
                />
              ))}
            </div>

            <div className="flex items-center gap-4 justify-center">
              <button
                className={`p-2 border border-[#656565] rounded ${
                  currentPage === 0 ? "opacity-50 cursor-not-allowed" : "hover:border-[#BD9574] hover:text-[#BD9574]"
                } transition-colors`}
                onClick={handlePrevious}
                disabled={currentPage === 0}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <span className="font-light text-[16px]">See All Properties</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
