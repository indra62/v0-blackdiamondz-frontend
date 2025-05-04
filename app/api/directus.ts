/**
 * Directus API Client Configuration
 *
 * This file sets up and exports the Directus SDK client instance
 * that will be used throughout the application to communicate with
 * the Directus CMS.
 */
import { createDirectus, rest, readItems, readItem } from "@directus/sdk"

// Type definitions for your Directus collections
// Update these types to match your actual Directus schema
export type Property = {
  id: string
  name: string
  address: string
  city: string
  postcode: string
  price: string
  type: string
  location: string
  image: string
  description: string
  features: {
    bedrooms: number
    bathrooms: number
    parking: number
    floors: number
    rooms: number
    additional: number
  }
  status: string
  created_at: string
  updated_at: string
}

export type Team = {
  id: string
  name: string
  position: string
  bio: string
  image: string
  email: string
  phone: string
}

// Create and configure the Directus client
const directus = createDirectus(process.env.DIRECTUS_URL || "https://your-directus-instance.com").with(
  rest({
    credentials: "include",
    headers: {
      Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
    },
  }),
)

/**
 * Fetch all items from a collection
 *
 * @param collection - The name of the collection to fetch from
 * @param query - Optional query parameters
 * @returns Promise with the collection items
 */
export async function fetchCollection<T>(collection: string, query?: any): Promise<T[]> {
  try {
    return (await directus.request(readItems(collection, query))) as T[]
  } catch (error) {
    console.error(`Error fetching ${collection}:`, error)
    return []
  }
}

/**
 * Fetch a single item from a collection by ID
 *
 * @param collection - The name of the collection
 * @param id - The ID of the item to fetch
 * @returns Promise with the requested item
 */
export async function fetchItem<T>(collection: string, id: string): Promise<T | null> {
  try {
    return (await directus.request(readItem(collection, id))) as T
  } catch (error) {
    console.error(`Error fetching ${collection} item ${id}:`, error)
    return null
  }
}

export { directus }
