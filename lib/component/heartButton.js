import { useSavedProperties } from "@/hooks/useSavedProperties"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { Heart } from "lucide-react"
import { useState } from "react"

export default function HeartButton({ propertyId, uniqueId, size = 24, mode }) {
  const { user } = useAuth()
  const router = useRouter()
  const [savedPropertyIds, savedPropertyUniqueIds, saveProperty, deleteSavedProperty] =
    useSavedProperties()
  const [loading, setLoading] = useState(false)

  const isSaved = savedPropertyIds.includes(propertyId)
  const isSaved_2 = savedPropertyUniqueIds.includes(uniqueId)

  const handleClick = async (e) => {
    e.stopPropagation()
    if (!user?.id) {
      router.push("/login")
      return
    }
    setLoading(true)
    try {
      if (isSaved) {
        await deleteSavedProperty(propertyId, uniqueId)
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
      aria-label={isSaved || isSaved_2 ? "Unsave property" : "Save property"}
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
        fill={isSaved || isSaved_2 ? (mode === "light" ? "#211F17" : "#BD9574") : "none"}
        strokeWidth={isSaved || isSaved_2 ? 1 : 2}
        size={size}
      />
    </button>
  )
}
