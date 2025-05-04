/**
 * Directus API Client Configuration
 *
 * Central file for Directus SDK setup and helper functions
 * for fetching data from the CMS.
 */
import { createDirectus, rest, readItems } from "@directus/sdk"

// Type definitions for your Directus collections
export type HeroSection = {
  id: string
  headline: string
  welcome_text: string
  user_name: string
  find_property_text: string
  background_image: string
  status: string
}

// Create and configure the Directus client
const directus = createDirectus(process.env.DIRECTUS_URL || "https://staging.cms.black-diamondz.62dev.org").with(
  rest({
    credentials: "include",
    headers: {
      Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
    },
  }),
)

/**
 * Fetch hero section data from Directus
 *
 * @returns Promise with the hero section data
 */
export async function fetchHeroSection(): Promise<HeroSection | null> {
  try {
    // Fetch the first item from the hero_section collection
    const items = (await directus.request(
      readItems("home/hero_section", {
        limit: 1,
        filter: {
          status: {
            _eq: "published",
          },
        },
      }),
    )) as HeroSection[]

    return items.length > 0 ? items[0] : null
  } catch (error) {
    console.error("Error fetching hero section:", error)
    return null
  }
}

export { directus }
