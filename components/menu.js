"use client"

import { useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"] })

export default function Menu({ isOpen, onClose }) {
  const [email, setEmail] = useState("")

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribed with email:", email)
    setEmail("")
  }

  return (
    <div className="fixed inset-0 bg-[#211f17] z-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-12">
          {/* Diamond Logo */}
          <Link href="/" className="text-white">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smallLogoBD-zxDglqhR7Dv3zdEHln30LxjDUQXDD7.png"
              alt="Black Diamondz Logo"
              className="w-6 h-6"
            />
          </Link>

          {/* Close Button */}
          <button onClick={onClose} className="text-white hover:text-[#BD9574] transition-colors">
            <X size={32} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left Side - Navigation */}
          <div>
            <nav className="grid grid-cols-1 content-start gap-y-4">
              <Link
                href="/buy"
                className={`${taviraj.className} text-white text-[28px] leading-[40px] font-normal hover:text-[#BD9574] transition-colors`}
              >
                Buy
              </Link>
              <Link
                href="/sell"
                className={`${taviraj.className} text-white text-[28px] leading-[40px] font-normal hover:text-[#BD9574] transition-colors mb-5`}
              >
                Sell
              </Link>

              <div className="border-t border-[#656565]/30 my-5"></div>

              <Link
                href="/our-story"
                className={`${taviraj.className} text-white text-[28px] leading-[40px] font-normal hover:text-[#BD9574] transition-colors`}
              >
                Our Story
              </Link>
              <Link
                href="/our-team"
                className={`${taviraj.className} text-white text-[28px] leading-[40px] font-normal hover:text-[#BD9574] transition-colors`}
              >
                Our Team
              </Link>
              <Link
                href="/agency"
                className={`${taviraj.className} text-white text-[28px] leading-[40px] font-normal hover:text-[#BD9574] transition-colors`}
              >
                Agency
              </Link>
              <Link
                href="/media"
                className={`${taviraj.className} text-white text-[28px] leading-[40px] font-normal hover:text-[#BD9574] transition-colors mb-5`}
              >
                Media
              </Link>

              <div className="border-t border-[#656565]/30 my-5"></div>

              <Link
                href="/club-diamondz"
                className={`${taviraj.className} text-white text-[28px] leading-[40px] font-normal hover:text-[#BD9574] transition-colors mb-5`}
              >
                Club Diamondz
              </Link>

              <div className="border-t border-[#656565]/30 my-5"></div>

              <Link
                href="/contact-us"
                className={`${taviraj.className} text-white text-[28px] leading-[40px] font-normal hover:text-[#BD9574] transition-colors`}
                id="contact-us-link"
              >
                Contact Us
              </Link>
              <Link
                href="/privacy-policy"
                className={`${taviraj.className} text-white text-[28px] leading-[40px] font-normal hover:text-[#BD9574] transition-colors`}
              >
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Right Side - Newsletter and Contact */}
          <div>
            <div className="grid grid-cols-1 grid-rows-[auto_1fr] h-full">
              {/* Newsletter - Top */}
              <div>
                <h3
                  className={`${archivo.className} text-[#656565] text-base font-light leading-[150%] uppercase mb-6`}
                >
                  BLACK DIAMONDZ NEWSLETTER
                </h3>
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-0 mb-16">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow bg-transparent border border-[#656565] p-4 text-white focus:outline-none focus:border-[#BD9574]"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#BD9574] text-[#211f17] px-8 py-4 hover:bg-[#d4af37] transition-colors md:border-l-0"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Contact - Middle, aligned with Contact Us */}
              <div className="self-end mb-16" style={{ marginTop: "calc(100vh - 480px)" }}>
                <h3
                  className={`${archivo.className} text-[#656565] text-base font-light leading-[150%] uppercase mb-6`}
                >
                  OUR CONTACT
                </h3>
                <div className="space-y-4">
                  <p className={`${archivo.className} text-[#656565] font-light text-base leading-[150%]`}>
                    ph{" "}
                    <a href="tel:0409-898-888" className="text-[#BD9574] hover:text-[#d4af37] transition-colors">
                      0409-898-888
                    </a>
                  </p>

                  <div className="flex items-center">
                    <p className={`${archivo.className} text-[#656565] font-light text-base leading-[150%] mr-4`}>
                      email{" "}
                      <a
                        href="mailto:hello@blackdiamondz.co.au"
                        className="text-[#BD9574] hover:text-[#d4af37] transition-colors"
                      >
                        hello@blackdiamondz.co.au
                      </a>
                    </p>

                    {/* Social Media Icons - Next to Email */}
                    <div className="flex space-x-4">
                      {/* Diamond Icon */}
                      <a href="#" className="text-[#656565] hover:text-[#BD9574] transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L2 12L12 22L22 12L12 2Z" />
                        </svg>
                      </a>
                      {/* Facebook Icon */}
                      <a href="#" className="text-[#656565] hover:text-[#BD9574] transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" />
                        </svg>
                      </a>
                      {/* Instagram Icon */}
                      <a href="#" className="text-[#656565] hover:text-[#BD9574] transition-colors">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      </a>
                      {/* LinkedIn Icon */}
                      <a href="#" className="text-[#656565] hover:text-[#BD9574] transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      </a>
                      {/* WeChat Icon */}
                      <a href="#" className="text-[#656565] hover:text-[#BD9574] transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9.5 8.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                          <path d="M14.5 8.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                          <path d="M9.5 17.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                          <path d="M14.5 17.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-4.41 3.59-8 8-8s8 3.59 8 8c0 4.08-3.05 7.44-7 7.93V18h-2v1.93z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
