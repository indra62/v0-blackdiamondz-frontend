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
import Footer from "@/components/footer"
import { formatDate } from "@/lib/utils"
import AgencyCarousel from "@/components/AgencyCarousel"

const taviraj = Taviraj({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

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
  const [diamondzEventUpcoming, setDiamondzEventUpcoming] = useState(null)
  const [diamondzEventList, setDiamondzEventList] = useState(null)
  const [diamondzEventUpcomingList, setDiamondzEventUpcomingList] =
    useState(null)
  const [luxuryBrands, setLuxuryBrands] = useState([])
  const [language, setLanguage] = useState("en")
  const [error, setError] = useState(null)

  const { user, isAuthenticated } = useAuth()
  // Items per page
  const itemsPerPage = 4

  // Calculate total pages for each section
  const eventPages = Math.ceil((diamondzEventList?.length || 0) / itemsPerPage)
  const happeningPages = Math.ceil(latestHappenings.length / itemsPerPage)
  const activityPages = Math.ceil(
    (diamondzEventUpcomingList?.length || 0) / itemsPerPage
  )

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

  //upcoming events
  const currentActivities =
    diamondzEventUpcomingList?.slice(
      eventPage * itemsPerPage,
      (eventPage + 1) * itemsPerPage
    ) || []

  const upcomingEventsToDisplay = currentActivities.map((event) => {
    const translation =
      event.translations?.find((t) => t.languages_code === language) ||
      event.translations?.[0]
    return { ...event, translation }
  })

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

        const dataDiamondzPage = await getItems("diamondz_page", {
          fields: ["*.*", "translations.*", "luxury_brand_partnerships.*", "luxury_brand_partnerships.translations.*", "luxury_brand_partnerships.image.*"],
        })

        const dataEventUpdates = await getItems("diamondz_event", {
          fields: ["*", "translations.*"],
        })

        const dataEventList = await getItems("event_list", {
          fields: ["*", "translations.*"],
        })

        const dataEventUpcoming = await getItems(
          "diamondz_upcoming_activities",
          {
            fields: ["*", "translations.*"],
          }
        )

        const dataEventUpcomingList = await getItems("activities_list", {
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
            "agents.*",
            "type.*.*",
          ],
          filter: {
            status: { _eq: "Offmarket" },
          },
          limit: 8,
          sort: ["-date_listed"],
        })

        setDiamondzPage(dataDiamondzPage)
        setLuxuryBrands(dataDiamondzPage?.luxury_brand_partnerships || [])
        setDiamondzEvent(dataEventUpdates)
        setDiamondzEventList(dataEventList)
        setDiamondzEventUpcoming(dataEventUpcoming)
        setDiamondzEventUpcomingList(dataEventUpcomingList)
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
            }) || "/placeholder-image.jpg"
          }
          alt={item?.translation?.event_title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-3">
        <div className="text-[#BD9574] text-[16px] font-['Archivo'] font-light">
          {item.tags}
        </div>
        <h3 className="text-[#211f17] text-lg font-['Archivo'] font-normal mt-1 line-clamp-2 group-hover:text-[#353327] transition-colors">
          {item?.translation?.event_title}
        </h3>
        <div className="text-[#BD9574] text-[16px] font-['Archivo'] font-light mt-1">
          {formatDate(item?.event_date)}
        </div>
      </div>
    </div>
  )

  // Latest Happening card component
  const HappeningCard = ({ item }) => (
    <div className="relative group cursor-pointer">
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={item.thumbnail || "/placeholder-image.jpg"}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-3">
        <div className="text-[#BD9574] text-[16px] font-['Archivo'] font-light">
          {item.category}
        </div>
        <h3 className="text-[#211f17] text-lg font-['Archivo'] font-normal mt-1 line-clamp-2 group-hover:text-[#353327] transition-colors">
          {item.title}
        </h3>
        <div className="text-[#BD9574] text-[16px] font-['Archivo'] font-light mt-1">
          {formatDate(item.date)}
        </div>
        <p className="text-[#BD9574] text-sm mt-2 line-clamp-2">
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
          src={
            getImageUrl(item.activity_thumbnail, {
              format: "webp",
              quality: 100,
              fit: "cover",
            }) || "/placeholder-image.jpg"
          }
          alt={item?.translation?.activity_title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-3">
        <div className="text-[#BD9574] text-[16px] font-['Archivo'] font-light">
          {item.tags}
        </div>
        <h3 className="text-[#211f17] text-lg font-['Archivo'] font-normal mt-1 line-clamp-2 group-hover:text-[#353327] transition-colors">
          {item?.translation?.activity_title}
        </h3>
        <div className="text-[#BD9574] text-[16px] font-['Archivo'] font-light mt-1">
          {formatDate(item.activity_date)}
        </div>
        <div className="text-[#BD9574] text-[16px]">{item.location}</div>
      </div>
    </div>
  )

  return loading ? (
    <section className="flex justify-center items-center h-[800px] bg-[#FBF4E4]">
      <Loading error={error} dark={false} />
    </section>
  ) : (
    <>
      <div className="bg-[#FBF4E4]">
        {/* Hero Section - Two Column Layout */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 min-h-[800px]">
          {/* Left Column - Beige Background */}
          <div className="bg-[#fbf4e4]"></div>

          {/* Right Column - Image */}
          <div className="relative min-h-screen md:h-[400px] w-full">
            <Image
              src={
                getImageUrl(diamondzPage?.hero_background?.id, {
                  format: "webp",
                  quality: 100,
                  fit: "cover",
                }) || "/placeholder-image.jpg"
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
                {user && (
                  <p
                    className={`${archivo.className} text-[#211f17] text-xl mb-4`}
                  >
                    Hello,
                    <span className="text-[#bd9574]">
                      {user?.first_name ? " " + user?.first_name : " Guest"}
                    </span>
                  </p>
                )}
                <h1
                  className={`${taviraj.className} text-[#211f17] text-4xl md:text-5xl leading-[125%] tracking-[2px] mb-8 whitespace-nowrap`}
                  dangerouslySetInnerHTML={{
                    __html: translationDiamondzPage?.hero_title || "",
                  }}
                />

                {/* Diamond Separator */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-24 h-[1px] bg-[#bd9574]"></div>
                  <div className="w-2 h-2 bg-[#bd9574] rotate-45"></div>
                  <div className="w-24 h-[1px] bg-[#bd9574]"></div>
                </div>

                <p
                  className={`${archivo.className} text-[#211f17] text-base md:text-lg mb-10 max-w-xl`}
                >
                  {translationDiamondzPage?.hero_description}
                </p>

                <Link
                  href="/signup?joinclub=true"
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
              }) || "/placeholder-image.jpg"
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
          items={upcomingEventsToDisplay}
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

        {/* Latest Happenings Section 
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
        />*/}

        {/* Off-Market Properties Section */}
        <div className="px-4 md:px-[40px]">
          <OffMarket data={offMarket} section={offMarketSection} dark={false} />
        </div>

        {/* Luxury Brand Partnerships Section */}
        <section className="py-20 bg-[#FBF4E4]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2
                className={`${taviraj.className} text-[48px] font-light mb-8 text-[#211f17]`}
              >
                {translationDiamondzPage?.luxury_brand_title}
              </h2>
              {/* Diamond Separator */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-24 h-[1px] bg-[#BD9574]"></div>
                <div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
                <div className="w-24 h-[1px] bg-[#BD9574]"></div>
              </div>
              <p
                className={`${archivo.className} text-[16px] font-light max-w-3xl mx-auto text-center text-[#211f17] leading-[150%]`}
              >
                {translationDiamondzPage?.luxury_brand_description}
              </p>
            </div>

            {/* Agency Logos Grid */}
            <AgencyCarousel
              agency={luxuryBrands}
              language={language}
              getImageUrl={getImageUrl}
              archivo={archivo}
              light={true}
            />
          </div>
        </section>
      </div>
      <Footer dark={false} />
    </>
  )
}
