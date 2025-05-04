import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { getImageUrl } from "@/lib/api"

export function Property({ property, taviraj, archivo }) {
  const findFeature = (feature) => {
    return property.features?.find((f) => f.feature_id?.slug === feature)
  }

  return (
    <>
      {/* Image Container */}
      <Link
        key={property.id}
        href={`/property/${property.id}`}
        className="block bg-[#211f17] overflow-hidden hover:opacity-95 transition-opacity"
      >
        <div className="relative h-[240px] mb-4 overflow-hidden">
          <Image
            src={getImageUrl(property?.images?.[0]?.directus_files_id?.id, {
              format: "webp",
              quality: 80,
              fit: "cover",
            })}
            alt={property.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            style={{ objectFit: "cover" }}
            className="transition-transform duration-700 hover:scale-110"
          />
        </div>

        {/* Property Type and Location with Heart Icon */}
        <div className="flex justify-between items-center mb-2">
          <div
            className={`${archivo.className} text-[#E2DBCC] font-light text-[16px] leading-[150%]`}
          >
            {property.type?.[0] || ""}
          </div>
          <button className="text-[#656565] hover:text-[#BD9574] transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {/* Property Name */}
        <h3
          className={`${taviraj.className} text-[#E8D09A] text-[32px] font-light leading-[40px] mb-2 line-clamp-3`}
          title={property.name}
        >
          {property.name}
        </h3>

        {/* Address */}
        <div
          className={`${archivo.className} text-[#E2DBCC] font-light text-[16px] leading-[150%] mb-1`}
        >
          {property.address_street}, {property.address_suburb}
        </div>
        <div
          className={`${archivo.className} text-[#E2DBCC] font-light text-[16px] leading-[150%] mb-4`}
        >
          {property.address_state}, {property.address_postcode}
        </div>

        {/* Price */}
        <div
          className={`${archivo.className} text-[#BD9574] font-light text-[16px] leading-[150%] mb-6`}
        >
          {property?.is_display_price
            ? new Intl.NumberFormat("en-AU", {
                style: "currency",
                currency: "AUD",
              }).format(property.price)
            : "Price on request"}
        </div>

        {/* Property Features */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-1 text-[#E2DBCC]">
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
            <span className={`${archivo.className} font-light text-[14px]`}>
              {findFeature("bedrooms")?.value}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#E2DBCC]">
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
            <span className={`${archivo.className} font-light text-[14px]`}>
              {findFeature("bathrooms")?.value}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#E2DBCC]">
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
            <span className={`${archivo.className} font-light text-[14px]`}>
              {findFeature("garages")?.value}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#E2DBCC]">
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
            <span className={`${archivo.className} font-light text-[14px]`}>
              {property.features.floors}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#E2DBCC]">
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
            <span className={`${archivo.className} font-light text-[14px]`}>
              {property.features.rooms}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#E2DBCC]">
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
            <span className={`${archivo.className} font-light text-[14px]`}>
              {property.features.additional}
            </span>
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-0">
        <button className="py-4 flex items-center justify-center gap-2 text-[#BD9574] border border-r-0 border-[#656565]/20 hover:bg-[#1A1814] transition-colors">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 20l-5.447-5.447a8 8 0 1113.894 0L12 20l-3-3z"
              stroke="#BD9574"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.5 11a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
              stroke="#BD9574"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={`${archivo.className} font-light text-[16px]`}>
            See map
          </span>
        </button>
        <button className="py-4 flex items-center justify-center gap-2 text-[#BD9574] border border-[#656565]/20 hover:bg-[#1A1814] transition-colors">
          <svg
            width="20"
            height="20"
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
          <span className={`${archivo.className} font-light text-[16px]`}>
            Agent
          </span>
        </button>
      </div>
    </>
  )
}
