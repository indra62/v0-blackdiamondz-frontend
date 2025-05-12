"use client";

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Archivo } from "next/font/google";
import Footer from "@/components/footer";
import { getImageUrl, getItems, getItem } from "@/lib/api";
import { useParams } from "next/navigation";

const archivo = Archivo({ subsets: ["latin"] });

export default function MediaNewsDetail() {
  const params = useParams();
  const { id } = params;

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("en");

  const translation =
    news?.translations?.find((t) => t.languages_code === language) ||
    news?.translations?.[0];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language");
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    }
    const fetchNews = async () => {
      try {
        const dataNews = await getItem("news", id, {
          fields: ["*", "translations.*"],
        });

        setNews(dataNews);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // If no article is provided, use a default one for preview
  const defaultArticle = {
    id: "australias-market-outlook-2025",
    title: "Australia's Market Outlook 2025",
    image: "/modern-house-exterior.png",
    categories: ["News", "Insight"],
    date: "8 November 2024",
    author: "Aaron Smith",
    wordCount: 340,
    readTime: 8,
    content: [
      "As we explore the market trends in Australia, it's clear that 2025 will be a significant year due to evolving landscapes influenced by technological advancements and shifting consumer behaviors. Sectors like renewable energy and e-commerce are set to thrive, emphasizing sustainability and convenience while digital currencies and online platforms transform traditional business models.",
      "As we delve into the market trends shaping Australia, it's evident that 2025 is poised to be a pivotal year. The landscape is rapidly evolving, driven by technological advancements and changing consumer behaviors. This transformation is not just a fleeting moment; it signifies a shift in how businesses operate and how consumers engage with products and services.",
      "One of the most promising sectors is renewable energy. With a growing emphasis on sustainability, Australia is witnessing a surge in investments aimed at harnessing clean energy sources. This shift not only aligns with global environmental goals but also caters to a consumer base that increasingly prioritizes eco-friendly options. As we approach 2025, expect to see innovative solutions that make renewable energy more accessible and efficient.",
      "E-commerce is another sector set to flourish in the coming years. The convenience of online shopping has reshaped consumer habits, and this trend shows no signs of slowing down. Retailers are adapting by enhancing their digital platforms, offering personalized experiences, and streamlining logistics to meet the demands of a tech-savvy audience. By 2025, the e-commerce landscape will likely be more competitive, with businesses leveraging data analytics to better understand and serve their customers.",
      "Digital currencies are also making waves in the Australian market. As cryptocurrencies gain traction, they are transforming traditional financial systems and consumer transactions. By 2025, we can anticipate a more integrated approach to digital currencies, with businesses adopting these new payment methods to cater to a growing demographic of crypto-savvy consumers. This shift could redefine how we perceive value and conduct transactions.",
      "Moreover, online platforms are revolutionizing traditional business models. From gig economy services to subscription-based offerings, the way we engage with products and services is changing. Companies are increasingly leveraging technologies to create seamless, user-friendly experiences that resonate with modern consumers. As we look towards 2025, the integration of these platforms will likely continue to disrupt established industries.",
      "In conclusion, the market trends in Australia leading up to 2025 are characterized by a blend of innovation and adaptability. Sectors like renewable energy and e-commerce are not just thriving; they are setting the stage for a future where sustainability and convenience reign supreme. As businesses navigate this evolving landscape, staying attuned to these trends will be crucial for success.",
    ],
    highlightedQuote:
      "By 2025, the e-commerce landscape will likely be more competitive, with businesses leveraging data analytics to better understand and serve their customers.",
  };

  const displayArticle = defaultArticle;

  return (
    <div className="bg-[#211f17] min-h-screen text-[#e2dbcc]">
      {/* Hero Section */}
      <div
        className="relative h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: `url('${displayArticle.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
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
                <p className="text-[#e2dbcc] font-semibold">
                  {displayArticle.wordCount}
                </p>
                <p className="text-[#a1a1aa] text-sm mb-2">words</p>
                <p className="text-[#e2dbcc] font-semibold">
                  {displayArticle.readTime}
                </p>
                <p className="text-[#a1a1aa] text-sm">minutes read</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <div className="prose prose-invert prose-lg max-w-none">
              {/* First letter styling */}
              <p className="mb-6">
                <span className="float-left text-[#bd9574] text-8xl font-serif mr-4 mt-1 leading-none">
                  {translation?.news_body?.charAt(0)}
                </span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: translation?.news_body?.slice(1),
                  }}
                />
              </p>

              {/* Rest of the paragraphs */}
              {translation?.news_body
                ?.split("\n\n")
                ?.slice(1)
                ?.map((paragraph, index) => (
                  <p key={index} className="mb-6 text-[#e2dbcc]">
                    <span dangerouslySetInnerHTML={{ __html: paragraph }} />
                  </p>
                ))}

              {/* Article Date */}
              <div className="flex justify-center my-12 items-center">
                <div className="w-24 h-px bg-[#656565] mx-4"></div>
                <p className="text-[#a1a1aa]">{news?.news_date}</p>
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
  );
}
