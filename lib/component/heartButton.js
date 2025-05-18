import { useSavedProperties } from "@/hooks/useSavedProperties"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { Heart } from "lucide-react"
import { useState } from "react"

export default function HeartButton({ propertyId, uniqueId, size = 24, mode, savedPropertyId, refreshSavedProperties }) {
  const { user } = useAuth()
  const router = useRouter()
  const {
    savedProperties,
    savedPropertyIds,
    saveProperty,
    deleteSavedProperty,
  } = useSavedProperties()
  const [loading, setLoading] = useState(false)

  const isSaved =
    savedPropertyId !== undefined
      ? !!savedPropertyId
      : savedPropertyIds.includes(propertyId)

  // If not passed, try to find the savedPropertyId from the hook (for deletion)
  const fallbackSavedProperty =
    savedProperties &&
    savedProperties.find((item) => item.property_id === propertyId)
  const actualSavedPropertyId = savedPropertyId || fallbackSavedProperty?.id

  const handleClick = async (e) => {
    e.stopPropagation()
    if (!user?.id) {
      router.push("/login")
      return
    }
    setLoading(true)
    try {
      if (isSaved && actualSavedPropertyId) {
        await deleteSavedProperty(actualSavedPropertyId, propertyId, uniqueId)
        if (refreshSavedProperties) refreshSavedProperties()
      } else {
        await saveProperty(propertyId, uniqueId)
      }
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  return (
    <button
      aria-label={isSaved ? "Unsave property" : "Save property"}
      onClick={handleClick}
      disabled={loading}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
      }}
      tabIndex={0}
    >
      <Heart
        color={mode === "light" ? "#211F17" : "#BD9574"}
        fill={
          isSaved
            ? mode === "light"
              ? "#211F17"
              : "#BD9574"
            : "none"
        }
        strokeWidth={isSaved ? 1 : 2}
        size={size}
      />
    </button>
  )
}