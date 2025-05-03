"use client"
import Image from "next/image"
import { Archivo } from "next/font/google"

const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"] })

// Sample property images - we'll create a larger set for the grid view
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
  // Additional images for the grid
  {
    id: 7,
    src: "/placeholder.svg?key=y3q35",
    alt: "Luxury modern bedroom with white bedding",
  },
  {
    id: 8,
    src: "/placeholder.svg?key=xffzz",
    alt: "Luxury staircase with natural light",
  },
  {
    id: 9,
    src: "/placeholder.svg?key=7nm1p",
    alt: "Luxury dining area with wooden table",
  },
  {
    id: 10,
    src: "/placeholder.svg?key=sri8f",
    alt: "Luxury bathroom with blue tile detail",
  },
  {
    id: 11,
    src: "/placeholder.svg?key=il8zy",
    alt: "Luxury bedroom with ocean view and curtains",
  },
  {
    id: 12,
    src: "/placeholder.svg?key=fz5z2",
    alt: "Luxury wardrobe with elegant doors",
  },
  {
    id: 13,
    src: "/placeholder.svg?key=urcbu",
    alt: "Luxury bar area with wooden stools",
  },
  {
    id: 14,
    src: "/placeholder.svg?key=4rk74",
    alt: "Luxury blue mosaic tile detail",
  },
  {
    id: 15,
    src: "/placeholder.svg?key=a0jeg",
    alt: "Luxury restaurant sign at night",
  },
  {
    id: 16,
    src: "/placeholder.svg?key=9nghn",
    alt: "Luxury white tower by the beach",
  },
]

export default function PropertyGridGallery({ onClose, onImageClick }) {
  // Function to handle image click - defaults to onClose if onImageClick is not provided
  const handleImageClick = (imageId) => {
    // If a specific onImageClick handler is provided, use it with the image ID
    if (onImageClick) {
      onImageClick(imageId)
    } else {
      // Otherwise, just use the onClose function to go back to gallery view
      onClose()
    }
  }

  // Use the onClose function directly for better performance
  // Note: The parent component should ensure onClose navigates to the initial page
  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <div className="relative h-full bg-black overflow-y-auto">
      {/* Grid of Images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-2">
        {propertyImages.slice(0, 16).map((image) => (
          <div
            key={image.id}
            className="relative aspect-[3/2] cursor-pointer transition-opacity hover:opacity-90"
            onClick={() => handleImageClick(image.id)}
          >
            <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
          </div>
        ))}
      </div>

      {/* Close Button - Positioned at the bottom */}
      <div className="absolute bottom-4 right-4 flex items-center z-10">
        <div className="flex items-center bg-[#211f17]/80 border border-[#656565]/50">
          <button
            onClick={() => onImageClick && onImageClick(1)}
            className="w-12 h-12 flex items-center justify-center text-[#e2dbcc] hover:text-[#bd9574] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
              <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
              <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
              <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
          <button
            onClick={handleClose}
            className="px-6 h-12 text-[#e2dbcc] border-l border-[#656565]/50 hover:text-[#bd9574] transition-colors"
            aria-label="Close gallery"
          >
            <span className={`${archivo.className} font-light`}>Close</span>
          </button>
        </div>
      </div>
    </div>
  )
}
