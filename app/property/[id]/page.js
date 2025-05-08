/**
 * Property Detail Page
 *
 * Dynamic page that displays detailed information about a specific property.
 * Supports different view modes for property images (grid, gallery, map).
 *
 * Uses dynamic routing with [id] parameter to fetch the specific property.
 *
 * @page
 * @param {Object} props - Component props
 * @param {Object} props.params - Route parameters
 * @param {string} props.params.id - Property ID from the URL
 */
"use client";

import { useState, useEffect, use } from "react"
import Footer from "@/components/footer"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"
import { Inter } from "next/font/google"
import Image from "next/image"
import { MapPin } from "lucide-react"
import Paddington from "@/components/paddington"
import PropertyImagesGallery from "@/components/property-images-gallery"
import PropertyGridGallery from "@/components/property-grid-gallery"
import PropertyMap from "@/components/property-map"
import { getItem, getImageUrl, findFeature } from "@/lib/api"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"] })
const inter = Inter({ subsets: ["latin"], weight: ["500"] })

export default function PropertyDetailPage({ params }) {
  // Unwrap the params promise using React.use()
  const { id: propertyId } = use(params)

  // You would typically fetch property data based on this ID
  // For now, we'll just log it and continue with the static content
  console.log(`Displaying property with ID: ${propertyId}`)

  const fetchProperty = async (id) => {
    try {
      const data = await getItem("properties", id, {
        fields: [
          "*",
          "translations.*",
          "images.directus_files_id.*",
          "plans.*",
          "videos.*",
          "features.feature_id.*",
          "features.value",
          "agents.*",
          "type.*.*",
        ],
      })
      console.log("property", data)
      return data
    } catch (error) {
      console.error("Error fetching property:", error)
      return null
    }
  }

  // State management for different view modes and selected images
  const [viewMode, setViewMode] = useState("grid") // "grid", "gallery", "gridGallery", or "map"
  const [selectedImageId, setSelectedImageId] = useState(1) // Default to first image
  const [property, setProperty] = useState(null)
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    fetchProperty(propertyId).then(setProperty)

    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language")
      if (storedLanguage) {
        setLanguage(storedLanguage)
      }
    }
  }, [propertyId])

  const findFeature = (feature) => {
    if (!property || !property.features) return undefined
    return property.features.find((f) => f.feature_id?.slug === feature)
  }

  const translation =
    property?.type?.translations?.find((t) => t.languages_code === language) ||
    property?.type?.translations?.[0]

  /**
   * Toggle between different view modes (grid, gallery, gridGallery)
   * Preserves the selected image when switching to gallery view
   *
   * @param {React.SyntheticEvent} event - Click event
   */
  const toggleViewMode = (event) => {
    if (viewMode === "grid") {
      setViewMode("gallery")
    } else if (
      viewMode === "gallery" &&
      event?.currentTarget?.dataset?.action === "grid"
    ) {
      setViewMode("gridGallery")
    } else {
      setViewMode("grid")
    }
  }

  // Update the switchToGridGallery function to accept an event parameter
  const switchToGridGallery = (event) => {
    setViewMode("gridGallery")
  }

  const switchToGallery = () => {
    setViewMode("gallery")
  }

  const showMap = () => {
    setViewMode("map")
  }

  const hideMap = () => {
    setViewMode("grid")
  }

  // Handle clicking on an image in the grid gallery
  const handleGridImageClick = (imageId) => {
    setSelectedImageId(imageId) // Store which image was clicked
    setViewMode("gallery") // Switch to gallery view
  }

  // Special case: Map view takes over the entire page
  // Return early to avoid rendering the standard layout
  // If we're in map view, show only the map
  if (viewMode === "map") {
    return (
      <PropertyMap
        onClose={hideMap}
        property={property}
        type={translation?.name}
      />
    )
  }

  return (
    <main className="min-h-screen bg-[#211f17]">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="py-6">
          <div className="text-[#e2dbcc] text-sm">
            <span>{translation?.name || ""}</span>
          </div>
        </div>

        {/* Main Property Content */}
        <div className="flex mb-16">
          {/* Left Column - Property Info */}
          <div
            style={{
              width: 420,
              maxWidth: "420px",
              gap: "20px",
              paddingRight: "20px",
              paddingBottom: "60px",
            }}
          >
            {/* Property Title */}
            <h1
              className={`${taviraj.className} text-[#bd9574] text-[32px] font-normal leading-[100%] tracking-[0px] mb-4`}
            >
              {property?.name || "Loading..."}
            </h1>

            <p
              className={`${archivo.className} text-[#e2dbcc] font-[300] text-[16px] leading-[150%] tracking-[0px] mb-2`}
            >
              {property?.address_street + ", " + property?.address_suburb ||
                "Loading..."}
            </p>
            <p
              className={`${archivo.className} text-[#e2dbcc] font-[300] text-[16px] leading-[150%] tracking-[0px] mb-4`}
            >
              {property?.address_state + ", " + property?.address_postcode ||
                "Loading..."}
            </p>

            <p className="mb-6">
              <span
                className={`${archivo.className} text-[#e2dbcc] font-[300] text-[16px] leading-[150%] tracking-[0px]`}
              >
                {property?.is_auction ? "Auction" : "For Sale"}
              </span>{" "}
              <span
                className={`${archivo.className} text-[#bd9574] font-[700] text-[16px] leading-[150%] tracking-[0px]`}
              >
                {property?.price
                  ? property.price.toLocaleString("en-AU", {
                      style: "currency",
                      currency: "AUD",
                      minimumFractionDigits: 0,
                    })
                  : ""}
              </span>
            </p>

            {/* Property Features */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div
                className="flex items-center gap-1 text-[#E2DBCC]"
                title="Bedrooms"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14M3 11h18M7 11V7m10 4V7"
                    stroke="#E2DBCC"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className={`${archivo.className} font-light text-[14px]`}>
                  {(findFeature && findFeature("bedrooms")?.value) ?? ""}
                </span>
              </div>
              <div
                className="flex items-center gap-1 text-[#E2DBCC]"
                title="Bathrooms"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12h16a1 1 0 011 1v2a4 4 0 01-4 4H7a4 4 0 01-4-4v-2a1 1 0 011-1zm4-9v5m4-2v2m4-4v7"
                    stroke="#E2DBCC"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className={`${archivo.className} font-light text-[14px]`}>
                  {(findFeature && findFeature("bathrooms")?.value) ?? ""}
                </span>
              </div>
              <div
                className="flex items-center gap-1 text-[#E2DBCC]"
                title="Garages"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 17h14M5 17a2 2 0 01-2-2V9m2 8a2 2 0 002 2h10a2 2 0 002-2M5 17V7a2 2 0 012-2h10a2 2 0 012 2v10m0 0V9m0 0H3"
                    stroke="#E2DBCC"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span className={`${archivo.className} font-light text-[14px]`}>
                  {(findFeature && findFeature("garages")?.value) ?? ""}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#E2DBCC]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 21h18M9 8h1m5 0h1M9 16h1m5 0h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"
                    stroke="#E2DBCC"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className={`${archivo.className} font-light text-[14px]`}>
                  {property?.features?.floors ?? ""}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#E2DBCC]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 21V8a2 2 0 012-2h12a2 2 0 012 2v13M2 10h20M10 2v6m4-6v6"
                    stroke="#E2DBCC"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className={`${archivo.className} font-light text-[14px]`}>
                  {property?.features?.rooms ?? ""}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#E2DBCC]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 15c0 1.1.9 2 2 2h12a2 2 0 002-2v-2H4v2zm18-7H2v3h20V8zm-9-4h-2v2h2V4z"
                    stroke="#E2DBCC"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className={`${archivo.className} font-light text-[14px]`}>
                  {property?.features?.additional ?? ""}
                </span>
              </div>
            </div>

            {/* Map Button */}
            <button
              onClick={showMap}
              className="w-full border border-[#656565] py-3 px-4 flex items-center justify-center gap-2 text-[#bd9574] hover:bg-[#2c2920] transition-colors mb-8"
            >
              <MapPin size={20} />
              <span className={`${archivo.className} font-light text-base`}>
                See map
              </span>
            </button>

            {/* Property Description */}
            <p
              className={`${archivo.className} text-[#e2dbcc] font-[300] text-[16px] leading-[150%] tracking-[0px]`}
            >
              {property?.description || ""}
            </p>
          </div>

          {/* Property Images - Right Column */}
          <div className="flex-1">
            {viewMode === "grid" ? (
              /* Grid View - Original Layout */
              <div className="grid grid-cols-2" style={{ gap: "8px" }}>
                {/* Column 1 (Left) */}
                <div className="flex flex-col gap-2">
                  {/* Row 1: Large Image */}
                  <div className="relative h-64">
                    {property?.images?.[0] && (
                      <Image
                        src={getImageUrl(
                          property?.images?.[0]?.directus_files_id?.id,
                          {
                            quality: 80,
                            fit: "cover",
                          }
                        )}
                        alt={property?.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-700 hover:scale-110"
                      />
                    )}
                  </div>

                  {/* Row 2: Two Half-Size Images */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative h-40">
                      {property?.images?.[1] && (
                        <Image
                          src={getImageUrl(
                            property?.images?.[1]?.directus_files_id?.id,
                            {
                              quality: 80,
                              fit: "cover",
                            }
                          )}
                          alt="Luxury bedroom with ocean view"
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="relative h-40">
                      {property?.images?.[2] && (
                        <Image
                          src={getImageUrl(
                            property?.images?.[2]?.directus_files_id?.id,
                            {
                              quality: 80,
                              fit: "cover",
                            }
                          )}
                          alt="Luxury property spa interior"
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                  </div>

                  {/* Row 3: Don't Miss It Section */}
                  <div className="mt-4">
                    <h3
                      className={`${archivo.className} text-[#E2DBCC] text-[20px] font-[400] leading-[100%] tracking-[0%] mb-2`}
                    >
                      Don't miss it !
                    </h3>
                    <p
                      className={`${inter.className} text-[#757575] font-[500] text-[12px] leading-[150%] tracking-[-1.1%] mb-4`}
                    >
                      Follow the updates about this property by subscribing to
                      our newsletter and stay in the loop with news & updates.
                    </p>
                  </div>
                </div>

                {/* Column 2 (Right) */}
                <div className="flex flex-col gap-2">
                  {/* Row 1: Image */}
                  <div className="relative h-64">
                    {property?.images?.[3] && (
                      <Image
                        src={getImageUrl(
                          property?.images?.[3]?.directus_files_id?.id,
                          {
                            quality: 80,
                            fit: "cover",
                          }
                        )}
                        alt="Luxury property interior with ocean view"
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  {/* Row 2: Image */}
                  <div className="relative h-40">
                    {property?.images?.[4] && (
                      <Image
                        src={getImageUrl(
                          property?.images?.[4]?.directus_files_id?.id,
                          {
                            quality: 80,
                            fit: "cover",
                          }
                        )}
                        alt="Luxury beachfront aerial view"
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  {/* Row 3: Icons and All Media Button */}
                  <div className="flex items-center justify-end mt-4">
                    <div className="flex items-center gap-6 mr-6">
                      <div className="flex items-center gap-2 text-[#bd9574]">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM13.96 12.29L11.21 15.83L9.25 13.47L6.5 17H17.5L13.96 12.29Z"
                            fill="currentColor"
                          />
                        </svg>
                        <span
                          className={`${archivo.className} font-[300] text-[16px] leading-[150%] tracking-[0px]`}
                        >
                          {property?.images?.length}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[#bd9574]">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17 10.5V7C17 6.45 16.55 6 16 6H4C3.45 6 3 6.45 3 7V17C3 17.55 3.45 18 4 18H16C16.55 18 17 17.55 17 17V13.5L21 17.5V6.5L17 10.5Z"
                            fill="currentColor"
                          />
                        </svg>
                        <span
                          className={`${archivo.className} font-[300] text-[16px] leading-[150%] tracking-[0px]`}
                        >
                          3
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[#bd9574]">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 2H4C2.9 2 2 2.9 2 4V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V4C22 2.9 21.1 2 20 2Z"
                            fill="currentColor"
                          />
                        </svg>
                        <span
                          className={`${archivo.className} font-[300] text-[16px] leading-[150%] tracking-[0px]`}
                        >
                          2
                        </span>
                      </div>
                    </div>
                    {/* Update the button onClick handler to pass the event */}
                    <button
                      onClick={(e) => toggleViewMode(e)}
                      className="px-6 py-3 border border-[#bd9574] text-[#bd9574] hover:border-[#BD9574] hover:text-[#BD9574] transition-colors"
                    >
                      View All Media
                    </button>
                  </div>
                </div>
              </div>
            ) : viewMode === "gallery" ? (
              /* Gallery View - Replaces the grid when "View All Media" is clicked */
              <div className="w-full h-[500px]">
                <PropertyImagesGallery
                  onClose={toggleViewMode}
                  onGridView={switchToGridGallery}
                  initialImageId={selectedImageId}
                  property={property}
                />
              </div>
            ) : (
              /* Grid Gallery View - Replaces the gallery when "Grid" button is clicked */
              <div className="w-full h-[500px] relative">
                <PropertyGridGallery
                  onClose={() => setViewMode("grid")}
                  onImageClick={handleGridImageClick}
                  property={property}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Paddington />
      <Footer />
    </main>
  )
}
