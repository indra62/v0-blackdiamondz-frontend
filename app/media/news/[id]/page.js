"use client";

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Archivo } from "next/font/google";
import Footer from "@/components/footer";
import { getImageUrl, getItems, getItem } from "@/lib/api";
import { useParams } from "next/navigation";
import { formatDate } from "@/lib/utils"

const archivo = Archivo({ subsets: ["latin"] })

export default function MediaNewsDetail() {
  const params = useParams()
  const { id } = params

  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(true)
  const [language, setLanguage] = useState("en")
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)

  const translation =
    news?.translations?.find((t) => t.languages_code === language) ||
    news?.translations?.[0]

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language")
      if (storedLanguage) {
        setLanguage(storedLanguage)
      }
    }
    const fetchNews = async () => {
      try {
        const dataNews = await getItem("news", id, {
          fields: ["*.*", "translations.*", "news_media.directus_files_id.*"],
        })

        setNews(dataNews)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching news:", error)
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const mediaList =
    news?.news_media
      ?.map((media) => {
        const file = media.directus_files_id
        if (!file) return null
        if (file.type && file.type.startsWith("image/")) {
          return {
            type: "image",
            url: getImageUrl(file.id, {
              format: "webp",
              quality: 100,
              fit: "cover",
            }),
            alt: file.title || "News Image",
          }
        }
        if (file.type && file.type.startsWith("video/")) {
          return {
            type: "video",
            url: getImageUrl(file.id),
            alt: file.title || "News Video",
          }
        }
        return null
      })
      ?.filter(Boolean) || []

  const totalMedia = mediaList.length

  const goToPrev = () => {
    setCurrentMediaIndex((prev) => (prev === 0 ? totalMedia - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentMediaIndex((prev) => (prev === totalMedia - 1 ? 0 : prev + 1))
  }

  function stripHtml(html) {
    if (!html) return ""
    const tmp = document.createElement("div")
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ""
  }

  function countWords(text) {
    return text.trim().split(/\s+/).filter(Boolean).length
  }

  function estimateReadTime(wordCount, wpm = 200) {
    return Math.max(1, Math.round(wordCount / wpm))
  }

  const newsBodyHtml = translation?.news_body || ""
  const plainText = stripHtml(newsBodyHtml)
  const wordCount = countWords(plainText)
  const readTime = estimateReadTime(wordCount)

  let heroMedia = null
  if (mediaList.length > 0) {
    const current = mediaList[currentMediaIndex]
    if (current.type === "image") {
      heroMedia = (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url('${current.url}')`,
            backgroundSize: "cover",
            backgroundPosition: "center 20%",
          }}
        />
      )
    } else if (current.type === "video") {
      heroMedia = (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={current.url}
          controls
          autoPlay={true}
          loop
          muted
          style={{ background: "#000" }}
        />
      )
    }
  }

  return (
    <div className="bg-[#211f17] min-h-screen text-[#e2dbcc]">
      {/* Hero Section */}
      <div className="relative h-[768px] flex items-center justify-center overflow-hidden">
        {/* Current media (image or video) */}
        {heroMedia}

        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8">
            {translation?.news_title}
          </h1>

          {/* Diamond divider */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-24 h-px bg-[#bd9574]"></div>
            <div className="w-2 h-2 mx-2 bg-[#bd9574] transform rotate-45"></div>
            <div className="w-24 h-px bg-[#bd9574]"></div>
          </div>

          {/* Intro paragraph */}
          <p className="text-lg max-w-3xl mx-auto">
            {translation?.news_summary}
          </p>

          {/* Author */}
          <p className="mt-8 text-[#bd9574]">by {news?.author_name}</p>

          {/* Media Navigation - now below author */}
          {totalMedia > 1 && (
            <div className="flex items-center justify-center gap-4 mt-16">
              {/* Prev Button */}
              <button
                className={`p-2 border border-[#656565] rounded ${
                  currentMediaIndex === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:border-[#BD9574] hover:text-[#BD9574]"
                } transition-colors`}
                onClick={goToPrev}
                disabled={currentMediaIndex === 0}
                aria-label="Previous"
                type="button"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18l-6-6 6-6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {/* Dot Indicators */}
              <div className="flex gap-4">
                {mediaList.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 ${
                      index === currentMediaIndex
                        ? "bg-[#BD9574]"
                        : "bg-[#656565]"
                    } transform rotate-45 cursor-pointer transition-colors`}
                    onClick={() => setCurrentMediaIndex(index)}
                    aria-label={`Go to media ${index + 1}`}
                  />
                ))}
              </div>
              {/* Next Button */}
              <button
                className={`p-2 border border-[#656565] rounded ${
                  currentMediaIndex === totalMedia - 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:border-[#BD9574] hover:text-[#BD9574]"
                } transition-colors`}
                onClick={goToNext}
                disabled={currentMediaIndex === totalMedia - 1}
                aria-label="Next"
                type="button"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row">
          {/* Left Sidebar - Article Metadata */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0 md:pr-8">
            <div className="mb-8">
              <div className="flex items-center mb-4">
                {news?.news_tag.map((category, index) => (
                  <React.Fragment key={index}>
                    <span className="text-[#bd9574] text-sm">{category}</span>
                    {index < news?.news_tag.length - 1 && (
                      <span className="mx-2 text-[#bd9574]">|</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="mb-4">
                <p className="text-[#a1a1aa] text-sm mb-1">Written by</p>
                <p className="text-[#bd9574]">{news?.author_name}</p>
              </div>
              <div>
                <p className="text-[#e2dbcc] font-semibold">{wordCount}</p>
                <p className="text-[#a1a1aa] text-sm mb-2">words</p>
                <p className="text-[#e2dbcc] font-semibold">{readTime}</p>
                <p className="text-[#a1a1aa] text-sm">minutes read</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <div className="prose prose-invert prose-lg max-w-none">
              {/* Rest of the paragraphs */}
              <div
                className={`news-body mb-6 ${archivo.className} leading-[150%]`}
                dangerouslySetInnerHTML={{ __html: translation?.news_body }}
              />

              {/* Article Date */}
              <div className="flex justify-center my-12 items-center">
                <div className="w-24 h-px bg-[#656565] mx-4"></div>
                <p className="text-[#a1a1aa]">{formatDate(news?.news_date)}</p>
                <div className="w-24 h-px bg-[#656565] mx-4"></div>
              </div>

              {/* Back to News Button */}
              <div className="flex justify-center mt-8 mb-16">
                <Link
                  href="/media/news"
                  className="border border-[#bd9574] text-[#bd9574] px-8 py-3 flex items-center hover:bg-[#bd9574] hover:text-[#211f17] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to News
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
