/**
 * API Route for Single Property
 *
 * This file creates a Next.js API route that fetches a single property
 * by ID from Directus and returns it to the client.
 */
import { NextResponse } from "next/server"
import { fetchItem, type Property } from "../../directus"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    // Fetch single property from Directus
    const property = await fetchItem<Property>("properties", id)

    if (!property) {
      return NextResponse.json({ success: false, message: "Property not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: property,
    })
  } catch (error) {
    console.error(`Error fetching property ${id}:`, error)
    return NextResponse.json({ success: false, message: "Failed to fetch property" }, { status: 500 })
  }
}
