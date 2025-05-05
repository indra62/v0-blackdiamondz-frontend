/**
 * Buy Page
 *
 * Property listings page for properties available for purchase.
 * Includes property grid with filtering options, explore city section,
 * and off-market properties.
 *
 * @page
 */
"use client";

import { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ExploreCity from "@/components/explore-city";
import OffMarket from "@/components/off-market";
import { Heart, MapPin } from "lucide-react";
import { getImageUrl, getItems } from "@/lib/api";
import Link from "next/link";

const ITEMS_PER_PAGE = 12;

export default function BuyPage() {
  const [properties, setProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [propertiesCount, setPropertiesCount] = useState(0);
  const [propertiesTotalPages, setPropertiesTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const fetchProperties = async (page = 0, status = "Current", type = []) => {
    try {
      // Convert page index to Directus page number (1-based)
      const directusPage = page + 1;

      // Create filter based on status
      const filter = {
        is_off_market: { _eq: false },
        status:
          status === "Current"
            ? { _nin: ["Sold", "Inactive"] }
            : { _eq: "Sold", _neq: "Inactive" },
      };

      if (type.length > 0) {
        // For One-to-Many relationship
        filter.type = {
          id: { _in: type },
        };
      }

      // Fetch properties with pagination
      const data = await getItems("properties", {
        fields: [
          "*",
          "translations.*",
          "images.directus_files_id.*",
          "plans.*",
          "videos.*",
          "features.feature_id.*",
          "features.value",
          "agents.*.*",
          "type.*.*",
        ],
        filter,
        limit: ITEMS_PER_PAGE,
        page: directusPage,
        meta: "filter_count,total_count",
      });

      console.log(data);

      setProperties(data || []);
      const totalCount = data.meta?.filter_count || 0;
      setPropertiesCount(totalCount);
      setPropertiesTotalPages(Math.ceil(totalCount / ITEMS_PER_PAGE));
      return data;
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError("Failed to load properties");
      return { data: [] };
    }
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    fetchProperties();
    // eslint-disable-next-line
  }, []);


// (Removed duplicate BuyPage export and block)

  // (Removed duplicate toggleFavorite declaration)

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <main className="min-h-screen bg-[#211f17]">
      <Header />

      <div className="container mx-auto px-4 py-16">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl text-white font-light mb-6">
            Explore our properties!
          </h1>
          <div className="flex justify-center mb-6">
            <div className="w-24 h-px bg-[#bd9574] relative">
              <div className="absolute w-2 h-2 bg-[#bd9574] rotate-45 -top-[3px] left-1/2 transform -translate-x-1/2"></div>
            </div>
          </div>
          <p className="text-[#e2dbcc] max-w-3xl mx-auto text-sm md:text-base">
            On behalf of the Black Diamondz team we thank you for making the
            first step in looking for a preferred agency to secure the sale of
            your property asset.
          </p>
        </div>



        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <Link
            key={property.id}
            href={`/property/${property.id}`}
            className="block bg-[#211f17] overflow-hidden hover:opacity-95 transition-opacity"
          >
            <div key={property.id} className="mb-8">
              <div className="relative mb-3">
                <div className="relative h-[240px] overflow-hidden">
                  <img
                    src={
                      getImageUrl(
                        property?.images?.[0]?.directus_files_id?.id,
                        {
                          format: "webp",
                          quality: 80,
                          fit: "cover",
                        }
                      ) || "/placeholder-image.png"
                    }
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => toggleFavorite(property.id)}
                  className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center"
                >
                  <Heart
                    className={`${
                      favorites.includes(property.id)
                        ? "fill-[#bd9574] text-[#bd9574]"
                        : "text-white"
                    }`}
                    size={20}
                  />
                </button>
              </div>

              <div className="flex items-center text-[#bd9574] text-xs mb-1">
                <span>{property.type?.name || property.type?.slug || (property.type?.translations?.[0]?.name ?? "")}</span>
              </div>

              <h3 className="text-white text-xl font-light mb-1">
                {property?.name}
              </h3>

              <div className="text-[#e2dbcc] text-sm mb-1">
              {property.address_street}, {property.address_suburb}
              </div>

              <div className="text-[#656565] text-sm mb-3">
              {property.address_state}, {property.address_postcode}
              </div>

              <div className="text-[#bd9574] text-sm mb-4">
              {property?.is_display_price
                ? new Intl.NumberFormat("en-AU", {
                    style: "currency",
                    currency: "AUD",
                  }).format(property.price)
                : "Request for Price"}
              </div>

              <div className="flex items-center gap-3 text-[#e2dbcc] text-xs mb-4">
                <div className="flex items-center gap-1">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14M3 11h18M7 11V7m10 4V7"
                      stroke="#E2DBCC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{property.bedrooms}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12h16a1 1 0 011 1v2a4 4 0 01-4 4H7a4 4 0 01-4-4v-2a1 1 0 011-1zm4-9v5m4-2v2m4-4v7"
                      stroke="#E2DBCC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{property.bathrooms}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 17h14M5 17a2 2 0 01-2-2V9m2 8a2 2 0 002 2h10a2 2 0 002-2M5 17V7a2 2 0 012-2h10a2 2 0 012 2v10m0 0V9m0 0H3"
                      stroke="#E2DBCC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>{property.parking}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 21h18M9 8h1m5 0h1M9 16h1m5 0h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"
                      stroke="#E2DBCC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{property.livingRooms}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 21V8a2 2 0 012-2h12a2 2 0 012 2v13M2 10h20M10 2v6m4-6v6"
                      stroke="#E2DBCC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{property.area}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 15c0 1.1.9 2 2 2h12a2 2 0 002-2v-2H4v2zm18-7H2v3h20V8zm-9-4h-2v2h2V4z"
                      stroke="#E2DBCC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{property.guests}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 border border-[#656565]/20 py-2 text-[#bd9574] text-sm hover:bg-[#1A1814] transition-colors">
                  <MapPin size={16} className="text-[#bd9574]" />
                  <span>See map</span>
                </button>
                <button className="flex items-center justify-center gap-2 border border-[#656565]/20 py-2 text-[#bd9574] text-sm hover:bg-[#1A1814] transition-colors">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 11a4 4 0 100-8 4 4 0 000 8zM6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"
                      stroke="#BD9574"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Agent</span>
                </button>
              </div>
            </div>
          </Link>
          ))}
        </div>
      </div>

      {/* Explore City Section */}
      <ExploreCity />

      {/* Off-Market Properties Section */}
      <OffMarket />

      <Footer />
    </main>
  );
}
