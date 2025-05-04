/**
 * Directus Connection Test API Route
 *
 * This endpoint tests the connection to your Directus instance
 * and returns basic information about the available collections.
 */
import { NextResponse } from "next/server"
import { createDirectus, rest, readCollections } from "@directus/sdk"

export async function GET() {
  try {
    // Validate Directus URL
    const directusUrl = process.env.DIRECTUS_URL || ""
    if (!directusUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "Directus URL is not configured",
          hint: "Make sure DIRECTUS_URL environment variable is set correctly.",
        },
        { status: 400 },
      )
    }

    // Validate API token
    const apiToken = process.env.DIRECTUS_API_TOKEN
    if (!apiToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Directus API token is not configured",
          hint: "Make sure DIRECTUS_API_TOKEN environment variable is set correctly.",
        },
        { status: 400 },
      )
    }

    console.log(`Attempting to connect to Directus at: ${directusUrl}`)

    // Create Directus client with timeout and better error handling
    const directus = createDirectus(directusUrl).with(
      rest({
        credentials: "include",
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
        // Add fetch options with timeout
        fetchOptions: {
          // @ts-ignore - Next.js extends fetch with timeout
          next: { revalidate: 0 },
          cache: "no-store",
        },
      }),
    )

    // Attempt to fetch collections to verify connection
    try {
      const collections = await directus.request(readCollections())

      console.log(`Successfully connected to Directus. Found ${collections.length} collections.`)

      return NextResponse.json({
        success: true,
        message: "Successfully connected to Directus!",
        collections: collections.map((collection) => ({
          name: collection.collection,
          type: collection.meta?.type || "unknown",
        })),
        directusUrl: directusUrl,
      })
    } catch (requestError) {
      console.error("Error making request to Directus:", requestError)

      // Handle authentication errors specifically
      if (requestError instanceof Error && requestError.message.includes("401")) {
        return NextResponse.json(
          {
            success: false,
            message: "Authentication failed. Invalid API token.",
            hint: "Check your DIRECTUS_API_TOKEN environment variable.",
          },
          { status: 401 },
        )
      }

      throw requestError // Re-throw to be caught by outer catch
    }
  } catch (error) {
    console.error("Error connecting to Directus:", error)

    // Provide more detailed error information
    let errorMessage = "Failed to connect to Directus"
    let errorHint = "Check your DIRECTUS_URL and DIRECTUS_API_TOKEN environment variables."

    if (error instanceof Error) {
      errorMessage = error.message

      // Provide more specific hints based on error message
      if (error.message.includes("ENOTFOUND") || error.message.includes("ECONNREFUSED")) {
        errorHint = "The Directus server could not be reached. Check if the URL is correct and the server is running."
      } else if (error.message.includes("certificate")) {
        errorHint = "There was an SSL/TLS certificate issue. Make sure your Directus instance has a valid certificate."
      } else if (error.message.includes("timeout")) {
        errorHint = "The connection to Directus timed out. The server might be slow or unreachable."
      } else if (error.message.includes("fetch failed")) {
        errorHint =
          "Network request failed. This could be due to CORS restrictions, network connectivity, or an invalid URL format."
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
        hint: errorHint,
        // Include environment variables (with redacted token) for debugging
        debug: {
          directusUrl: process.env.DIRECTUS_URL,
          hasToken: !!process.env.DIRECTUS_API_TOKEN,
        },
      },
      { status: 500 },
    )
  }
}
