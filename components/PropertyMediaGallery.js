"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Grid } from "lucide-react"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"] })

export default function PropertyMediaGallery({ isOpen, onClose, images }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!isOpen) return null

  const totalImages = images?.length || 0
  const currentImage = images?.[currentIndex]

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalImages - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalImages - 1 ? prev + 1 : 0))
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#211f17] overflow-hidden">
      {/* Property Info Overlay - Left Side */}
      <div className="absolute left-0 top-0 bottom-0 w-[500px] p-12 z-10">
        <div className="text-[#e2dbcc] text-sm mb-4">
          <span>House | Beachfront</span>
        </div>

        <h1 className={`${taviraj.className} text-[#bd9574] text-[48px] font-normal leading-[120%] mb-6`}>
          Sunny Vista
        </h1>

        <p className={`${archivo.className} text-[#e2dbcc] font-light text-base leading-[150%] mb-2`}>
          5408/101 Bathurst Street, Sydney, 2000.
        </p>
        <p className={`${archivo.className} text-[#e2dbcc] font-light text-base leading-[150%] mb-6`}>Sydney, 2000</p>

        <p className="mb-8">
          <span className={`${archivo.className} text-[#e2dbcc] font-light text-base leading-[150%]`}>Auction:</span>{" "}
          <span className={`${archivo.className} text-[#bd9574] font-bold text-base leading-[150%]`}>$ 730.000</span>
        </p>

        {/* Property Features */}
        <div className="flex flex-wrap items-center gap-6 mb-8">
          <div className="flex items-center gap-2 text-[#e2dbcc]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14M3 11h18M7 11V7m10 4V7"
                stroke="#e2dbcc"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={`${archivo.className} font-light text-base`}>3</span>
          </div>
          <div className="flex items-center gap-2 text-[#e2dbcc]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 12h16a1 1 0 011 1v2a4 4 0 01-4 4H7a4 4 0 01-4-4v-2a1 1 0 011-1zm4-9v5m4-2v2m4-4v7"
                stroke="#e2dbcc"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={`${archivo.className} font-light text-base`}>5</span>
          </div>
          <div className="flex items-center gap-2 text-[#e2dbcc]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 17h14M5 17a2 2 0 01-2-2V9m2 8a2 2 0 002 2h10a2 2 0 002-2M5 17V7a2 2 0 012-2h10a2 2 0 012 2v10m0 0V9m0 0H3"
                stroke="#e2dbcc"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span className={`${archivo.className} font-light text-base`}>1</span>
          </div>
          <div className="flex items-center gap-2 text-[#e2dbcc]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 21h18M9 8h1m5 0h1M9 16h1m5 0h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"
                stroke="#e2dbcc"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={`${archivo.className} font-light text-base`}>6</span>
          </div>
          <div className="flex items-center gap-2 text-[#e2dbcc]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 21V8a2 2 0 012-2h12a2 2 0 012 2v13M2 10h20M10 2v6m4-6v6"
                stroke="#e2dbcc"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={`${archivo.className} font-light text-base`}>8</span>
          </div>
          <div className="flex items-center gap-2 text-[#e2dbcc]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 15c0 1.1.9 2 2 2h12a2 2 0 002-2v-2H4v2zm18-7H2v3h20V8zm-9-4h-2v2h2V4z"
                stroke="#e2dbcc"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={`${archivo.className} font-light text-base`}>2</span>
          </div>
        </div>

        {/* Property Description */}
        <p className={`${archivo.className} text-[#e2dbcc] font-light text-base leading-[150%] mb-8`}>
          The sky's the limit in this luxurious penthouse, offering panoramic views over the world's most beautiful
          harbour, providing a captivating backdrop to all three levels. The crowning glory of the landmark Lumiere, the
          three-storey penthouse has been conceived as a spectacular skyhome with an exceptional layout and internal
          lift access to all levels with the top floor dedicated to a breathtaking master retreat with panoramic views
          that transform into a magical vista by night.
        </p>

        <p className={`${archivo.className} text-[#e2dbcc] font-light text-base leading-[150%]`}>
          Designed by globally renowned architect Foster & Partners London, Lumiere has redefined city living with its
          exceptional design and amenities.
        </p>
      </div>

      {/* Main Image */}
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black_Diamondz__AUS_-1ull5g5IMY19Qlp3q18bQB5gOmEW5J.png"
          alt="Luxury beachfront property with ocean view"
          fill
          className="object-cover"
        />
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-6 right-6 flex items-center gap-4 z-10">
        <div className={`${archivo.className} text-[#e2dbcc] font-light text-base mr-4`}>1 / 25</div>
        <button
          onClick={handlePrevious}
          className="w-12 h-12 flex items-center justify-center border border-[#656565] hover:border-[#bd9574] hover:text-[#bd9574] transition-colors text-[#e2dbcc]"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="w-12 h-12 flex items-center justify-center border border-[#656565] hover:border-[#bd9574] hover:text-[#bd9574] transition-colors text-[#e2dbcc]"
        >
          <ChevronRight size={24} />
        </button>
        <button className="w-12 h-12 flex items-center justify-center border border-[#656565] hover:border-[#bd9574] hover:text-[#bd9574] transition-colors text-[#e2dbcc]">
          <Grid size={20} />
        </button>
        <button
          onClick={onClose}
          className="w-12 h-12 flex items-center justify-center border border-[#656565] hover:border-[#bd9574] hover:text-[#bd9574] transition-colors text-[#e2dbcc]"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  )
}
