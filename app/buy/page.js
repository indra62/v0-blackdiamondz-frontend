import Header from "@/components/Header"
import BuyFilters from "@/components/BuyFilters"
import Properties from "@/components/properties"
import ExploreCity from "@/components/ExploreCity"
import Footer from "@/components/Footer"

export default function BuyPage() {
  return (
    <main className="min-h-screen bg-[#211f17]">
      <Header />
      <BuyFilters />
      <Properties showFilters={false} showNavigation={false} propertyCount={12} />
      <ExploreCity />
      <Footer />
    </main>
  )
}
