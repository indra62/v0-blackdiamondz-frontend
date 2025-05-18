import { useState, useEffect } from "react"
import { useAuth } from "./useAuth"
import { getItems } from "@/lib/api"
import api from "@/lib/api" // Make sure this exports the axios instance

export function useSavedProperties() {
  const { user } = useAuth()
  const [savedProperties, setSavedProperties] = useState([]) // Array of { id, property_id, unique_id }
  const [savedPropertyIds, setSavedPropertyIds] = useState([])
  const [savedPropertyUniqueIds, setSavedPropertyUniqueIds] = useState([])
  
  // Fetch saved properties
  useEffect(() => {
    if (!user?.id) {
      setSavedProperties([])
      setSavedPropertyIds([])
      setSavedPropertyUniqueIds([])
      return
    }

    let isMounted = true

    ;(async () => {
      try {
        const token = localStorage.getItem("access_token")
        const data = await getItems(
          "saved_properties",
          {
            fields: ["id", "property_id", "unique_id"],
            filter: { user_id: { _eq: user.id } },
            limit: -1,
          },
          {
            Authorization: `Bearer ${token}`,
          }
        )
        if (isMounted && data) {
          setSavedProperties(data || [])
          setSavedPropertyIds(data.map((item) => item.property_id))
          setSavedPropertyUniqueIds(data.map((item) => item.unique_id))
        }
      } catch (err) {
        if (isMounted) {
          setSavedPropertyIds([])
          setSavedPropertyUniqueIds([])
        }
      }
    })()

    return () => {
      isMounted = false
    }
  }, [user])

  const saveProperty = async (propertyId, uniqueId) => {
    const token = localStorage.getItem("access_token")
    try {
      await api.post(
        "/items/saved_properties",
        {
          user_id: user.id,
          property_id: propertyId,
          unique_id: uniqueId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setSavedPropertyIds((prev) => [...prev, propertyId])
      setSavedPropertyUniqueIds((prev) => [...prev, uniqueId])
    } catch (error) {
      console.error("Error saving property", error)
      throw error
    }
  }

  const deleteSavedProperty = async (id, propertyId, uniqueId) => {
    const token = localStorage.getItem("access_token")
    try {
      await api.delete("/items/saved_properties/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setSavedProperties((prev) => prev.filter((item) => item.id !== id))
      setSavedPropertyIds((prev) => prev.filter((id) => id !== propertyId))
      setSavedPropertyUniqueIds((prev) => prev.filter((id) => id !== uniqueId))
    } catch (error) {
      console.error("Error deleting saved property", error)
      throw error
    }
  }

  return {
    savedProperties,
    savedPropertyIds,
    savedPropertyUniqueIds,
    saveProperty,
    deleteSavedProperty,
  }
}
