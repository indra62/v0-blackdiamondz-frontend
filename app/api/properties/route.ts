/**
 * API Route for Properties
 *
 * This file creates a Next.js API route that fetches property data
 * from Directus and returns it to the client.
 */
import { NextResponse } from "next/server"
import { fetchCollection, type Property } from "../directus"

export async function GET(request: Request) {
  // Parse query parameters
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const city = searchParams.get("city")
  const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined

  // Build query filters
  const query: any = {
    limit: limit,
    filter: {},
    sort: ["created_at"],
  }

  // Add filters based on query parameters
  if (type) query.filter.type = { _eq: type }
  if (city) query.filter.city = { _eq: city }

  try {
    // Fetch properties from Directus
    const properties = await fetchCollection<Property>("properties", query)

    return NextResponse.json({
      success: true,
      data: properties,
    })
  } catch (error) {
    console.error("Error fetching properties:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch properties" }, { status: 500 })
  }
}
