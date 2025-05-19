/**
 * Buy Page
 *
 * Property listings page for properties available for purchase.
 * Includes property grid with filtering options, explore city section,
 * and off-market properties.
 *
 * @page
 */
"use client"

import { useState, useEffect, Suspense, useRef } from "react"
import Footer from "@/components/footer"
import ExploreCity from "@/components/explore-city"
import OffMarket from "@/components/off-market"
import { getImageUrl, getItems } from "@/lib/api"
import Link from "next/link"
import { Property } from "@/lib/component/property"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"
import Loading from "@/components/loading"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"]})
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"]})

const ITEMS_PER_PAGE = 12

export function SavedPropertyPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [dataExplore, setDataExplore] = useState(null)
  const [properties, setProperties] = useState([])
  // const [propertiesCount, setPropertiesCount] = useState(0)
  const [propertiesCurrentPage, setPropertiesCurrentPage] = useState(0)
  const [propertiesTotalPages, setPropertiesTotalPages] = useState(0)
  const [error, setError] = useState(null)
  const [explore, setExplore] = useState(null)
  const [offMarket, setOffMarket] = useState(null)
  const [offMarketSection, setOffMarketSection] = useState(null)
  const [language, setLanguage] = useState("en")
  const [isMobileView, setIsMobileView] = useState(false)
  const gridRef = useRef(null)
  const refreshSavedProperties = () => fetchProperties(propertiesCurrentPage)

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language")
      if (storedLanguage) {
        setLanguage(storedLanguage)
      }
    }
  }, [])

  const fetchProperties = async (page = 0) => {
    try {
      const token = localStorage.getItem("access_token")
      const directusPage = page + 1
      const filter = {
        user_id: { _eq: user.id },
      }

      // Fetch properties with pagination
      const data = await getItems(
        "saved_properties",
        {
          fields: [
            "*",
            "property_id.*",
            "property_id.translations.*",
            "property_id.images.directus_files_id.*",
            "property_id.plans.*",
            "property_id.videos.*",
            "property_id.features.feature_id.*",
            "property_id.features.value",
            "property_id.agents.*",
            "property_id.type.*.*",
          ],
          filter,
          limit: ITEMS_PER_PAGE,
          page: directusPage,
          meta: "filter_count,total_count",
        },
        {
          Authorization: `Bearer ${token}`,
        },
        true
      )

      setProperties(data?.data || [])
      const totalCount = data.meta?.filter_count || 0
      // setPropertiesCount(totalCount)
      setPropertiesTotalPages(Math.ceil(totalCount / ITEMS_PER_PAGE))
      return data
    } catch (err) {
      console.error("Error fetching properties:", err)
      setError("Failed to load properties")
      return { data: [] }
    }
  }

  const handlePropertyPageChange = (page) => {
    if (page >= 0 && page < propertiesTotalPages) {
      setPropertiesCurrentPage(page)
      fetchProperties(page)
    }
  }

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ top: -80, behavior: "smooth" })
    }
  }, [propertiesCurrentPage])

  useEffect(() => {
    const fetchDataBuy = async () => {
      try {
        const dataExplore = await getItems("property_buy", {
          fields: ["*", "translations.*", "cities.*"],
        })
        const dataExplore_section = await getItems("explore_section", {
          fields: ["*", "translations.*", "cities.*"],
        })
        const dataOffMarketSection = await getItems("offMarket_section", {
          fields: ["*", "translations.*"],
        })
        const dataOffMarketProperties = await getItems("properties", {
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
          filter: {
            is_off_market: { _eq: true },
            status: { _nin: ["Sold", "Inactive"] },
          },
          limit: 4,
        })

        fetchProperties()
        setExplore(dataExplore_section)
        setDataExplore(dataExplore)
        setOffMarketSection(dataOffMarketSection)
        setOffMarket(dataOffMarketProperties)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Failed to load data")
      }
    }
    fetchDataBuy()
    // eslint-disable-next-line
  }, [])

  return (
    <main className="min-h-screen bg-[#211f17]">
      {loading ? (
        <section className="flex justify-center items-center h-[800px] bg-[#211f17]">
          <Loading error={error} />
        </section>
      ) : (
        <>
          <div className="container mx-auto px-4 py-16">
            {/* Heading */}
            <div
              ref={gridRef}
              className="flex flex-col items-center text-center mb-12"
            >
              <h2
                className={`${taviraj.className} text-[#e2dbcc] text-[48px] font-light leading-[60px] tracking-[2px] mb-8`}
              >
                {language === "en" ? "Saved Properties" : "已保存的属性"}
              </h2>
              <div className="flex justify-center mb-6">
                <div className="w-24 h-px bg-[#bd9574] relative">
                  <div className="absolute w-2 h-2 bg-[#bd9574] rotate-45 -top-[3px] left-1/2 transform -translate-x-1/2"></div>
                </div>
              </div>

              <div
                className={`${archivo.className} text-[#e2dbcc] text-base mb-6 text-center max-w-[732px]`}
              >
                {language === "en"
                  ? "Effortlessly revisit the properties you love. All your saved homes are collected here for easy access and future reference."
                  : "轻松重温您心仪的房源。所有您收藏的房源都集中在这里，方便您随时查阅和参考。"}
              </div>
            </div>

            {/* Property Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {properties.length > 0 ? (
                <>
                  {properties.map((savedProp) => (
                    <Property
                      key={savedProp.id}
                      property={savedProp.property_id}
                      savedPropertyId={savedProp.id}
                      taviraj={taviraj}
                      archivo={archivo}
                      refreshSavedProperties={refreshSavedProperties}
                    />
                  ))}

                  {propertiesTotalPages > 1 && (
                    <div
                      className={`flex items-center justify-between mt-12 col-span-4`}
                    >
                      {!isMobileView && (
                        <div className="flex gap-8">
                          {Array.from(
                            { length: propertiesTotalPages },
                            (_, index) => (
                              <div
                                key={index}
                                className={`w-3 h-3 ${
                                  index === propertiesCurrentPage
                                    ? "bg-[#BD9574]"
                                    : "bg-[#656565]"
                                } transform rotate-45 cursor-pointer`}
                                onClick={() => handlePropertyPageChange(index)}
                              />
                            )
                          )}
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-white">
                        <button
                          className={`p-2 border border-[#656565] rounded ${
                            propertiesCurrentPage === 0
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:border-[#BD9574] hover:text-[#BD9574]"
                          } transition-colors`}
                          onClick={() =>
                            handlePropertyPageChange(propertiesCurrentPage - 1)
                          }
                          disabled={propertiesCurrentPage === 0}
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
                            propertiesCurrentPage === propertiesTotalPages - 1
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:border-[#BD9574] hover:text-[#BD9574]"
                          } transition-colors`}
                          onClick={() =>
                            handlePropertyPageChange(propertiesCurrentPage + 1)
                          }
                          disabled={
                            propertiesCurrentPage === propertiesTotalPages - 1
                          }
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
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="col-span-4 p-32 text-center italic text-[#e2dbcc]">
                  {language === "en"
                    ? "No properties found."
                    : "未找到任何属性。"}
                </div>
              )}
            </div>
          </div>

          {/* Explore City Section */}
          <ExploreCity data={explore} />

          {/* Off-Market Properties Section */}
          <OffMarket data={offMarket} section={offMarketSection} />
        </>
      )}
      <Footer />
    </main>
  )
}
export default function SavedProperty() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#211f17]"></div>}>
      <SavedPropertyPage />
    </Suspense>
  )
}
