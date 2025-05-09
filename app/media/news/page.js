"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Taviraj, Archivo } from "next/font/google"
import Footer from "@/components/footer"

const taviraj = Taviraj({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-taviraj",
})

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-archivo",
})

const newsItems = [
  {
    id: 1,
    title: "Australia's Market Outlook 2025",
    image: "/property-investment-graph.png",
    categories: ["News", "Insight"],
    date: "3 January 2025",
  },
  {
    id: 2,
    title: "Australia's Real Estate Summit 2025",
    image: "/real-estate-conference.png",
    categories: ["News", "Article"],
    date: "3 January 2025",
  },
  {
    id: 3,
    title: "Exploring the Future of Property Investment in Australia 2025",
    image: "/property-investment-graph.png",
    categories: ["Insight", "Insight"],
    date: "3 January 2025",
  },
  {
    id: 4,
    title: "Sustainable Housing Trends in Australia",
    image: "/modern-home-couple.png",
    categories: ["News", "Insight"],
    date: "4 January 2025",
  },
  {
    id: 5,
    title: "Australia's Market Outlook 2025",
    image: "/luxury-beachfront-aerial.png",
    categories: ["News", "Insight"],
    date: "3 January 2025",
  },
  {
    id: 6,
    title: "Australia's Real Estate Summit 2025",
    image: "/luxury-event-crowd.png",
    categories: ["News", "Insight"],
    date: "3 January 2025",
  },
]

export default function MediaNews() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribing email:", email)
    setEmail("")
    // Show success message or handle API call
  }

  return (
    <div className="bg-[#211f17] min-h-screen text-[#e2dbcc]">

      {/* Hero Section */}
      <div
        className="relative h-[80vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('/suburban-neighborhood-aerial.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h1 className={`${taviraj.className} text-4xl md:text-5xl lg:text-6xl font-light mb-8`}>
            We had a function in
            <br />
            1500 people attended
          </h1>

          {/* Diamond divider */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-24 h-px bg-[#bd9574]"></div>
            <div className="w-2 h-2 mx-2 bg-[#bd9574] transform rotate-45"></div>
            <div className="w-24 h-px bg-[#bd9574]"></div>
          </div>

          <p className={`${taviraj.className} text-lg md:text-xl max-w-3xl mx-auto leading-relaxed`}>
            Welcome to the news page, where we bring you the latest updates and insights in the world of real estate.
            From market trends to innovative services, our articles cover everything you need to know to navigate the
            property landscape with ease. Stay informed and discover how our concierge services can elevate your
            property experience!
          </p>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <div key={item.id} className="bg-[#1a1914] overflow-hidden">
              <Link href={`/media/news/${item.id}`}>
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image || "/generic-placeholder-graphic.png"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    {item.categories.map((category, index) => (
                      <React.Fragment key={index}>
                        <span className={`text-[#bd9574] text-sm ${archivo.className}`}>{category}</span>
                        {index < item.categories.length - 1 && <span className="mx-2 text-[#bd9574]">|</span>}
                      </React.Fragment>
                    ))}
                  </div>
                  <h3 className={`${taviraj.className} text-xl font-light mb-3 hover:text-[#bd9574] transition-colors`}>
                    {item.title}
                  </h3>
                  <p className={`${archivo.className} text-sm text-[#a1a1aa]`}>{item.date}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
