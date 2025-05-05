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

import { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ExploreCity from "@/components/explore-city";
import OffMarket from "@/components/off-market";
import { Heart, MapPin } from "lucide-react";
import { getImageUrl, getItems } from "@/lib/api";
import Link from "next/link";
import { Property } from "@/lib/component/property"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["400"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["300"] })

const ITEMS_PER_PAGE = 12

export default function BuyPage() {
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language")
      if (storedLanguage) {
        setLanguage(storedLanguage)
      }
    }
  }, [])

  const fetchProperties = async (page = 0, status = "Current", type = []) => {
    try {
      // Convert page index to Directus page number (1-based)
      const directusPage = page + 1

      // Create filter based on status
      const filter = {
        is_off_market: { _eq: false },
        status:
          status === "Current"
            ? { _nin: ["Sold", "Inactive"] }
            : { _eq: "Sold", _neq: "Inactive" },
      }

      if (type.length > 0) {
        // For One-to-Many relationship
        filter.type = {
          id: { _in: type },
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
          "agents.*.*",
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
            "agents.*.*",
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
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Failed to load data")
      }
    }
    fetchDataBuy()
    // eslint-disable-next-line
  }, [])

  // (Removed duplicate BuyPage export and block)

  // (Removed duplicate toggleFavorite declaration)

  useEffect(() => {
    fetchProperties()
  }, [])

  const translationExplore =
    dataExplore?.translations?.find((t) => t.languages_code === language) ||
    dataExplore?.translations?.[0]

  return (
    <main className="min-h-screen bg-[#211f17]">
      <Header />

      <div className="container mx-auto px-4 py-16">
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2
            className={`${taviraj.className} text-[#E8D09A] text-[48px] font-light leading-[60px] tracking-[2px] mb-8`}
          >
            {translationExplore?.property_buy_title}
          </h2>
          <div className="flex justify-center mb-6">
            <div className="w-24 h-px bg-[#bd9574] relative">
              <div className="absolute w-2 h-2 bg-[#bd9574] rotate-45 -top-[3px] left-1/2 transform -translate-x-1/2"></div>
            </div>
          </div>

          <div
            className={`${archivo.className} text-[#E8D09A] text-base mb-6 text-center max-w-[732px]`}
          >
            {translationExplore?.property_buy_description}
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <Property
              key={property.id}
              property={property}
              taviraj={taviraj}
              archivo={archivo}
            />
          ))}
        </div>
      </div>

      {/* Explore City Section */}
      <ExploreCity data={explore} />

      {/* Off-Market Properties Section */}
      <OffMarket data={offMarket} section={offMarketSection} />

      <Footer />
    </main>
  )
}
