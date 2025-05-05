/**
 * Buy Page
 *
 * Property listings page for properties available for purchase.
 * Includes filters specific to buying properties.
 *
 * @page
 */
import Header from "@/components/header"
import BuyFilters from "@/components/buy-filters"
import Properties from "@/components/properties"
import ExploreCity from "@/components/explore-city"
import Footer from "@/components/footer"

export default function BuyPage() {
  return (
    <main className="min-h-screen bg-[#211f17]">
      <Header />
      <BuyFilters />
      {/* <Properties showFilters={false} showNavigation={false} propertyCount={12} /> */}
      <ExploreCity />
      <Footer />
    </main>
  )
}
