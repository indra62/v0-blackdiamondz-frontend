/**
 * Menu Component
 *
 * Renders the main navigation menu overlay when triggered.
 * Handles responsive layout for both desktop and mobile views.
 *
 * Implementation notes:
 * - Uses absolute positioning on desktop for specific alignment requirements
 * - Falls back to standard flow on mobile for better UX
 * - Calculates positions dynamically based on DOM elements
 */
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"
import { useMediaQuery } from "../hooks/use-media-query"
import { getImageUrl, submitSubscribe } from "@/lib/api"
import { toast, Toaster } from "react-hot-toast"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"] })

export default function Menu({ dataSocial, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    email: "",
  })
  const [contactPosition, setContactPosition] = useState(0)
  const [newsletterPosition, setNewsletterPosition] = useState(0)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Calculate positions for desktop layout elements
  // This is needed to align the newsletter and contact sections with specific nav items
  useEffect(() => {
    if (isOpen) {
      // Wait for the DOM to be fully rendered
      setTimeout(() => {
        const contactUsLink = document.getElementById("contact-us-link")
        const clubDiamondzLink = document.getElementById("club-diamondz-link")

        if (contactUsLink && !isMobile) {
          // Get the position of the Contact Us link and move it one row up
          const position = contactUsLink.getBoundingClientRect().top
          // Move up by 40px (one row) + additional 40px (one more row) + space between sections
          setContactPosition(position - 80 + 60) // -80px for two rows up, +60px for spacing between sections
        }

        if (clubDiamondzLink && !isMobile) {
          // Get the position of the Club Diamondz link and move it one row up
          const position = clubDiamondzLink.getBoundingClientRect().top
          // Move up by 40px (one row) + additional 40px (one more row)
          setNewsletterPosition(position - 80) // Move up by 80px (two rows)
        }
      }, 100) // Small delay to ensure DOM is ready
    }
  }, [isOpen, isMobile])

  // Form submission handler for newsletter signup
  // Currently logs to console but should be connected to API in production
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formPayload = {
        email: formData.email,
      }

      await submitSubscribe(formPayload)
      setFormData({
        email: "",
      })

      toast.success("Subscribed!", {
        style: {
          background: "#BD9574",
          color: "#211F17",
          border: "1px solid #211F17",
          borderRadius: "99px",
          padding: "16px 24px",
        },
        duration: 3000,
      })
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.", {
        style: {
          background: "#A1A1AA",
          color: "#211F17",
          border: "1px solid #211F17",
          borderRadius: "99px",
          padding: "16px 24px",
        },
      })
    }
  }

  // Conditional rendering based on menu state
  // Early return pattern for closed menu state
  if (!isOpen) return null

  // Main menu overlay with responsive layout
  // Uses flex-col on mobile and standard flex on desktop
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
          <button
            onClick={onClose}
            className="text-white hover:text-[#BD9574] transition-colors"
          >
            <X size={32} />
          </button>
        </div>

        <div className={`${isMobile ? "flex flex-col" : "flex"}`}>
          {/* Left Side - Navigation */}
          <div className={`${isMobile ? "w-full" : "flex-1"}`}>
            <nav className="grid grid-cols-1 content-start gap-y-4">
              <Link
                href="/buy"
                className={`${taviraj.className} text-white text-[28px] leading-none font-normal hover:text-[#BD9574] transition-colors`}
              >
                Buy
              </Link>
              <Link
                href="/sell"
                className={`${taviraj.className} text-white text-[28px] leading-none font-normal hover:text-[#BD9574] transition-colors mb-4`}
              >
                Sell
              </Link>

              <div className="border-t border-[#656565]/30 my-4"></div>

              <Link
                href="/our-story"
                className={`${taviraj.className} text-white text-[28px] leading-none font-normal hover:text-[#BD9574] transition-colors`}
              >
                Our Story
              </Link>
              <Link
                href="/our-team"
                className={`${taviraj.className} text-white text-[28px] leading-none font-normal hover:text-[#BD9574] transition-colors`}
              >
                Our Team
              </Link>
              <Link
                href="/agency"
                className={`${taviraj.className} text-white text-[28px] leading-none font-normal hover:text-[#BD9574] transition-colors`}
              >
                Agency
              </Link>
              <Link
                href="/media"
                className={`${taviraj.className} text-white text-[28px] leading-none font-normal hover:text-[#BD9574] transition-colors mb-4`}
              >
                Media
              </Link>

              <div className="border-t border-[#656565]/30 my-4"></div>

              <Link
                href="/club-diamondz"
                id="club-diamondz-link"
                className={`${taviraj.className} text-white text-[28px] leading-none font-normal hover:text-[#BD9574] transition-colors mb-4`}
              >
                Club Diamondz
              </Link>

              <div className="border-t border-[#656565]/30 my-4"></div>

              <Link
                href="/contact-us"
                id="contact-us-link"
                className={`${taviraj.className} text-white text-[28px] leading-none font-normal hover:text-[#BD9574] transition-colors`}
              >
                Contact Us
              </Link>
              <Link
                href="/privacy-policy"
                className={`${taviraj.className} text-white text-[28px] leading-none font-normal hover:text-[#BD9574] transition-colors`}
              >
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Right Side - Newsletter and Contact */}
          <div
            className={isMobile ? "w-full mt-12" : ""}
            style={!isMobile ? { width: "633px", marginLeft: "8px" } : {}}
          >
            {/* Newsletter - Aligned with Club Diamondz */}
            <div
              style={
                !isMobile
                  ? {
                      position: "absolute",
                      top: newsletterPosition ? newsletterPosition : "auto",
                      width: "633px",
                      marginLeft: "8px",
                    }
                  : {}
              }
              className={isMobile ? "mb-12" : ""}
            >
              <h3
                className={`${archivo.className} text-[#ADADAD] text-base font-light leading-[150%] uppercase`}
                style={{ marginBottom: "24px" }}
              >
                BLACK DIAMONDZ NEWSLETTER
              </h3>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col md:flex-row gap-0"
                style={{ margin: 0, padding: 0 }}
              >
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="flex-grow bg-transparent border border-[#656565] p-4 text-[#ADADAD] focus:outline-none focus:border-[#BD9574] text-lg"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#BD9574] text-[#211f17] px-8 py-4 hover:bg-[#BD9574] transition-colors md:border-l-0 text-lg"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Contact - Aligned with Contact Us */}
            <div
              className={isMobile ? "mb-16" : "mb-16"}
              style={
                !isMobile
                  ? {
                      position: "absolute",
                      top: contactPosition ? contactPosition : "auto",
                      width: "633px",
                      marginLeft: "8px",
                    }
                  : {}
              }
            >
              <h3
                className={`${archivo.className} text-[#ADADAD] text-base font-light leading-[150%] uppercase`}
                style={{ marginBottom: "24px" }}
              >
                OUR CONTACT
              </h3>
              <div
                className="flex flex-col md:flex-row justify-between items-start md:items-center"
                style={{ margin: 0, padding: 0 }}
              >
                <div className="mb-6 md:mb-0">
                  <div className="mb-2 md:mb-0">
                    <span
                      className={`${archivo.className} text-[#ADADAD] font-light text-base leading-[150%] tracking-[0px]`}
                    >
                      ph{" "}
                    </span>
                    <a
                      href={`tel:${dataSocial?.phone_contact}`}
                      className="text-[#BD9574] hover:text-[#BD9574] transition-colors font-light text-base leading-[150%]"
                    >
                      {dataSocial?.phone_contact}
                    </a>
                  </div>

                  <div className="flex items-center mt-2 md:mt-0">
                    <span
                      className={`${archivo.className} text-[#ADADAD] font-light text-base leading-[150%] tracking-[0px]`}
                    >
                      email{" "}
                    </span>
                    <a
                      href={`mailto:${dataSocial?.email_contact}`}
                      className="text-[#BD9574] hover:text-[#BD9574] transition-colors font-light text-base leading-[150%]"
                    >
                      {dataSocial?.email_contact}
                    </a>
                  </div>
                </div>

                {/* Social Media Icons - Aligned to the right */}
                <div className="flex items-center space-x-4 md:space-x-6">
                  {/* Diamond Icon */}
                  {dataSocial?.show_diamondz_group && (
                    <a
                      href={dataSocial?.diamondz_group_url}
                      className="text-[#656565] hover:text-[#BD9574] transition-colors w-[40px] h-[40px] md:w-[49px] md:h-[49px] flex items-center justify-center"
                    >
                      <svg
                        width="24"
                        height="24"
                        className="md:w-7 md:h-7"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2L2 12L12 22L22 12L12 2Z" />
                      </svg>
                    </a>
                  )}

                  {/* Facebook Icon */}
                  {dataSocial?.show_facebook && (
                    <a
                      hhref={dataSocial?.facebook_url}
                      className="text-[#656565] hover:text-[#BD9574] transition-colors w-[40px] h-[40px] md:w-[49px] md:h-[49px] flex items-center justify-center"
                    >
                      <svg
                        width="24"
                        height="24"
                        className="md:w-7 md:h-7"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                    </a>
                  )}

                  {/* Instagram Icon */}
                  {dataSocial?.show_instagram && (
                    <a
                      href={dataSocial?.instagram_url}
                      className="text-[#656565] hover:text-[#BD9574] transition-colors w-[40px] h-[40px] md:w-[49px] md:h-[49px] flex items-center justify-center"
                    >
                      <svg
                        width="24"
                        height="24"
                        className="md:w-7 md:h-7"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.041 0 2.67.01 2.986.058 4.04.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058 2.67 0 2.987-.01 4.04-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041 0-2.67-.01-2.986-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.041-.058zm0 3.063a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm6.538-8.469a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
                      </svg>
                    </a>
                  )}

                  {/* LinkedIn Icon */}
                  {dataSocial?.show_linkedin && (
                    <a
                      href={dataSocial?.linkedin_url}
                      className="text-[#656565] hover:text-[#BD9574] transition-colors w-[40px] h-[40px] md:w-[49px] md:h-[49px] flex items-center justify-center"
                    >
                      <svg
                        width="24"
                        height="24"
                        className="md:w-7 md:h-7"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}

                  {/* WeChat Icon */}
                  {dataSocial?.show_wechat && (
                    <a
                      href={dataSocial?.wechat_url}
                      className="text-[#656565] hover:text-[#BD9574] transition-colors w-[40px] h-[40px] md:w-[49px] md:h-[49px] flex items-center justify-center"
                    >
                      <svg
                        width="24"
                        height="24"
                        className="md:w-7 md:h-7"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M9.5 8.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        <path d="M14.5 8.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        <path d="M9.5 17.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        <path d="M14.5 17.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-4.41 3.59-8 8-8s8 3.59 8 8c0 4.08-3.05 7.44-7 7.93V18h-2v1.93z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
