import Stats from "@/components/stats"
import Footer from "@/components/footer"
import Image from "next/image"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"] })

export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-[#211f17]">
      {/* Hero Section */}
      <section className="relative h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/sydney-harbour-sunset.png"
            alt="Sydney Harbour with Bridge and city skyline at sunset"
            fill
            priority
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg, rgba(33, 31, 23, 0.7), rgba(33, 31, 23, 0.7)), linear-gradient(180deg, rgba(33, 31, 23, 0) 80.08%, #211F17 100%)",
            }}
          ></div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
          <h1
            className={`${taviraj.className} text-[#E2DBCC] text-[48px] font-light leading-[125%] tracking-[2px] text-center mb-8`}
          >
            Australia's most highly regarded
            <br />
            and aspirational real estate company
          </h1>

          {/* Diamond Separator */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-24 h-[1px] bg-[#BD9574]"></div>
            <div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
            <div className="w-24 h-[1px] bg-[#BD9574]"></div>
          </div>

          <p
            className={`${archivo.className} text-[#E2DBCC] font-light text-[16px] leading-[150%] tracking-[0px] text-center max-w-3xl mx-auto mb-4`}
          >
            Our point of difference in a saturated market is our unmatched
            international database, specializing in high-end luxury residential
            property sales, investment properties and business solutions.
          </p>

          <p
            className={`${archivo.className} text-[#E2DBCC] font-light text-[16px] leading-[150%] tracking-[0px] text-center max-w-3xl mx-auto`}
          >
            Our industry expertise, negotiating prowess and suite of integrated
            services ensure that we remain firmly at the forefront of the
            market, all while providing a bespoke and VIP client offering. With
            a long-term Chinese, Australian, and international client base,
            Black Diamondz Property and Monika Tu, Black Diamondz Group's
            Founder and Director, is a total property and local marketing
            package that we provide the very best solution for buyers and
            sellers alike.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center">
            <div className="w-1 h-16 bg-gradient-to-b from-[#BD9574] to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <Stats />

      {/* Services Section */}
      <section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-4">
          {/* Market with Us */}
          <div className="relative h-[400px] group overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7470e0820992d2b66bee3a39dccd98f3d6f6f899-pO9jU6S7LTdX93C7IH1hXoHZWqYhZC.png"
              alt="Market with Us - Professional real estate agents"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, rgba(33, 31, 23, 0.7), rgba(33, 31, 23, 0.7)), linear-gradient(180deg, #211F17 0%, rgba(33, 31, 23, 0) 25%, rgba(33, 31, 23, 0) 75%, #211F17 100%)",
              }}
            ></div>
            <div className="absolute bottom-12 left-0 right-0 text-center">
              <h3
                className={`${taviraj.className} text-white text-[32px] font-light leading-[120%]`}
              >
                Market
                <br />
                with Us
              </h3>
            </div>
          </div>

          {/* Buy Property */}
          <div className="relative h-[400px] group overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd0d5c628ee9b692963e4e2d51ffa87ce6ad3dc4.jpg-uwutigNOWgSZLeKOxjdXKkkkVDZ2Q4.jpeg"
              alt="Buy Property - Luxury interior design"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, rgba(33, 31, 23, 0.7), rgba(33, 31, 23, 0.7)), linear-gradient(180deg, #211F17 0%, rgba(33, 31, 23, 0) 25%, rgba(33, 31, 23, 0) 75%, #211F17 100%)",
              }}
            ></div>
            <div className="absolute bottom-12 left-0 right-0 text-center">
              <h3
                className={`${taviraj.className} text-white text-[32px] font-light leading-[120%]`}
              >
                Buy
                <br />
                Property
              </h3>
            </div>
          </div>

          {/* Sell Your Property */}
          <div className="relative h-[400px] group overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/65fd9c5c7ee6f24274b8a8b17e499f2235fcf6ce.jpg-Cxfy81yKgquVoEpI7zbNPlLAUAmGO0.jpeg"
              alt="Sell Your Property - Luxury oceanfront property"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, rgba(33, 31, 23, 0.7), rgba(33, 31, 23, 0.7)), linear-gradient(180deg, #211F17 0%, rgba(33, 31, 23, 0) 25%, rgba(33, 31, 23, 0) 75%, #211F17 100%)",
              }}
            ></div>
            <div className="absolute bottom-12 left-0 right-0 text-center">
              <h3
                className={`${taviraj.className} text-white text-[32px] font-light leading-[120%]`}
              >
                Sell Your
                <br />
                Property
              </h3>
            </div>
          </div>

          {/* Club Diamondz */}
          <div className="relative h-[400px] group overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4fedfe79131693b98c63bbd11e70b55109f260c2-1jVyBWtyOJhBmdhU1P4eJStsD2e0wj.png"
              alt="Club Diamondz - Exclusive membership"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, rgba(33, 31, 23, 0.7), rgba(33, 31, 23, 0.7)), linear-gradient(180deg, #211F17 0%, rgba(33, 31, 23, 0) 25%, rgba(33, 31, 23, 0) 75%, #211F17 100%)",
              }}
            ></div>
            <div className="absolute bottom-12 left-0 right-0 text-center">
              <h3
                className={`${taviraj.className} text-white text-[32px] font-light leading-[120%]`}
              >
                Club
                <br />
                Diamondz
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Beyond Selling Properties Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left Column */}
            <div>
              <h2
                className={`${taviraj.className} text-[#E2DBCC] text-[24px] font-normal leading-[100%] tracking-[0%] mb-8`}
              >
                Beyond selling properties, we're also helps large and small
                organizations in reaching their top confidence to fly higher and
                grow better.
              </h2>
            </div>

            {/* Right Column */}
            <div>
              <p
                className={`${archivo.className} text-[#BD9574] font-light text-base leading-[150%] tracking-[0px] mb-6`}
              >
                Black Diamondz PR & Marketing is fast becoming Australia's
                leading premium communications agency. As the authority on the
                Chinese-Australian audience, we know how to leverage real
                insight to create branded content, communications strategies and
                event experiences that resonate by engaging and meaningful way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section - Updated to match Figma design */}
      <section className="relative">
        {/* Banner Image with Text Overlay */}
        <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black_Diamondz__AUS_-VJAPLCB6zzqHrlmryhniiFRL4tAU9s.png"
            alt="Meet Our Team"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Team Content */}
        <div className="bg-[#211f17] py-4"></div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-[#211f17]">
        <div className="container mx-auto px-4 text-center">
          <h2
            className={`${taviraj.className} text-[#E2DBCC] text-[48px] font-light leading-[120%] mb-8`}
          >
            Partners
          </h2>

          {/* Diamond Separator */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="w-36 h-[1px] bg-[#BD9574]"></div>
            <div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
            <div className="w-36 h-[1px] bg-[#BD9574]"></div>
          </div>

          <p
            className={`${archivo.className} text-[#E2DBCC] font-light text-base leading-[150%] max-w-3xl mx-auto mb-16`}
          >
            Our curated list of partners is designed to connect you with the
            best agencies for selling your property. Each partner is dedicated
            to providing exceptional support throughout the entire process,
            ensuring a seamless experience.
          </p>

          {/* Partners Grid - Single row with exact Figma dimensions */}
          <div className="flex flex-nowrap overflow-x-auto gap-4 mb-12 max-w-7xl mx-auto justify-center">
            {[
              {
                name: "Premier Property Concierge",
                country: "Indonesia",
                bgColor: "#1E1C3A",
                imageKey: "r6e29",
              },
              {
                name: "Invotive Property Management",
                country: "Italy",
                bgColor: "#E5E5E5",
                imageKey: "s7gic",
              },
              {
                name: "Energizer Property Services",
                country: "Norway",
                bgColor: "#D9E6F2",
                imageKey: "k7rms",
              },
              {
                name: "Dynamic Realty",
                country: "Spain",
                bgColor: "#1E2A3B",
                imageKey: "hwe67",
              },
              {
                name: "Vision Property",
                country: "Brazil",
                bgColor: "#D9B8A8",
                imageKey: "xcyl1",
              },
              {
                name: "Harmony Home Solutions",
                country: "Nepal",
                bgColor: "#F2F2F2",
                imageKey: "mngzr",
              },
              {
                name: "Genzzero Service",
                country: "Thailand",
                bgColor: "#D9C8A8",
                imageKey: "sfecy",
              },
              {
                name: "Peopeller Property Advisors",
                country: "Finland",
                bgColor: "#E5E5E5",
                imageKey: "xuzo0",
              },
            ].map((partner, index) => (
              <div
                key={index}
                className="flex flex-col items-center flex-shrink-0 w-[150.25px]"
                style={{ height: "214px" }}
              >
                <div
                  className="w-[150.25px] h-[150.25px] flex items-center justify-center"
                  style={{ backgroundColor: partner.bgColor }}
                >
                  <Image
                    src={`/generic-placeholder-graphic.png?key=${partner.imageKey}`}
                    alt={partner.name}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <div className="h-[64px] flex flex-col justify-center">
                  <h4
                    className={`${archivo.className} text-[#FBF4E4] font-light text-[16px] leading-[150%] mt-4 mb-1 text-center px-1`}
                  >
                    {partner.name}
                  </h4>
                  <p
                    className={`${archivo.className} text-[#BD9574] font-light text-[12px] leading-[100%] text-center`}
                  >
                    {partner.country}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
