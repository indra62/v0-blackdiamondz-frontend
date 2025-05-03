import Header from "@/components/header"
import Stats from "@/components/stats"
import Footer from "@/components/footer"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"] })

export default function AgencyPage() {
  return (
    <main className="min-h-screen bg-[#211f17] text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[600px]">
        {/* Updated gradient overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `linear-gradient(0deg, rgba(33, 31, 23, 0.85), rgba(33, 31, 23, 0.85)), 
                        linear-gradient(180deg, rgba(33, 31, 23, 0) 80.08%, #211F17 100%)`,
          }}
        ></div>
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/suburban-neighborhood-aerial.png"
            alt="Suburban neighborhood aerial view"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          <h1
            className={`${taviraj.className} text-[48px] font-light mb-8 text-[#E2DBCC] leading-[125%] tracking-[2px]`}
          >
            Market your properties with us
          </h1>
          <div className="w-20 h-[1px] bg-[#BD9574] mb-8"></div>
          <p
            className={`${archivo.className} text-[16px] font-light max-w-3xl text-center text-[#E2DBCC] leading-[150%]`}
          >
            Unlock the potential of your real estate with our expert marketing services. We specialize in showcasing
            your properties to attract the right buyers, utilizing innovative strategies and cutting-edge technology.
            Let us help you elevate your listings and maximize your sales!
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <Stats />

      {/* Property Concierge Section */}
      <section className="py-16 bg-[#211f17]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Text Content */}
            <div className={`${archivo.className} font-light text-[16px] leading-[150%] text-[#E2DBCC]`}>
              <p className="mb-6">
                On behalf of the Black Diamondz team we thank you for making the first step in choosing a preferred
                agency to secure the sale of your property asset.
              </p>
              <p className="mb-6">
                At Black Diamondz Property Concierge we consider each of our private client's unique requirements of
                their property, we use our local and international expertise to provide them with all our clients with
                the relevant information they require to ensure we exceed their expectations.
              </p>
              <p className="mb-6">
                Here we focus on the requirements below before we list or showcase their property to the market:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Information on current market conditions.</li>
                <li>Any competing listings within their area.</li>
                <li>Previous sales within their area.</li>
                <li>
                  We create and execute innovative, engaging and inspiring marketing strategies we all areas of the
                  marketing mix.
                </li>
                <li>
                  We leverage our engaged private buyer network locally and internationally to achieve our maximum
                  engagement.
                </li>
              </ul>
              <p className="mb-6">
                Finding the buyers for unique residences is something that Black Diamondz Property Concierge has an
                advantage. We have established experience with a vast local and international database of high-net-worth
                private clients. Black Diamondz Property Concierge has cultivated strong and trusted personal
                relationships with our clients. This engaged client base are successful professionals who turn to us in
                the pursuit of the very best local and international real estate opportunities.
              </p>
              <p className="mb-6">
                As a business we strive to exceed our clients' expectations and rigorously follow up all potential
                buyers and even offer an exclusive Property Concierge Service to help interstate and international
                buyers view our private clients properties with ease. With our clients' best interests as the primary
                focus and with our team of experts, we leverage our polished negotiation skills to allow us to secure
                timely deals with optimal leading results, finding buyers other agencies simply don't have access to.
              </p>
              <p className="mb-6">We look forward to hearing further about you.</p>
              <p className="mb-2">Warmest regards,</p>
              <p className="text-[#BD9574]">Monika Tu & The Black Diamondz Team.</p>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <form>
                <div className="grid grid-cols-2">
                  {/* First Name */}
                  <div className="border border-[#656565]/30 p-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] font-light text-[16px] focus:outline-none`}
                    />
                  </div>

                  {/* Last Name */}
                  <div className="border border-[#656565]/30 p-4 border-l-0">
                    <input
                      type="text"
                      placeholder="Last Name"
                      className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] font-light text-[16px] focus:outline-none`}
                    />
                  </div>

                  {/* Gender */}
                  <div className="border border-[#656565]/30 p-4 border-t-0">
                    <input
                      type="text"
                      placeholder="Gender"
                      className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] font-light text-[16px] focus:outline-none`}
                    />
                  </div>

                  {/* Years of Experience */}
                  <div className="border border-[#656565]/30 p-4 border-l-0 border-t-0">
                    <input
                      type="text"
                      placeholder="Years of Experience"
                      className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] font-light text-[16px] focus:outline-none`}
                    />
                  </div>

                  {/* Country */}
                  <div className="border border-[#656565]/30 p-4 border-t-0 relative">
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        placeholder="Country"
                        className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] font-light text-[16px] focus:outline-none`}
                      />
                      <ChevronDown className="text-[#E2DBCC]/70 h-5 w-5" />
                    </div>
                  </div>

                  {/* City */}
                  <div className="border border-[#656565]/30 p-4 border-l-0 border-t-0 relative">
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        placeholder="City"
                        className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] font-light text-[16px] focus:outline-none`}
                      />
                      <ChevronDown className="text-[#E2DBCC]/70 h-5 w-5" />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="border border-[#656565]/30 p-4 border-t-0">
                    <input
                      type="email"
                      placeholder="Email"
                      className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] font-light text-[16px] focus:outline-none`}
                    />
                  </div>

                  {/* Phone */}
                  <div className="border border-[#656565]/30 p-4 border-l-0 border-t-0">
                    <input
                      type="tel"
                      placeholder="Phone"
                      className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] font-light text-[16px] focus:outline-none`}
                    />
                  </div>

                  {/* Message */}
                  <div className="border border-[#656565]/30 p-4 border-t-0 col-span-2">
                    <textarea
                      placeholder="Message"
                      rows="8"
                      className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] font-light text-[16px] focus:outline-none resize-none`}
                    ></textarea>
                  </div>
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  className={`${archivo.className} w-full bg-[#BD9574] text-[#211f17] py-6 font-light text-[18px] hover:bg-[#d4af37] transition-colors`}
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Collaborating Agency Section */}
      <section className="py-20 bg-[#211f17]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`${taviraj.className} text-[48px] font-light mb-8 text-[#E2DBCC]`}>Collaborating Agency</h2>
            <div className="flex items-center justify-center mb-12">
              <div className="w-32 h-[1px] bg-[#656565]/50"></div>
              <div className="w-2 h-2 bg-[#BD9574] transform rotate-45 mx-4"></div>
              <div className="w-32 h-[1px] bg-[#656565]/50"></div>
            </div>
            <p
              className={`${archivo.className} text-[16px] font-light max-w-3xl mx-auto text-center text-[#E2DBCC] leading-[150%]`}
            >
              The Black Diamondz team values your interest in partnering with the right agency to sell your property.
              Our committed professionals are ready to assist you at every stage of the journey.
            </p>
          </div>

          {/* Agency Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {/* Creative Solutions Agency */}
            <div className="flex flex-col items-center">
              <div className="bg-[#1A3541] p-6 mb-4 w-full aspect-square flex items-center justify-center">
                <img src="/placeholder.svg?key=d95s6" alt="Creative Solutions Agency" className="max-w-full max-h-16" />
              </div>
              <h3 className={`${archivo.className} text-[#E2DBCC] text-center font-light text-sm mb-1`}>
                Creative Solutions
                <br />
                Agency
              </h3>
              <p className={`${archivo.className} text-[#BD9574] text-center font-light text-xs`}>Fiji</p>
            </div>

            {/* Innovative Marketing Group */}
            <div className="flex flex-col items-center">
              <div className="bg-[#E5E5E5] p-6 mb-4 w-full aspect-square flex items-center justify-center">
                <img
                  src="/placeholder.svg?key=p24qr"
                  alt="Innovative Marketing Group"
                  className="max-w-full max-h-16"
                />
              </div>
              <h3 className={`${archivo.className} text-[#E2DBCC] text-center font-light text-sm mb-1`}>
                Innovative Marketing
                <br />
                Group
              </h3>
              <p className={`${archivo.className} text-[#BD9574] text-center font-light text-xs`}>Spain</p>
            </div>

            {/* Elevate Creative */}
            <div className="flex flex-col items-center">
              <div className="bg-[#2A3240] p-6 mb-4 w-full aspect-square flex items-center justify-center">
                <img src="/placeholder.svg?key=1181f" alt="Elevate Creative" className="max-w-full max-h-16" />
              </div>
              <h3 className={`${archivo.className} text-[#E2DBCC] text-center font-light text-sm mb-1`}>
                Elevate
                <br />
                Creative
              </h3>
              <p className={`${archivo.className} text-[#BD9574] text-center font-light text-xs`}>Mexico</p>
            </div>

            {/* Dynamic Branding Co. */}
            <div className="flex flex-col items-center">
              <div className="bg-[#E5E5E5] p-6 mb-4 w-full aspect-square flex items-center justify-center">
                <img src="/placeholder.svg?key=nglne" alt="Dynamic Branding Co." className="max-w-full max-h-16" />
              </div>
              <h3 className={`${archivo.className} text-[#E2DBCC] text-center font-light text-sm mb-1`}>
                Dynamic Branding
                <br />
                Co.
              </h3>
              <p className={`${archivo.className} text-[#BD9574] text-center font-light text-xs`}>Argentina</p>
            </div>

            {/* Visionary Strategies LLC */}
            <div className="flex flex-col items-center">
              <div className="bg-[#B8C7E0] p-6 mb-4 w-full aspect-square flex items-center justify-center">
                <img src="/placeholder.svg?key=gjj6u" alt="Visionary Strategies LLC" className="max-w-full max-h-16" />
              </div>
              <h3 className={`${archivo.className} text-[#E2DBCC] text-center font-light text-sm mb-1`}>
                Visionary Strategies
                <br />
                LLC
              </h3>
              <p className={`${archivo.className} text-[#BD9574] text-center font-light text-xs`}>India</p>
            </div>

            {/* Synergy Communications */}
            <div className="flex flex-col items-center">
              <div className="bg-[#4A3A8C] p-6 mb-4 w-full aspect-square flex items-center justify-center">
                <img src="/placeholder.svg?key=1nivt" alt="Synergy Communications" className="max-w-full max-h-16" />
              </div>
              <h3 className={`${archivo.className} text-[#E2DBCC] text-center font-light text-sm mb-1`}>
                Synergy
                <br />
                Communications
              </h3>
              <p className={`${archivo.className} text-[#BD9574] text-center font-light text-xs`}>Kenya</p>
            </div>

            {/* NextGen Advertising */}
            <div className="flex flex-col items-center">
              <div className="bg-[#D9E6E8] p-6 mb-4 w-full aspect-square flex items-center justify-center">
                <img src="/placeholder.svg?key=nnlrt" alt="NextGen Advertising" className="max-w-full max-h-16" />
              </div>
              <h3 className={`${archivo.className} text-[#E2DBCC] text-center font-light text-sm mb-1`}>
                NextGen
                <br />
                Advertising
              </h3>
              <p className={`${archivo.className} text-[#BD9574] text-center font-light text-xs`}>South Korea</p>
            </div>

            {/* Pinnacle Media Partners */}
            <div className="flex flex-col items-center">
              <div className="bg-[#E5E5E5] p-6 mb-4 w-full aspect-square flex items-center justify-center">
                <img src="/placeholder.svg?key=35nrh" alt="Pinnacle Media Partners" className="max-w-full max-h-16" />
              </div>
              <h3 className={`${archivo.className} text-[#E2DBCC] text-center font-light text-sm mb-1`}>
                Pinnacle Media
                <br />
                Partners
              </h3>
              <p className={`${archivo.className} text-[#BD9574] text-center font-light text-xs`}>Italy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
