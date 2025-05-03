import Header from "@/components/Header"
import Stats from "@/components/Stats"
import Footer from "@/components/Footer"
import Image from "next/image"
import Link from "next/link"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"] })

export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-[#211f17]">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black_Diamondz__AUS_.png-LsiwGZYoWQV7ecrPlwMowKn6onTXYf.jpeg"
            alt="Sydney Harbour Bridge and Opera House at sunset"
            fill
            priority
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(0deg, rgba(33, 31, 23, 0.7), rgba(33, 31, 23, 0.7))",
            }}
          ></div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
          <h1
            className={`${taviraj.className} text-[#E2DBCC] text-[48px] md:text-[56px] font-light leading-[125%] tracking-[2px] mb-8`}
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
            className={`${archivo.className} text-[#E2DBCC] font-light text-base leading-[150%] max-w-3xl mx-auto mb-4`}
          >
            Our point of difference in a saturated market is our unmatched international database, specializing in
            high-end luxury residential property sales, investment properties and business solutions.
          </p>

          <p className={`${archivo.className} text-[#E2DBCC] font-light text-base leading-[150%] max-w-3xl mx-auto`}>
            Our industry expertise, negotiating prowess and suite of integrated services ensure that we remain firmly at
            the forefront of the market, all while providing a bespoke and VIP client offering. With a long-term
            Chinese, Australian, and international client base, Black Diamondz Property and Monika Tu, Black Diamondz
            Group's Founder and Director, is a total property and local marketing package that we provide the very best
            solution for buyers and sellers alike.
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
              src="/professional-man-suit.png"
              alt="Market with Us"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-12 left-0 right-0 text-center">
              <h3 className={`${taviraj.className} text-white text-[32px] font-light leading-[120%]`}>
                Market
                <br />
                with Us
              </h3>
            </div>
          </div>

          {/* Buy Property */}
          <div className="relative h-[400px] group overflow-hidden">
            <Image
              src="/placeholder.svg?key=prspf"
              alt="Buy Property"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-12 left-0 right-0 text-center">
              <h3 className={`${taviraj.className} text-white text-[32px] font-light leading-[120%]`}>
                Buy
                <br />
                Property
              </h3>
            </div>
          </div>

          {/* Sell Your Property */}
          <div className="relative h-[400px] group overflow-hidden">
            <Image
              src="/placeholder.svg?key=w4gg4"
              alt="Sell Your Property"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-12 left-0 right-0 text-center">
              <h3 className={`${taviraj.className} text-white text-[32px] font-light leading-[120%]`}>
                Sell Your
                <br />
                Property
              </h3>
            </div>
          </div>

          {/* Club Diamondz */}
          <div className="relative h-[400px] group overflow-hidden">
            <Image
              src="/placeholder.svg?key=k3gaa"
              alt="Club Diamondz"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-12 left-0 right-0 text-center">
              <h3 className={`${taviraj.className} text-white text-[32px] font-light leading-[120%]`}>
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
              <h2 className={`${taviraj.className} text-[#E2DBCC] text-[32px] font-light leading-[120%] mb-8`}>
                Beyond selling properties, we're also helps large and small organizations in reaching their top
                confidence to fly higher and grow better.
              </h2>
            </div>

            {/* Right Column */}
            <div>
              <p className={`${archivo.className} text-[#E2DBCC] font-light text-base leading-[150%] mb-6`}>
                Black Diamondz PR & Marketing is fast becoming Australia's leading premium communications agency. As the
                authority on the Chinese-Australian audience, we know how to leverage real insight to create branded
                content, communications strategies and event experiences that resonate by engaging and meaningful way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-16 relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image src="/placeholder.svg?key=7q9v2" alt="Our Team" fill className="object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(0deg, rgba(33, 31, 23, 0.8), rgba(33, 31, 23, 0.8))",
            }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 text-center">
          <h2 className={`${taviraj.className} text-[#E2DBCC] text-[48px] font-light leading-[120%] mb-8`}>
            Meet Our Team
          </h2>

          {/* Diamond Separator */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-24 h-[1px] bg-[#BD9574]"></div>
            <div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
            <div className="w-24 h-[1px] bg-[#BD9574]"></div>
          </div>

          {/* Team Button - This would link to a team page */}
          <div className="mt-12">
            <Link
              href="/team"
              className="inline-flex items-center text-[#BD9574] hover:text-[#e5c04b] transition-colors group border border-[#BD9574] hover:border-[#e5c04b] px-8 py-3"
            >
              <span className={`${archivo.className} mr-2 font-light text-base leading-6`}>View Our Team</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className={`${taviraj.className} text-[#E2DBCC] text-[48px] font-light leading-[120%] mb-8`}>Partners</h2>

          {/* Diamond Separator */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="w-24 h-[1px] bg-[#BD9574]"></div>
            <div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
            <div className="w-24 h-[1px] bg-[#BD9574]"></div>
          </div>

          <p
            className={`${archivo.className} text-[#E2DBCC] font-light text-base leading-[150%] max-w-3xl mx-auto mb-16`}
          >
            Our curated list of partners is designed to connect you with the best agencies for selling your property.
            Each partner is dedicated to providing exceptional support throughout the entire process, ensuring a
            seamless experience.
          </p>

          {/* Partners Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {/* Partner 1 */}
            <div className="bg-[#2c2920] p-6 flex flex-col items-center">
              <div className="w-24 h-24 mb-4 relative">
                <Image
                  src="/placeholder.svg?key=45dks"
                  alt="Premier Property Concierge"
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
              <h4 className={`${archivo.className} text-[#BD9574] font-light text-base mb-1`}>
                Premier Property Concierge
              </h4>
              <p className={`${archivo.className} text-[#656565] font-light text-sm`}>Established</p>
            </div>

            {/* Partner 2 */}
            <div className="bg-[#2c2920] p-6 flex flex-col items-center">
              <div className="w-24 h-24 mb-4 relative">
                <Image
                  src="/placeholder.svg?key=xhfxz"
                  alt="Innovative Property Management"
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
              <h4 className={`${archivo.className} text-[#BD9574] font-light text-base mb-1`}>
                Innovative Property Management
              </h4>
              <p className={`${archivo.className} text-[#656565] font-light text-sm`}>1997</p>
            </div>

            {/* Partner 3 */}
            <div className="bg-[#2c2920] p-6 flex flex-col items-center">
              <div className="w-24 h-24 mb-4 relative">
                <Image
                  src="/placeholder.svg?key=mtnyw"
                  alt="Energizer Property Services"
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
              <h4 className={`${archivo.className} text-[#BD9574] font-light text-base mb-1`}>
                Energizer Property Services
              </h4>
              <p className={`${archivo.className} text-[#656565] font-light text-sm`}>2003</p>
            </div>

            {/* Partner 4 */}
            <div className="bg-[#2c2920] p-6 flex flex-col items-center">
              <div className="w-24 h-24 mb-4 relative">
                <Image
                  src="/placeholder.svg?key=npzpk"
                  alt="Dynamic Realty Concierge"
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
              <h4 className={`${archivo.className} text-[#BD9574] font-light text-base mb-1`}>
                Dynamic Realty Concierge
              </h4>
              <p className={`${archivo.className} text-[#656565] font-light text-sm`}>2010</p>
            </div>

            {/* Partner 5 */}
            <div className="bg-[#2c2920] p-6 flex flex-col items-center">
              <div className="w-24 h-24 mb-4 relative">
                <Image
                  src="/placeholder.svg?key=90qw5"
                  alt="Vision Property Partners"
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
              <h4 className={`${archivo.className} text-[#BD9574] font-light text-base mb-1`}>
                Vision Property Partners
              </h4>
              <p className={`${archivo.className} text-[#656565] font-light text-sm`}>2015</p>
            </div>

            {/* Partner 6 */}
            <div className="bg-[#2c2920] p-6 flex flex-col items-center">
              <div className="w-24 h-24 mb-4 relative">
                <Image
                  src="/placeholder.svg?key=bjdhz"
                  alt="Harmony Home Solutions"
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
              <h4 className={`${archivo.className} text-[#BD9574] font-light text-base mb-1`}>
                Harmony Home Solutions
              </h4>
              <p className={`${archivo.className} text-[#656565] font-light text-sm`}>2008</p>
            </div>

            {/* Partner 7 */}
            <div className="bg-[#2c2920] p-6 flex flex-col items-center">
              <div className="w-24 h-24 mb-4 relative">
                <Image
                  src="/placeholder.svg?height=100&width=100&query=concierge realty logo"
                  alt="Concierge Realty Services"
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
              <h4 className={`${archivo.className} text-[#BD9574] font-light text-base mb-1`}>
                Concierge Realty Services
              </h4>
              <p className={`${archivo.className} text-[#656565] font-light text-sm`}>2012</p>
            </div>

            {/* Partner 8 */}
            <div className="bg-[#2c2920] p-6 flex flex-col items-center">
              <div className="w-24 h-24 mb-4 relative">
                <Image
                  src="/placeholder.svg?height=100&width=100&query=propeller property advisors logo"
                  alt="Propeller Property Advisors"
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
              <h4 className={`${archivo.className} text-[#BD9574] font-light text-base mb-1`}>
                Propeller Property Advisors
              </h4>
              <p className={`${archivo.className} text-[#656565] font-light text-sm`}>2018</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-[#2c2920]">
        <div className="container mx-auto px-4 text-center">
          <h2 className={`${archivo.className} text-[#E2DBCC] font-light text-xl uppercase mb-8`}>
            BLACK DIAMONDZ NEWSLETTER
          </h2>

          <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Email"
              className="flex-grow bg-transparent border border-[#656565] px-4 py-3 text-white focus:outline-none focus:border-[#BD9574]"
            />
            <button className="bg-[#BD9574] text-[#211f17] px-8 py-3 font-light hover:bg-[#d4af37] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
