/**
 * Directus API Client Configuration
 *
 * Central file for Directus SDK setup and helper functions
 * for fetching data from the CMS.
 */

import { createDirectus, rest, readItems } from "@directus/sdk"

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
 * Tries multiple collection paths to handle different Directus configurations
 *
 * @returns {Promise<Object|null>} Promise with the hero section data or null if not found
 */
export async function fetchHeroSection() {
  try {
    console.log("Attempting to fetch hero section data...")

    // Try different possible collection paths
    const possiblePaths = [
      "hero_section", // Direct collection
      "home/hero_section", // Nested in home folder
      "home_hero_section", // Alternative naming convention
    ]

    let heroData = null

    // Try each path until we find data
    for (const path of possiblePaths) {
      try {
        console.log(`Trying to fetch from collection: ${path}`)

        const items = await directus.request(
          readItems(path, {
            limit: 1,
            filter: {
              status: {
                _eq: "published",
              },
            },
          }),
        )

        if (items && items.length > 0) {
          console.log(`Successfully fetched data from ${path}`)
          heroData = items[0]
          break
        }
      } catch (pathError) {
        console.log(`Path ${path} failed: ${pathError.message || "Unknown error"}`)
        // Continue to the next path
      }
    }

    // If we still don't have data, try fetching without filters as a last resort
    if (!heroData) {
      try {
        console.log("Trying to fetch without filters...")
        const items = await directus.request(readItems("hero_section", { limit: 1 }))
        if (items && items.length > 0) {
          heroData = items[0]
        }
      } catch (error) {
        console.log("Fetch without filters failed:", error.message || "Unknown error")
      }
    }

    return heroData
  } catch (error) {
    console.error("Error fetching hero section:", error)
    return null
  }
}

/**
 * Debug function to list all available collections
 * Helps identify the correct collection path
 */
export async function listCollections() {
  try {
    // This endpoint requires admin access but is useful for debugging
    const response = await fetch(`${process.env.DIRECTUS_URL}/collections`, {
      headers: {
        Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch collections: ${response.status}`)
    }

    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error("Error listing collections:", error)
    return []
  }
}

export { directus }
