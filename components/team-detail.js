"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart } from "lucide-react"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"
import Footer from "@/components/footer"
import { getImageUrl } from "@/lib/api"
import { useEffect } from "react"
import { AgentIcon } from "./icons/AgentIcon"
import { LocationIcon } from "./icons/LocationIcon"
import TeamListing from "./team-listing"

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

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })

export default function TeamDetail({
  member,
  agentStatistics,
  agentProperties,
  testimonials,
}) {
  const [language, setLanguage] = useState("en")

  const translation =
    member?.translations?.find((t) => t.languages_code === language) ||
    member?.translations?.[0]

  const testimonies = testimonials.map((testimony) => {
    const translation =
      testimony.translations?.find((t) => t.languages_code === language) ||
      testimony.translations?.[0]
    return {
      ...testimony,
      translatedData: translation,
    }
  })

  const translationStatistics =
    agentStatistics?.find((t) => t.languages_code === language) ||
    agentStatistics?.[0]

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language")
      if (storedLanguage) {
        setLanguage(storedLanguage)
      }
    }
  }, [])

  // State for testimonial carousel
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)

  // Navigation functions for testimonial carousel
  const goToPrevTestimonial = () => {
    setCurrentTestimonialIndex((prev) =>
      prev > 0 ? prev - 1 : testimonies.length - 1
    )
  }

  const goToNextTestimonial = () => {
    setCurrentTestimonialIndex((prev) =>
      prev < testimonies.length - 1 ? prev + 1 : 0
    )
  }

  const goToTestimonial = (index) => {
    if (index >= 0 && index < testimonies.length) {
      setCurrentTestimonialIndex(index)
    }
  }

  // Current testimonial
  const currentTestimonial = testimonies[currentTestimonialIndex]

  return (
    <>
      <style jsx global>
        {scrollbarHideStyles}
      </style>
      <main className="bg-[#211f17] text-white">
        {/* Main Layout Structure */}
        <div className=" mx-auto px-[40px] py-12">
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
                {member?.title}
              </p>

              {/* Contact Buttons */}
              <div className="space-y-0 mb-8">
                <button className="w-full border border-[#656565] py-4 px-4 flex items-center gap-4 text-[#BD9574] hover:bg-[#2c2920] transition-colors">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.2023 3H5.79846L2 7.793L10.9996 18.6381L20 7.793L16.2023 3ZM3.78181 7.81848L6.38278 4.52181H15.6164L18.2174 7.81936L10.9996 16.481L3.78181 7.81848Z"
                      fill="currentColor"
                    />
                    <path
                      d="M16.1702 18.4255H5.8296V20H16.1702V18.4255Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className={`${archivo.className} font-light text-base`}>
                    Book Appraisal for Sale
                  </span>
                </button>
                {member?.contact_phone && (
                  <a
                    href={`tel:${member?.contact_phone}`}
                    className="w-full border border-t-0 border-[#656565] py-4 px-4 flex items-center gap-4 text-[#BD9574] hover:bg-[#2c2920] transition-colors"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.375 2.83301C12.375 2.83301 14.514 3.02746 17.2364 5.74982C19.9587 8.47218 20.1532 10.6112 20.1532 10.6112"
                        stroke="currentColor"
                        strokeWidth="1.56"
                        strokeLinecap="round"
                      />
                      <path
                        d="M13.0234 6.07422C13.0234 6.07422 13.9309 6.3335 15.2921 7.69467C16.6533 9.05586 16.9126 9.96331 16.9126 9.96331"
                        stroke="currentColor"
                        strokeWidth="1.56"
                        strokeLinecap="round"
                      />
                      <path
                        d="M14.3408 15.2481L14.7584 14.8086L13.7614 13.8616L13.3439 14.3012L14.3408 15.2481ZM16.1322 14.6235L17.8835 15.6315L18.5694 14.4399L16.8181 13.4318L16.1322 14.6235ZM18.2214 17.7215L16.9192 19.0924L17.9162 20.0393L19.2184 18.6684L18.2214 17.7215ZM16.1357 19.5317C14.8203 19.6616 11.3881 19.5508 7.66259 15.6285L6.66564 16.5754C10.7259 20.8501 14.599 21.0651 16.2708 20.9001L16.1357 19.5317ZM7.66259 15.6285C4.10948 11.8877 3.51348 8.73231 3.43919 7.34831L2.06617 7.422C2.15715 9.11713 2.8769 12.5867 6.66564 16.5754L7.66259 15.6285ZM8.92332 9.5445L9.18622 9.26771L8.18928 8.32076L7.92637 8.59756L8.92332 9.5445ZM9.39275 5.82149L8.23688 4.18662L7.11415 4.98043L8.27006 6.61528L9.39275 5.82149ZM4.32455 3.83416L2.88575 5.34895L3.8827 6.29589L5.3215 4.78111L4.32455 3.83416ZM8.42484 9.07103C7.92637 8.59756 7.92573 8.59823 7.92509 8.5989C7.92487 8.59913 7.92423 8.59981 7.9238 8.60027C7.92293 8.60121 7.92204 8.60215 7.92114 8.60312C7.91933 8.60507 7.91747 8.60709 7.91554 8.60921C7.9117 8.61343 7.90762 8.61801 7.90333 8.62294C7.89476 8.6328 7.88534 8.64408 7.87526 8.65681C7.85511 8.68228 7.83232 8.71357 7.8084 8.75094C7.76045 8.82588 7.70844 8.92458 7.66439 9.04835C7.57483 9.30004 7.52603 9.63334 7.58702 10.0496C7.70683 10.8674 8.24268 11.9671 9.64272 13.4411L10.6397 12.4942C9.33106 11.1163 9.00868 10.2678 8.94749 9.85023C8.91797 9.64879 8.94796 9.54265 8.95983 9.50932C8.96649 9.49058 8.97085 9.48538 8.96658 9.49205C8.96452 9.49528 8.96039 9.50135 8.95346 9.51011C8.94999 9.51449 8.94582 9.51955 8.94083 9.52529C8.93834 9.52815 8.93563 9.53118 8.93273 9.53439C8.93127 9.536 8.92976 9.53764 8.92819 9.53932C8.92741 9.54017 8.92661 9.54102 8.9258 9.54188C8.9254 9.54231 8.92477 9.54297 8.92457 9.54318C8.92395 9.54384 8.92332 9.5445 8.42484 9.07103ZM9.64272 13.4411C11.0387 14.9108 12.093 15.4885 12.8973 15.6192C13.3101 15.6862 13.6442 15.6326 13.8972 15.5329C14.0209 15.4841 14.1187 15.4269 14.1921 15.3748C14.2288 15.3488 14.2593 15.3241 14.2839 15.3026C14.2963 15.2917 14.3071 15.2817 14.3165 15.2725C14.3213 15.268 14.3257 15.2636 14.3297 15.2596C14.3317 15.2575 14.3337 15.2555 14.3355 15.2536C14.3364 15.2527 14.3373 15.2518 14.3383 15.2509C14.3387 15.2504 14.3394 15.2497 14.3395 15.2495C14.3402 15.2487 14.3408 15.2481 13.8423 14.7746C13.3439 14.3012 13.3445 14.3005 13.3451 14.2999C13.3453 14.2996 13.346 14.299 13.3463 14.2985C13.3472 14.2977 13.348 14.2969 13.3488 14.2961C13.3505 14.2944 13.352 14.2928 13.3535 14.2912C13.3566 14.2882 13.3595 14.2852 13.3623 14.2826C13.3678 14.2773 13.3728 14.2727 13.3772 14.2688C13.3859 14.2611 13.3924 14.2562 13.3967 14.2532C13.4053 14.2471 13.4044 14.2492 13.3927 14.2538C13.375 14.2608 13.2917 14.2902 13.1178 14.262C12.7488 14.202 11.9525 13.8763 10.6397 12.4942L9.64272 13.4411ZM8.23688 4.18662C7.30775 2.87251 5.44855 2.6508 4.32455 3.83416L5.3215 4.78111C5.80077 4.27653 6.6445 4.31617 7.11415 4.98043L8.23688 4.18662ZM3.43919 7.34831C3.41955 6.98228 3.57893 6.61571 3.8827 6.29589L2.88575 5.34895C2.39456 5.86608 2.02122 6.58447 2.06617 7.422L3.43919 7.34831ZM16.9192 19.0924C16.6635 19.3617 16.3959 19.506 16.1357 19.5317L16.2708 20.9001C16.9556 20.8324 17.5098 20.4672 17.9162 20.0393L16.9192 19.0924ZM9.18622 9.26771C10.0732 8.33392 10.136 6.87259 9.39275 5.82149L8.27006 6.61528C8.65702 7.1626 8.59769 7.89078 8.18928 8.32076L9.18622 9.26771ZM17.8835 15.6315C18.6359 16.0647 18.7832 17.1301 18.2214 17.7215L19.2184 18.6684C20.4146 17.409 20.0662 15.3015 18.5694 14.4399L17.8835 15.6315ZM14.7584 14.8086C15.1116 14.4366 15.6622 14.353 16.1322 14.6235L16.8181 13.4318C15.8112 12.8522 14.5623 13.0184 13.7614 13.8616L14.7584 14.8086Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span
                      className={`${archivo.className} font-light text-base`}
                    >
                      {member?.contact_phone}
                    </span>
                  </a>
                )}
                {member?.contact_mobile && (
                  <a
                    href={`tel:${member?.contact_mobile}`}
                    className="w-full border border-t-0 border-[#656565] py-4 px-4 flex items-center gap-4 text-[#BD9574] hover:bg-[#2c2920] transition-colors"
                  >
                    <svg
                      width="22px"
                      height="22px"
                      viewBox="0 0 0.412 0.412"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.165 0.316h0.083m-0.151 0.083h0.22a0.028 0.028 0 0 0 0.028 -0.028v-0.33a0.028 0.028 0 0 0 -0.028 -0.028h-0.22a0.028 0.028 0 0 0 -0.028 0.028v0.33a0.028 0.028 0 0 0 0.028 0.028Z"
                        stroke="currentColor"
                        strokeWidth={0.0275}
                      />
                    </svg>
                    <span
                      className={`${archivo.className} font-light text-base`}
                    >
                      {member?.contact_mobile}
                    </span>
                  </a>
                )}

                <a
                  href={`mailto:${member?.contact_email}`}
                  className="w-full border border-t-0 border-[#656565] py-4 px-4 flex items-center gap-4 text-[#BD9574] hover:bg-[#2c2920] transition-colors"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6.83403L9.68333 11.0965C10.6611 11.8298 12.0055 11.8298 12.9833 11.0965L18.6667 6.83398"
                      stroke="currentColor"
                      strokeWidth="1.56"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.6667 5H4.83333C3.82081 5 3 5.82081 3 6.83333V16C3 17.0125 3.82081 17.8333 4.83333 17.8333H17.6667C18.6792 17.8333 19.5 17.0125 19.5 16V6.83333C19.5 5.82081 18.6792 5 17.6667 5Z"
                      stroke="currentColor"
                      strokeWidth="1.56"
                      strokeLinecap="round"
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
              {translationStatistics && (
                <div className="mt-8 space-y-0">
                  {translationStatistics?.statistics?.map((statistic, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-4 border-t border-[#656565] "
                    >
                      <span
                        className={`${archivo.className} text-[#E2DBCC] font-light text-[16px] leading-[150%]`}
                      >
                        {statistic?.title}
                      </span>
                      <span
                        className={`${taviraj.className} text-[#BD9574] text-[32px] font-normal leading-[120%]`}
                      >
                        {statistic?.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Agent Photo and Current Listings */}
            <div className="w-full md:w-2/3">
              {/* Agent Photo and Quote */}
              <div className="relative w-full h-[480px] bg-black overflow-hidden">
                {/* Image Container */}
                <div className=" relative w-[60%] top-10 h-full">
                  <Image
                    src={getImageUrl(member?.avatar?.id, {
                      format: "webp",
                      quality: 100,
                      fit: "contain",
                    })}
                    alt={member?.first_name + " " + member?.last_name}
                    fill
                    className="object-contain scale-125"
                    priority
                  />
                </div>

                {/* Text Overlay - Positioned in the middle-right area */}
                <div className="absolute bottom-4 md:top-1/2 right-8 transform md:-translate-y-1/2 max-w-[400px] p-6">
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
              <TeamListing agentProperties={agentProperties} status="Current" />
              <TeamListing agentProperties={agentProperties} status="Sold" />

              {/* Testimonial Section */}
              {testimonials.length > 0 && (
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
                        {currentTestimonial?.translatedData?.testimony}
                      </p>
                      <h3
                        className={`${taviraj.className} text-[#BD9574] text-[20px] font-normal leading-[120%] mb-2`}
                      >
                        {currentTestimonial?.name}
                      </h3>
                      <p
                        className={`${archivo.className} text-[#BD9574] font-light text-[14px] leading-[150%]`}
                      >
                        {currentTestimonial?.address}
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
                        {testimonies.map((_, index) => (
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
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
