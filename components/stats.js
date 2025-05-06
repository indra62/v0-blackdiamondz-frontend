/**
 * Stats Component
 *
 * Displays key business statistics in a visually appealing grid.
 * Each stat includes an icon, value, and label.
 *
 * @component
 */
"use client"

import { useState, useEffect } from "react"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["400"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"] })

export default function Stats({ data }) {
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language")
      if (storedLanguage) {
        setLanguage(storedLanguage)
      }
    }
  }, [])

  const translation =
    data?.translations?.find((t) => t.languages_code === language) ||
    data?.translations?.[0]

  return (
    <div className={`${archivo.className} bg-[#211f17] text-white py-16`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row">
          {/* Black Diamondz Stats */}
          <div className="flex-1 mb-12 lg:mb-0">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-archivo font-normal text-[20px] leading-[21.76px] text-white">
                Black Diamondz
              </h2>
              <button className="px-6 py-2 border border-[#BD9574] text-[#BD9574] hover:border-[#BD9574] hover:text-[#BD9574] transition-colors font-archivo font-light text-base leading-6">
                More about Black Diamondz
              </button>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div
                  className={`${taviraj.className} font-normal text-[48px] leading-[81.89px] text-[#BD9574] mb-2`}
                >
                  {translation?.left_project_value}
                </div>
                <div className="font-archivo font-light text-base leading-6 text-white">
                  {translation?.left_project_text}
                </div>
              </div>
              <div className="text-center">
                <div
                  className={`${taviraj.className} font-normal text-[48px] leading-[81.89px] text-[#BD9574] mb-2`}
                >
                  {translation?.left_units_value}
                </div>
                <div className="font-archivo font-light text-base leading-6 text-white">
                  {translation?.left_units_text}
                </div>
              </div>
              <div className="text-center">
                <div
                  className={`${taviraj.className} font-normal text-[48px] leading-[81.89px] text-[#BD9574] mb-2`}
                >
                  {translation?.left_totalSQM_value}
                </div>
                <div className="font-archivo font-light text-base leading-6 text-white">
                  {translation?.left_totalSQM_text}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:flex flex-col items-center mx-12">
            <div className="flex-1 w-[1px] bg-[#656565]"></div>
            <div className="my-4">
              <div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
            </div>
            <div className="flex-1 w-[1px] bg-[#656565]"></div>
          </div>

          {/* Australian Market Stats */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-archivo font-normal text-[20px] leading-[21.76px] text-white">
                Australian Market
              </h2>
              <button className="px-6 py-2 border border-[#BD9574] text-[#BD9574] hover:border-[#BD9574] hover:text-[#BD9574] transition-colors font-archivo font-light text-base leading-6">
                See Market Insight
              </button>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div
                  className={`${taviraj.className} font-normal text-[48px] leading-[81.89px] text-[#BD9574] mb-2`}
                >
                  4
                </div>
                <div className="font-archivo font-light text-base leading-6 text-white">
                  {translation?.left_project_text}
                </div>
              </div>
              <div className="text-center">
                <div
                  className={`${taviraj.className} font-normal text-[48px] leading-[81.89px] text-[#BD9574] mb-2`}
                >
                  24
                </div>
                <div className="font-archivo font-light text-base leading-6 text-white">
                  {translation?.left_units_text}
                </div>
              </div>
              <div className="text-center">
                <div
                  className={`${taviraj.className} font-normal text-[48px] leading-[81.89px] text-[#BD9574] mb-2`}
                >
                  7325
                </div>
                <div className="font-archivo font-light text-base leading-6 text-white">
                  {translation?.left_totalSQM_text}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
