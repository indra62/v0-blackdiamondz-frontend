import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { getItems } from "@/lib/api";
import api from "@/lib/api"; // Make sure this exports the axios instance

export function useSavedProperties() {
  const { user } = useAuth();
  const [savedPropertyIds, setSavedPropertyIds] = useState([]);

  // Fetch saved properties
  useEffect(() => {
    if (!user?.id) {
      setSavedPropertyIds([]);
      return;
    }

    let isMounted = true;
    (async () => {
      try {
        const token = localStorage.getItem("access_token");
        const data = await getItems(
          "saved_properties",
          {
            fields: ["property_id"],
            filter: { user_id: { _eq: user.id } },
          },
          {
            Authorization: `Bearer ${token}`,
          }
        );
        if (isMounted && data) {
          setSavedPropertyIds(data.map((item) => item.property_id));
        }
      } catch (err) {
        if (isMounted) setSavedPropertyIds([]);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Save property function
  const saveProperty = async (propertyId) => {
    const token = localStorage.getItem("access_token");
    try {
      await api.post(
        "/items/saved_properties",
        {
          user_id: user.id,
          property_id: propertyId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSavedPropertyIds((prev) => [...prev, propertyId]);
    } catch (error) {
      console.error("Error saving property", error);
      throw error;
    }
  };

  // Delete saved property function
  const deleteSavedProperty = async (propertyId) => {
    const token = localStorage.getItem("access_token");
    try {
      await api.delete(
        "/items/saved_properties",
        {
          data: {
            user_id: user.id,
            property_id: propertyId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSavedPropertyIds((prev) => prev.filter((id) => id !== propertyId));
    } catch (error) {
      console.error("Error deleting saved property", error);
      throw error;
    }
  };

  return [savedPropertyIds, saveProperty, deleteSavedProperty];
}
