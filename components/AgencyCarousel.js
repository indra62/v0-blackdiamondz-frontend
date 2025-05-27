import React from "react"
import Image from "next/image"

/**
 * AgencyCarousel component displays partners in a horizontal scrollable carousel.
 * @param {Object} props
 * @param {Array} props.partners - Array of partner objects.
 * @param {String} props.language - Current language code.
 * @param {Function} props.getImageUrl - Function to get image URL for a partner.
 * @param {Object} props.archivo - Font class object.
 */
const AgencyCarousel = ({ agency, language, getImageUrl, archivo }) => {
  return (
    <div className="flex flex-nowrap overflow-x-auto gap-4 mb-12 max-w-full mx-auto md:justify-center justify-start">
      {agency?.map((agency) => {
        // Find translation for the current language or fallback
        const translation =
          agency.translations?.find((t) => t.languages_code === language) ||
          agency.translations?.[0]

        // Get image URL (adjust as needed for your backend)
        const imageUrl = agency.image
          ? getImageUrl(agency.image.id, {
              format: "webp",
              quality: 100,
              fit: "cover",
            })
          : null

        if (!agency.id || !imageUrl) return null

        return (
          <div
            key={agency.id}
            className="flex flex-col items-center flex-shrink-0 w-[150.25px]"
            style={{ height: "320px" }}
          >
            <div className="w-[150.25px] h-[220.25px] flex items-center justify-center">
              {agency.url ? (
                <a href={agency.url} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={imageUrl}
                    alt={translation?.name || `Agency`}
                    width={150}
                    height={150}
                    className="object-contain cursor-pointer"
                  />
                </a>
              ) : (
                <Image
                  src={imageUrl}
                  alt={translation?.name || `Agency`}
                  width={150}
                  height={150}
                  className="object-contain"
                />
              )}
            </div>
            <div className="h-[64px] flex flex-col justify-center">
              <h4
                className={`${archivo.className} text-[#FBF4E4] font-light text-[16px] leading-[150%] mt-4 mb-1 text-center px-1`}
              >
                {translation?.name}
              </h4>
              <p
                className={`${archivo.className} text-[#BD9574] font-light text-[12px] leading-[100%] text-center`}
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
