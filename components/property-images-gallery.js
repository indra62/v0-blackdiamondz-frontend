"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { ChevronLeft, ChevronRight, Grid } from "lucide-react"
import { Archivo } from "next/font/google"
import { getImageUrl } from "@/lib/api"

const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"] })

export default function PropertyImagesGallery({
  onClose,
  onGridView,
  property,
  initialImageId = 0,
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  // Find the index of the image with the given ID, or default to 0
  const initialIndex = property.findIndex((img, idx) => idx === initialImageId)
  const [currentIndex, setCurrentIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0
  )

  const totalImages = property.length

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalImages - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalImages - 1 ? prev + 1 : 0))
  }

  useEffect(() => {
    if (!lightboxOpen) return
    const onKeyDown = (e) => {
      if (e.key === "Escape") setLightboxOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [lightboxOpen])

  return (
    <div className="relative h-full">
      {/* Main Image - Full Height */}
      <div className="relative h-[500px] w-full">
        <Image
          src={getImageUrl(property?.[currentIndex]?.directus_files_id?.id, {
            quality: 80,
            fit: "cover",
          })}
          alt={property?.[currentIndex]?.directus_files_id?.title}
          fill
          className="object-cover cursor-zoom-in"
          priority
          onClick={() => setLightboxOpen(true)}
        />
      </div>

      {/* Navigation Controls - Positioned at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-4 bg-gradient-to-t from-[#211f17]/80 to-transparent">
        {/* Image Counter */}
        <div
          className={`${archivo.className} text-[#e2dbcc] font-light text-base`}
        >
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
      {lightboxOpen && (
        <div className="fixed inset-0 z-[1001] bg-[#211f17]/60 backdrop-blur-md flex items-center justify-center">
          {/* Close Button (Top Right) */}
          <button
            className={`absolute top-4 right-4 z-50 ${archivo.className} text-[#bd9574] bg-[#211f17]/60 hover:bg-[#211f17] border border-[#bd9574]/50 px-6 py-3 transition-colors`}
            onClick={() => setLightboxOpen(false)}
          >
            Close
          </button>

          <TransformWrapper
            initialScale={1}
            minScale={1}
            maxScale={4}
            doubleClick={{ mode: "zoomIn" }}
            wheel={{ step: 0.2 }}
            pinch={{ step: 5 }}
            limitToBounds={true}
            centerOnInit={true}
            panning={{
              velocityDisabled: true,
              lockAxisX: false,
              lockAxisY: false,
            }}
            bounce={{ disabled: false }}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                {/* Zoom Controls (Top Left) */}
                <div className="absolute top-4 left-4 z-[1010] flex gap-2">
                  <button
                    className="bg-[#211f17]/60 text-[#bd9574] border-[#bd9574]/50 border-[1px] p-3 hover:bg-[#211f17] transition-colors"
                    onClick={() => zoomIn(1)}
                  >
                    ＋
                  </button>
                  <button
                    className="bg-[#211f17]/60 text-[#bd9574] border-[#bd9574]/50 border-[1px] p-3 hover:bg-[#211f17] transition-colors"
                    onClick={() => zoomOut(1)}
                  >
                    －
                  </button>
                  <button
                    className="bg-[#211f17]/60 text-[#bd9574] border-[#bd9574]/50 border-[1px] p-3 hover:bg-[#211f17] transition-colors"
                    onClick={() => resetTransform()}
                  >
                    ⟳
                  </button>
                </div>

                {/* Image Container */}
                <TransformComponent wrapperClass="flex items-center justify-center cursor-grab">
                  <Image
                    src={getImageUrl(
                      property?.[currentIndex]?.directus_files_id?.id,
                      { quality: 100 }
                    )}
                    alt={property?.[currentIndex]?.directus_files_id?.title}
                    width={
                      property?.[currentIndex]?.directus_files_id?.width || 1200
                    }
                    height={
                      property?.[currentIndex]?.directus_files_id?.height || 800
                    }
                    className="object-contain max-h-[90vh] max-w-[90vw] bg-[#211f17]/60"
                    priority
                    draggable={false}
                  />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </div>
      )}
    </div>
  )
}
