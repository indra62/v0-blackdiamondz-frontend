"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Taviraj, Archivo } from "next/font/google"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"
import { getImageUrl, getItems } from "@/lib/api"
import { useAuth } from "@/hooks/useAuth"
import DiamondzSection from "@/components/diamondzSection"
import OffMarket from "@/components/off-market"
import Loading from "@/components/loading"

const taviraj = Taviraj({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

// Sample data for events
const eventUpdates = [
  {
    id: 1,
    title: "Sydney Luxury Property Showcase",
    category: "Property",
    date: "15 January 2025",
    location: "Sydney Opera House",
    thumbnail: "/luxury-event-lights.png",
  },
  {
    id: 2,
    title: "Exclusive Wine Tasting Evening",
    category: "Lifestyle",
    date: "22 January 2025",
    location: "The Rocks, Sydney",
    thumbnail: "/luxury-event-crowd.png",
  },
  {
    id: 3,
    title: "Investment Strategies Masterclass",
    category: "Finance",
    date: "5 February 2025",
    location: "Four Seasons Hotel",
    thumbnail: "/real-estate-conference.png",
  },
  {
    id: 4,
    title: "Architectural Excellence Awards",
    category: "Design",
    date: "18 February 2025",
    location: "Museum of Contemporary Art",
    thumbnail: "/real-estate-conference-stage.png",
  },
  {
    id: 5,
    title: "Luxury Home Tour",
    category: "Property",
    date: "3 March 2025",
    location: "Eastern Suburbs, Sydney",
    thumbnail: "/modern-home-couple.png",
  },
  {
    id: 6,
    title: "Investment Property Seminar",
    category: "Finance",
    date: "12 March 2025",
    location: "Hilton Hotel Sydney",
    thumbnail: "/property-investment-graph.png",
  },
  {
    id: 7,
    title: "Exclusive Art Exhibition",
    category: "Lifestyle",
    date: "25 March 2025",
    location: "Museum of Contemporary Art",
    thumbnail: "/launch-event-women.png",
  },
  {
    id: 8,
    title: "Property Market Outlook 2025",
    category: "Finance",
    date: "8 April 2025",
    location: "Four Seasons Hotel",
    thumbnail: "/real-estate-conference.png",
  },
]

// Sample data for latest happenings
const latestHappenings = [
  {
    id: 1,
    title: "Black Diamondz Annual Gala",
    category: "Event",
    date: "10 December 2024",
    description:
      "A night of celebration with our most valued clients and partners.",
    thumbnail: "/launch-event-women.png",
  },
  {
    id: 2,
    title: "Luxury Market Trends 2025",
    category: "Report",
    date: "5 December 2024",
    description:
      "Our analysis of upcoming trends in the luxury property market.",
    thumbnail: "/property-investment-graph.png",
  },
  {
    id: 3,
    title: "Exclusive Property Preview",
    category: "Property",
    date: "28 November 2024",
    description: "Members-only preview of our newest luxury listings.",
    thumbnail: "/luxury-property-thumbnail.png",
  },
  {
    id: 4,
    title: "Sustainability in Luxury Living",
    category: "Workshop",
    date: "15 November 2024",
    description: "Expert panel discussion on sustainable luxury properties.",
    thumbnail: "/sustainable-housing-panel.png",
  },
  {
    id: 5,
    title: "Black Diamondz Magazine Launch",
    category: "Publication",
    date: "1 November 2024",
    description:
      "Launch of our quarterly luxury lifestyle and property magazine.",
    thumbnail: "/real-estate-woman-hat.png",
  },
  {
    id: 6,
    title: "Sydney Harbour Yacht Event",
    category: "Lifestyle",
    date: "25 October 2024",
    description: "Exclusive yacht showcase for our premium members.",
    thumbnail: "/luxury-event-crowd.png",
  },
  {
    id: 7,
    title: "International Property Expo",
    category: "Exhibition",
    date: "15 October 2024",
    description: "Showcasing luxury properties from around the world.",
    thumbnail: "/real-estate-conference-stage.png",
  },
  {
    id: 8,
    title: "Architectural Design Awards",
    category: "Awards",
    date: "5 October 2024",
    description: "Celebrating excellence in luxury property architecture.",
    thumbnail: "/modern-garden-home.png",
  },
]

// Sample data for upcoming activities
const upcomingActivities = [
  {
    id: 1,
    title: "Melbourne Property Tour",
    category: "Tour",
    date: "10 March 2025",
    location: "Melbourne CBD",
    thumbnail: "/modern-home-couple.png",
  },
  {
    id: 2,
    title: "Art Collection Investment Seminar",
    category: "Seminar",
    date: "25 March 2025",
    location: "Art Gallery of NSW",
    thumbnail: "/japanese-inspired-home.png",
  },
  {
    id: 3,
    title: "Luxury Yacht Experience",
    category: "Lifestyle",
    date: "8 April 2025",
    location: "Sydney Harbour",
    thumbnail: "/tudor-luxury-home.png",
  },
  {
    id: 4,
    title: "International Property Showcase",
    category: "Exhibition",
    date: "20 April 2025",
    location: "International Convention Centre",
    thumbnail: "/modern-garden-home.png",
  },
  {
    id: 5,
    title: "Gold Coast Property Weekend",
    category: "Tour",
    date: "5 May 2025",
    location: "Gold Coast",
    thumbnail: "/luxury-beachfront-property.png",
  },
  {
    id: 6,
    title: "Fine Dining Experience",
    category: "Lifestyle",
    date: "15 May 2025",
    location: "Quay Restaurant, Sydney",
    thumbnail: "/luxury-event-lights.png",
  },
  {
    id: 7,
    title: "Luxury Home Styling Workshop",
    category: "Workshop",
    date: "28 May 2025",
    location: "Black Diamondz HQ",
    thumbnail: "/luxury-interior.png",
  },
  {
    id: 8,
    title: "Perth Property Investment Tour",
    category: "Tour",
    date: "10 June 2025",
    location: "Perth",
    thumbnail: "/coastal-luxury-property.png",
  },
]

// Sample data for off-market properties
const offMarketProperties = [
  {
    id: 1,
    type: "House",
    location: "Beachfront",
    name: "Anandes Hotel",
    address: "5408/101 Middle Street",
    city: "Sydney",
    postcode: "2000",
    price: "730.000",
    image: "/images/anandes-hotel.png",
    features: {
      bedrooms: 3,
      bathrooms: 5,
      parking: 1,
      floors: 6,
      rooms: 8,
      additional: 2,
    },
  },
  {
    id: 2,
    type: "Apartment",
    location: "City View",
    name: "Pacific Plaza",
    address: "2309/45 Business Avenue",
    city: "Melbourne",
    postcode: "3000",
    price: "730.000",
    image: "/images/pacific-plaza.png",
    features: {
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      floors: 4,
      rooms: 3,
      additional: 1,
    },
  },
  {
    id: 3,
    type: "Villa",
    location: "Mountain View",
    name: "Sunrise Retreat",
    address: "1254/78 Serenity Way",
    city: "Brisbane",
    postcode: "4000",
    price: "730.000",
    image: "/images/sunrise-retreat.png",
    features: {
      bedrooms: 4,
      bathrooms: 3,
      parking: 2,
      floors: 5,
      rooms: 6,
      additional: 3,
    },
  },
  {
    id: 4,
    type: "Penthouse",
    location: "Ocean View",
    name: "Azure Heights",
    address: "601/15 Waterfront Avenue",
    city: "Gold Coast",
    postcode: "4217",
    price: "730.000",
    image: "/images/azure-heights.png",
    features: {
      bedrooms: 5,
      bathrooms: 4,
      parking: 3,
      floors: 7,
      rooms: 9,
      additional: 4,
    },
  },
  {
    id: 5,
    type: "House",
    location: "Hillside",
    name: "Emerald Estate",
    address: "42 Hillcrest Road",
    city: "Sydney",
    postcode: "2000",
    price: "950.000",
    image: "/modern-house-exterior.png",
    features: {
      bedrooms: 4,
      bathrooms: 3,
      parking: 2,
      floors: 2,
      rooms: 7,
      additional: 1,
    },
  },
  {
    id: 6,
    type: "Apartment",
    location: "Waterfront",
    name: "Harbor View",
    address: "15 Marina Boulevard",
    city: "Melbourne",
    postcode: "3000",
    price: "820.000",
    image: "/contemporary-house.png",
    features: {
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      floors: 1,
      rooms: 4,
      additional: 1,
    },
  },
  {
    id: 7,
    type: "Villa",
    location: "Countryside",
    name: "Tranquil Haven",
    address: "88 Rural Lane",
    city: "Brisbane",
    postcode: "4000",
    price: "1.200.000",
    image: "/luxury-beachfront-property.png",
    features: {
      bedrooms: 5,
      bathrooms: 4,
      parking: 3,
      floors: 2,
      rooms: 8,
      additional: 2,
    },
  },
  {
    id: 8,
    type: "Penthouse",
    location: "City Center",
    name: "Metropolitan Heights",
    address: "120 Central Avenue",
    city: "Perth",
    postcode: "6000",
    price: "1.500.000",
    image: "/modern-apartment-building.png",
    features: {
      bedrooms: 4,
      bathrooms: 3,
      parking: 2,
      floors: 1,
      rooms: 6,
      additional: 1,
    },
  },
]

export default function ClubDiamondz() {
  // State for pagination in each section
  const [loading, setLoading] = useState(true)
  const [eventPage, setEventPage] = useState(0)
  const [happeningPage, setHappeningPage] = useState(0)
  const [activityPage, setActivityPage] = useState(0)
  const [offMarket, setOffMarket] = useState(null)
  const [offMarketSection, setOffMarketSection] = useState(null)
  const [diamondzPage, setDiamondzPage] = useState(null)
  const [diamondzEvent, setDiamondzEvent] = useState(null)
  const [diamondzEventList, setDiamondzEventList] = useState(null)
  const [language, setLanguage] = useState("en")
  const [error, setError] = useState(null)

  const { user } = useAuth()

  // Items per page
  const itemsPerPage = 4

  // Calculate total pages for each section
  const eventPages = Math.ceil((diamondzEventList?.length || 0) / itemsPerPage)
  const happeningPages = Math.ceil(latestHappenings.length / itemsPerPage)
  const activityPages = Math.ceil(upcomingActivities.length / itemsPerPage)

  // Get current items for each section
  const currentEvents =
    diamondzEventList?.slice(
      eventPage * itemsPerPage,
      (eventPage + 1) * itemsPerPage
    ) || []

  const eventsToDisplay = currentEvents.map((event) => {
    const translation =
      event.translations?.find((t) => t.languages_code === language) ||
      event.translations?.[0]
    return { ...event, translation }
  })

  const currentHappenings = latestHappenings.slice(
    happeningPage * itemsPerPage,
    (happeningPage + 1) * itemsPerPage
  )

  const currentActivities = upcomingActivities.slice(
    activityPage * itemsPerPage,
    (activityPage + 1) * itemsPerPage
  )

  // Navigation functions
  const navigateEvents = (direction) => {
    if (direction === "next") {
      setEventPage((prev) => (prev === eventPages - 1 ? 0 : prev + 1))
    } else {
      setEventPage((prev) => (prev === 0 ? eventPages - 1 : prev - 1))
    }
  }

  const navigateHappenings = (direction) => {
    if (direction === "next") {
      setHappeningPage((prev) => (prev === happeningPages - 1 ? 0 : prev + 1))
    } else {
      setHappeningPage((prev) => (prev === 0 ? happeningPages - 1 : prev - 1))
    }
  }

  const navigateActivities = (direction) => {
    if (direction === "next") {
      setActivityPage((prev) => (prev === activityPages - 1 ? 0 : prev + 1))
    } else {
      setActivityPage((prev) => (prev === 0 ? activityPages - 1 : prev - 1))
    }
  }

  const translationDiamondzPage =
    diamondzPage?.translations?.find((t) => t.languages_code === language) ||
    diamondzPage?.translations?.[0]

  const translationDiamondzEvent =
    diamondzEvent?.translations?.find((t) => t.languages_code === language) ||
    diamondzEvent?.translations?.[0]

  const translationDiamondzEventList =
    diamondzEventList?.translations?.find(
      (t) => t.languages_code === language
    ) || diamondzEventList?.translations?.[0]

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language")
      if (storedLanguage) {
        setLanguage(storedLanguage)
      }
    }
    const fetchDataClubDiamondz = async () => {
      try {
        const token = localStorage.getItem("access_token")

        const dataDiamondzPage = await getItems(
          "diamondz_page",
          {
            fields: ["*", "translations.*"],
          },
          {
            Authorization: `Bearer ${token}`,
          }
        )

        const dataEventUpdates = await getItems(
          "diamondz_event",
          {
            fields: ["*", "translations.*"],
          },
          {
            Authorization: `Bearer ${token}`,
          }
        )

        const dataEventList = await getItems(
          "event_list",
          {
            fields: ["*", "translations.*"],
          },
          {
            Authorization: `Bearer ${token}`,
          }
        )

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

        setDiamondzPage(dataDiamondzPage)
        setDiamondzEvent(dataEventUpdates)
        setDiamondzEventList(dataEventList)
        setOffMarketSection(dataOffMarketSection)
        setOffMarket(dataOffMarketProperties)
        setLoading(false)
      } catch (err) {
        setError("Failed to load home data:" + err.message)
      }
    }
    fetchDataClubDiamondz()
  }, [])

  // Event card component
  const EventCard = ({ item }) => (
    <div className="relative group cursor-pointer">
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={
            getImageUrl(item.event_thumbnail, {
              format: "webp",
              quality: 100,
              fit: "cover",
            }) || "/placeholder.svg"
          }
          alt={item?.translation?.event_title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-3">
        <div className="text-[#BD9574] text-sm font-light">{item.tags}</div>
        <h3 className="text-[#211f17] text-lg font-light mt-1 line-clamp-2 group-hover:text-[#BD9574] transition-colors">
          {item?.translation?.event_title}
        </h3>
        <div className="text-[#656565] text-sm mt-1">{item?.event_date}</div>
      </div>
    </div>
  )

  // Latest Happening card component
  const HappeningCard = ({ item }) => (
    <div className="relative group cursor-pointer">
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={item.thumbnail || "/placeholder.svg"}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-3">
        <div className="text-[#BD9574] text-sm font-light">{item.category}</div>
        <h3 className="text-[#211f17] text-lg font-light mt-1 line-clamp-2 group-hover:text-[#BD9574] transition-colors">
          {item.title}
        </h3>
        <div className="text-[#656565] text-sm mt-1">{item.date}</div>
        <p className="text-[#656565] text-sm mt-2 line-clamp-2">
          {item.description}
        </p>
      </div>
    </div>
  )

  // Activity card component
  const ActivityCard = ({ item }) => (
    <div className="relative group cursor-pointer">
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={item.thumbnail || "/placeholder.svg"}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-3">
        <div className="text-[#BD9574] text-sm font-light">{item.category}</div>
        <h3 className="text-[#211f17] text-lg font-light mt-1 line-clamp-2 group-hover:text-[#BD9574] transition-colors">
          {item.title}
        </h3>
        <div className="text-[#656565] text-sm mt-1">{item.date}</div>
        <div className="text-[#656565] text-sm">{item.location}</div>
      </div>
    </div>
  )

  const OffMarketPropertyCard = ({ property }) => (
    <div className="bg-white overflow-hidden shadow-sm">
      {/* Image Container */}
      <div className="relative h-[240px] mb-4 overflow-hidden">
        <Image
          src={property.image || "/placeholder.svg"}
          alt={property.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          style={{ objectFit: "cover" }}
          className="transition-transform duration-700 hover:scale-110"
        />
      </div>

      {/* Property Type and Location with Heart Icon */}
      <div className="flex justify-between items-center mb-2 px-4">
        <div
          className={`${archivo.className} text-[#656565] font-light text-[16px] leading-[150%]`}
        >
          {property.type} | {property.location}
        </div>
        <button className="text-[#656565] hover:text-[#BD9574] transition-colors">
          <Heart className="w-5 h-5" />
        </button>
      </div>

      {/* Property Name */}
      <h3
        className={`${taviraj.className} text-[#211f17] text-[32px] font-light leading-[40px] mb-2 px-4`}
      >
        {property.name}
      </h3>

      {/* Address */}
      <div
        className={`${archivo.className} text-[#656565] font-light text-[16px] leading-[150%] mb-1 px-4`}
      >
        {property.address}
      </div>
      <div
        className={`${archivo.className} text-[#656565] font-light text-[16px] leading-[150%] mb-4 px-4`}
      >
        {property.city}, {property.postcode}
      </div>

      {/* Price */}
      <div
        className={`${archivo.className} text-[#BD9574] font-light text-[16px] leading-[150%] mb-6 px-4`}
      >
        Auction: $ {property.price}
      </div>

      {/* Property Features */}
      <div className="flex flex-wrap items-center gap-4 mb-6 px-4">
        <div className="flex items-center gap-1 text-[#656565]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14M3 11h18M7 11V7m10 4V7"
              stroke="#656565"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={`${archivo.className} font-light text-[14px]`}>
            {property.features.bedrooms}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[#656565]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12h16a1 1 0 011 1v2a4 4 0 01-4 4H7a4 4 0 01-4-4v-2a1 1 0 011-1zm4-9v5m4-2v2m4-4v7"
              stroke="#656565"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={`${archivo.className} font-light text-[14px]`}>
            {property.features.bathrooms}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[#656565]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 17h14M5 17a2 2 0 01-2-2V9m2 8a2 2 0 002 2h10a2 2 0 002-2M5 17V7a2 2 0 012-2h10a2 2 0 012 2v10m0 0V9m0 0H3"
              stroke="#656565"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className={`${archivo.className} font-light text-[14px]`}>
            {property.features.parking}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[#656565]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 21h18M9 8h1m5 0h1M9 16h1m5 0h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"
              stroke="#656565"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={`${archivo.className} font-light text-[14px]`}>
            {property.features.floors}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[#656565]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 21V8a2 2 0 012-2h12a2 2 0 012 2v13M2 10h20M10 2v6m4-6v6"
              stroke="#656565"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={`${archivo.className} font-light text-[14px]`}>
            {property.features.rooms}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[#656565]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 15c0 1.1.9 2 2 2h12a2 2 0 002-2v-2H4v2zm18-7H2v3h20V8zm-9-4h-2v2h2V4z"
              stroke="#656565"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={`${archivo.className} font-light text-[14px]`}>
            {property.features.additional}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-0">
        <button className="py-4 flex items-center justify-center gap-2 text-[#BD9574] border border-r-0 border-[#656565]/20 hover:bg-[#f7ede0] transition-colors">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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
          <span className={`${archivo.className} font-light text-[16px]`}>
            See map
          </span>
        </button>
        <button className="py-4 flex items-center justify-center gap-2 text-[#BD9574] border border-[#656565]/20 hover:bg-[#f7ede0] transition-colors">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 11a4 4 0 100-8 4 4 0 000 8zM6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"
              stroke="#BD9574"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={`${archivo.className} font-light text-[16px]`}>
            Agent
          </span>
        </button>
      </div>
    </div>
  )

  return (
    loading ? (
      <section className="flex justify-center items-center h-[800px] bg-[#FBF4E4]">
        <Loading error={error} dark={false} />
      </section>
    ) : (
    <div className="bg-[#FBF4E4]">
      {/* Hero Section - Two Column Layout */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
        {/* Left Column - Beige Background */}
        <div className="bg-[#fbf4e4]"></div>

        {/* Right Column - Image */}
        <div className="relative">
          <Image
            src={
              getImageUrl(diamondzPage?.hero_background, {
                format: "webp",
                quality: 100,
                fit: "cover",
              }) || "/placeholder.svg"
            }
            alt="Club Diamondz Luxury Fashion"
            fill
            priority
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #FBF4E4 0%, #FBF4E4 0%, rgba(251,244,228,0.0) 70%, rgba(251,244,228,0.0) 100%)",
            }}
          ></div>
        </div>

        {/* Content Overlay - Positioned on top of both columns */}
        <div className="absolute inset-0 z-10">
          <div className="container mx-auto h-full">
            <div className="flex flex-col justify-center h-full max-w-xl px-8 md:px-16">
              <p className={`${archivo.className} text-[#211f17] text-xl mb-4`}>
                Hello,{" "}
                <span className="text-[#bd9574]">
                  {user ? user?.first_name : "Guest"}
                </span>
              </p>
              <h1
                className={`${taviraj.className} text-[#211f17] text-5xl md:text-6xl font-light mb-8 whitespace-nowrap`}
              >
                {translationDiamondzPage?.hero_title}
              </h1>

              {/* Diamond Separator */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-24 h-[1px] bg-[#bd9574]"></div>
                <div className="w-2 h-2 bg-[#bd9574] rotate-45"></div>
                <div className="w-24 h-[1px] bg-[#bd9574]"></div>
              </div>

              <p
                className={`${archivo.className} text-[#211f17] text-lg mb-10 max-w-xl`}
              >
                {translationDiamondzPage?.hero_description}
              </p>

              <Link
                href="/join-club"
                className="inline-flex items-center border border-[#bd9574] text-[#bd9574] px-8 py-4 hover:bg-[#bd9574] hover:text-[#fbf4e4] transition-colors self-start"
              >
                <span className={`${archivo.className} mr-2`}>
                  Join the Club !
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* News Highlight Section */}
      <div className="relative h-[400px] w-full">
        <Image
          src={
            getImageUrl(diamondzPage?.news_background, {
              format: "webp",
              quality: 100,
              fit: "cover",
            }) || "/placeholder.svg"
          }
          alt="Sydney Harbour"
          fill
          priority
          className="object-cover"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(251, 244, 228, 0.6), rgba(251, 244, 228, 0.6)), linear-gradient(180deg, #FBF4E4 0%, rgba(251,244,228,0) 25%, rgba(251,244,228,0) 75%, #FBF4E4 100%)",
          }}
        ></div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2
            className={`${taviraj.className} text-[#211f17] text-5xl md:text-6xl font-light mb-6`}
          >
            {translationDiamondzPage?.highlight_title}
          </h2>
          <p
            className={`${archivo.className} text-[#211f17] text-lg max-w-2xl mb-10 mx-auto`}
          >
            {translationDiamondzPage?.highlight_description}
          </p>
          <div className="inline-block border border-[#211f17]">
            <Link
              href="/media/news"
              className={`${archivo.className} inline-flex items-center text-[#211f17] px-8 py-3 hover:bg-[#211f17] hover:text-[#fbf4e4] transition-colors`}
            >
              <span className="mr-2">Read More</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Event Updates Section */}
      <DiamondzSection
        title={translationDiamondzEvent?.title}
        items={eventsToDisplay}
        currentPage={eventPage}
        totalPages={eventPages}
        onNavigate={(direction) => {
          if (typeof direction === "number") {
            setEventPage(direction)
          } else {
            navigateEvents(direction)
          }
        }}
        CardComponent={EventCard}
      />

      {/* Upcoming Activities Section */}
      <DiamondzSection
        title="Upcoming Activities"
        items={currentActivities}
        currentPage={activityPage}
        totalPages={activityPages}
        onNavigate={(direction) => {
          if (typeof direction === "number") {
            setActivityPage(direction)
          } else {
            navigateActivities(direction)
          }
        }}
        CardComponent={ActivityCard}
      />

      {/* Off-Market Properties Section */}
      <div className="px-[40px]">
        <OffMarket data={offMarket} section={offMarketSection} dark={false} />
      </div>

      {/* Latest Happenings Section */}
      <DiamondzSection
        title="Latest Happenings"
        items={currentHappenings}
        currentPage={happeningPage}
        totalPages={happeningPages}
        onNavigate={(direction) => {
          if (typeof direction === "number") {
            setHappeningPage(direction)
          } else {
            navigateHappenings(direction)
          }
        }}
        CardComponent={HappeningCard}
      />
    </div>)
  )
}
