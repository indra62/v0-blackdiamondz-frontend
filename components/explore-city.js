/**
 * Explore City Component
 *
 * Horizontal scrollable gallery of city cards with hover effects.
 * Each card shows a city image with name overlay.
 *
 * Uses a fixed-width container with overflow to create the scrollable effect.
 *
 * @component
 */
"use client";

import { useState, useEffect } from "react";
import { Archivo, Taviraj } from "next/font/google";
import Image from "next/image";
import { getImageUrl } from "@/lib/api";
import Link from "next/link";

const archivo = Archivo({ subsets: ["latin"], weight: ["700"] });
const taviraj = Taviraj({ subsets: ["latin"], weight: ["300"] });

export default function ExploreCity({ data }) {
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

  return (
    <div className="bg-[#211f17]">
      <div className={data?.cities.length <= 3 ? "" : "pl-[40px]"}>
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={`${taviraj.className} text-[#e2dbcc] text-[48px] font-light leading-[60px] tracking-[2px] mb-8`}
          >
            {translation?.explore_title}
          </h2>

          {/* Diamond Separator */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="w-24 h-[1px] bg-[#BD9574]"></div>
            <div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
            <div className="w-24 h-[1px] bg-[#BD9574]"></div>
          </div>
        </div>

        {/* Container with fixed width to show 3 full images + 250px of the fourth */}
        <div
          className="overflow-x-auto pl-2 pb-8 max-w-full md:max-w-[calc(508px * 3 + 270px +12px)]"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div
            className={`flex items-center gap-6  ${
              data?.cities.length <= 3 ? "w-fit mx-auto" : "w-max pl-[40px]"
            }`}
          >
            {data?.cities.map((city) => (
              <div
                key={city.id}
                className="relative w-[280px] md:w-[508px] h-[460px] flex-none group cursor-pointer overflow-hidden"
              >
              <Link href={`/buy?city=${city.name}`}>
                <Image
                  src={getImageUrl(city?.image, {
                    format: "webp",
                    quality: 80,
                    fit: "cover",
                  })}
                  alt={`${city.name} cityscape`}
                  fill
                  sizes="(max-width: 768px) 280px, 508px"
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-8">
                  <h3
                    className={`${archivo.className} font-light text-base leading-[40px] text-[#FBF4E4]`}
                  >
                    {city.name}
                  </h3>
                </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
