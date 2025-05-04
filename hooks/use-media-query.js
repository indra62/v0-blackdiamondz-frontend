/**
 * Custom hook for responsive design
 *
 * Provides a boolean value based on whether the current viewport matches the provided media query.
 * Uses the native matchMedia API and updates on viewport changes.
 *
 * @param {string} query - CSS media query string (e.g. "(max-width: 768px)")
 * @returns {boolean} - Whether the viewport matches the query
 *
 * Example usage:
 * const isMobile = useMediaQuery("(max-width: 768px)")
 */

"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") return

    const media = window.matchMedia(query)

    // Set initial value
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    // Define listener to update state on change
    const listener = () => {
      setMatches(media.matches)
    }

    // Modern event listener pattern
    media.addEventListener("change", listener)

    // Cleanup function to prevent memory leaks
    return () => media.removeEventListener("change", listener)
  }, [matches, query])

  return matches
}
