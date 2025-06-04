"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Taviraj } from "next/font/google";
import { Archivo } from "next/font/google";
import { getImageUrl } from "@/lib/api";
import AboutUsCarousel from "@/components/AboutUsCarousel";

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function AboutUs({ data }) {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language");
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    }
  }, []);

  const translation =
    data?.translations?.find((t) => t.languages_code === language) ||
    data?.translations?.[0];

  const imageUrls =
    data.aboutUs_images?.map((img) =>
      getImageUrl(img?.directus_files_id?.id, {
        format: "webp",
        quality: 100,
        fit: "cover",
      })
    ) || []

  return (
    <section className="relative w-full min-h-[500px] flex items-center justify-center bg-[#211f17] overflow-hidden">
      {/* Full-width background image */}
      <div className="absolute inset-0 w-full h-full">
        <AboutUsCarousel
          images={imageUrls}
          alt="Luxury interior with person sitting by floor-to-ceiling windows overlooking nature"/>
        {/* Left gradient overlay for fade effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(33,31,23,1) 0%, rgba(33,31,23,0.85) 15%, rgba(33,31,23,0.5) 35%, rgba(33,31,23,0) 70%)",
          }}
        ></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 w-full px-6 py-16 flex flex-col lg:items-start items-center">
        <div>
          <h2
            className={`${taviraj.className} text-[#e2dbcc] text-[48px] font-light leading-[60px] tracking-[2px] mb-8`}
          >
            {translation?.aboutUs_title || ""}
          </h2>

          {/* Diamond Separator */}
          <div className="flex items-center mb-8">
            <div className="w-[350px] h-[1px] bg-[#BD9574]"></div>
            <div className="w-2 h-2 bg-[#BD9574] rotate-45 mx-2"></div>
            <div className="w-[350px] h-[1px] bg-[#BD9574]"></div>
          </div>

          <p
            className={`${archivo.className} text-[#E2DBCC] font-light text-base leading-6 mb-12 max-w-lg`}
          >
            {translation?.aboutUs_description || ""}
          </p>

          <Link
            href="/our-story"
            className="inline-flex items-center text-[#BD9574] hover:text-[#D4AF37] transition-colors group"
          >
            <span
              className={`${archivo.className} mr-2 font-light text-base leading-6`}
            >
              Learn more about us
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}