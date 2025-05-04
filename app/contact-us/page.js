import Header from "@/components/header"
import Footer from "@/components/footer"
import { ChevronDown } from "lucide-react"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"] })

export default function ContactUs() {
  return (
    <main className="bg-[#211f17] min-h-screen">
      <Header />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Info */}
            <div className="flex flex-col justify-center">
              <h1 className={`${taviraj.className} text-[#E2DBCC] text-5xl font-light leading-tight mb-12`}>
                More details?
                <br />
                Contact Us
              </h1>

              <div className={`${archivo.className} text-[#656565] font-light text-base mb-12`}>
                <p className="mb-1">
                  ph{" "}
                  <a href="tel:0409-898-888" className="text-[#BD9574] hover:text-[#d4af37] transition-colors">
                    0409-898-888
                  </a>
                </p>
                <p>
                  email{" "}
                  <a
                    href="mailto:hello@blackdiamondz.co.au"
                    className="text-[#BD9574] hover:text-[#d4af37] transition-colors"
                  >
                    hello@blackdiamondz.co.au
                  </a>
                </p>
              </div>

              {/* Social Media Icons */}
              <div className="flex space-x-6">
                {/* Diamond Icon */}
                <a href="#" className="text-[#656565] hover:text-[#BD9574] transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 12L12 22L22 12L12 2Z" />
                  </svg>
                </a>
                {/* Facebook Icon */}
                <a href="#" className="text-[#656565] hover:text-[#BD9574] transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" />
                  </svg>
                </a>
                {/* Instagram Icon */}
                <a href="#" className="text-[#656565] hover:text-[#BD9574] transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                {/* LinkedIn Icon */}
                <a href="#" className="text-[#656565] hover:text-[#BD9574] transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                {/* WeChat Icon */}
                <a href="#" className="text-[#656565] hover:text-[#BD9574] transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.5 8.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    <path d="M14.5 8.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    <path d="M9.5 17.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    <path d="M14.5 17.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-4.41 3.59-8 8-8s8 3.59 8 8c0 4.08-3.05 7.44-7 7.93V18h-2v1.93z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              {/* User Type Selection */}
              <div className="flex space-x-8 mb-8">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="userType" value="buyer" className="sr-only peer" />
                  <div className="w-5 h-5 border border-[#656565] rounded-full mr-2 flex items-center justify-center peer-checked:border-[#BD9574]">
                    <div className="w-3 h-3 rounded-full bg-[#BD9574] opacity-0 peer-checked:opacity-100"></div>
                  </div>
                  <span className={`${archivo.className} text-[#E2DBCC] font-light`}>Buyer</span>
                </label>

                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="userType" value="seller" className="sr-only peer" defaultChecked />
                  <div className="w-5 h-5 border border-[#656565] rounded-full mr-2 flex items-center justify-center peer-checked:border-[#BD9574]">
                    <div className="w-3 h-3 rounded-full bg-[#BD9574] opacity-0 peer-checked:opacity-100"></div>
                  </div>
                  <span className={`${archivo.className} text-[#E2DBCC] font-light`}>Seller</span>
                </label>

                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="userType" value="agency" className="sr-only peer" />
                  <div className="w-5 h-5 border border-[#656565] rounded-full mr-2 flex items-center justify-center peer-checked:border-[#BD9574]">
                    <div className="w-3 h-3 rounded-full bg-[#BD9574] opacity-0 peer-checked:opacity-100"></div>
                  </div>
                  <span className={`${archivo.className} text-[#E2DBCC] font-light`}>Agency</span>
                </label>
              </div>

              {/* Contact Form */}
              <form className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* First Name */}
                <div className="border border-[#656565]/30 p-4">
                  <input
                    type="text"
                    placeholder="First Name*"
                    className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] placeholder-[#656565] focus:outline-none`}
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="border border-[#656565]/30 border-l-0 md:border-l-0 p-4">
                  <input
                    type="text"
                    placeholder="Last Name*"
                    className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] placeholder-[#656565] focus:outline-none`}
                    required
                  />
                </div>

                {/* Country */}
                <div className="border border-[#656565]/30 border-t-0 p-4 relative">
                  <select
                    className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] placeholder-[#656565] focus:outline-none appearance-none`}
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Country
                    </option>
                    <option value="australia">Australia</option>
                    <option value="china">China</option>
                    <option value="usa">USA</option>
                    <option value="uk">UK</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#656565]" size={16} />
                </div>

                {/* City */}
                <div className="border border-[#656565]/30 border-t-0 border-l-0 md:border-l-0 p-4 relative">
                  <select
                    className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] placeholder-[#656565] focus:outline-none appearance-none`}
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      City
                    </option>
                    <option value="sydney">Sydney</option>
                    <option value="melbourne">Melbourne</option>
                    <option value="brisbane">Brisbane</option>
                    <option value="perth">Perth</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#656565]" size={16} />
                </div>

                {/* Email */}
                <div className="border border-[#656565]/30 border-t-0 p-4">
                  <input
                    type="email"
                    placeholder="Email*"
                    className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] placeholder-[#656565] focus:outline-none`}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="border border-[#656565]/30 border-t-0 border-l-0 md:border-l-0 p-4">
                  <input
                    type="tel"
                    placeholder="Phone*"
                    className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] placeholder-[#656565] focus:outline-none`}
                    required
                  />
                </div>

                {/* Message */}
                <div className="border border-[#656565]/30 border-t-0 p-4 col-span-1 md:col-span-2">
                  <textarea
                    placeholder="Message"
                    className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] placeholder-[#656565] focus:outline-none h-32 resize-none`}
                  ></textarea>
                </div>

                {/* Send Button */}
                <div className="col-span-1 md:col-span-2">
                  <button
                    type="submit"
                    className={`${archivo.className} w-full bg-[#BD9574] text-[#211f17] py-4 hover:bg-[#d4af37] transition-colors`}
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
