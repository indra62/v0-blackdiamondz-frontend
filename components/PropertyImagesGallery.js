"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Grid } from "lucide-react"
import { Archivo } from "next/font/google"

const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"] })

// Sample property images
const propertyImages = [
  {
    id: 1,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fb4b9176ce0784c618052fed8acd9206d51de44a-IrssQQqUj5REJrtEGwxbOkZFhcbMY4.png",
    alt: "Luxury cliff-side villa with infinity pool overlooking ocean",
  },
  {
    id: 2,
    src: "/luxury-beachfront-property.png",
    alt: "Luxury beachfront property aerial view",
  },
  {
    id: 3,
    src: "/luxury-ocean-bedroom.png",
    alt: "Luxury bedroom with ocean view",
  },
  {
    id: 4,
    src: "/luxury-spa-interior.png",
    alt: "Luxury property spa interior",
  },
  {
    id: 5,
    src: "/luxury-ocean-view-interior.png",
    alt: "Luxury property interior with ocean view",
  },
  {
    id: 6,
    src: "/luxury-beachfront-aerial.png",
    alt: "Luxury beachfront aerial view",
  },
  // Add more images as needed
]

export default function PropertyImagesGallery({ onClose, onGridView, initialImageId = 1 }) {
  // Find the index of the image with the given ID, or default to 0
  const initialIndex = propertyImages.findIndex((img) => img.id === initialImageId)
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0)

  const totalImages = propertyImages.length

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalImages - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalImages - 1 ? prev + 1 : 0))
  }

  return (
    <div className="relative h-full">
      {/* Main Image - Full Height */}
      <div className="relative h-[500px] w-full">
        <Image
          src={propertyImages[currentIndex].src || "/placeholder.svg"}
          alt={propertyImages[currentIndex].alt}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Navigation Controls - Positioned at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-4 bg-gradient-to-t from-[#211f17]/80 to-transparent">
        {/* Image Counter */}
        <div className={`${archivo.className} text-[#e2dbcc] font-light text-base`}>
          {currentIndex + 1} / {totalImages}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center">
          <button
            onClick={handlePrevious}
            className="w-16 h-16 flex items-center justify-center border border-[#656565]/50 hover:border-[#bd9574] hover:text-[#bd9574] transition-colors text-[#e2dbcc] bg-[#211f17]/30"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="w-16 h-16 flex items-center justify-center border border-[#656565]/50 hover:border-[#bd9574] hover:text-[#bd9574] transition-colors text-[#e2dbcc] bg-[#211f17]/30"
          >
            <ChevronRight size={24} />
          </button>
          <button
            onClick={(e) => onGridView(e)}
            className="w-16 h-16 flex items-center justify-center border border-[#656565]/50 hover:border-[#bd9574] hover:text-[#bd9574] transition-colors text-[#e2dbcc] bg-[#211f17]/30"
            data-action="grid"
          >
            <Grid size={24} />
          </button>
          <button
            onClick={onClose}
            className="w-16 h-16 flex items-center justify-center border border-[#656565]/50 hover:border-[#bd9574] hover:text-[#bd9574] transition-colors text-[#e2dbcc] bg-[#211f17]/30"
          >
            <span className="text-[#e2dbcc] font-light">Close</span>
          </button>
        </div>
      </div>
    </div>
  )
}
