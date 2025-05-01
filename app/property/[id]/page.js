import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"
import Image from "next/image"
import { Bed, Bath, Square, Home, MapPin, Eye } from "lucide-react"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"] })

export default function PropertyDetailPage() {
  return (
    <main className="min-h-screen bg-[#211f17]">
      <Header />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <div className="text-[#656565] text-sm">
          <span>House | Beachfront</span>
        </div>
      </div>

      {/* Property Title */}
      <section className="container mx-auto px-4 pb-6">
        <h1 className={`${taviraj.className} text-[#E8D09A] text-[48px] font-light leading-[60px] tracking-[2px] mb-2`}>
          Sunny Vista
        </h1>
        <p className={`${archivo.className} text-[#E2DBCC] font-light text-base mb-2`}>
          5408/101 Bathurst Street, Sydney, 2000.
        </p>
        <p className={`${archivo.className} text-[#E2DBCC] font-light text-base mb-4`}>Sydney, 2000</p>
        <p className={`${archivo.className} text-[#BD9574] font-light text-xl mb-6`}>Auction: $ 730.000</p>

        {/* Property Features */}
        <div className="flex flex-wrap items-center gap-6 mb-6">
          <div className="flex items-center gap-2 text-[#E2DBCC]">
            <Bed size={20} />
            <span className={`${archivo.className} font-light text-base`}>3</span>
          </div>
          <div className="flex items-center gap-2 text-[#E2DBCC]">
            <Bath size={20} />
            <span className={`${archivo.className} font-light text-base`}>5</span>
          </div>
          <div className="flex items-center gap-2 text-[#E2DBCC]">
            <Home size={20} />
            <span className={`${archivo.className} font-light text-base`}>1</span>
          </div>
          <div className="flex items-center gap-2 text-[#E2DBCC]">
            <Square size={20} />
            <span className={`${archivo.className} font-light text-base`}>8</span>
          </div>
          <div className="flex items-center gap-2 text-[#E2DBCC]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16M9 8h1m5 0h1M9 16h1m5 0h1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={`${archivo.className} font-light text-base`}>8</span>
          </div>
          <div className="flex items-center gap-2 text-[#E2DBCC]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 15c0 1.1.9 2 2 2h12a2 2 0 002-2v-2H4v2zm18-7H2v3h20V8zm-9-4h-2v2h2V4z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={`${archivo.className} font-light text-base`}>2</span>
          </div>
        </div>

        {/* Map Button */}
        <button className="w-full border border-[#656565] py-3 px-4 flex items-center justify-center gap-2 text-[#BD9574] hover:bg-[#2c2920] transition-colors mb-8">
          <MapPin size={20} />
          <span className={`${archivo.className} font-light text-base`}>See map</span>
        </button>
      </section>

      {/* Property Images */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-2 grid-rows-2 gap-2 h-[600px]">
          <div className="row-span-2 relative">
            <Image
              src="/luxury-beachfront-aerial.png"
              alt="Luxury beachfront property aerial view"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative">
            <Image
              src="/luxury-ocean-bedroom.png"
              alt="Luxury bedroom with ocean view"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative">
            <Image
              src="/placeholder.svg?key=21zqr"
              alt="Luxury wooden ceiling architecture"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="relative h-[200px]">
            <Image src="/placeholder.svg?key=12e9h" alt="Luxury property beach view" fill className="object-cover" />
          </div>
          <div className="relative h-[200px]">
            <Image
              src="/luxury-ocean-view-interior.png"
              alt="Luxury property interior with ocean view"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Image Controls */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[#E2DBCC]">
              <Eye size={20} />
              <span className={`${archivo.className} font-light text-base`}>21</span>
            </div>
            <div className="flex items-center gap-2 text-[#E2DBCC]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 11v8a1 1 0 001 1h8a1 1 0 001-1v-8M16 7V5a1 1 0 00-1-1h-6a1 1 0 00-1 1v2M12 12v6M9 9h6M17 5H7M7 9H4a1 1 0 00-1 1v10a1 1 0 001 1h16a1 1 0 001-1V10a1 1 0 00-1-1h-3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className={`${archivo.className} font-light text-base`}>3</span>
            </div>
            <div className="flex items-center gap-2 text-[#E2DBCC]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 21v-13M4 8l8-5 8 5M4 16h2M4 12h5M19 21v-13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className={`${archivo.className} font-light text-base`}>2</span>
            </div>
          </div>

          <button className="px-6 py-2 border border-[#BD9574] text-[#BD9574] hover:border-[#d4af37] hover:text-[#d4af37] transition-colors">
            View All Media
          </button>
        </div>
      </section>

      {/* Property Description */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="md:col-span-2">
            <p className={`${archivo.className} text-[#E2DBCC] font-light text-base leading-7 mb-6`}>
              The sky's the limit in this luxurious penthouse, offering panoramic views over the world's most beautiful
              harbour, providing a captivating backdrop to all three levels. The crowning glory of the landmark Lumiere,
              the three-storey penthouse has been conceived as a spectacular skyhome with an exceptional layout and
              internal lift access to all levels with the top floor dedicated to a breathtaking master retreat with
              panoramic views that transform into a magical vista by night.
            </p>
          </div>

          <div className="bg-[#2c2920] p-6">
            <h3 className={`${archivo.className} text-white text-lg font-normal mb-4`}>Don't miss it !</h3>
            <p className={`${archivo.className} text-[#E2DBCC] font-light text-sm mb-4`}>
              Follow the updates about this property by subscribing to our newsletter and stay in the loop with news &
              updates.
            </p>
            <div className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent border border-[#656565] p-3 text-white focus:outline-none focus:border-[#BD9574]"
              />
              <button className="bg-[#BD9574] text-[#211f17] py-3 hover:bg-[#d4af37] transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Paddington Stats */}
      <section className="py-16 border-t border-[#656565]/30">
        <div className="container mx-auto px-4">
          <h2
            className={`${taviraj.className} text-[#E8D09A] text-[48px] font-light leading-[60px] tracking-[2px] text-center mb-8`}
          >
            Paddington Stats
          </h2>

          {/* Diamond Separator */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="w-24 h-[1px] bg-[#BD9574]"></div>
            <div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
            <div className="w-24 h-[1px] bg-[#BD9574]"></div>
          </div>

          <p
            className={`${archivo.className} text-[#E2DBCC] font-light text-base leading-6 max-w-2xl mx-auto text-center mb-16`}
          >
            On behalf of the Black Diamondz team we thank you for making the first step in looking for a preferred
            agency to secure the sale of your property asset.
          </p>

          {/* Stats Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Median Sale Price */}
            <div className="flex flex-col items-center">
              <div className="mb-6">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3 3v18h18M3 17l5-5 4 4 8-8"
                    stroke="#BD9574"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={`${archivo.className} text-[#E2DBCC] font-light text-sm mb-2 text-center`}>
                Median Sale Price (12 mo)
              </div>
              <div className={`${taviraj.className} text-[#BD9574] text-4xl font-normal mb-2 text-center`}>$3.34M</div>
              <div className={`${archivo.className} text-[#656565] font-light text-sm text-center`}>
                in January 2025
              </div>
            </div>

            {/* Annual Change */}
            <div className="flex flex-col items-center">
              <div className="mb-6">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 3a9 9 0 109 9 9 9 0 00-9-9zm0 16a7 7 0 117-7 7 7 0 01-7 7z"
                    stroke="#BD9574"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 7v5l3 3"
                    stroke="#BD9574"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={`${archivo.className} text-[#E2DBCC] font-light text-sm mb-2 text-center`}>
                Annual Change in Median Price (5 yrs)
              </div>
              <div className={`${taviraj.className} text-[#BD9574] text-4xl font-normal mb-2 text-center`}>28.1%</div>
              <div className={`${archivo.className} text-[#656565] font-light text-sm text-center`}>
                in January 2025
              </div>
            </div>

            {/* Properties Sold */}
            <div className="flex flex-col items-center">
              <div className="mb-6">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6a3 3 0 116 0v6"
                    stroke="#BD9574"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={`${archivo.className} text-[#E2DBCC] font-light text-sm mb-2 text-center`}>
                Properties Sold (12 mo)
              </div>
              <div className={`${taviraj.className} text-[#BD9574] text-4xl font-normal mb-2 text-center`}>234</div>
              <div className={`${archivo.className} text-[#656565] font-light text-sm text-center`}>
                in November 2024
              </div>
            </div>
          </div>

          {/* Stats Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Median Days on Market */}
            <div className="flex flex-col items-center">
              <div className="mb-6">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                    stroke="#BD9574"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={`${archivo.className} text-[#E2DBCC] font-light text-sm mb-2 text-center`}>
                Median Days on Market (12 mo)
              </div>
              <div className={`${taviraj.className} text-[#BD9574] text-4xl font-normal mb-2 text-center`}>43</div>
              <div className={`${archivo.className} text-[#656565] font-light text-sm text-center`}>
                in November 2024
              </div>
            </div>

            {/* Median Asking Rent */}
            <div className="flex flex-col items-center">
              <div className="mb-6">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3 21h18M5 21V8l7-5 7 5v13M9 9h6M9 13h6M9 17h6"
                    stroke="#BD9574"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={`${archivo.className} text-[#E2DBCC] font-light text-sm mb-2 text-center`}>
                Median Asking Rent (12 mo)
              </div>
              <div className={`${taviraj.className} text-[#BD9574] text-4xl font-normal mb-2 text-center`}>$1350</div>
              <div className={`${archivo.className} text-[#656565] font-light text-sm text-center`}>
                in January 2025
              </div>
            </div>

            {/* Avg. Hold Period */}
            <div className="flex flex-col items-center">
              <div className="mb-6">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 21a9 9 0 100-18 9 9 0 000 18z"
                    stroke="#BD9574"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 7v5l3 3"
                    stroke="#BD9574"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={`${archivo.className} text-[#E2DBCC] font-light text-sm mb-2 text-center`}>
                Avg. Hold Period (12 mo)
              </div>
              <div className={`${taviraj.className} text-[#BD9574] text-4xl font-normal mb-2 text-center`}>
                12.2 yrs
              </div>
              <div className={`${archivo.className} text-[#656565] font-light text-sm text-center`}>
                in November 2024
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-[#2c2920]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h3 className={`${archivo.className} text-white text-xl font-light mb-4 md:mb-0`}>
              BLACK DIAMONDZ NEWSLETTER
            </h3>

            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent border border-[#656565] p-4 text-white focus:outline-none focus:border-[#BD9574] w-full md:w-[320px]"
              />
              <button className="bg-[#BD9574] text-[#211f17] px-8 py-4 hover:bg-[#d4af37] transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
