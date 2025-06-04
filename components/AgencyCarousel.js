import React, { useRef, useState, useEffect } from "react"
import Image from "next/image"

/**
 * AgencyCarousel component displays partners in a horizontal scrollable carousel.
 * @param {Object} props
 * @param {Array} props.partners - Array of partner objects.
 * @param {String} props.language - Current language code.
 * @param {Function} props.getImageUrl - Function to get image URL for a partner.
 * @param {Object} props.archivo - Font class object.
 */
const AgencyCarousel = ({ agency, language, getImageUrl, archivo, light = false }) => {
   const containerRef = useRef(null)
  const [containerWidth, setContainerWidth] = useState(1500) // fallback default

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth)
    }
    // Optionally, add a resize listener for responsiveness
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const minWidth = 80
  const maxWidth = 300
  const agentCount = agency?.length || 1

  const cardWidth = Math.max(
    Math.min(containerWidth / agentCount, maxWidth),
    minWidth
  )

  return (
    <div ref={containerRef} className="flex flex-nowrap overflow-x-auto gap-4 mb-12 max-w-full mx-auto md:justify-center justify-start">
      {agency?.map((agent) => {
        const translation =
          agent.translations?.find((t) => t.languages_code === language) ||
          agent.translations?.[0]

        const imageUrl = agent.image
          ? getImageUrl(agent.image.id, {
              format: "webp",
              quality: 100,
              fit: "cover",
            })
          : null

        if (!agent.id || !imageUrl) return null

        return (
          <div
            key={agent.id}
            className="flex flex-col items-center flex-shrink-0"
            style={{ height: "320px", width: `${cardWidth}px` }}
          >
            <div
              className={`h-[220.25px] w-[${cardWidth}px] flex items-center justify-center`}
              style={{ width: `${cardWidth}px`, position: "relative" }}
            >
              {agent.url ? (
                <a href={agent.url} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={imageUrl}
                    alt={translation?.name || `Agency`}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </a>
              ) : (
                <Image
                  src={imageUrl}
                  alt={translation?.name || `Agency`}
                  fill
                  style={{ objectFit: "contain" }}
                />
              )}
            </div>
            <div className="h-[64px] flex flex-col justify-center">
              <h4
                className={`${archivo.className} ${light ? "text-[#211f17]" : "text-[#FBF4E4]"}  font-light text-[16px] leading-[150%] mt-4 mb-1 text-center px-1`}
              >
                {translation?.name}
              </h4>
              <p
                className={`${archivo.className} ${light ? "text-[#BD9574]" : "text-[#BD9574]"} font-light text-[12px] leading-[100%] text-center`}
              >
                {translation?.location}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AgencyCarousel
