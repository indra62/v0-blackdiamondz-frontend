"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart } from "lucide-react"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getImageUrl } from "@/lib/api"
import { useEffect } from "react"

// Add this CSS class for the scrollbar
const scrollbarHideStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400", "500"] })

export default function TeamDetail({ member, agentProperties }) {
  const [language, setLanguage] = useState("en")

  const translation =
    member?.translations?.find((t) => t.languages_code === language) ||
    member?.translations?.[0]

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language")
      if (storedLanguage) {
        setLanguage(storedLanguage)
      }
    }
  }, [])

  // Default member data if none is provided
  const defaultMember = {
    id: 1,
    name: "Sarah Mcainne",
    tagline: "Solutions driven. High-energy. Composed.",
    phone: "+61-0-8382-4097",
    email: "sarahmcainne@blackdiamondz.com.au",
    image: "/placeholder.svg?key=sarah-mcainne&text=Sarah+Mcainne",
    bio: [
      "Meet Sarah!",
      "Sarah is a determined sales agent, with more than 17 years of experience in real estate. She specialises in selling premium properties on the Lower North Shore.",
      'The thrill of the negotiation is what drives me to get the best possible price for my clients," Sarah says.',
      "She understands the importance of first impressions, which is why she places emphasis on collaborating with clients to ensure a property is beautifully presented for photography and open homes.",
      "Having bought, sold, renovated, and developed many of her own properties, Sarah Mcainne has gained valuable insight into the client experience. This enables her to better meet their needs.",
      "Sarah advertises properties using dynamic, strategic plans, adapting her approach to changing market situations.",
    ],
    stats: {
      averageSalePrice: "$ 925,000",
      averageDaysOnMarket: "17",
      careerRecordSale: "$ 15,250,000",
    },
    currentListings: [
      {
        id: 1,
        type: "House",
        location: "Beachfront",
        name: "Anandes Hotel",
        address: "5408/101 Middle Street",
        city: "Sydney",
        postcode: "2000",
        price: "730,000",
        image: "/images/anandes-hotel.png",
        features: {
          bedrooms: 3,
          bathrooms: 2,
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
        price: "730,000",
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
        price: "730,000",
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
    ],
    recentSales: [
      {
        id: 4,
        type: "Villa",
        location: "Mountain View",
        name: "Sunrise Retreat",
        address: "1254/78 Serenity Way",
        city: "Brisbane",
        postcode: "4000",
        price: "730,000",
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
        id: 5,
        type: "Penthouse",
        location: "Ocean View",
        name: "Azure Heights",
        address: "601/15 Waterfront Avenue",
        city: "Gold Coast",
        postcode: "4217",
        price: "730,000",
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
      {
        id: 6,
        type: "House",
        location: "Beachfront",
        name: "Anandes Hotel",
        address: "5408/101 Middle Street",
        city: "Sydney",
        postcode: "2000",
        price: "730,000",
        image: "/images/anandes-hotel.png",
        features: {
          bedrooms: 3,
          bathrooms: 2,
          parking: 1,
          floors: 6,
          rooms: 8,
          additional: 2,
        },
      },
    ],
    testimonials: [
      {
        id: 1,
        text: "Sarah Mcainne made selling our house a smooth and pleasant experience. She knew exactly what to do at every step of the process and gave us excellent guidance along the way. We could not have been happier working with her! She remained confident when we encountered challenges and always kept us on target. I would highly recommend Sarah to anyone selling or buying a house. They are the ultimate professionals!",
        author: "Adam Chen",
        address: "5408/101 Bathurst Street, Sydney, 2000.",
      },
      {
        id: 2,
        text: "Working with Sarah was an absolute pleasure. Her knowledge of the market and negotiation skills are unmatched. She helped us secure our dream home in a competitive market and we couldn't be happier with the result.",
        author: "Jessica Wong",
        address: "42 Harbour View Road, Sydney, 2000.",
      },
    ],
  }

  // Use provided member data or default
  const agentData = defaultMember

  // State for testimonial carousel
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)

  // Navigation functions for testimonial carousel
  const goToPrevTestimonial = () => {
    setCurrentTestimonialIndex((prev) =>
      prev > 0 ? prev - 1 : agentData.testimonials.length - 1
    )
  }

  const goToNextTestimonial = () => {
    setCurrentTestimonialIndex((prev) =>
      prev < agentData.testimonials.length - 1 ? prev + 1 : 0
    )
  }

  const goToTestimonial = (index) => {
    if (index >= 0 && index < agentData.testimonials.length) {
      setCurrentTestimonialIndex(index)
    }
  }

  // Current testimonial
  const currentTestimonial = agentData.testimonials[currentTestimonialIndex]

  return (
    <>
      <style jsx global>
        {scrollbarHideStyles}
      </style>
      <main className="bg-[#211f17] text-white">
        {/* Main Layout Structure */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row">
            {/* Left Column - Agent Info */}
            <div className="w-full md:w-1/3 pr-0 md:pr-8">
              <h1
                className={`${taviraj.className} text-[#BD9574] text-[48px] font-light leading-[120%] mb-2`}
              >
                {member?.first_name + " " + member?.last_name}
              </h1>
              <p
                className={`${archivo.className} text-[#E2DBCC] font-light text-[16px] leading-[150%] mb-8`}
              >
                {member?.tagline}
                {member?.translations?.[0]?.tagline}
              </p>

              {/* Contact Buttons */}
              <div className="space-y-0 mb-8">
                <button className="w-full border border-[#BD9574] py-4 px-4 flex items-center gap-4 text-[#BD9574] hover:bg-[#2c2920] transition-colors">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      stroke="#BD9574"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className={`${archivo.className} font-light text-base`}>
                    Book Appraisal for Sale
                  </span>
                </button>

                <a
                  href={`tel:${member?.contact_phone}`}
                  className="w-full border border-t-0 border-[#BD9574] py-4 px-4 flex items-center gap-4 text-[#BD9574] hover:bg-[#2c2920] transition-colors"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                      stroke="#BD9574"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className={`${archivo.className} font-light text-base`}>
                    {member?.contact_phone}
                  </span>
                </a>

                <a
                  href={`mailto:${member?.contact_email}`}
                  className="w-full border border-t-0 border-[#BD9574] py-4 px-4 flex items-center gap-4 text-[#BD9574] hover:bg-[#2c2920] transition-colors"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                      stroke="#BD9574"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 6l-10 7L2 6"
                      stroke="#BD9574"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className={`${archivo.className} font-light text-base`}>
                    {member?.contact_email}
                  </span>
                </a>
              </div>

              {/* Bio */}
              <div className="space-y-4">
                <div
                  className={`${archivo.className} text-[#E2DBCC] font-light text-base leading-relaxed`}
                  dangerouslySetInnerHTML={{ __html: translation?.bio || "" }}
                />
              </div>

              {/* Stats */}
              <div className="mt-8 space-y-0">
                <div className="flex justify-between items-center py-4 border-t border-[#656565]/30">
                  <span
                    className={`${archivo.className} text-[#E2DBCC] font-light text-[16px] leading-[150%]`}
                  >
                    Average sale price
                  </span>
                  <span
                    className={`${taviraj.className} text-[#BD9574] text-[32px] font-normal leading-[120%]`}
                  >
                    $ 925,000
                  </span>
                </div>
                <div className="flex justify-between items-center py-4 border-t border-[#656565]/30">
                  <span
                    className={`${archivo.className} text-[#E2DBCC] font-light text-[16px] leading-[150%]`}
                  >
                    Average days on market
                  </span>
                  <span
                    className={`${taviraj.className} text-[#BD9574] text-[32px] font-normal leading-[120%]`}
                  >
                    17
                  </span>
                </div>
                <div className="flex justify-between items-center py-4 border-t border-b border-[#656565]/30">
                  <span
                    className={`${archivo.className} text-[#E2DBCC] font-light text-[16px] leading-[150%]`}
                  >
                    Career Record sale
                  </span>
                  <span
                    className={`${taviraj.className} text-[#BD9574] text-[32px] font-normal leading-[120%]`}
                  >
                    $ 15,250,000
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Agent Photo and Current Listings */}
            <div className="w-full md:w-2/3">
              {/* Agent Photo and Quote */}
              <div className="relative w-full h-[480px] bg-black">
                {/* Image Container */}
                <div className=" absolute left-24 w-[70%] ">
                  <Image
                    src={getImageUrl(member?.avatar, {
                      format: "webp",
                      quality: 100,
                      fit: "cover",
                    })}
                    alt={member?.first_name + " " + member?.last_name}
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>

                {/* Text Overlay - Positioned in the middle-right area */}
                <div className="absolute top-1/2 right-24 transform -translate-y-1/2 max-w-[400px] bg-black/70 p-6">
                  <p
                    className={`${archivo.className} text-[#E2DBCC] font-light text-[16px] leading-[150%]`}
                  >
                    "Black Diamondz' hand-picked team provides homeowners with
                    specialist support throughout the sale process. Our aim is
                    to help clients make informed decisions about the sale of
                    their home, and to enable transparent and open
                    communication."
                  </p>
                </div>
              </div>

              {/* Current Listings Section */}
              <div className="py-11 overflow-hidden">
                <div className="flex items-center justify-center mb-8">
                  <div className="h-[1px] bg-[#656565]/30 flex-grow"></div>
                  <h2
                    className={`${taviraj.className} text-[#E2DBCC] text-[24px] font-normal leading-[120%] px-6`}
                  >
                    Current Listings (8)
                  </h2>
                  <div className="h-[1px] bg-[#656565]/30 flex-grow"></div>
                </div>

                <div className="flex space-x-6 pb-4 overflow-x-auto scrollbar-hide">
                  {agentData.currentListings.map((property) => (
                    <div
                      key={property.id}
                      className="bg-[#211f17] overflow-hidden min-w-[350px] flex-shrink-0"
                    >
                      {/* Image Container */}
                      <div className="relative h-[240px] overflow-hidden">
                        <Image
                          src={property.image || "/placeholder.svg"}
                          alt={property.name}
                          fill
                          className="object-cover"
                        />
                        <button className="absolute top-4 right-4 text-white hover:text-[#BD9574] transition-colors">
                          <Heart className="w-6 h-6" />
                        </button>
                      </div>

                      {/* Property Type and Location */}
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div
                            className={`${archivo.className} text-[#BD9574] font-light text-[14px] leading-[150%]`}
                          >
                            {property.type} | {property.location}
                          </div>
                        </div>

                        {/* Property Name */}
                        <h3
                          className={`${taviraj.className} text-[#E2DBCC] text-[28px] font-light leading-[120%] mb-2`}
                        >
                          {property.name}
                        </h3>

                        {/* Address */}
                        <div
                          className={`${archivo.className} text-[#E2DBCC] font-light text-[16px] leading-[150%] mb-1`}
                        >
                          {property.address}
                        </div>
                        <div
                          className={`${archivo.className} text-[#E2DBCC] font-light text-[16px] leading-[150%] mb-4`}
                        >
                          {property.city}, {property.postcode}
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                          <span
                            className={`${archivo.className} text-[#E2DBCC] font-light text-[16px] leading-[150%]`}
                          >
                            Auction:
                          </span>{" "}
                          <span
                            className={`${archivo.className} text-[#BD9574] font-medium text-[16px] leading-[150%]`}
                          >
                            $ {property.price}
                          </span>
                        </div>

                        {/* Property Features */}
                        <div className="flex flex-wrap items-center gap-6 mb-6">
                          <div className="flex items-center gap-1 text-[#BD9574]">
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
                              <path
                                d="M3 12H21"
                                stroke="#BD9574"
                                strokeWidth="1.5"
                              />
                            </svg>
                            <span
                              className={`${archivo.className} font-light text-[14px]`}
                            >
                              {property.features.bedrooms}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[#BD9574]">
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
                              {property.features.bathrooms}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[#BD9574]">
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
                              {property.features.parking}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[#BD9574]">
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
                              {property.features.floors}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[#BD9574]">
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
                              <path
                                d="M3 9H21"
                                stroke="#BD9574"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M9 21L9 9"
                                stroke="#BD9574"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M15 21V9"
                                stroke="#BD9574"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M3 15H21"
                                stroke="#BD9574"
                                strokeWidth="1.5"
                              />
                            </svg>
                            <span
                              className={`${archivo.className} font-light text-[14px]`}
                            >
                              {property.features.rooms}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[#BD9574]">
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
                              {property.features.additional}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-0">
                          <button className="py-4 flex items-center justify-center gap-2 text-[#BD9574] border-t border-r border-[#656565]/20 hover:bg-[#1A1814] transition-colors">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                                stroke="#BD9574"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z"
                                stroke="#BD9574"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span
                              className={`${archivo.className} font-light text-[16px]`}
                            >
                              See map
                            </span>
                          </button>
                          <button className="py-4 flex items-center justify-center gap-2 text-[#BD9574] border-t border-[#656565]/20 hover:bg-[#1A1814] transition-colors">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
                                stroke="#BD9574"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                                stroke="#BD9574"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span
                              className={`${archivo.className} font-light text-[16px]`}
                            >
                              Agent
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Sales Section */}
              <div className="mb-12 overflow-hidden">
                <div className="flex items-center justify-center mb-8">
                  <div className="h-[1px] bg-[#656565]/30 flex-grow"></div>
                  <h2
                    className={`${taviraj.className} text-[#E2DBCC] text-[24px] font-normal leading-[120%] px-6`}
                  >
                    Recent Sales (8)
                  </h2>
                  <div className="h-[1px] bg-[#656565]/30 flex-grow"></div>
                </div>

                <div className="flex space-x-6 pb-4 overflow-x-auto scrollbar-hide">
                  {agentData.recentSales.map((property) => (
                    <div
                      key={property.id}
                      className="bg-[#211f17] overflow-hidden min-w-[350px] flex-shrink-0"
                    >
                      {/* Image Container */}
                      <div className="relative h-[240px] overflow-hidden">
                        <Image
                          src={property.image || "/placeholder.svg"}
                          alt={property.name}
                          fill
                          className="object-cover"
                        />
                        <button className="absolute top-4 right-4 text-white hover:text-[#BD9574] transition-colors">
                          <Heart className="w-6 h-6" />
                        </button>
                      </div>

                      {/* Property Type and Location */}
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div
                            className={`${archivo.className} text-[#BD9574] font-light text-[14px] leading-[150%]`}
                          >
                            {property.type} | {property.location}
                          </div>
                        </div>

                        {/* Property Name */}
                        <h3
                          className={`${taviraj.className} text-[#E2DBCC] text-[28px] font-light leading-[120%] mb-2`}
                        >
                          {property.name}
                        </h3>

                        {/* Address */}
                        <div
                          className={`${archivo.className} text-[#E2DBCC] font-light text-[16px] leading-[150%] mb-1`}
                        >
                          {property.address}
                        </div>
                        <div
                          className={`${archivo.className} text-[#E2DBCC] font-light text-[16px] leading-[150%] mb-4`}
                        >
                          {property.city}, {property.postcode}
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                          <span
                            className={`${archivo.className} text-[#E2DBCC] font-light text-[16px] leading-[150%]`}
                          >
                            Auction:
                          </span>{" "}
                          <span
                            className={`${archivo.className} text-[#BD9574] font-medium text-[16px] leading-[150%]`}
                          >
                            $ {property.price}
                          </span>
                        </div>

                        {/* Property Features */}
                        <div className="flex flex-wrap items-center gap-6 mb-6">
                          <div className="flex items-center gap-1 text-[#BD9574]">
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
                              <path
                                d="M3 12H21"
                                stroke="#BD9574"
                                strokeWidth="1.5"
                              />
                            </svg>
                            <span
                              className={`${archivo.className} font-light text-[14px]`}
                            >
                              {property.features.bedrooms}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[#BD9574]">
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
                              {property.features.bathrooms}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[#BD9574]">
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
                              {property.features.parking}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[#BD9574]">
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
                              {property.features.floors}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[#BD9574]">
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
                              <path
                                d="M3 9H21"
                                stroke="#BD9574"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M9 21L9 9"
                                stroke="#BD9574"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M15 21V9"
                                stroke="#BD9574"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M3 15H21"
                                stroke="#BD9574"
                                strokeWidth="1.5"
                              />
                            </svg>
                            <span
                              className={`${archivo.className} font-light text-[14px]`}
                            >
                              {property.features.rooms}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[#BD9574]">
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
                              {property.features.additional}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-0">
                          <button className="py-4 flex items-center justify-center gap-2 text-[#BD9574] border-t border-r border-[#656565]/20 hover:bg-[#1A1814] transition-colors">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                                stroke="#BD9574"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z"
                                stroke="#BD9574"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span
                              className={`${archivo.className} font-light text-[16px]`}
                            >
                              See map
                            </span>
                          </button>
                          <button className="py-4 flex items-center justify-center gap-2 text-[#BD9574] border-t border-[#656565]/20 hover:bg-[#1A1814] transition-colors">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
                                stroke="#BD9574"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                                stroke="#BD9574"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span
                              className={`${archivo.className} font-light text-[16px]`}
                            >
                              Agent
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial Section */}
              <div>
                <div className="flex items-center justify-center mb-8">
                  <div className="h-[1px] bg-[#656565]/30 flex-grow"></div>
                  <h2
                    className={`${taviraj.className} text-[#E2DBCC] text-[24px] font-normal leading-[120%] px-6`}
                  >
                    Testimonial
                  </h2>
                  <div className="h-[1px] bg-[#656565]/30 flex-grow"></div>
                </div>

                <div className="relative">
                  {/* Testimonial Content */}
                  <div className="text-center mb-8">
                    <p
                      className={`${archivo.className} text-[#E2DBCC] font-light text-[16px] leading-[150%] mb-8 max-w-3xl mx-auto`}
                    >
                      {currentTestimonial.text}
                    </p>
                    <h3
                      className={`${taviraj.className} text-[#BD9574] text-[20px] font-normal leading-[120%] mb-2`}
                    >
                      {currentTestimonial.author}
                    </h3>
                    <p
                      className={`${archivo.className} text-[#BD9574] font-light text-[14px] leading-[150%]`}
                    >
                      {currentTestimonial.address}
                    </p>
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex justify-center items-center gap-4 mb-4">
                    <button
                      onClick={goToPrevTestimonial}
                      className="w-10 h-10 flex items-center justify-center text-[#E2DBCC] hover:text-[#BD9574] transition-colors"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15 19l-7-7 7-7"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <div className="flex gap-2">
                      {agentData.testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToTestimonial(index)}
                          className={`w-2 h-2 rounded-full ${
                            currentTestimonialIndex === index
                              ? "bg-[#BD9574]"
                              : "bg-[#656565]"
                          } transition-colors hover:bg-[#BD9574]/80`}
                          aria-label={`Go to testimonial ${index + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={goToNextTestimonial}
                      className="w-10 h-10 flex items-center justify-center text-[#E2DBCC] hover:text-[#BD9574] transition-colors"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 5l7 7-7 7"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
