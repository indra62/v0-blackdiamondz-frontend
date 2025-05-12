import { useSavedProperties } from "@/hooks/useSavedProperties";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { useState } from "react";

export default function HeartButton({ propertyId, size = 24 }) {
  const { user } = useAuth();
  const router = useRouter();
  const [savedPropertyIds, saveProperty, deleteSavedProperty] = useSavedProperties();
  const [loading, setLoading] = useState(false);

  const isSaved = savedPropertyIds.includes(propertyId);

  const handleClick = async (e) => {
    e.stopPropagation();
    if (!user?.id) {
      router.push("/login");
      return;
    }
    setLoading(true);
    try {
      if (isSaved) {
        await deleteSavedProperty(propertyId);
      } else {
        await saveProperty(propertyId);
      }
    } catch (err) {
      console.log(err)
    }
    setLoading(false);
  };

  return (
    <button
      aria-label={isSaved ? "Unsave property" : "Save property"}
      onClick={handleClick}
      disabled={loading}
      style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
      tabIndex={0}
    >
      <Heart
        color="#BD9574"
        fill={isSaved ? "#BD9574" : "none"}
        strokeWidth={isSaved ? 1 : 2}
        size={size}
      />
    </button>
  );
}
