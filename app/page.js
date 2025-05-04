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
import HeroContainer from "@/components/hero-container"
import Properties from "@/components/properties"
import Stats from "@/components/stats"
import AboutUs from "@/components/about-us"
import ExploreCity from "@/components/explore-city"
import OffMarket from "@/components/off-market"
import Footer from "@/components/footer"
import { getItems } from "@/lib/api"
import Loading from "@/components/loading"
import { useEffect, useState } from "react"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [aboutUs, setAboutUs] = useState(null)
  const [statistic_section, setStatistic_section] = useState(null)
  const [clientData, setClientData] = useState(null)
  const [businessData, setBusinessData] = useState(null)

  useEffect(() => {
    const fetchDataHome = async () => {
      try {
        const dataAboutUs_section = await getItems("aboutUs_section", {
          fields: [
            "*",
            "aboutUs_Image.*",
            "translations.*",
            "aboutUs_Image.directus_files_id.*",
          ],
        })
        const dataStatistic_section = await getItems("statistic_section", {
          fields: ["*", "translations.*"],
        })
        console.log(dataAboutUs_section)
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

        setAboutUs(dataAboutUs_section)
        setStatistic_section(dataStatistic_section)
        // setClientData(dataClient)
        // setProductData(dataProduct)
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
          {/* <HeroContainer /> */}
          {/* <Properties /> */}
          <Stats data={statistic_section} />
          <AboutUs data={aboutUs} />
          <ExploreCity />
          <OffMarket />
          <Footer />
        </>
      )}
    </main>
  )
}
