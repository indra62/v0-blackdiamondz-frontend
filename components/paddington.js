/**
 * Paddington Stats Component
 *
 * Displays real estate statistics for the Paddington area.
 * Organized in a responsive grid with icons and values.
 *
 * @component
 */
"use client";
import { getItems } from "@/lib/api";
import { Taviraj } from "next/font/google";
import { Archivo } from "next/font/google";
import { useEffect, useState } from "react";
import Loading from "./loading";

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function Paddington({ selectedSuggestion }) {
  const [propertyStatsLoading, setPropertyStatsLoading] = useState(true);
  const [paddingtonStatsLoading, setPaddingtonStatsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [stats, setStats] = useState([]);
  const [language, setLanguage] = useState("en");
  const [propertyStats, setPropertyStats] = useState(null);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language");
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    }
  }, []);


  useEffect(() => {
    const fetchSuggestions = async (query = "QLD") => {
  try {
    const res = await fetch(`/api/corelogic-suggest?q=${encodeURIComponent(query)}`);
    if (!res.ok) {
      console.log("not found");
      setPropertyStats(null);
      return;
    }
    const data = await res.json();
    setPropertyStats(data);
    if (!data || !data.statistics) {
      console.log("not found");
    } else {
      console.log("CoreLogic suggestions:", JSON.stringify(data, null, 2));
    }
  } catch (err) {
    setError("Failed to fetch property stats: " + err.message);
  } finally {
    setPropertyStatsLoading(false);
  }
};
    fetchSuggestions(selectedSuggestion?.suggestion || "2 Albert Avenue Broadbeach QLD 4218");
  }, []);


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
        });

        setData(data);
        setStats(data?.stats || []);
      } catch (err) {
        setError("Failed to paddington data:" + err.message);
      } finally {
        setPaddingtonStatsLoading(false);
      }
    };
    fetchData();
  }, []);

  const translationData =
    data?.translations?.find((t) => t.languages_code === language) ||
    data?.translations?.[0];

  const translatedStats = stats.map((stat) => {
    const translation =
      stat.translations?.find((t) => t.languages_code === language) ||
      stat.translations?.[0];
    return {
      ...stat,
      translatedData: translation,
    };
  });

  return propertyStatsLoading || paddingtonStatsLoading ? (
    <section className="flex flex-col justify-center items-center h-[800px] bg-[#211f17]">
      <Loading />
      {error && (
        <div className="mt-6 text-red-500 text-lg text-center max-w-xl">
          {error}
        </div>
      )}
      {!error && (
        <div className="mt-6 text-[#E2DBCC] text-lg text-center">
          Loading property and statistics data, please wait...
        </div>
      )}
    </section>
  ) : (
    <>
      <section className="pb-0 pt-16">
        <div className="container mx-auto px-4">
          <h2
            className={`${taviraj.className} text-[#E2DBCC] text-[48px] font-light leading-[125%] tracking-[2px] text-center mb-8`}
          >
          {!propertyStats || !propertyStats.statistics
            ? "Stats not Found"
            : propertyStats?.statistics?.seriesResponseList?.[0]?.localityName + " Stats"}
          </h2>

          {/* Only show the rest if stats are found */}
          {propertyStats && propertyStats.statistics && (
  <>
    {/* Diamond Separator */}
    <div className="flex items-center justify-center gap-4 mb-12">
      <div className="w-24 h-[1px] bg-[#BD9574]"></div>
      <div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
      <div className="w-24 h-[1px] bg-[#BD9574]"></div>
    </div>
    <p className={`${archivo.className} text-[#E2DBCC] font-light text-base leading-[150%] tracking-[0px] max-w-2xl mx-auto text-center mb-16`}>
      {translationData?.paddington_description}
    </p>
    {/* Stats Row 1 */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {translatedStats.map((stat, index) => (
        <div key={stat.id} className="flex flex-col items-center">
          <div
            className="mb-6"
            dangerouslySetInnerHTML={{ __html: stat.svg }}
          ></div>
          <div className={`${archivo.className} text-[#BD9574] font-light text-base leading-[150%] tracking-[0px] mb-2 text-center`}>
            {stat.translatedData?.title}
          </div>
          <div className={`${taviraj.className} text-[#E2DBCC] text-[48px] font-normal leading-[120%] tracking-[0px] mb-2 text-center`}>
            {/* Latest Value */}
            {(() => {
              if (index === 0) {
                const seriesData = propertyStats?.statistics?.seriesResponseList?.[0]?.seriesDataList;
                if (Array.isArray(seriesData) && seriesData.length) {
                  const latest = seriesData.reduce((a, b) => new Date(a.dateTime) > new Date(b.dateTime) ? a : b);
                  return latest.value?.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
                }
                return "0";
              }
              if (index === 1) {
                const seriesData = propertyStats?.statisticsAnnualChangeInMedianPrice?.seriesResponseList?.[0]?.seriesDataList;
                if (Array.isArray(seriesData) && seriesData.length) {
                  const latest = seriesData.reduce((a, b) => new Date(a.dateTime) > new Date(b.dateTime) ? a : b);
                  return latest.value?.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
                }
                return "0";
              }
              if (index === 2) {
                const seriesData = propertyStats?.statisticsPropertiesSold?.seriesResponseList?.[0]?.seriesDataList;
                if (Array.isArray(seriesData) && seriesData.length) {
                  const latest = seriesData.reduce((a, b) => new Date(a.dateTime) > new Date(b.dateTime) ? a : b);
                  return latest.value;
                }
                return "0";
              }
              if (index === 3) {
                const seriesData = propertyStats?.statisticsMedianDaysOnMarket?.seriesResponseList?.[0]?.seriesDataList;
                if (Array.isArray(seriesData) && seriesData.length) {
                  const latest = seriesData.reduce((a, b) => new Date(a.dateTime) > new Date(b.dateTime) ? a : b);
                  return latest.value;
                }
                return "0";
              }
              if (index === 4) {
                const seriesData = propertyStats?.statisticsMedianAskingRent?.seriesResponseList?.[0]?.seriesDataList;
                if (Array.isArray(seriesData) && seriesData.length) {
                  const latest = seriesData.reduce((a, b) => new Date(a.dateTime) > new Date(b.dateTime) ? a : b);
                  return latest.value?.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
                }
                return "0";
              }
              if (index === 5) {
                const seriesData = propertyStats?.statisticsAverageHoldPeriod?.seriesResponseList?.[0]?.seriesDataList;
                if (Array.isArray(seriesData) && seriesData.length) {
                  const latest = seriesData.reduce((a, b) => new Date(a.dateTime) > new Date(b.dateTime) ? a : b);
                  return Math.round(latest.value * 10) / 10;
                }
                return "0";
              }
              return stat.translatedData?.value;
            })()}
          </div>
          <div className={`${archivo.className} text-[#BD9574] font-light text-[16px] leading-[150%] tracking-[0px] text-center`}>
            {/* Latest Date */}
            {(() => {
              if (index === 0) {
                const seriesData = propertyStats?.statistics?.seriesResponseList?.[0]?.seriesDataList;
                if (Array.isArray(seriesData) && seriesData.length) {
                  const latest = seriesData.reduce((a, b) => new Date(a.dateTime) > new Date(b.dateTime) ? a : b);
                  return "in " + new Date(latest.dateTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                }
                return "0";
              }
              if (index === 1) {
                const seriesData = propertyStats?.statisticsAnnualChangeInMedianPrice?.seriesResponseList?.[0]?.seriesDataList;
                if (Array.isArray(seriesData) && seriesData.length) {
                  const latest = seriesData.reduce((a, b) => new Date(a.dateTime) > new Date(b.dateTime) ? a : b);
                  return "in " + new Date(latest.dateTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                }
                return "0";
              }
              if (index === 2) {
                const seriesData = propertyStats?.statisticsPropertiesSold?.seriesResponseList?.[0]?.seriesDataList;
                if (Array.isArray(seriesData) && seriesData.length) {
                  const latest = seriesData.reduce((a, b) => new Date(a.dateTime) > new Date(b.dateTime) ? a : b);
                  return "in " + new Date(latest.dateTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                }
                return "0";
              }
              if (index === 3) {
                const seriesData = propertyStats?.statisticsMedianDaysOnMarket?.seriesResponseList?.[0]?.seriesDataList;
                if (Array.isArray(seriesData) && seriesData.length) {
                  const latest = seriesData.reduce((a, b) => new Date(a.dateTime) > new Date(b.dateTime) ? a : b);
                  return "in " + new Date(latest.dateTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                }
                return "0";
              }
              if (index === 4) {
                const seriesData = propertyStats?.statisticsMedianAskingRent?.seriesResponseList?.[0]?.seriesDataList;
                if (Array.isArray(seriesData) && seriesData.length) {
                  const latest = seriesData.reduce((a, b) => new Date(a.dateTime) > new Date(b.dateTime) ? a : b);
                  return "in " + new Date(latest.dateTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                }
                return "0";
              }
              if (index === 5) {
                const seriesData = propertyStats?.statisticsAverageHoldPeriod?.seriesResponseList?.[0]?.seriesDataList;
                if (Array.isArray(seriesData) && seriesData.length) {
                  const latest = seriesData.reduce((a, b) => new Date(a.dateTime) > new Date(b.dateTime) ? a : b);
                  return "in " + new Date(latest.dateTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                }
                return "0";
              }
              return stat.translatedData?.period;
            })()}
          </div>
        </div>
      ))}
    </div>
  </>
)}
        </div>
      </section>
    </>
  );
}