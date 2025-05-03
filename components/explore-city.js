import { Taviraj } from "next/font/google"
import Image from "next/image"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300"] })

const cities = [
  {
    id: 1,
    name: "Sydney",
    image: "/images/sydney.png",
  },
  {
    id: 2,
    name: "Melbourne",
    image: "/images/melbourne.png",
  },
  {
    id: 3,
    name: "Brisbane",
    image: "/images/brisbane.png",
  },
  {
    id: 4,
    name: "Perth",
    image: "/images/perth.png",
  },
  {
    id: 5,
    name: "Adelaide",
    image: "/images/adelaide.png",
  },
]

export default function ExploreCity() {
  return (
    <div className={`${taviraj.className} bg-[#211f17] py-16`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[#E8D09A] text-[48px] font-light leading-[60px] tracking-[2px] mb-8">
            Explore your perfect city
          </h2>

          {/* Diamond Separator */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="w-24 h-[1px] bg-[#BD9574]"></div>
            <div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
            <div className="w-24 h-[1px] bg-[#BD9574]"></div>
          </div>
        </div>

        {/* Container with fixed width to show 2 full images + 200px of the third */}
        <div
          className="mx-auto overflow-x-auto scrollbar-hide pb-8"
          style={{ width: "calc(400px * 2 + 200px + 12px)" }}
        >
          <div className="flex gap-6 w-max">
            {cities.map((city) => (
              <div
                key={city.id}
                className="relative w-[400px] h-[300px] flex-none group cursor-pointer overflow-hidden"
              >
                <Image
                  src={city.image || "/placeholder.svg"}
                  alt={`${city.name} cityscape`}
                  fill
                  sizes="400px"
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <h3 className="font-light text-[32px] leading-[40px] text-white">{city.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
