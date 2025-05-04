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
import Header from "@/components/header"
import Hero from "@/components/hero"
import Properties from "@/components/properties"
import Stats from "@/components/stats"
import AboutUs from "@/components/about-us"
import ExploreCity from "@/components/explore-city"
import OffMarket from "@/components/off-market"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#211f17]">
      <Header />
      <Hero />
      <Properties />
      <Stats />
      <AboutUs />
      <ExploreCity />
      <OffMarket />
      <Footer />
    </main>
  )
}
