/**
 * API Route for Directus Debug Information
 *
 * Provides information about the Directus connection and available collections
 * Useful for troubleshooting permission issues
 */
import { listCollections } from "@/lib/directus"

export async function GET() {
  try {
    // List all available collections
    const collections = await listCollections()

    return Response.json({
      success: true,
      message: "Successfully connected to Directus",
      collections,
      url: process.env.DIRECTUS_URL,
    })
  } catch (error) {
    console.error("Directus debug error:", error)

    return Response.json(
      {
        success: false,
        error: error.message || "Failed to connect to Directus",
        url: process.env.DIRECTUS_URL,
      },
      { status: 500 },
    )
  }
}
