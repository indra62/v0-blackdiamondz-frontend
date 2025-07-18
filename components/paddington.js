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
import Loading from "./loading"

const taviraj = Taviraj({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export default function Paddington({ selectedSuggestion }) {
  const [propertyStatsLoading, setPropertyStatsLoading] = useState(true)
  const [paddingtonStatsLoading, setPaddingtonStatsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [stats, setStats] = useState([])
  const [language, setLanguage] = useState("en")
  const [propertyStats, setPropertyStats] = useState(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language")
      if (storedLanguage) {
        setLanguage(storedLanguage)
      }
    }
  }, [])

  useEffect(() => {
    const fetchSuggestions = async (query = "QLD") => {
      try {
        const res = await fetch(
          // `/api/corelogic-suggest?q=${encodeURIComponent("2001/1 Boys Avenue Blacktown NSW 2148")}`
          `/api/corelogic-suggest?q=${encodeURIComponent(query)}`
        )
        if (!res.ok) {
          console.log("not found")
          setPropertyStats(null)
          return
        }
        const data = await res.json()
        setPropertyStats(data)
        if (!data || !data.statistics) {
          console.log("not found")
        } else {
          console.log("CoreLogic suggestions:", JSON.stringify(data, null, 2))
        }
      } catch (err) {
        setError("Failed to fetch property stats: " + err.message)
      } finally {
        setPropertyStatsLoading(false)
      }
    }
    console.log(
      "selectedSuggestion?.suggestion",
      selectedSuggestion?.suggestion
    )
    fetchSuggestions(
      selectedSuggestion?.suggestion || "2 Albert Avenue Broadbeach QLD 4218"
    )
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getItems("paddington_stats", {
          fields: [
            "*.*",
            "stats.status.*",
            "stats.svg.*",
            "stats.translations.*",
          ],
        })

        setData(data)
        setStats(data?.stats || [])
      } catch (err) {
        setError("Failed to paddington data:" + err.message)
      } finally {
        setPaddingtonStatsLoading(false)
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

  return propertyStatsLoading || paddingtonStatsLoading ? (
    <section className="flex flex-col justify-center items-center h-[800px] bg-[#211f17]">
      <Loading error={error} />
      {/* {error && (
        <div className="mt-6 text-red-500 text-lg text-center max-w-xl">
          {error}
        </div>
      )}
      {!error && (
        <div className="mt-6 text-[#E2DBCC] text-lg text-center">
          Loading property and statistics data, please wait...
        </div>
      )} */}
    </section>
  ) : (
    <>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2
              className={`${taviraj.className} text-[36px] font-light mb-8 text-[#E2DBCC]`}
            >
              {!propertyStats || !propertyStats.statistics
                ? "Property Statistics Unavailable"
                : propertyStats?.statistics?.seriesResponseList?.[0]
                    ?.localityName + " Statistics"}
            </h2>

            {/* Diamond Separator */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="w-24 h-[1px] bg-[#BD9574]"></div>
              <div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
              <div className="w-24 h-[1px] bg-[#BD9574]"></div>
            </div>

            {!propertyStats && (
                <p
                  className={`${archivo.className} text-[16px] font-light max-w-3xl mx-auto text-center text-[#E2DBCC] leading-[150%]`}
                >
                  We're sorry, but property data for this area is currently
                  unavailable.
                </p>
              )}
          </div>

          {/* Only show the rest if stats are found */}
          {propertyStats && propertyStats.statistics && (
            <>
              <p
                  className={`${archivo.className} text-[16px] font-light max-w-3xl mx-auto mb-8 text-center text-[#E2DBCC] leading-[150%]`}
                >
                {translationData?.paddington_description}
              </p>
              {/* Stats Row 1 */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16">
                {translatedStats.map((stat, index) => (
                  <div key={stat.id} className="flex flex-col items-center">
                    <div
                      className="mb-6"
                      dangerouslySetInnerHTML={{ __html: stat.svg }}
                    ></div>
                    <div
                      className={`${archivo.className} text-[#BD9574] font-light text-base leading-[150%] tracking-[0px] mb-2 text-center`}
                    >
                      {stat.translatedData?.title}
                    </div>
                    <div
                      className={`${taviraj.className} text-[#E2DBCC] text-[48px] font-normal leading-[120%] tracking-[0px] mb-2 text-center`}
                    >
                      {/* Latest Value */}
                      {(() => {
                        if (index === 0) {
                          const seriesData =
                            propertyStats?.statistics?.seriesResponseList?.[0]
                              ?.seriesDataList
                          if (Array.isArray(seriesData) && seriesData.length) {
                            const latest = seriesData.reduce((a, b) =>
                              new Date(a.dateTime) > new Date(b.dateTime)
                                ? a
                                : b
                            )
                            return latest.value?.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                              maximumFractionDigits: 0,
                            })
                          }
                          return "0"
                        }
                        if (index === 1) {
                          const seriesData =
                            propertyStats?.statisticsAnnualChangeInMedianPrice
                              ?.seriesResponseList?.[0]?.seriesDataList
                          if (Array.isArray(seriesData) && seriesData.length) {
                            const latest = seriesData.reduce((a, b) =>
                              new Date(a.dateTime) > new Date(b.dateTime)
                                ? a
                                : b
                            )
                            return latest.value?.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                              maximumFractionDigits: 0,
                            })
                          }
                          return "0"
                        }
                        if (index === 2) {
                          const seriesData =
                            propertyStats?.statisticsPropertiesSold
                              ?.seriesResponseList?.[0]?.seriesDataList
                          if (Array.isArray(seriesData) && seriesData.length) {
                            const latest = seriesData.reduce((a, b) =>
                              new Date(a.dateTime) > new Date(b.dateTime)
                                ? a
                                : b
                            )
                            return latest.value
                          }
                          return "0"
                        }
                        if (index === 3) {
                          const seriesData =
                            propertyStats?.statisticsMedianDaysOnMarket
                              ?.seriesResponseList?.[0]?.seriesDataList
                          if (Array.isArray(seriesData) && seriesData.length) {
                            const latest = seriesData.reduce((a, b) =>
                              new Date(a.dateTime) > new Date(b.dateTime)
                                ? a
                                : b
                            )
                            return latest.value
                          }
                          return "0"
                        }
                        if (index === 4) {
                          const seriesData =
                            propertyStats?.statisticsMedianAskingRent
                              ?.seriesResponseList?.[0]?.seriesDataList
                          if (Array.isArray(seriesData) && seriesData.length) {
                            const latest = seriesData.reduce((a, b) =>
                              new Date(a.dateTime) > new Date(b.dateTime)
                                ? a
                                : b
                            )
                            return latest.value?.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                              maximumFractionDigits: 0,
                            })
                          }
                          return "0"
                        }
                        if (index === 5) {
                          const seriesData =
                            propertyStats?.statisticsAverageHoldPeriod
                              ?.seriesResponseList?.[0]?.seriesDataList
                          if (Array.isArray(seriesData) && seriesData.length) {
                            const latest = seriesData.reduce((a, b) =>
                              new Date(a.dateTime) > new Date(b.dateTime)
                                ? a
                                : b
                            )
                            return Math.round(latest.value * 10) / 10
                          }
                          return "0"
                        }
                        return stat.translatedData?.value
                      })()}
                    </div>
                    <div
                      className={`${archivo.className} text-[#BD9574] font-light text-[16px] leading-[150%] tracking-[0px] text-center`}
                    >
                      {/* Latest Date */}
                      {(() => {
                        if (index === 0) {
                          const seriesData =
                            propertyStats?.statistics?.seriesResponseList?.[0]
                              ?.seriesDataList
                          if (Array.isArray(seriesData) && seriesData.length) {
                            const latest = seriesData.reduce((a, b) =>
                              new Date(a.dateTime) > new Date(b.dateTime)
                                ? a
                                : b
                            )
                            return (
                              "in " +
                              new Date(latest.dateTime).toLocaleDateString(
                                "en-US",
                                { month: "long", year: "numeric" }
                              )
                            )
                          }
                          return "0"
                        }
                        if (index === 1) {
                          const seriesData =
                            propertyStats?.statisticsAnnualChangeInMedianPrice
                              ?.seriesResponseList?.[0]?.seriesDataList
                          if (Array.isArray(seriesData) && seriesData.length) {
                            const latest = seriesData.reduce((a, b) =>
                              new Date(a.dateTime) > new Date(b.dateTime)
                                ? a
                                : b
                            )
                            return (
                              "in " +
                              new Date(latest.dateTime).toLocaleDateString(
                                "en-US",
                                { month: "long", year: "numeric" }
                              )
                            )
                          }
                          return "0"
                        }
                        if (index === 2) {
                          const seriesData =
                            propertyStats?.statisticsPropertiesSold
                              ?.seriesResponseList?.[0]?.seriesDataList
                          if (Array.isArray(seriesData) && seriesData.length) {
                            const latest = seriesData.reduce((a, b) =>
                              new Date(a.dateTime) > new Date(b.dateTime)
                                ? a
                                : b
                            )
                            return (
                              "in " +
                              new Date(latest.dateTime).toLocaleDateString(
                                "en-US",
                                { month: "long", year: "numeric" }
                              )
                            )
                          }
                          return "0"
                        }
                        if (index === 3) {
                          const seriesData =
                            propertyStats?.statisticsMedianDaysOnMarket
                              ?.seriesResponseList?.[0]?.seriesDataList
                          if (Array.isArray(seriesData) && seriesData.length) {
                            const latest = seriesData.reduce((a, b) =>
                              new Date(a.dateTime) > new Date(b.dateTime)
                                ? a
                                : b
                            )
                            return (
                              "in " +
                              new Date(latest.dateTime).toLocaleDateString(
                                "en-US",
                                { month: "long", year: "numeric" }
                              )
                            )
                          }
                          return "0"
                        }
                        if (index === 4) {
                          const seriesData =
                            propertyStats?.statisticsMedianAskingRent
                              ?.seriesResponseList?.[0]?.seriesDataList
                          if (Array.isArray(seriesData) && seriesData.length) {
                            const latest = seriesData.reduce((a, b) =>
                              new Date(a.dateTime) > new Date(b.dateTime)
                                ? a
                                : b
                            )
                            return (
                              "in " +
                              new Date(latest.dateTime).toLocaleDateString(
                                "en-US",
                                { month: "long", year: "numeric" }
                              )
                            )
                          }
                          return "0"
                        }
                        if (index === 5) {
                          const seriesData =
                            propertyStats?.statisticsAverageHoldPeriod
                              ?.seriesResponseList?.[0]?.seriesDataList
                          if (Array.isArray(seriesData) && seriesData.length) {
                            const latest = seriesData.reduce((a, b) =>
                              new Date(a.dateTime) > new Date(b.dateTime)
                                ? a
                                : b
                            )
                            return (
                              "in " +
                              new Date(latest.dateTime).toLocaleDateString(
                                "en-US",
                                { month: "long", year: "numeric" }
                              )
                            )
                          }
                          return "0"
                        }
                        return stat.translatedData?.period
                      })()}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  className={`bg-[#BD9574] text-[#211f17] px-8 py-4 hover:bg-[#BD9574] transition-colors ${
                    !selectedSuggestion ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => {
                    propertyStats?.report?.url &&
                      window.open(propertyStats?.report?.url, "_blank")
                  }}
                >
                  Download Report
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
