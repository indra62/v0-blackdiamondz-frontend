/**
 * Hero Container Component
 *
 * Server component that fetches hero data from Directus CMS
 * and renders either the CMS-powered hero or falls back to the original.
 */
import { fetchHeroSection } from "@/lib/directus"
import Hero from "@/components/hero" // Your original hero component

export default async function HeroContainer() {
  try {
    // Fetch hero data from Directus
    const heroData = await fetchHeroSection()

    // If we have hero data, use it to customize the hero
    if (heroData) {
      console.log("Hero data found, rendering with CMS data")
      // Pass the CMS data to your original Hero component
      return (
        <Hero
          headline={heroData.headline}
          welcomeText={heroData.welcome_text || "Hello,"}
          userName={heroData.user_name || "George"}
          findPropertyText={heroData.find_property_text}
          backgroundImage={heroData.background_image}
        />
      )
    }

    console.log("No hero data found, using default Hero")
    // Fallback to original hero if CMS data isn't available
    return <Hero />
  } catch (error) {
    console.error("Error in HeroContainer:", error)
    // Always render something even if there's an error
    return <Hero />
  }
}
