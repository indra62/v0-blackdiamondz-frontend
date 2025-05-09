import Image from "next/image";

import { Heart } from "lucide-react";
import { LocationIcon } from "./icons/LocationIcon";
import { AgentIcon } from "./icons/AgentIcon";

import { Taviraj } from "next/font/google";
import { Archivo } from "next/font/google";
import { getImageUrl } from "@/lib/api";

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400"] });
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400", "500"] });

export default function TeamListing({ agentProperties, status }) {
  const currentListings =
    agentProperties?.filter(
      (property) => property.property_id?.status === status
    ) || [];

  return (
    <div className="py-11 overflow-hidden">
      <div className="flex items-center justify-center mb-8">
        <div className="h-[1px] bg-[#656565]/30 flex-grow"></div>
        <h2
          className={`${archivo.className} text-[#E2DBCC] text-[20px] font-normal leading-[120%] px-6`}
        >
          {status === "Current"
            ? `Current Listings (${currentListings.length})`
            : `Recent Sales (${currentListings.length})`}
        </h2>
        <div className="h-[1px] bg-[#656565]/30 flex-grow"></div>
      </div>

      <div className="flex space-x-6 pb-4 overflow-x-auto scrollbar-hide">
        {currentListings.map((property) => {
          const p = property.property_id;
          const features = {};
          const featureMap = {
            1: "bedrooms",
            2: "bathrooms",
            3: "parking",
            4: "floors",
            5: "rooms",
            20: "additional",
          };
          if (p.features && Array.isArray(p.features)) {
            p.features.forEach((f) => {
              const key = featureMap[f.feature_id];
              if (key) features[key] = f.value;
            });
          }
          const mainImage =
            p.images &&
            Array.isArray(p.images) &&
            p.images.length > 0 &&
            p.images[0] &&
            p.images[0].directus_files_id
              ? getImageUrl(p.images[0].directus_files_id, {
                  format: "webp",
                  quality: 100,
                  fit: "contain",
                })
              : "/placeholder.svg";
          return (
            <div
              key={p.id}
              className="bg-[#211f17] overflow-hidden min-w-[320px] flex-shrink-0"
            >
              {/* Image Container */}
              <div className="relative h-[240px] w-[350px] mx-auto overflow-hidden ">
                <Image
                  src={mainImage}
                  alt={p.name}
                  fill
                  className="object-cover"
                />
                <button className="absolute top-4 right-4 text-white hover:text-[#BD9574] transition-colors">
                  <Heart className="w-6 h-6" />
                </button>
              </div>

              {/* Property Type and Location */}
              <div className="p-4 w-[350px] mx-auto">
                <div className="flex justify-between items-center mb-2">
                  <div
                    className={`${archivo.className} text-[#BD9574] font-light text-[14px] leading-[150%]`}
                  >
                    {p.type?.slug || ""} | {p.address_suburb}, {p.address_state}
                  </div>
                </div>

                {/* Property Name */}
                <h3
                  className={`${taviraj.className} text-[#E2DBCC] text-[28px] font-light leading-[120%] mb-2`}
                >
                  {p.name}
                </h3>

                {/* Address */}
                <div
                  className={`${archivo.className} text-[#E2DBCC] font-light text-[16px] leading-[150%] mb-1`}
                >
                  {p.address_street}
                </div>
                <div
                  className={`${archivo.className} text-[#E2DBCC] font-light text-[16px] leading-[150%] mb-4`}
                >
                  {p.address_suburb}, {p.address_postcode}
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span
                    className={`${archivo.className} text-[#E2DBCC] font-light text-[16px] leading-[150%]`}
                  >
                    Price:
                  </span>{" "}
                  <span
                    className={`${archivo.className} text-[#BD9574] font-medium text-[16px] leading-[150%]`}
                  >
                    {p.price
                      ? p.price.toLocaleString("en-AU", {
                          style: "currency",
                          currency: "AUD",
                          maximumFractionDigits: 0,
                        })
                      : "Price on request"}
                  </span>
                </div>

                {/* Property Features */}
                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <div className="flex items-center gap-1 text-[#BD9574]">
                    {/* Bedrooms Icon */}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 22V8L12 2L21 8V22H3Z"
                        stroke="#BD9574"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 22V16H15V22"
                        stroke="#BD9574"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <path d="M3 12H21" stroke="#BD9574" strokeWidth="1.5" />
                    </svg>
                    <span
                      className={`${archivo.className} font-light text-[14px]`}
                    >
                      {features.bedrooms}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#BD9574]">
                    {/* Bathrooms Icon */}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 12H20C20.5523 12 21 12.4477 21 13V20H3V13C3 12.4477 3.44772 12 4 12Z"
                        stroke="#BD9574"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M6 12V5C6 4.44772 6.44772 4 7 4H17C17.5523 4 18 4.44772 18 5V12"
                        stroke="#BD9574"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M4 20V22"
                        stroke="#BD9574"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M20 20V22"
                        stroke="#BD9574"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M7 8H10"
                        stroke="#BD9574"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M7 10H10"
                        stroke="#BD9574"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span
                      className={`${archivo.className} font-light text-[14px]`}
                    >
                      {features.bathrooms}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#BD9574]">
                    {/* Parking Icon */}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 10H19L17 18H7L5 10Z"
                        stroke="#BD9574"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 6H15L16 10H8L9 6Z"
                        stroke="#BD9574"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="8"
                        cy="20"
                        r="1"
                        stroke="#BD9574"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="16"
                        cy="20"
                        r="1"
                        stroke="#BD9574"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <span
                      className={`${archivo.className} font-light text-[14px]`}
                    >
                      {features.parking}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#BD9574]">
                    {/* Floors Icon */}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 22H21"
                        stroke="#BD9574"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M6 18V11"
                        stroke="#BD9574"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M18 18V11"
                        stroke="#BD9574"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M6 7V2H18V7"
                        stroke="#BD9574"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 7H21V11H3V7Z"
                        stroke="#BD9574"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 18H21V22H3V18Z"
                        stroke="#BD9574"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 11H21V18H3V11Z"
                        stroke="#BD9574"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      className={`${archivo.className} font-light text-[14px]`}
                    >
                      {features.floors}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#BD9574]">
                    {/* Rooms Icon */}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        stroke="#BD9574"
                        strokeWidth="1.5"
                      />
                      <path d="M3 9H21" stroke="#BD9574" strokeWidth="1.5" />
                      <path d="M9 21L9 9" stroke="#BD9574" strokeWidth="1.5" />
                      <path d="M15 21V9" stroke="#BD9574" strokeWidth="1.5" />
                      <path d="M3 15H21" stroke="#BD9574" strokeWidth="1.5" />
                    </svg>
                    <span
                      className={`${archivo.className} font-light text-[14px]`}
                    >
                      {features.rooms}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#BD9574]">
                    {/* Additional Icon */}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="#BD9574"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M12 6V12L16 14"
                        stroke="#BD9574"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      className={`${archivo.className} font-light text-[14px]`}
                    >
                      {features.additional}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-0">
                  <button className="py-3 flex items-center justify-center gap-2 text-[#BD9574] border border-[#656565] hover:border-[#BD9574] hover:text-[#e5c04b] transition-colors">
                    <LocationIcon width="22" height="22" />
                    <span
                      className={`${archivo.className} font-light text-[16px]`}
                    >
                      See map
                    </span>
                  </button>
                  <button className="py-3 flex items-center justify-center gap-2 text-[#BD9574] border border-[#656565] hover:border-[#BD9574] hover:text-[#e5c04b] transition-colors">
                    <AgentIcon width="22" height="22" />
                    <span
                      className={`${archivo.className} font-light text-[16px]`}
                    >
                      Agent
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
