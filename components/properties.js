"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["400"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["300"] })

const categories = [
  { id: "buy", label: "Buy", type: "text" },
  { id: "sell", label: "Sell", type: "text" },
  {
    id: "city",
    label: "City",
    type: "icon",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 21H21M6 18V9.99998M10 18V9.99998M14 18V9.99998M18 18V9.99998M20 21V6.99998L12 2.99998L4 6.99998V21"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "country",
    label: "Country",
    type: "icon",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 21V12M16 21V12M4 21H20M4 7H20M6 7L9 4M18 7L15 4M11 7V4H13V7M4 7V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "beachfront",
    label: "Beachfront",
    type: "icon",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4 19H20M4 15L7 14C8.5 13.5 10.5 13.5 12 14C13.5 14.5 15.5 14.5 17 14L20 15M4 11L7 10C8.5 9.5 10.5 9.5 12 10C13.5 10.5 15.5 10.5 17 10L20 11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "apartment",
    label: "Apartment",
    type: "icon",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 21H21M5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21M9 21V17C9 15.8954 9.89543 15 11 15H13C14.1046 15 15 15.8954 15 17V21M9 7H11M9 11H11M13 7H15M13 11H15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "suburbs",
    label: "Suburbs",
    type: "icon",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 21H21M5 21V8L12 3L19 8V21M9 21V12H15V21"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "ocean-view",
    label: "Ocean View",
    type: "icon",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 16C3 16 7 10 12 10C17 10 21 16 21 16M3 12C3 12 7 6 12 6C17 6 21 12 21 12M3 20C3 20 7 14 12 14C17 14 21 20 21 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "pool",
    label: "Pool",
    type: "icon",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4 15C4 15 5 14 7 14C9 14 10 15 12 15C14 15 15 14 17 14C19 14 20 15 20 15M4 19C4 19 5 18 7 18C9 18 10 19 12 19C14 19 15 18 17 18C19 18 20 19 20 19M4 11C4 11 5 10 7 10C9 10 10 11 12 11C14 11 15 10 17 10C19 10 20 11 20 11M12 4V7M15 5V8M9 5V8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

const properties = [
  {
    id: 1,
    type: "House",
    location: "Beachfront",
    name: "Anandes Hotel",
    address: "5408/101 Middle Street",
    city: "Sydney",
    postcode: "2000",
    price: "Auction: $ 5.200.000",
    image: "/images/anandes-hotel.png",
    features: {
      bedrooms: 3,
      bathrooms: 5,
      parking: 1,
      floors: 6,
      rooms: 8,
      additional: 2,
    },
    categories: ["buy", "beachfront", "city"],
  },
  {
    id: 2,
    type: "Apartment",
    location: "City View",
    name: "Pacific Plaza",
    address: "2309/45 Business Avenue",
    city: "Melbourne",
    postcode: "3000",
    price: "Contact Agent for Sell Price",
    image: "/images/pacific-plaza.png",
    features: {
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      floors: 4,
      rooms: 3,
      additional: 1,
    },
    categories: ["buy", "apartment", "city"],
  },
  {
    id: 3,
    type: "Villa",
    location: "Mountain View",
    name: "Sunrise Retreat",
    address: "1254/78 Serenity Way",
    city: "Brisbane",
    postcode: "4000",
    price: "Auction: $ 730.000",
    image: "/images/sunrise-retreat.png",
    features: {
      bedrooms: 4,
      bathrooms: 3,
      parking: 2,
      floors: 5,
      rooms: 6,
      additional: 1,
    },
    categories: ["buy", "suburbs"],
  },
  {
    id: 4,
    type: "Penthouse",
    location: "Ocean View",
    name: "Azure Heights",
    address: "601/15 Waterfront Avenue",
    city: "Gold Coast",
    postcode: "4217",
    price: "Auction: $ 1.200.000",
    image: "/images/azure-heights.png",
    features: {
      bedrooms: 5,
      bathrooms: 4,
      parking: 3,
      floors: 7,
      rooms: 9,
      additional: 4,
    },
    categories: ["buy", "apartment", "ocean-view"],
  },
]

export default function Properties({ showFilters = true, showNavigation = true, propertyCount = 4 }) {
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedFilters, setSelectedFilters] = useState(["buy"])
  const [activeTab, setActiveTab] = useState("buy")
  const [filteredProperties, setFilteredProperties] = useState(properties)
  const [favorites, setFavorites] = useState([])
  const itemsPerPage = 4

  useEffect(() => {
    const newFilteredProperties = properties.filter((property) =>
      selectedFilters.every((filter) => property.categories.includes(filter)),
    )
    setFilteredProperties(newFilteredProperties)
    setCurrentPage(0)
  }, [selectedFilters])

  const displayProperties = showNavigation
    ? filteredProperties.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : filteredProperties.slice(0, propertyCount)

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage)

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev))
  }

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

  const toggleFavorite = (propertyId) => {
    setFavorites((prev) => (prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]))
  }

  return (
    <div className="bg-[#211f17] text-white py-12">
      <div className="container mx-auto px-4">
        {/* Only show filters if showFilters prop is true */}
        {showFilters && (
          <div className="flex items-center justify-between pb-4 mb-8">
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

            <div className="flex gap-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProperties.map((property) => (
            <div key={property.id} className="bg-[#211f17] overflow-hidden">
              {/* Image Container */}
              <div className="relative h-[200px] mb-4">
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.name}
                  width={375}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Property Type and Location with Heart Icon */}
              <div className="flex justify-between items-center mb-2">
                <div className="text-[#E2DBCC] text-[16px] font-light">
                  {property.type} | {property.location}
                </div>
                <button
                  onClick={() => toggleFavorite(property.id)}
                  className="text-[#E2DBCC] hover:text-[#BD9574] transition-colors"
                >
                  <Heart
                    className={`w-6 h-6 ${favorites.includes(property.id) ? "fill-[#BD9574] stroke-[#BD9574]" : ""}`}
                  />
                </button>
              </div>

              {/* Property Name */}
              <h3
                className={`${taviraj.className} font-normal text-[32px] text-white leading-[120%] tracking-[0%] mb-2`}
              >
                {property.name}
              </h3>

              {/* Address */}
              <div className="text-[#E2DBCC] text-[16px] font-light mb-1">{property.address}</div>
              <div className="text-[#E2DBCC] text-[16px] font-light mb-4">
                {property.city}, {property.postcode}
              </div>

              {/* Price */}
              <div className="text-[#BD9574] text-[16px] font-light mb-6">{property.price}</div>

              {/* Property Features */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-[#E2DBCC]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14M3 11h18M7 11V7m10 4V7"
                      stroke="#E2DBCC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[14px] font-light">{property.features.bedrooms}</span>
                </div>
                <div className="flex items-center gap-1 text-[#E2DBCC]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 12h16a1 1 0 011 1v2a4 4 0 01-4 4H7a4 4 0 01-4-4v-2a1 1 0 011-1zm4-9v5m4-2v2m4-4v7"
                      stroke="#E2DBCC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[14px] font-light">{property.features.bathrooms}</span>
                </div>
                <div className="flex items-center gap-1 text-[#E2DBCC]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 17h14M5 17a2 2 0 01-2-2V9m2 8a2 2 0 002 2h10a2 2 0 002-2M5 17V7a2 2 0 012-2h10a2 2 0 012 2v10m0 0V9m0 0H3"
                      stroke="#E2DBCC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="text-[14px] font-light">{property.features.parking}</span>
                </div>
                <div className="flex items-center gap-1 text-[#E2DBCC]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3 21h18M9 8h1m5 0h1M9 16h1m5 0h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"
                      stroke="#E2DBCC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[14px] font-light">{property.features.floors}</span>
                </div>
                <div className="flex items-center gap-1 text-[#E2DBCC]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 21V8a2 2 0 012-2h12a2 2 0 012 2v13M2 10h20M10 2v6m4-6v6"
                      stroke="#E2DBCC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[14px] font-light">{property.features.rooms}</span>
                </div>
                <div className="flex items-center gap-1 text-[#E2DBCC]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 15c0 1.1.9 2 2 2h12a2 2 0 002-2v-2H4v2zm18-7H2v3h20V8zm-9-4h-2v2h2V4z"
                      stroke="#E2DBCC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[14px] font-light">{property.features.additional}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-0">
                <button className="py-4 flex items-center justify-center gap-2 text-[#BD9574] border border-r-0 border-[#656565]/20 hover:bg-[#1A1814] transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9 20l-5.447-5.447a8 8 0 1113.894 0L12 20l-3-3z"
                      stroke="#BD9574"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.5 11a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
                      stroke="#BD9574"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="font-light text-[16px]">See map</span>
                </button>
                <button className="py-4 flex items-center justify-center gap-2 text-[#BD9574] border border-[#656565]/20 hover:bg-[#1A1814] transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 11a4 4 0 100-8 4 4 0 000 8zM6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"
                      stroke="#BD9574"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="font-light text-[16px]">Agent</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation - only show if showNavigation prop is true */}
        {showNavigation && (
          <div className="flex items-center justify-between mt-12">
            <div className="flex gap-8">
              {Array.from({ length: totalPages }, (_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 ${index === currentPage ? "bg-[#BD9574]" : "bg-[#656565]"} transform rotate-45 cursor-pointer`}
                  onClick={() => setCurrentPage(index)}
                />
              ))}
            </div>

            <div className="flex items-center gap-4">
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
