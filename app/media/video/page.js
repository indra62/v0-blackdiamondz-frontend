"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Play, ChevronLeft, ChevronRight } from "lucide-react"
import { Archivo } from "next/font/google"
import { useRouter } from "next/navigation"
import Footer from "@/components/footer"

const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400", "500"] })

export default function MediaVideo() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState("all")
  const [videos, setVideos] = useState({
    recent: [],
    talks: [],
    houseTours: [],
    events: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real implementation, this would fetch from your CMS
    // For now, we'll use mock data that matches the design
    const fetchVideos = async () => {
      try {
        // This would be replaced with actual API calls
        // const recentVideos = await getItems("videos", { filter: { recent: true } })

        // Mock data for demonstration
        const mockVideos = {
          recent: [
            {
              id: 1,
              title: "Preparing for another 5 years from now and what to do",
              category: "Talk",
              duration: "12:04",
              date: "3 January 2025",
              thumbnail: "/luxury-property-thumbnail.png",
            },
            {
              id: 2,
              title: "Australia's Real Estate Summit 2025",
              category: "Talk",
              duration: "12:04",
              date: "3 January 2025",
              thumbnail: "/real-estate-conference.png",
            },
            {
              id: 3,
              title: "Exploring the Future of Property Investment in Australia 2025",
              category: "Insight",
              duration: "12:04",
              date: "3 January 2025",
              thumbnail: "/property-investment-graph.png",
            },
            {
              id: 4,
              title: "Sustainable Housing Trends in Australia",
              category: "Panel Discussion",
              duration: "14:30",
              date: "4 January 2025",
              thumbnail: "/sustainable-housing-panel.png",
            },
          ],
          talks: [
            {
              id: 5,
              title: "Innovative Financing Solutions for Home Buyers",
              category: "Workshop",
              duration: "16:45",
              date: "4 January 2025",
              thumbnail: "/woman-real-estate-presenter.png",
            },
            {
              id: 6,
              title: "Innovative Financing Solutions for Home Buyers",
              category: "Workshop",
              duration: "16:56",
              date: "4 January 2025",
              thumbnail: "/woman-presenter-stage.png",
            },
            {
              id: 7,
              title: "Tips and Advice Every New Real Estate Agent Needs to Know",
              category: "Keynote",
              duration: "09:00",
              date: "5 January 2025",
              thumbnail: "/real-estate-agents-panel.png",
            },
            {
              id: 8,
              title: "How I Would Get Into Real Estate Today?",
              category: "Keynote",
              duration: "09:30",
              date: "5 January 2025",
              thumbnail: "/real-estate-expert-speaking.png",
            },
          ],
          houseTours: [
            {
              id: 9,
              title: "Inside Troian Bellisario & Patrick J. Adams's Eclectic Brisbane Home",
              category: "Workshop",
              duration: "16:45",
              date: "4 January 2025",
              thumbnail: "/modern-home-couple.png",
            },
            {
              id: 10,
              title: "Inside a Japanese-Inspired Home in Nature",
              category: "Workshop",
              duration: "15:56",
              date: "4 January 2025",
              thumbnail: "/japanese-inspired-home.png",
            },
            {
              id: 11,
              title: "Fairytale Tudor | A Luxury House Tour",
              category: "Workshop",
              duration: "15:45",
              date: "4 January 2025",
              thumbnail: "/tudor-luxury-home.png",
            },
            {
              id: 12,
              title: "Extraordinary Sub-Tropical Modern Garden Home",
              category: "Workshop",
              duration: "16:30",
              date: "4 January 2025",
              thumbnail: "/modern-garden-home.png",
            },
          ],
          events: [
            {
              id: 13,
              title: "Australia's Real Estate Summit 2025",
              category: "Workshop",
              duration: "16:45",
              date: "4 January 2025",
              thumbnail: "/real-estate-conference-stage.png",
            },
            {
              id: 14,
              title: "AI Harbour Tower Official Launch Event",
              category: "Workshop",
              duration: "15:56",
              date: "4 January 2025",
              thumbnail: "/launch-event-women.png",
            },
            {
              id: 15,
              title: "MIPM 2022 - Trailer: Join the world's leading real estate event!",
              category: "Keynote",
              duration: "09:00",
              date: "5 January 2025",
              thumbnail: "/real-estate-woman-hat.png",
            },
            {
              id: 16,
              title: "Grand Real Estate Launch by Front Row Events!",
              category: "Keynote",
              duration: "09:00",
              date: "5 January 2025",
              thumbnail: "/luxury-event-lights.png",
            },
          ],
        }

        setVideos(mockVideos)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching videos:", error)
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  // Function to navigate through video slides (would be implemented with proper carousel)
  const navigateSlide = (direction, category) => {
    console.log(`Navigate ${direction} in ${category}`)
    // This would implement actual slide navigation
  }

  // Function to navigate to video detail page
  const navigateToVideoDetail = (videoId) => {
    router.push(`/media/${videoId}`)
  }

  // Video card component for all sections
  const VideoCard = ({ video }) => (
    <div className="relative group cursor-pointer" onClick={() => navigateToVideoDetail(video.id)}>
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={video.thumbnail || "/placeholder.svg"}
          alt={video.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-0 left-0 p-3">
          <div className="w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <Play className="text-white w-4 h-4 ml-0.5" />
          </div>
        </div>
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 px-2 py-1 text-white text-xs">
          {video.duration}
        </div>
      </div>
      <div className="mt-3">
        <div className="text-[#BD9574] text-sm font-light">{video.category}</div>
        <h3 className="text-white text-lg font-light mt-1 line-clamp-2 group-hover:text-[#BD9574] transition-colors">
          {video.title}
        </h3>
        <div className="text-[#A1A1AA] text-sm mt-1">{video.date}</div>
      </div>
    </div>
  )

  // Video section component specifically for Recently Uploaded
  const RecentlyUploadedSection = () => (
    <div className="mb-16">
      <div className="flex items-center justify-center mb-10">
        <div className="flex-grow h-px bg-[#656565]/30"></div>
        <h2 className="text-[#e2dbcc] text-xl font-light px-6">
          Recently uploaded <span className="text-[#e2dbcc]">({videos.recent.length})</span>
        </h2>
        <div className="flex-grow h-px bg-[#656565]/30"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {videos.recent.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <div className="flex space-x-4">
          {[1, 2, 3, 4, 5].map((dot) => (
            <button
              key={dot}
              className={`w-3 h-3 transform rotate-45 ${dot === 2 ? "bg-[#BD9574]" : "bg-[#656565]/50"}`}
              aria-label={`Go to slide ${dot}`}
            />
          ))}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => navigateSlide("prev", "recent")}
            className="w-10 h-10 border border-[#656565] flex items-center justify-center text-[#656565] hover:border-[#BD9574] hover:text-[#BD9574] transition-colors"
            aria-label="Previous videos"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => navigateSlide("next", "recent")}
            className="w-10 h-10 border border-[#656565] flex items-center justify-center text-[#656565] hover:border-[#BD9574] hover:text-[#BD9574] transition-colors"
            aria-label="Next videos"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )

  // Video section component for Talks, House Tour, and Events
  const VideoSection = ({ title, videos, count }) => (
    <div className="mb-16">
      <div className="flex items-center justify-center mb-10">
        <div className="flex-grow h-px bg-[#656565]/30"></div>
        <h2 className="text-[#e2dbcc] text-xl font-light px-6">
          {title} <span className="text-[#e2dbcc]">({count})</span>
        </h2>
        <div className="flex-grow h-px bg-[#656565]/30"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <div className="flex space-x-4">
          {[1, 2, 3, 4, 5].map((dot) => (
            <button
              key={dot}
              className={`w-3 h-3 transform rotate-45 ${dot === 1 ? "bg-[#BD9574]" : "bg-[#656565]/50"}`}
              aria-label={`Go to slide ${dot}`}
            />
          ))}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => navigateSlide("prev", title.toLowerCase())}
            className="w-10 h-10 border border-[#656565] flex items-center justify-center text-[#656565] hover:border-[#BD9574] hover:text-[#BD9574] transition-colors"
            aria-label="Previous videos"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => navigateSlide("next", title.toLowerCase())}
            className="w-10 h-10 border border-[#656565] flex items-center justify-center text-[#656565] hover:border-[#BD9574] hover:text-[#BD9574] transition-colors"
            aria-label="Next videos"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-[#211f17] min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[500px] mb-16">
        <div className="absolute inset-0">
          <Image src="/luxury-event-crowd.png" alt="Black Diamondz Media" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-serif mb-4">
            We had a function in
            <br />
            1500 people attended
          </h1>
          <p className="text-white max-w-3xl mx-auto text-base md:text-lg">
            Welcome to our video page! Here, you'll find a curated selection of videos showcasing our exceptional
            services, from property management tips to luxury home tours. Dive in to discover how we can elevate your
            real estate experience and make property ownership a breeze.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {/* Recently Uploaded Section */}
        <RecentlyUploadedSection />

        {/* Talks Section */}
        <VideoSection
          title="Talks"
          videos={videos.talks}
          count={32} // From the design
        />

        {/* House Tour Section */}
        <VideoSection
          title="House Tour"
          videos={videos.houseTours}
          count={15} // From the design
        />

        {/* Events Section */}
        <VideoSection
          title="Events"
          videos={videos.events}
          count={15} // From the design
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
