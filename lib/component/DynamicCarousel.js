import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import '@/app/globals.css';
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";

// Custom diamond dot for Swiper pagination
function CustomDiamondDot({ active }) {
  return (
    <div
      className={`w-2 h-2 mx-1 mb-3 ${
        active ? "bg-[#BD9574]" : "bg-[#656565]"
      } transform rotate-45 cursor-pointer transition-colors`}
    />
  );
}

// Custom button group for navigation and "See All" button
function ButtonGroup({
  swiper,
  href,
  buttonLabel = "See All Properties",
  showButton = true,
  placement = "right",
}) {
  const alignment =
    placement === "left"
      ? "justify-start"
      : placement === "center"
      ? "justify-center"
      : "justify-end";

  return (
    <div className={`flex items-center gap-4 w-full mt-8 ${alignment}`}>
      <button
        className="p-2 border border-[#656565] rounded hover:border-[#BD9574] hover:text-[#BD9574] transition-colors"
        onClick={() => swiper.slidePrev()}
        aria-label="Previous"
      >
        {/* Previous arrow SVG */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        className="p-2 border border-[#656565] rounded hover:border-[#BD9574] hover:text-[#BD9574] transition-colors"
        onClick={() => swiper.slideNext()}
        aria-label="Next"
      >
        {/* Next arrow SVG */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {showButton && (
        <Link
          href={href || "/buy"}
          className="flex items-center gap-2 bg-[#BD9574] text-[#211f17] px-6 py-2 rounded hover:bg-[#D4AF37] transition-colors"
        >
          <span className="font-light text-[16px]">{buttonLabel}</span>
          {/* Right arrow SVG */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12h14M12 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      )}
    </div>
  );
}

export default function DynamicCarousel({
  children,
  showDots = false,
  arrows = false,
  autoPlay = false,
  autoPlaySpeed = 4000,
  infinite = false,
  buttonLabel = "See All",
  showButton = false,
  buttonGroupPlacement = "right",
  href,
  ...carouselProps
}) {
  const swiperRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        autoplay={autoPlay ? { delay: autoPlaySpeed, disableOnInteraction: false } : false}
        loop={infinite}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setSwiperInstance(swiper);
        }}
        pagination={showDots ? { clickable: true } : false}
        className="swiper-container"
        {...carouselProps}
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
      </Swiper>

      {(arrows || showButton) && swiperInstance && (
        <ButtonGroup
          swiper={swiperInstance}
          href={href}
          buttonLabel={buttonLabel}
          showButton={showButton}
          placement={buttonGroupPlacement}
        />
      )}

      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 8px !important;
          height: 8px !important;
          background: #656565 !important;
          border-radius: 0 !important;
          transform: rotate(45deg) !important;
          margin: 0 4px 12px 4px !important;
          transition: background 0.2s !important;
        }
        .swiper-pagination-bullet-active {
          background: #BD9574 !important;
        }
      `}</style>
    </div>
  );
}
