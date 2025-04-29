import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"
import Image from "next/image"
import { Heart } from "lucide-react"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"] })

const properties = [
  {
    id: 1,
    type: "House",
    location: "Beachfront",
    name: "Anandes Hotel",
    address: "5408/101 Middle Street",
    city: "Sydney",
    postcode: "2000",
    price: "730.000",
    image: "/images/anandes-hotel.png",
    features: {
      bedrooms: 3,
      bathrooms: 5,
      parking: 1,
      floors: 6,
      rooms: 8,
      additional: 2,
    },
  },
  {
    id: 2,
    type: "Apartment",
    location: "City View",
    name: "Pacific Plaza",
    address: "2309/45 Business Avenue",
    city: "Melbourne",
    postcode: "3000",
    price: "730.000",
    image: "/images/pacific-plaza.png",
    features: {
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      floors: 4,
      rooms: 3,
      additional: 1,
    },
  },
  {
    id: 3,
    type: "Villa",
    location: "Mountain View",
    name: "Sunrise Retreat",
    address: "1254/78 Serenity Way",
    city: "Brisbane",
    postcode: "4000",
    price: "730.000",
    image: "/images/sunrise-retreat.png",
    features: {
      bedrooms: 4,
      bathrooms: 3,
      parking: 2,
      floors: 5,
      rooms: 6,
      additional: 3,
    },
  },
  {
    id: 4,
    type: "Penthouse",
    location: "Ocean View",
    name: "Azure Heights",
    address: "601/15 Waterfront Avenue",
    city: "Gold Coast",
    postcode: "4217",
    price: "730.000",
    image: "/images/azure-heights.png",
    features: {
      bedrooms: 5,
      bathrooms: 4,
      parking: 3,
      floors: 7,
      rooms: 9,
      additional: 4,
    },
  },
]

export default function OffMarket() {
  return (
    <div className={`bg-[#211f17] text-white py-16`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={`${taviraj.className} text-[#E8D09A] text-[48px] font-light leading-[60px] tracking-[2px] mb-8`}
          >
            Off-Market Properties
          </h2>

          {/* Diamond Separator */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-24 h-[1px] bg-[#BD9574]"></div>
            <div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
            <div className="w-24 h-[1px] bg-[#BD9574]"></div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-[#211f17] overflow-hidden">
              {/* Image Container */}
              <div className="relative h-[240px] mb-4 overflow-hidden">
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-700 hover:scale-110"
                />
              </div>

              {/* Property Type and Location with Heart Icon */}
              <div className="flex justify-between items-center mb-2">
                <div className={`${archivo.className} text-[#E2DBCC] font-light text-[16px] leading-[150%]`}>
                  {property.type} | {property.location}
                </div>
                <button className="text-[#656565] hover:text-[#BD9574] transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Property Name */}
              <h3 className={`${taviraj.className} text-[#E8D09A] text-[32px] font-light leading-[40px] mb-2`}>
                {property.name}
              </h3>

              {/* Address */}
              <div className={`${archivo.className} text-[#E2DBCC] font-light text-[16px] leading-[150%] mb-1`}>
                {property.address}
              </div>
              <div className={`${archivo.className} text-[#E2DBCC] font-light text-[16px] leading-[150%] mb-4`}>
                {property.city}, {property.postcode}
              </div>

              {/* Price */}
              <div className={`${archivo.className} text-[#BD9574] font-light text-[16px] leading-[150%] mb-6`}>
                Auction: $ {property.price}
              </div>

              {/* Property Features */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-[#E2DBCC]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14M3 11h18M7 11V7m10 4V7"
                      stroke="#E2DBCC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className={`${archivo.className} font-light text-[14px]`}>{property.features.bedrooms}</span>
                </div>
                <div className="flex items-center gap-1 text-[#E2DBCC]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 12h16a1 1 0 011 1v2a4 4 0 01-4 4H7a4 4 0 01-4-4v-2a1 1 0 011-1zm4-9v5m4-2v2m4-4v7"
                      stroke="#E2DBCC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className={`${archivo.className} font-light text-[14px]`}>{property.features.bathrooms}</span>
                </div>
                <div className="flex items-center gap-1 text-[#E2DBCC]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 17h14M5 17a2 2 0 01-2-2V9m2 8a2 2 0 002 2h10a2 2 0 002-2M5 17V7a2 2 0 012-2h10a2 2 0 012 2v10m0 0V9m0 0H3"
                      stroke="#E2DBCC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className={`${archivo.className} font-light text-[14px]`}>{property.features.parking}</span>
                </div>
                <div className="flex items-center gap-1 text-[#E2DBCC]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3 21h18M9 8h1m5 0h1M9 16h1m5 0h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"
                      stroke="#E2DBCC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className={`${archivo.className} font-light text-[14px]`}>{property.features.floors}</span>
                </div>
                <div className="flex items-center gap-1 text-[#E2DBCC]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 21V8a2 2 0 012-2h12a2 2 0 012 2v13M2 10h20M10 2v6m4-6v6"
                      stroke="#E2DBCC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className={`${archivo.className} font-light text-[14px]`}>{property.features.rooms}</span>
                </div>
                <div className="flex items-center gap-1 text-[#E2DBCC]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 15c0 1.1.9 2 2 2h12a2 2 0 002-2v-2H4v2zm18-7H2v3h20V8zm-9-4h-2v2h2V4z"
                      stroke="#E2DBCC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className={`${archivo.className} font-light text-[14px]`}>{property.features.additional}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-0">
                <button className="py-4 flex items-center justify-center gap-2 text-[#BD9574] border border-r-0 border-[#656565]/20 hover:bg-[#1A1814] transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                  <span className={`${archivo.className} font-light text-[16px]`}>See map</span>
                </button>
                <button className="py-4 flex items-center justify-center gap-2 text-[#BD9574] border border-[#656565]/20 hover:bg-[#1A1814] transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 11a4 4 0 100-8 4 4 0 000 8zM6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"
                      stroke="#BD9574"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className={`${archivo.className} font-light text-[16px]`}>Agent</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
