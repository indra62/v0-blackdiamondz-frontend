import React from "react";
import Image from "next/image";

/**
 * PartnerCarousel component displays partners in a horizontal scrollable carousel.
 * @param {Object} props
 * @param {Object} props.storyPartner - Contains partner_1 and partner_2 objects with id.
 * @param {Object} props.translationStoryPartner - Contains partner_1_text, partner_2_text, partner_1_country, partner_2_country.
 * @param {Function} props.getImageUrl - Function to get image URL for a partner.
 * @param {Object} props.archivo - Font class object (e.g., from next/font/local or Google Fonts).
 */
const PartnerCarousel = ({ storyPartner, translationStoryPartner, getImageUrl, archivo }) => {
  return (
    <div className="flex flex-nowrap overflow-x-auto gap-4 mb-12 max-w-full mx-auto justify-center">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
        const partner = storyPartner?.[`partner_${num}`];
        const imageUrl = partner?.id ? getImageUrl(partner.id, {
          format: "webp",
          quality: 100,
          fit: "cover",
        }) : null;
        const partnerText = translationStoryPartner?.[`partner_${num}_text`];
        const partnerCountry = translationStoryPartner?.[`partner_${num}_country`];
        if (!partner?.id || !imageUrl) return null;
        return (
          <div
            key={num}
            className="flex flex-col items-center flex-shrink-0 w-[150.25px]"
            style={{ height: "320px" }}
          >
            <div className="w-[150.25px] h-[220.25px] flex items-center justify-center">
              <Image
                src={imageUrl}
                alt={partnerText || `Partner ${num}`}
                width={150}
                height={150}
                className="object-contain"
              />
            </div>
            <div className="h-[64px] flex flex-col justify-center">
              <h4
                className={`${archivo.className} text-[#FBF4E4] font-light text-[16px] leading-[150%] mt-4 mb-1 text-center px-1`}
              >
                {partnerText}
              </h4>
              <p
                className={`${archivo.className} text-[#BD9574] font-light text-[12px] leading-[100%] text-center`}
              >
                {partnerCountry}
              </p>
            </div>
          </div>
        );
      })}

    </div>
  );
};

export default PartnerCarousel;
