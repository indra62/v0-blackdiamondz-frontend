/**
 * Off Market Properties Component
 *
 * Displays a grid of exclusive off-market property listings.
 * Each card includes property details, features, and action buttons.
 *
 * @component
 */
"use client"

import { useState, useEffect } from "react"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"
import Image from "next/image"
import { Heart } from "lucide-react"
import { getImageUrl } from "@/lib/api"
import { Property } from "@/lib/component/property"
import { useAuth } from "@/hooks/useAuth"
import Link from "next/link"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })

export default function OffMarket({ data, section, dark = true }) {
  const darkMode = dark || false
  const { isAuthenticated } = useAuth()
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language")
      if (storedLanguage) {
        setLanguage(storedLanguage)
      }
    }
  }, [])

  const translation =
    section?.translations?.find((t) => t.languages_code === language) ||
    section?.translations?.[0]

  return (
    <div
      className={`py-16 ${
        darkMode ? "bg-[#211f17] text-[#e2dbcc]" : "bg-[#FBF4E4] text-black"
      }`}
    >
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={`${
              taviraj.className
            } text-[48px] font-light leading-[60px] tracking-[2px] mb-8 ${
              darkMode ? "text-[#e2dbcc]" : "text-[#211F17]"
            }`}
          >
            {translation?.offmarket_title_section}
          </h2>

          {/* Diamond Separator */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-24 h-[1px] bg-[#BD9574]"></div>
            <div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
            <div className="w-24 h-[1px] bg-[#BD9574]"></div>
          </div>
        </div>

        {/* Properties Grid with conditional blur */}
        <div className="relative">
        {data?.length > 0 ? (
          <>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${
              !isAuthenticated ? "blur-md pointer-events-none" : ""
            }`}
          >
            {data?.map((property) => (
              <div
                key={property.id}
                className={`${
                  darkMode ? "bg-[#211f17]" : "bg-[#FBF4E4]"
                } overflow-hidden`}
              >
                <Property
                  property={property}
                  taviraj={taviraj}
                  archivo={archivo}
                  dark={dark}
                />
              </div>
            ))}
          </div>
          </>
        ) : (
          <>
            {isAuthenticated && (
              <div className="col-span-4 p-32 text-center italic text-[#e2dbcc]">
                {language === "en"
                  ? "No properties found."
                  : "未找到任何属性。"}
              </div>
            )}
          </>
        )}
        {/* Login overlay for non-authenticated users */}
        {!isAuthenticated && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <div
              className={`${taviraj.className} ${darkMode ? "text-[#e2dbcc]" : "text-[#211f17]"} text-2xl mb-6 text-center`}
            >
              Login to view our exclusive off-market properties
            </div>
            <Link
              href="/login"
              className={`bg-[#BD9574] ${
                darkMode ? "text-[#e2dbcc]" : "text-[#211f17]"
              } px-8 py-3 hover:bg-[#BD9574] transition-colors`}
            >
              Login Now
            </Link>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}
