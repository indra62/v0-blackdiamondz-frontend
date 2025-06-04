import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import Image from "next/image"
import Link from "next/link"

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
}

function CustomDiamondDot({ onClick, ...rest }) {
  const { index, active } = rest
  return (
    <div
      key={index}
      className={`w-2 h-2 mx-1 mb-3 ${
        active ? "bg-[#BD9574]" : "bg-[#656565]"
      } transform rotate-45 cursor-pointer transition-colors`}
      onClick={onClick}
    />
  )
}

export default function AboutUsCarousel({ images = [], alt }) {
  if (!images.length) {
    return (
      <div className="relative w-full h-full bg-[#211f17]">
        <Image
          src="/placeholder-image.png"
          alt={alt}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
    <Carousel
      responsive={responsive}
      swipeable
      draggable
      showDots
      arrows={false}
      autoPlay
      autoPlaySpeed={1000}
      transitionDuration={500}
      customDot={<CustomDiamondDot />}
      infinite={true}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      containerClass="carousel-container"
      itemClass="carousel-item"
    >
      {images.map((img, idx) => (
        <Image
          src={img}
          alt={alt}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="transition-transform duration-700 hover:scale-110"
        />
      ))}
    </Carousel>
    </div>
  )
}
