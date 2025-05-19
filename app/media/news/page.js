"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Taviraj, Archivo } from "next/font/google"
import Footer from "@/components/footer"
import Loading from "@/components/loading"
import { getImageUrl, getItems } from "@/lib/api"
import { formatDate } from "@/lib/utils"

const taviraj = Taviraj({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-taviraj",
})

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-archivo",
})

export default function MediaNews() {
  const [language, setLanguage] = useState("en")
  const [heroData, setHeroData] = useState(null)
  const [newsData, setNews] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
    const fetchNews = async () => {
      try {
        const dataHero = await getItems("media_news_hero_section", {
          fields: ["*", "hero_image.*", "translations.*"],
        })

        const dataNews = await getItems("news", {
          fields: ["*", "translations.*"],
        })

        setHeroData(dataHero)
        setNews(dataNews)
        setLoading(false)
      } catch (error) {
        setError("Error fetching news:", error)
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  return (
    <div className="bg-[#211f17] min-h-screen text-[#e2dbcc]">
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
                src={
                  getImageUrl(heroData?.hero_image?.id, {
                    format: "webp",
                    quality: 100,
                    fit: "cover",
                    alt: "Black Diamondz Media",
                  }) || "/placeholder.svg"
                }
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
              <h1 className="text-white text-4xl md:text-5xl font-serif mb-8">
                {translation?.title || ""}
              </h1>
              {/* Diamond Separator */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-24 h-[1px] bg-[#BD9574]"></div>
                <div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
                <div className="w-24 h-[1px] bg-[#BD9574]"></div>
              </div>
              <p className="text-white max-w-3xl mx-auto text-base md:text-lg">
                {translation?.description || ""}
              </p>
            </div>
          </div>

          {/* News Grid */}
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsData?.map((item) => {
                const newsTranslation =
                  item.translations?.find(
                    (t) => t.languages_code === language
                  ) || item.translations?.[0]

                return (
                  <div key={item.id} className="bg-[#1a1914] overflow-hidden">
                    <Link href={`/media/news/${item.id}`}>
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={
                            getImageUrl(item?.news_thumbnail, {
                              format: "webp",
                              quality: 100,
                              fit: "cover",
                              alt: newsTranslation?.news_title,
                            }) || "/placeholder.svg"
                          }
                          alt={newsTranslation?.news_title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center mb-3">
                          {Array.isArray(item?.news_tag) &&
                            item.news_tag.map((tag, idx) => (
                              <React.Fragment key={tag}>
                                <span className="text-[#bd9574] text-sm mr-1">
                                  {tag}
                                </span>
                                {idx < item.news_tag.length - 1 && (
                                  <span className="mx-1 text-[#bd9574]">|</span>
                                )}
                              </React.Fragment>
                            ))}
                        </div>
                        <h3
                          className={`${taviraj.className} text-xl font-light mb-3 hover:text-[#E2DBCC] transition-colors`}
                        >
                          {newsTranslation?.news_title}
                        </h3>
                        <p
                          className={`${archivo.className} text-sm text-[#bd9574]`}
                        >
                          {formatDate(item?.news_date)}
                        </p>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  )
}
