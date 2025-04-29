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
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Newsletter and Contact */}
            <div className="flex flex-col">
              {/* Newsletter */}
              <div className="mb-12">
                <div className="text-[#A1A1AA] font-light text-[14px] mb-6 uppercase">BLACK DIAMONDZ NEWSLETTER</div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="bg-transparent border border-[#656565] px-4 py-3 w-full sm:w-[320px] text-white focus:outline-none focus:border-[#BD9574]"
                  />
                  <button className="bg-[#BD9574] text-[#211f17] px-8 py-3 font-light hover:bg-[#d4af37] transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Contact */}
              <div>
                <div className="text-[#A1A1AA] font-light text-[14px] mb-6 uppercase">OUR CONTACT</div>
                <div className="mb-2">
                  <span className="text-[#A1A1AA] font-light text-[14px]">ph </span>
                  <Link
                    href="tel:0409-898-888"
                    className="text-[#BD9574] font-light text-[14px] hover:text-[#d4af37] transition-colors"
                  >
                    0409-898-888
                  </Link>
                </div>
                <div>
                  <span className="text-[#A1A1AA] font-light text-[14px]">email </span>
                  <Link
                    href="mailto:hello@blackdiamondz.co.au"
                    className="text-[#BD9574] font-light text-[14px] hover:text-[#d4af37] transition-colors"
                  >
                    hello@blackdiamondz.co.au
                  </Link>
                </div>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex flex-col items-center self-start pt-[42px]">
              <div className="flex flex-col gap-8">
                {/* Diamond Icon */}
                <Link href="#" className="text-[#656565] hover:text-[#BD9574] transition-colors">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2L2 12L12 22L22 12L12 2Z" />
                    <line x1="6" y1="22" x2="18" y2="22" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </Link>

                {/* Facebook Icon */}
                <Link href="#" className="text-[#656565] hover:text-[#BD9574] transition-colors">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </Link>

                {/* WeChat Icon */}
                <Link href="#" className="text-[#656565] hover:text-[#BD9574] transition-colors">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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
      </div>
    </footer>
  )
}
