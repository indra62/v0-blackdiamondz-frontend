"use client"
import Image from "next/image"
import { Archivo } from "next/font/google"
import { getImageUrl } from "@/lib/api";

const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"] })

export default function PropertyGridGallery({ onClose, onImageClick, property }) {
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
        {property.slice(0, property.length).map((image, idx) => (
          <div
            key={`property-image-grid-${image.directus_files_id.id}`}
            className="relative aspect-[3/2] cursor-pointer transition-opacity hover:opacity-90"
            onClick={() => handleImageClick(idx)}
          >
            <Image src={getImageUrl(
              image.directus_files_id.id,
              {
                quality: 80,
                fit: "cover",
              }
            )} alt={image.directus_files_id?.title} fill className="object-cover" />
          </div>
        ))}
      </div>

      {/* Close Button - Positioned at the bottom */}
      <div className="sticky bottom-4 right-4 left-auto flex items-center z-10 w-fit" style={{marginLeft: 'auto'}}>
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
