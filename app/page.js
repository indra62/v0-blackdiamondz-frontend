/**
 * Home Page
 *
 * Main landing page of the website.
 * Assembles various components to create the complete homepage.
 *
 * Component order determines the visual hierarchy and flow of the page.
 *
 * @page
 */
"use client"

import Header from "@/components/header"
import Hero from "@/components/hero"
import Properties from "@/components/properties"
import Stats from "@/components/stats"
import AboutUs from "@/components/about-us"
import ExploreCity from "@/components/explore-city"
import OffMarket from "@/components/off-market"
import Footer from "@/components/footer"
import { getItems, getFilteredItems } from "@/lib/api"
import Loading from "@/components/loading"
import { useEffect, useState } from "react"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [heroData, setHeroData] = useState(null)
  const [aboutUs, setAboutUs] = useState(null)
  const [statistic, setStatistic] = useState(null)
  const [explore, setExplore] = useState(null)
  const [properties, setProperties] = useState(null)
  const [offMarket, setOffMarket] = useState(null)
  const [offMarketSection, setOffMarketSection] = useState(null)

  useEffect(() => {
    const fetchDataHome = async () => {
      try {
        const dataHero = await getItems("hero_section", {
          fields: ["*", "hero_image.*", "translations.*"],
        })
        const dataAboutUs_section = await getItems("aboutUs_section", {
          fields: [
            "*",
            "aboutUs_Image.*",
            "translations.*",
            "aboutUs_Image.directus_files_id.*",
          ],
        })
        const dataProperties = await getItems("properties", {
          fields: [
            "*",
            "translations.*",
            "images.directus_files_id.*",
            "plans.*",
            "videos.*",
            "features.feature_id.*",
            "features.value",
            "agents.*.*",
          ],
          filter: {
            status: { _nin: ["Sold", "archived"] },
          },
          limit: 4,
        })
        const dataStatistic_section = await getItems("statistic_section", {
          fields: ["*", "translations.*"],
        })
        const dataExplore_section = await getItems("explore_section", {
          fields: ["*", "translations.*", "cities.*"],
        })
        const dataOffMarketSection = await getItems("offMarket_section", {
          fields: ["*", "translations.*"],
        })
        const dataOffMarketProperties = await getItems("properties", {
          fields: [
            "*",
            "translations.*",
            "images.directus_files_id.*",
            "plans.*",
            "videos.*",
            "features.feature_id.*",
            "features.value",
            "agents.*.*",
          ],
          filter: {
            is_off_market: { _eq: true },
            status: { _nin: ["Sold", "archived"] },
          },
          limit: 4,
        })
        console.log(dataOffMarketProperties)
        // const dataProduct = await getItems("our_products", {
        //   fields: [
        //     "*",
        //     "productList.id",
        //     "productList.name",
        //     "productList.description",
        //     "productList.image.*",
        //   ],
        //   limit: -1,
        // })
        // const dataClient = await getItems("our_clients", {
        //   fields: [
        //     "*",
        //     "top_row_client_logo.directus_files_id.*",
        //     "bottom_row_client_logo.directus_files_id.*",
        //   ],
        // })
        // const dataBusiness = await getItems("our_business", {
        //   fields: ["*", "sectionBackground.*"],
        // })

        setHeroData(dataHero)
        setAboutUs(dataAboutUs_section)
        setStatistic(dataStatistic_section)
        setExplore(dataExplore_section)
        setProperties(dataProperties)
        setOffMarketSection(dataOffMarketSection)
        setOffMarket(dataOffMarketProperties)
        setLoading(false)
      } catch (err) {
        setError("Failed to load home data")
      }
    }
    fetchDataHome()
  }, [])

  return (
    <main className="min-h-screen bg-[#211f17]">
      {loading ? (
        <section className="flex justify-center items-center h-[800px] bg-[#211f17]">
          <Loading error={error} />
        </section>
      ) : (
        <>
          <Header />
          <Hero data={heroData} />
          {/* <Properties data={properties} /> */}
          <Stats data={statistic} />
          <AboutUs data={aboutUs} />
          <ExploreCity data={explore} />
          <OffMarket data={offMarket} section={offMarketSection} />
          <Footer />
        </>
      )}
    </main>
  )
}
