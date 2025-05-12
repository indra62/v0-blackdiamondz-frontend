/**
 * Buy Page
 *
 * Property listings page for properties available for purchase.
 * Includes property grid with filtering options, explore city section,
 * and off-market properties.
 *
 * @page
 */
"use client";

import { useState, useEffect, Suspense } from "react"
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

const taviraj = Taviraj({ subsets: ["latin"], weight: ["400"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["300"] })

const ITEMS_PER_PAGE = 12

export function BuyPageContent() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [dataExplore, setDataExplore] = useState(null)
  const [properties, setProperties] = useState([])
  const [favorites, setFavorites] = useState([])
  const [propertiesCount, setPropertiesCount] = useState(0)
  const [propertiesTotalPages, setPropertiesTotalPages] = useState(1)
  const [error, setError] = useState(null)
  const [explore, setExplore] = useState(null)
  const [offMarket, setOffMarket] = useState(null)
  const [offMarketSection, setOffMarketSection] = useState(null)
  const [language, setLanguage] = useState("en")
  const city = searchParams.get("city")
  const type = searchParams.get("type")
  const bedroom = searchParams.get("bedroom")
  const priceMin = searchParams.get("price_min")
  const priceMax = searchParams.get("price_max")

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
    status = "Current",
    type = [],
    city,
    bedroom,
    priceMin,
    priceMax
  ) => {
    try {
      const directusPage = page + 1

      const filter = {
        is_off_market: { _eq: false },
        status:
          status === "Current"
            ? { _nin: ["Sold", "Inactive"] }
            : { _eq: "Sold", _neq: "Inactive" },
      }

      // City filter
      if (city) {
        filter.address_suburb = { _eq: city }
      }

      // Type filter
      if (type.length > 0) {
        filter.type = { id: { _in: type } }
      }

      // Price range filter
      if (priceMin || priceMax) {
        filter.price = {}
        if (priceMin) filter.price._gte = Number(priceMin)
        if (priceMax) filter.price._lte = Number(priceMax)
      }

      // Bedroom filter
      if (bedroom !== undefined) {
        const is6Plus = bedroom === "6"
        filter.features = {
          _some: {
            feature_id: { slug: { _eq: "bedrooms" } },
            value: is6Plus ? { _gte: 6 } : { _eq: bedroom },
          },
        }
      }

      // Fetch properties with pagination
      const data = await getItems("properties", {
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
        filter,
        limit: ITEMS_PER_PAGE,
        page: directusPage,
        meta: "filter_count,total_count",
      })

      console.log(data)

      setProperties(data || [])
      const totalCount = data.meta?.filter_count || 0
      setPropertiesCount(totalCount)
      setPropertiesTotalPages(Math.ceil(totalCount / ITEMS_PER_PAGE))
      return data
    } catch (err) {
      console.error("Error fetching properties:", err)
      setError("Failed to load properties")
      return { data: [] }
    }
  }

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    )
  }

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

  useEffect(() => {
    fetchProperties(
      0,
      "Current",
      type ? [type] : [],
      city,
      bedroom,
      priceMin,
      priceMax
    )
  }, [city, type, bedroom, priceMin, priceMax])

  const translationExplore =
    dataExplore?.translations?.find((t) => t.languages_code === language) ||
    dataExplore?.translations?.[0]

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
            <div className="flex flex-col items-center text-center mb-12">
              <h2
                className={`${taviraj.className} text-[#e2dbcc] text-[48px] font-light leading-[60px] tracking-[2px] mb-8`}
              >
                {translationExplore?.property_buy_title}
              </h2>
              <div className="flex justify-center mb-6">
                <div className="w-24 h-px bg-[#bd9574] relative">
                  <div className="absolute w-2 h-2 bg-[#bd9574] rotate-45 -top-[3px] left-1/2 transform -translate-x-1/2"></div>
                </div>
              </div>

              <div
                className={`${archivo.className} text-[#e2dbcc] text-base mb-6 text-center max-w-[732px]`}
              >
                {translationExplore?.property_buy_description}
              </div>
            </div>

            {/* Property Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {properties.length > 0 ? (
                properties.map((property) => (
                  <Property
                    key={property.id}
                    property={property}
                    taviraj={taviraj}
                    archivo={archivo}
                  />
                ))
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
export default function BuyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#211f17]"></div>}>
      <BuyPageContent />
    </Suspense>
  )
}