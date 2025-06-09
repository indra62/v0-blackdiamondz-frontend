/**
 * Paddington Stats Component
 *
 * Displays real estate statistics for the Paddington area.
 * Organized in a responsive grid with icons and values.
 *
 * @component
 */
"use client"
import { getItems } from "@/lib/api"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"
import { useEffect, useState } from "react"
import { NumberTicker } from "@/components/magicui/number-ticker"
import Loading from "./loading"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"] })

export default function Statistics() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [stats, setStats] = useState([])
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language")
      if (storedLanguage) {
        setLanguage(storedLanguage)
      }
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getItems("property_sold", {
          fields: ["translations.*"],
        })

        const stats = await getItems("sold_statistics", {
          fields: ["*.*", "status.*", "svg.*", "translations.*"],
          filter: {
            status: { _eq: "published" },
          },
          sort: ["sort"],
        })

        setData(data)
        setStats(stats || [])
        setLoading(false)
      } catch (err) {
        setError("Failed to paddington data:" + err.message)
      }
    }
    fetchData()
  }, [])

  const translationData =
    data?.translations?.find((t) => t.languages_code === language) ||
    data?.translations?.[0]

  const translatedStats = stats.map((stat) => {
    const translation =
      stat.translations?.find((t) => t.languages_code === language) ||
      stat.translations?.[0]
    return {
      ...stat,
      translatedData: translation,
    }
  })

  return loading ? (
    <section className="flex justify-center items-center h-[800px] bg-[#211f17]">
      <Loading error={error} />
    </section>
  ) : (
    <>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2
            className={`${taviraj.className} text-[#E2DBCC] text-[48px] font-light leading-[125%] tracking-[2px] text-center mb-8`}
          >
            {translationData?.statistics_title}
          </h2>

          {/* Diamond Separator */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="w-24 h-[1px] bg-[#BD9574]"></div>
            <div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
            <div className="w-24 h-[1px] bg-[#BD9574]"></div>
          </div>

          <p
            className={`${archivo.className} text-[#E2DBCC] font-light text-base leading-[150%] tracking-[0px] max-w-2xl mx-auto text-center mb-16`}
          >
            {translationData?.statistics_description}
          </p>

          {translatedStats.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {translatedStats.map((stat, index) => {
                const isLast = index === translatedStats.length - 1
                const isOdd = translatedStats.length % 2 === 1
                // On small screens, last item in odd-length array gets col-span-2
                const colSpanClass =
                  isLast && isOdd
                    ? "sm:col-span-2 col-span-2 md:col-span-1"
                    : "col-span-1"

                return (
                  <div
                    key={stat.id}
                    className={`flex flex-col items-center ${colSpanClass}`}
                  >
                    <div
                      className="mb-6 text-[#BD9574]"
                      dangerouslySetInnerHTML={{ __html: stat.svg }}
                    ></div>
                    <div
                      className={`${archivo.className} text-[#BD9574] font-light text-base leading-[150%] tracking-[0px] mb-2 text-center`}
                    >
                      {stat.translatedData?.title}
                    </div>
                    {stat.value_type === 1 && (
                      <div
                        className={`${taviraj.className} text-[#E2DBCC] text-[48px] font-normal leading-[120%] tracking-[0px] mb-2 text-center`}
                      >
                        {stat.translatedData?.value}
                      </div>
                    )}
                    {stat.value_type === 2 && (
                      <div
                        className={`${taviraj.className} text-[#E2DBCC] text-[48px] font-normal leading-[120%] tracking-[0px] mb-2 text-center`}
                      >
                        <NumberTicker
                          value={stat.translatedData?.value}
                          decimalPlaces={stat.translatedData?.decimal_places}
                          className={`${taviraj.className} text-[#E2DBCC] text-[48px] font-normal leading-[120%] tracking-[0px]`}
                        />
                      </div>
                    )}
                    <div
                      className={`${archivo.className} text-[#BD9574] font-light text-[16px] leading-[150%] tracking-[0px] text-center`}
                    >
                      {stat.translatedData?.period}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p
              className={`${archivo.className} text-[16px] font-light max-w-3xl mx-auto text-center text-[#E2DBCC] leading-[150%]`}
            >
              Statistics currently unavailable.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
