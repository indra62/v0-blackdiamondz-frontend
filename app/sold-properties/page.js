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
import SoldMap from "@/components/sold-map"
import OffMarket from "@/components/off-market"
import { getItems } from "@/lib/api"
import Link from "next/link"
import { Property } from "@/lib/component/property"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"
import Loading from "@/components/loading"
import Statistics from "@/components/sold-statistics"
import FloatingButtonWithModal from "@/components/FloatingButtonWithModal"
import { useSearchParams } from "next/navigation"
import SearchBar from "@/components/searchBar"

const taviraj = Taviraj({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const ITEMS_PER_PAGE = 12

export function SoldPageContent() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [dataSold, setDataSold] = useState(null)
  const [properties, setProperties] = useState([])
  const [propertiesCurrentPage, setPropertiesCurrentPage] = useState(0)
  const [propertiesTotalPages, setPropertiesTotalPages] = useState(0)
  const [error, setError] = useState(null)
  const [statistic, setStatistic] = useState(null)
  const [offMarket, setOffMarket] = useState(null)
  const [offMarketSection, setOffMarketSection] = useState(null)
  const [language, setLanguage] = useState("en")
  const city = searchParams.get("city")
  const type = searchParams.get("type")
  const bedroom = searchParams.get("bedroom")
  const priceMin = searchParams.get("price_min")
  const priceMax = searchParams.get("price_max")
  const sortBy = searchParams.get("sort_by");
  const features = searchParams.getAll("features")
  const featuresKey = features.join(",")
  const rangesParam = searchParams.get("ranges")
  const ranges =
    rangesParam && rangesParam.length > 0
      ? rangesParam.split(",").map((r) => {
          const [start, end] = r.split("-").map(Number)
          return { start, end }
        })
      : []
  const [isMobileView, setIsMobileView] = useState(false)
  const gridRef = useRef(null)
  const prevFilters = useRef({
    city,
    type,
    bedroom,
    priceMin,
    priceMax,
    features,
    rangesParam,
    sortBy
  })

  useEffect(() => {
    // Compare each primitive filter value
    const prev = prevFilters.current
    if (
      prev.city !== city ||
      prev.type !== type ||
      prev.bedroom !== bedroom ||
      prev.priceMin !== priceMin ||
      prev.priceMax !== priceMax ||
      prev.featuresKey !== featuresKey ||
      prev.rangesParam !== rangesParam ||
      prev.sortBy !== sortBy
    ) {
      setPropertiesCurrentPage(0)
      prevFilters.current = {
        city,
        type,
        bedroom,
        priceMin,
        priceMax,
        featuresKey,
        rangesParam,
        sortBy
      }
    }
    // eslint-disable-next-line
  }, [city, type, bedroom, priceMin, priceMax, featuresKey, rangesParam, sortBy])

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

  const fetchProperties = async (
    page = 0,
    type = [],
    city,
    bedroom,
    priceMin,
    priceMax,
    ranges = [],
    features = [],
    sortBy
  ) => {
    try {
      const directusPage = page + 1

      const filter = {
        is_off_market: { _eq: false },
        status: { _eq: "Sold", _neq: "Inactive" },
      }

      if (city) {
        filter.address_suburb = { _eq: city }
      }
      if (type && type.length > 0) {
        filter.type = { id: { _in: type } }
      }

      if (priceMin || priceMax) {
        filter.price = {}
        if (priceMin) filter.price._gte = Number(priceMin)
        if (priceMax) filter.price._lte = Number(priceMax)
      }

      if (bedroom !== undefined && bedroom !== null && bedroom !== "") {
        const is6Plus = bedroom === "6"
        filter.features = {
          _some: {
            feature_id: { slug: { _eq: "bedrooms" } },
            value: is6Plus ? { _gte: 6 } : { _eq: bedroom },
          },
        }
      }

      // Ranges (_or for postcode ranges)
      if (ranges.length > 0) {
        filter._or = [
          ...(filter._or || []),
          ...ranges.map(({ start, end }) => ({
            address_postcode: {
              _gte: start,
              _lte: end,
            },
          })),
        ]
      }

      // Features (_or for features, using _some for relational filtering)
      if (features.length > 0) {
        filter._or = [
          ...(filter._or || []),
          ...features.map((feature) => ({
            features: {
              _some: {
                value: { _contains: feature },
              },
            },
          })),
        ]
      }

      // Fetch properties with pagination
      const data = await getItems(
        "properties",
        {
          fields: [
            "*",
            "translations.*",
            "images.directus_files_id.*",
            "plans.*",
            "videos.*",
            "features.feature_id.*",
            "features.value",
            "agents.agent_id.*",
            "agents.agent_id.agent_photo.directus_files_id.*",
            "agents.agent_id.external_logo.directus_files_id.*",
            "agents.agent_id.user_id.*",
            "type.*.*",
          ],
          filter,
          limit: ITEMS_PER_PAGE,
          page: directusPage,
          meta: "filter_count,total_count",
          sort: [sortBy || "-date_listed"],
        },
        {},
        true
      )

      setProperties(data?.data || [])
      const totalCount = data.meta?.filter_count || 0
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
    }
  }

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.style.scrollMarginTop = "280px"
      gridRef.current.scrollIntoView({ behavior: "instant" })
    }
  }, [propertiesCurrentPage])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataSold = await getItems("property_sold", {
          fields: ["*", "translations.*", "cities.*"],
        })
        const dataStatistic_section = await getItems("statistic_section", {
          fields: ["*", "translations.*"],
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
            "agents.agent_id.*",
            "agents.agent_id.agent_photo.directus_files_id.*",
            "agents.agent_id.external_logo.directus_files_id.*",
            "agents.agent_id.user_id.*",
            "type.*.*",
          ],
          filter: {
            status: { _eq: "Offmarket" },
          },
          limit: 8,
          sort: ["-date_listed"],
        })

        setStatistic(dataStatistic_section)
        setDataSold(dataSold)
        setOffMarketSection(dataOffMarketSection)
        setOffMarket(dataOffMarketProperties)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Failed to load data")
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    fetchProperties(
      propertiesCurrentPage,
      type ? [type] : [],
      city,
      bedroom,
      priceMin,
      priceMax,
      ranges,
      features,
      sortBy,
    )
    // eslint-disable-next-line
  }, [
    propertiesCurrentPage,
    city,
    type,
    bedroom,
    priceMin,
    priceMax,
    rangesParam,
    featuresKey,
    sortBy,
  ])

  const translationSold =
    dataSold?.translations?.find((t) => t.languages_code === language) ||
    dataSold?.translations?.[0]

  return (
    <main className="min-h-screen bg-[#211f17]">
      {loading ? (
        <section className="flex justify-center items-center h-[800px] bg-[#211f17]">
          <Loading error={error} />
        </section>
      ) : (
        <>
          <div className="container mx-auto px-4 pt-16">
            {/* Heading */}
            <div className="flex flex-col items-center text-center mb-12">
              <h1
                className={`${taviraj.className} text-[#e2dbcc] text-4xl md:text-5xl mb-8 leading-[125%] tracking-[2px] max-w-5xl`}
              >
                {translationSold?.property_sold_title}
              </h1>
              {/* Diamond Separator */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-24 h-[1px] bg-[#BD9574]"></div>
                <div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
                <div className="w-24 h-[1px] bg-[#BD9574]"></div>
              </div>

              <p
                className={`${archivo.className} text-[#e2dbcc] max-w-3xl mx-auto text-base md:text-lg mb-6`}
              >
                {translationSold?.property_sold_description}
              </p>
            </div>
          </div>

          <SearchBar pathTo={"/sold-properties"} />

          {/* Property Grid */}
          <div ref={gridRef} className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {properties.length > 0 ? (
                <>
                  {properties.map((property) => (
                    <Property
                      key={property.id}
                      property={property}
                      taviraj={taviraj}
                      archivo={archivo}
                    />
                  ))}

                  {propertiesTotalPages > 1 && (
                    <div className="flex items-center justify-between mt-12 w-full md:col-span-2 lg:col-span-4">
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

          <div className="px-4 md:px-[40px] py-0 md:py-16">
            <Statistics />
          </div>

          {/* Off-Market Properties Section
					<OffMarket data={offMarket} section={offMarketSection} /> */}
        </>
      )}
      <FloatingButtonWithModal
        buttonLabel="Show map"
        buttonIcon={
          <svg
            width="25px"
            height="25px"
            viewBox="0 0 0.625 0.625"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#211f17"
              d="M0.507 0.061c0.02 0.016 0.034 0.042 0.04 0.069a0.031 0.031 0 0 1 0.002 0.001l0.064 0.03a0.021 0.021 0 0 1 0.012 0.019v0.386a0.021 0.021 0 0 1 -0.027 0.02l-0.177 -0.05 -0.211 0.058a0.021 0.021 0 0 1 -0.012 0L0.015 0.538a0.021 0.021 0 0 1 -0.015 -0.02V0.125c0 -0.014 0.013 -0.024 0.027 -0.02l0.178 0.052 0.091 -0.028q0.002 -0.001 0.004 -0.001c0.004 -0.021 0.013 -0.04 0.03 -0.059 0.019 -0.023 0.054 -0.036 0.087 -0.038 0.035 -0.002 0.061 0.006 0.091 0.029M0.042 0.153v0.35l0.152 0.045V0.197zm0.257 0.019 -0.063 0.019v0.352l0.158 -0.044v-0.103c0 -0.011 0.009 -0.021 0.021 -0.021s0.021 0.009 0.021 0.021v0.099l0.148 0.042V0.192l-0.035 -0.016q-0.001 0.005 -0.002 0.01A0.191 0.191 0 0 1 0.512 0.252l-0.077 0.097a0.021 0.021 0 0 1 -0.034 -0.001l-0.072 -0.105q-0.018 -0.025 -0.025 -0.045a0.116 0.116 0 0 1 -0.006 -0.026m0.12 -0.099c-0.023 0.001 -0.046 0.01 -0.057 0.023 -0.013 0.016 -0.02 0.03 -0.021 0.045 -0.002 0.018 -0.001 0.03 0.004 0.043 0.003 0.009 0.01 0.021 0.02 0.035l0.057 0.082 0.06 -0.075a0.15 0.15 0 0 0 0.026 -0.052c0.007 -0.026 -0.004 -0.065 -0.025 -0.081 -0.022 -0.017 -0.038 -0.022 -0.063 -0.02m0.004 0.022c0.035 0 0.063 0.028 0.063 0.062a0.062 0.062 0 0 1 -0.063 0.062c-0.035 0 -0.063 -0.028 -0.063 -0.062s0.028 -0.062 0.063 -0.062m0 0.041a0.021 0.021 0 0 0 -0.021 0.021c0 0.011 0.009 0.021 0.021 0.021a0.021 0.021 0 0 0 0.021 -0.021 0.021 0.021 0 0 0 -0.021 -0.021"
            />
          </svg>
        }
      >
        <div className="w-[90vw] h-auto bg-[#bd9574] rounded-md p-4">
          <SoldMap />
        </div>
      </FloatingButtonWithModal>
      <Footer />
    </main>
  )
}
export default function SoldPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#211f17]"></div>}>
      <SoldPageContent />
    </Suspense>
  )
}
