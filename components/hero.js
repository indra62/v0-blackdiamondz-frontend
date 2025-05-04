"use client"

/**
 * Hero Component
 *
 * Full-screen hero section with background image, overlay, and scroll indicator.
 * Includes parallax-like scroll effect using scroll position.
 *
 * @component
 */

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"
import { getImageUrl } from "@/lib/api"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["700"] })

export default function Hero({ data }) {
  /**
   * Scroll effect handler
   * Updates scroll count based on window scroll position
   * Limited to max 100 to prevent excessive calculations
   */
  const [scrollCount, setScrollCount] = useState(0)
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
    data?.translations?.find((t) => t.languages_code === language) ||
    data?.translations?.[0]

  useEffect(() => {
    const handleScroll = () => {
      const count = Math.min(Math.floor(window.scrollY / 10), 100)
      setScrollCount(count)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={getImageUrl(data?.hero_image?.id, {
            format: "webp",
            quality: 100,
            fit: "cover",
          })}
          alt="Sydney Harbour aerial view with Opera House and Harbour Bridge"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority
        />
        {/* <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(0deg, rgba(33, 31, 23, 0.7), rgba(33, 31, 23, 0.7)),
          linear-gradient(180deg, rgba(33, 31, 23, 0) 80.08%, #211F17 100%)`,
          }}
        ></div> */}
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <h1
          className={`${taviraj.className} text-[#E2DBCC] text-[48px] font-light leading-[125%] tracking-[2px] text-center max-w-5xl mb-8 -mt-32`}
        >
          {translation?.hero_text || ""}
        </h1>

        <div
          className={`${archivo.className} text-white text-[16px] font-bold leading-[150%] tracking-[0px] text-center mb-2`}
        >
          Hello, <span className="text-[#FFD700]">George</span>
        </div>
        <div
          className={`${archivo.className} text-white text-[16px] font-bold leading-[150%] tracking-[0px] text-center`}
        >
          Let&apos;s find the best property for you.
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 flex flex-col items-center">
          <div className="mb-2">
            <Image
              src="/images/scroll-icon.png"
              alt="Scroll indicator"
              width={24}
              height={40}
              className="animate-pulse"
            />
          </div>
          <div className="text-white text-sm mb-2">Scroll to start</div>
          <ChevronDown className="text-[#FFD700] animate-bounce" />
        </div>
      </div>
    </div>
  )
}
