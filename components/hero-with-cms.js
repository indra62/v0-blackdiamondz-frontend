"use client"

/**
 * Hero Component with Directus CMS Integration
 *
 * Displays the hero section with content from Directus CMS.
 * Falls back to default content if CMS data is not available.
 */
import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["700"] })

export default function HeroWithCMS({ initialHeroData }) {
  const [scrollCount, setScrollCount] = useState(0)
  const [heroData, setHeroData] = useState(initialHeroData)

  // Default values to use if CMS data is not available
  const defaultHeroData = {
    headline: "Premier luxury real estate and lifestyle strategic excellence",
    welcome_text: "Hello,",
    user_name: "George",
    find_property_text: "Let's find the best property for you.",
    background_image: "/images/sydney-aerial-view.png",
  }

  // Use CMS data or fall back to defaults
  const {
    headline = defaultHeroData.headline,
    welcome_text = defaultHeroData.welcome_text,
    user_name = defaultHeroData.user_name,
    find_property_text = defaultHeroData.find_property_text,
    background_image = defaultHeroData.background_image,
  } = heroData || defaultHeroData

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
          src={background_image || "/placeholder.svg"}
          alt="Hero background image"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(0deg, rgba(33, 31, 23, 0.7), rgba(33, 31, 23, 0.7)),
          linear-gradient(180deg, rgba(33, 31, 23, 0) 80.08%, #211F17 100%)`,
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <h1
          className={`${taviraj.className} text-[#E2DBCC] text-[48px] font-light leading-[125%] tracking-[2px] text-center max-w-5xl mb-8 -mt-32`}
        >
          {headline}
        </h1>

        <div
          className={`${archivo.className} text-white text-[16px] font-bold leading-[150%] tracking-[0px] text-center mb-2`}
        >
          {welcome_text} <span className="text-[#FFD700]">{user_name}</span>
        </div>
        <div
          className={`${archivo.className} text-white text-[16px] font-bold leading-[150%] tracking-[0px] text-center`}
        >
          {find_property_text}
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
