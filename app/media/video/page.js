"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Play, ChevronLeft, ChevronRight } from "lucide-react"
import { Archivo, Taviraj } from "next/font/google"
import { useRouter } from "next/navigation"
import Footer from "@/components/footer"
import Loading from "@/components/loading"
import { getImageUrl, getItems } from "@/lib/api"
import VideoSection from "@/components/VideoSection"
import { TextAnimate } from "@/components/magicui/text-animate"

const taviraj = Taviraj({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export default function MediaVideo() {
  const [heroData, setHeroData] = useState(null)
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState("all")
  const [videos, setVideos] = useState([])
  const [allVideos, setAllVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [language, setLanguage] = useState("en")
  const translation =
    heroData?.translations?.find((t) => t.languages_code === language) ||
    heroData?.translations?.[0]

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language")
      if (storedLanguage) {
        setLanguage(storedLanguage)
      }
    }
    const fetchVideos = async () => {
      try {
        const dataHero = await getItems("media_video_hero_section", {
          fields: ["*", "hero_image.*", "translations.*"],
        })

        const dataVideo = await getItems("videos", {
          fields: ["*.*", "translations.*"],
          sort: ["-date_created"],
          filter: { status: { _eq: "published" } },
        })

        const dataAll = await getItems("videos", {
          fields: ["*.*", "translations.*"],
          sort: ["-date_created"],
          filter: { status: { _eq: "published" } },
        })

        setHeroData(dataHero)
        setAllVideos(dataAll)
        setVideos(dataVideo)
        setLoading(false)
      } catch (error) {
        setError("Error fetching videos:", error)
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  return (
    <div className="bg-[#211f17] min-h-screen">
      {loading ? (
        <section className="flex justify-center items-center h-[800px] bg-[#211f17]">
          <Loading error={error} />
        </section>
      ) : (
        <>
          {/* Hero Section */}
          <div className="relative h-screen">
            <div className="absolute inset-0">
              <Image
                src={getImageUrl(heroData?.hero_image?.id, {
                  format: "webp",
                  quality: 100,
                  fit: "cover",
                  alt: "Black Diamondz Media",
                })}
                alt="Black Diamondz Media"
                fill
                priority
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(33, 31, 23, 0.7), rgba(33, 31, 23, 0.7)), linear-gradient(180deg, rgba(33, 31, 23, 0) 80.08%, #211F17 100%)",
                }}
              ></div>
            </div>
            <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
              <TextAnimate
                as="h1"
                animation="slideLeft"
                className={`${taviraj.className} text-[#e2dbcc] text-4xl md:text-5xl mb-8 max-w-5xl -mt-32 leading-[125%] tracking-[2px]`}
              >
                {translation?.title || ""}
              </TextAnimate>
              {/* Diamond Separator */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-24 h-[1px] bg-[#BD9574]"></div>
                <div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
                <div className="w-24 h-[1px] bg-[#BD9574]"></div>
              </div>
              <p
                className={`${archivo.className} text-[#e2dbcc] max-w-3xl mx-auto text-base md:text-lg`}
              >
                {translation?.description || ""}
              </p>
            </div>
          </div>

          <div className="container mx-auto px-4 pb-16">
            {/* Recently Uploaded Section */}
            <VideoSection
              title="Recently uploaded"
              videos={allVideos}
              count={allVideos?.length || 0}
              slideKey="recent"
            />

            {/* Talks Section */}
            <VideoSection
              title="Talks"
              videos={videos}
              count={videos?.length || 0}
              slideKey="talks"
            />

            {/* House Tour Section */}
            <VideoSection
              title="House Tour"
              videos={videos}
              count={videos?.length || 0}
              slideKey="house tour"
            />

            {/* Events Section */}
            <VideoSection
              title="Events"
              videos={videos}
              count={videos?.length || 0}
              slideKey="events"
            />
          </div>
        </>
      )}
      {/* Footer */}
      <Footer />
    </div>
  )
}
