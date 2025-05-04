/**
 * Footer Component
 *
 * Site-wide footer containing navigation links, newsletter signup,
 * contact information, and social media links.
 *
 * The footer is organized in a responsive grid layout that adjusts
 * based on screen size.
 *
 * @component
 */
import Link from "next/link"
import { Archivo } from "next/font/google"

const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"] })

export default function Footer() {
  return (
    <footer className={`${archivo.className} bg-[#211f17] text-white py-16`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-16">
          {/* Left Column - Logo and Copyright */}
          <div className="flex flex-col">
            {/* Logo */}
            <div className="mb-8">
              <div className="flex flex-col items-start">
                <div className="text-white text-[32px] font-normal tracking-wider mb-1">
                  BLACK DI
                  <span className="relative">
                    A<span className="absolute -top-1 left-1 text-[#BD9574]">◆</span>
                  </span>
                  MONDZ
                </div>
                <div className="text-white text-[14px] font-light tracking-[4px] uppercase mb-2">
                  PROPERTY CONCIERGE
                </div>
                <div className="w-full h-[1px] bg-white"></div>
              </div>
            </div>

            {/* Copyright */}
            <div className="font-light text-[14px] text-white opacity-80">© 2005–2025 • Black Diamondz Corp.</div>
          </div>

          {/* Right Column - Newsletter, Contact and Social Media */}
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Newsletter and Contact */}
            <div className="flex flex-col gap-16">
              {/* Newsletter */}
              {/* Newsletter signup form - connects to marketing service in production */}
              <div className="flex flex-col items-start gap-4 w-full lg:w-[633px]">
                <div className="w-full text-[#A1A1AA] font-light text-[16px] leading-[150%] font-['Archivo']">
                  BLACK DIAMONDZ NEWSLETTER
                </div>
                <div className="flex flex-row w-full gap-5">
                  <div className="relative flex-grow">
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full h-[60px] bg-transparent border border-[#656565] px-4 py-3 text-white focus:outline-none focus:border-[#BD9574] font-light font-['Archivo']"
                    />
                  </div>
                  <button className="bg-[#BD9574] text-[#211f17] px-6 py-3 h-[60px] w-[160px] font-light font-['Archivo'] hover:bg-[#d4af37] transition-colors flex justify-center items-center">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Contact */}
              <div className="flex flex-col gap-4">
                <div className="text-[#A1A1AA] font-light text-[16px] leading-[150%] font-['Archivo']">OUR CONTACT</div>
                <div className="flex flex-col gap-2">
                  <div>
                    <span className="text-[#A1A1AA] font-light text-[16px] font-['Archivo']">ph </span>
                    <Link
                      href="tel:0409-898-888"
                      className="text-[#BD9574] font-light text-[16px] hover:text-[#d4af37] transition-colors font-['Archivo']"
                    >
                      0409-898-888
                    </Link>
                  </div>
                  <div>
                    <span className="text-[#A1A1AA] font-light text-[16px] font-['Archivo']">email </span>
                    <Link
                      href="mailto:hello@blackdiamondz.co.au"
                      className="text-[#BD9574] font-light text-[16px] hover:text-[#d4af37] transition-colors font-['Archivo']"
                    >
                      hello@blackdiamondz.co.au
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Icons - Horizontal layout */}
            <div className="flex flex-row items-center gap-8 self-start pt-[42px]">
              {/* Diamond Icon */}
              <Link href="#" className="text-[#656565] hover:text-[#BD9574] transition-colors">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 12L12 22L22 12L12 2Z" />
                </svg>
              </Link>

              {/* Facebook Icon */}
              <Link href="#" className="text-[#656565] hover:text-[#BD9574] transition-colors">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" />
                </svg>
              </Link>

              {/* Instagram Icon */}
              <Link href="#" className="text-[#656565] hover:text-[#BD9574] transition-colors">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </Link>

              {/* LinkedIn Icon */}
              <Link href="#" className="text-[#656565] hover:text-[#BD9574] transition-colors">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>

              {/* WeChat Icon */}
              <Link href="#" className="text-[#656565] hover:text-[#BD9574] transition-colors">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.5 8.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  <path d="M14.5 8.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  <path d="M9.5 17.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  <path d="M14.5 17.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-4.41 3.59-8 8-8s8 3.59 8 8c0 4.08-3.05 7.44-7 7.93V18h-2v1.93z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
