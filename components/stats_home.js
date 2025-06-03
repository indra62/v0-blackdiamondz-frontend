/**
 * Stats Component
 *
 * Displays key business statistics in a visually appealing grid.
 * Each stat includes an icon, value, and label.
 *
 * @component
 */
"use client";

import { useState, useEffect } from "react";
import { Taviraj } from "next/font/google";
import { Archivo } from "next/font/google";
import Link from "next/link";

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function StatsHome({ data, isMobileView }) {
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
    <div className={`${archivo.className} bg-[#211f17] text-[#E2DBCC]  py-16`}>
      <div>
        <div className="flex flex-col lg:flex-row lg:justify-evenly">
          {/* Black Diamondz Stats */}
          <div className="flex flex-col justify-end mb-10 lg:mb-0">
            <div className="flex items-center gap-6 mb-12 ">
              <h2 className="font-archivo font-normal text-[20px] leading-[21.76px] text-center">
                {translation?.left_title}
              </h2>
              <button className="px-6 py-2 border-b border-[#656565] text-[#BD9574] hover:border-[#BD9574] hover:text-[#D4AF37] transition-colors font-archivo font-light text-base leading-6">
              <Link href="/our-story">More about Black Diamondz</Link>  
              </button>
            </div>
            <div className="grid grid-cols-3 w-full gap-8">
              <div className="text-center">
                <div
                  className={`${taviraj.className} font-normal text-[48px] leading-[81.89px] text-[#BD9574] mb-2`}
                >
                  {translation?.left_project_value}
                </div>
                <div className="font-archivo font-light text-base leading-6  ">
                  {translation?.left_project_text}
                </div>
              </div>
              <div className="text-center">
                <div
                  className={`${taviraj.className} font-normal text-[48px] leading-[81.89px] text-[#BD9574] mb-2`}
                >
                  {translation?.left_units_value}
                </div>
                <div className="font-archivo font-light text-base leading-6  ">
                  {translation?.left_units_text}
                </div>
              </div>
              <div className="text-center">
                <div
                  className={`${taviraj.className} font-normal text-[48px] leading-[81.89px] text-[#BD9574] mb-2`}
                >
                  {translation?.left_totalSQM_value}
                </div>
                <div className="font-archivo font-light text-base leading-6 ">
                  {translation?.left_totalSQM_text}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          {isMobileView ? (
            <div className="flex justify-center items-center my-[40px]">
              <div className="w-24 h-[1px] bg-[#BD9574]"></div>
              <div className="w-2 h-2 bg-[#BD9574] rotate-45 mx-2"></div>
              <div className="w-24 h-[1px] bg-[#BD9574]"></div>
            </div>
          ) : (
            <div className="lg:flex flex-col items-center mx-[120px]">
              <div
                className={`flex-1 w-[1px] bg-[#BD9574] ${
                  isMobileView ? "rotate-45" : ""
                }`}
              ></div>
              <div className="my-4">
                <div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
              </div>
              <div
                className={`flex-1 w-[1px] bg-[#BD9574] ${
                  isMobileView ? "rotate-45" : ""
                }`}
              ></div>
            </div>
          )}

          {/* Australian Market Stats */}
          <div className="flex flex-col justify-end mb-10 lg:mb-0">
            <div className="flex items-center gap-6 mb-12 ">
              <h2 className="font-archivo font-normal text-[20px] leading-[21.76px] text-center">
                {translation?.right_title}
              </h2>
              <button className="px-6 py-2 border-b border-[#656565] text-[#BD9574] hover:border-[#BD9574] hover:text-[#D4AF37] transition-colors font-archivo font-light text-base leading-6">
                More about Australian Market
              </button>
            </div>
            <div className="grid grid-cols-3 w-full gap-8">
              <div className="text-center">
                <div
                  className={`${taviraj.className} font-normal text-[48px] leading-[81.89px] text-[#BD9574] mb-2`}
                >
                  {translation?.left_project_value}
                </div>
                <div className="font-archivo font-light text-base leading-6  ">
                  {translation?.right_project_text}
                </div>
              </div>
              <div className="text-center">
                <div
                  className={`${taviraj.className} font-normal text-[48px] leading-[81.89px] text-[#BD9574] mb-2`}
                >
                  {translation?.right_units_value}
                </div>
                <div className="font-archivo font-light text-base leading-6">
                  {translation?.right_units_text}
                </div>
              </div>
              <div className="text-center">
                <div
                  className={`${taviraj.className} font-normal text-[48px] leading-[81.89px] text-[#BD9574] mb-2`}
                >
                  {translation?.right_totalSQM_value}
                </div>
                <div className="font-archivo font-light text-base leading-6">
                  {translation?.right_totalSQM_text}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
