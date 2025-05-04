/**
 * Paddington Stats Component
 *
 * Displays real estate statistics for the Paddington area.
 * Organized in a responsive grid with icons and values.
 *
 * @component
 */
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"] })

export default function Paddington() {
  return (
    <section className="py-16 border-t border-[#656565]/30">
      <div className="container mx-auto px-4">
        <h2
          className={`${taviraj.className} text-[#E2DBCC] text-[48px] font-light leading-[125%] tracking-[2px] text-center mb-8`}
        >
          Paddington Stats
        </h2>

        {/* Diamond Separator */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-24 h-[1px] bg-[#BD9574]"></div>
          <div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
          <div className="w-24 h-[1px] bg-[#BD9574]"></div>
        </div>

        <p
          className={`${archivo.className} text-[#E2DBCC] font-light text-base leading-[150%] tracking-[0px] max-w-2xl mx-auto text-center mb-16`}
        >
          On behalf of the Black Diamondz team we thank you for making the first step in looking for a preferred agency
          to secure the sale of your property asset.
        </p>

        {/* Stats Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Median Sale Price */}
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 3v18h18M3 17l5-5 4 4 8-8"
                  stroke="#BD9574"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              className={`${archivo.className} text-[#BD9574] font-light text-base leading-[150%] tracking-[0px] mb-2 text-center`}
            >
              Median Sale Price (12 mo)
            </div>
            <div
              className={`${taviraj.className} text-[#E2DBCC] text-[48px] font-normal leading-[120%] tracking-[0px] mb-2 text-center`}
            >
              $3.34M
            </div>
            <div
              className={`${archivo.className} text-[#BD9574] font-light text-[16px] leading-[150%] tracking-[0px] text-center`}
            >
              in January 2025
            </div>
          </div>

          {/* Annual Change */}
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 3a9 9 0 109 9 9 9 0 00-9-9zm0 16a7 7 0 117-7 7 7 0 01-7 7z"
                  stroke="#BD9574"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M12 7v5l3 3" stroke="#BD9574" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div
              className={`${archivo.className} text-[#BD9574] font-light text-base leading-[150%] tracking-[0px] mb-2 text-center`}
            >
              Annual Change in Median Price (5 yrs)
            </div>
            <div
              className={`${taviraj.className} text-[#E2DBCC] text-[48px] font-normal leading-[120%] tracking-[0px] mb-2 text-center`}
            >
              28.1%
            </div>
            <div
              className={`${archivo.className} text-[#BD9574] font-light text-[16px] leading-[150%] tracking-[0px] text-center`}
            >
              in January 2025
            </div>
          </div>

          {/* Properties Sold */}
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6a3 3 0 116 0v6"
                  stroke="#BD9574"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              className={`${archivo.className} text-[#BD9574] font-light text-base leading-[150%] tracking-[0px] mb-2 text-center`}
            >
              Properties Sold (12 mo)
            </div>
            <div
              className={`${taviraj.className} text-[#E2DBCC] text-[48px] font-normal leading-[120%] tracking-[0px] mb-2 text-center`}
            >
              234
            </div>
            <div
              className={`${archivo.className} text-[#BD9574] font-light text-[16px] leading-[150%] tracking-[0px] text-center`}
            >
              in November 2024
            </div>
          </div>
        </div>

        {/* Stats Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Median Days on Market */}
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                  stroke="#BD9574"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              className={`${archivo.className} text-[#BD9574] font-light text-base leading-[150%] tracking-[0px] mb-2 text-center`}
            >
              Median Days on Market (12 mo)
            </div>
            <div
              className={`${taviraj.className} text-[#E2DBCC] text-[48px] font-normal leading-[120%] tracking-[0px] mb-2 text-center`}
            >
              43
            </div>
            <div
              className={`${archivo.className} text-[#BD9574] font-light text-[16px] leading-[150%] tracking-[0px] text-center`}
            >
              in November 2024
            </div>
          </div>

          {/* Median Asking Rent */}
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 21h18M5 21V8l7-5 7 5v13M9 9h6M9 13h6M9 17h6"
                  stroke="#BD9574"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              className={`${archivo.className} text-[#BD9574] font-light text-base leading-[150%] tracking-[0px] mb-2 text-center`}
            >
              Median Asking Rent (12 mo)
            </div>
            <div
              className={`${taviraj.className} text-[#E2DBCC] text-[48px] font-normal leading-[120%] tracking-[0px] mb-2 text-center`}
            >
              $1350
            </div>
            <div
              className={`${archivo.className} text-[#BD9574] font-light text-[16px] leading-[150%] tracking-[0px] text-center`}
            >
              in January 2025
            </div>
          </div>

          {/* Avg. Hold Period */}
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 21a9 9 0 100-18 9 9 0 000 18z"
                  stroke="#BD9574"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M12 7v5l3 3" stroke="#BD9574" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div
              className={`${archivo.className} text-[#BD9574] font-light text-base leading-[150%] tracking-[0px] mb-2 text-center`}
            >
              Avg. Hold Period (12 mo)
            </div>
            <div
              className={`${taviraj.className} text-[#E2DBCC] text-[48px] font-normal leading-[120%] tracking-[0px] mb-2 text-center`}
            >
              12.2 yrs
            </div>
            <div
              className={`${archivo.className} text-[#BD9574] font-light text-[16px] leading-[150%] tracking-[0px] text-center`}
            >
              in November 2024
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
