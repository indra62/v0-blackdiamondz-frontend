/**
 * About Us Component
 *
 * Two-column section with text content and background image.
 * Includes heading, separator, description text and CTA button.
 *
 * Uses a gradient overlay on the image for better text contrast.
 *
 * @component
 */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Taviraj } from "next/font/google";
import { Archivo } from "next/font/google";
import { getImageUrl } from "@/lib/api";

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300"] });
const archivo = Archivo({ subsets: ["latin"], weight: ["300"] });

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

  return (
    <section className="bg-[#211f17]">
      <div className="flex flex-col lg:flex-row">
        {/* Text Content - Left Side */}
        <div className="w-full lg:w-[50%] py-16 lg:py-24 flex items-center">
          <div className="max-w-xl">
            <h2
              className={`${taviraj.className} text-[#e2dbcc] text-[48px] font-light leading-[60px] tracking-[2px] mb-8`}
            >
              {translation?.aboutUs_title || ""}
            </h2>

            {/* Diamond Separator */}
            <div className="flex items-center mb-8">
              <div className="w-24 h-[1px] bg-[#BD9574]"></div>
              <div className="w-2 h-2 bg-[#BD9574] rotate-45 mx-2"></div>
              <div className="w-24 h-[1px] bg-[#BD9574]"></div>
            </div>

            <p
              className={`${archivo.className} text-[#E2DBCC] font-light text-base leading-6 mb-12 max-w-lg`}
            >
              {translation?.aboutUs_description || ""}
            </p>

            <Link
              href="/about"
              className="inline-flex items-center text-[#BD9574] hover:text-[#e5c04b] transition-colors group border border-[#BD9574] hover:border-[#e5c04b] px-8 py-3"
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

        {/* Image - Right Side */}
        <div className="w-full lg:w-[100%] h-[500px] lg:h-auto relative">
          <Image
            src={getImageUrl(data?.aboutUs_Image?.id, {
              format: "webp",
              quality: 80,
              fit: "cover",
            })}
            alt="Luxury interior with person sitting by floor-to-ceiling windows overlooking nature"
            fill
            sizes="(max-width: 1026px)"
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(40deg, rgba(33, 31, 23, 1) 0%, rgba(33, 31, 23, 0.9) 10%, rgba(33, 31, 23, 0.7) 30%, rgba(33, 31, 23, 0.3) 70%, rgba(33, 31, 23, 0) 100%)",
            }}
          ></div>
        </div>
      </div>
    </section>
  );
}
