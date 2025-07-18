"use client"
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
import { Archivo, Taviraj } from "next/font/google"
import { X } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import {
  getImageUrl,
  getItems,
  submitSubscribe,
  submitNewsletterSubscribe,
} from "@/lib/api"
import Image from "next/image"

const taviraj = Taviraj({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const currentyear = new Date().getFullYear()

export default function Footer({ dark = true }) {
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    email: "",
  })
  const [showWeChatModal, setShowWeChatModal] = useState(false)

  useEffect(() => {
    const fetchDataSocial = async () => {
      try {
        const dataFooter = await getItems("footer", {
          fields: ["*.*"],
        })

        setData(dataFooter)
        setLoading(false)
      } catch (err) {
        setError("Failed to load home data:" + err.message)
        setLoading(false)
      }
    }
    fetchDataSocial()
  }, [])

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

      await submitNewsletterSubscribe(formPayload)
      setFormData({
        email: "",
      })

      // Show success toast
      toast.success("Subscribed to newsletter!", {
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
      // Show error toast
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

  return (
    <>
      <footer
        className={`${archivo.className} ${
          dark ? "bg-[#211f17]" : "bg-[#FBF4E4]"
        } text-white py-16`}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8">
            {/* Left Column - Logo and Copyright */}
            <div className="flex flex-col items-center">
              {/* Logo - Using the CMS image */}
              <div>
                <div className="flex flex-col items-center md:items-start">
                  <div className="relative max-w-[600px] h-auto">
                    {dark ? (
                      <div className="text-center md:text-left">
                        <h2
                          className={`${taviraj.className} text-[#e2dbcc] text-[24px] font-light tracking-[2px] mb-4`}
                        >
                          {data?.newsletter_title || ""}
                        </h2>

                        <p
                          className={`${archivo.className} text-[#E2DBCC] font-light text-base leading-6 mb-4 max-w-lg`}
                        >
                          {data?.newsletter_description || ""}
                        </p>
                      </div>
                    ) : (
                      <div className="text-center md:text-left">
                        <h2
                          className={`${taviraj.className} text-[#211f17] text-[24px] font-light tracking-[2px] mb-4`}
                        >
                          {data?.newsletter_title || ""}
                        </h2>

                        <p
                          className={`${archivo.className} text-[#211f17] font-light text-base leading-6 mb-4 max-w-lg`}
                        >
                          {data?.newsletter_description || ""}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Newsletter, Contact and Social Media */}

            {/* Newsletter */}
            <div className="flex flex-col items-start gap-4 w-full">
              <div
                className={`w-full ${
                  dark ? "text-[#A1A1AA]" : "text-[#BD9574]"
                } font-light text-[16px] leading-[150%] font-['Archivo'] text-center md:text-left`}
              >
                BLACK DIAMONDZ NEWSLETTER
              </div>
              <form onSubmit={handleSubmit} className="flex w-full">
                <div className="flex flex-col md:flex-row w-full gap-5">
                  <div className="relative flex-grow min-w-0">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="w-full h-[60px] bg-transparent border border-[#656565] px-4 py-3 text-white focus:outline-none focus:border-[#BD9574] font-light font-['Archivo']"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className={`${
                      dark ? "bg-[#BD9574]" : "bg-[#E2DBCC]"
                    } text-[#211f17] px-6 py-3 h-[60px] md:w-[160px] w-full font-light font-['Archivo'] hover:bg-[#BD9574] transition-colors flex justify-center items-center`}
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>

            {/* Left Column - Logo and Copyright */}
            <div className="flex flex-col items-center">
              {/* Logo - Using the CMS image */}
              <div>
                <div className="flex w-[400px] flex-col items-center md:items-start">
                  <div className="mb-4 relative w-[400px] h-14">
                    <div className="flex w-full justify-center">
                      {dark ? (
                        <Image
                          src={
                            getImageUrl(data?.footer_logo?.id, {
                              format: "webp",
                              quality: 80,
                              fit: "fit",
                            }) || "/placeholder-image.jpg"
                          }
                          alt={
                            data?.footer_logo?.filename_download ||
                            "Black Diamondz Logo"
                          }
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          style={{ objectFit: "contain" }}
                        />
                      ) : (
                        <Image
                          src={
                            getImageUrl(data?.footer_logo_light?.id, {
                              format: "webp",
                              quality: 80,
                              fit: "fit",
                            }) || "/placeholder-image.jpg"
                          }
                          alt={
                            data?.footer_logo?.filename_download ||
                            "Black Diamondz Logo"
                          }
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          style={{ objectFit: "contain" }}
                        />
                      )}
                    </div>
                  </div>
                  {/* Copyright */}
                  <div
                    className={`font-light text-[14px] ${
                      dark ? "text-white" : "text-[#211F17]"
                    } opacity-80 mb-8 text-center hover:opacity-100 w-[400px] transition-opacity`}
                  >
                    © 2005–{currentyear} • Black Diamondz Corp.
                  </div>
                </div>
              </div>
            </div>

            {/* Contact and Social Media in a row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact */}
              <div className="flex flex-col gap-4">
                <div
                  className={`${
                    dark ? "text-[#A1A1AA]" : "text-[#BD9574]"
                  } font-light text-[16px] leading-[150%] font-['Archivo'] text-center md:text-left`}
                >
                  OUR CONTACT
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-center md:text-left">
                    <span
                      className={`${
                        dark ? "text-[#A1A1AA]" : "text-[#BD9574]"
                      } font-light text-[16px] font-['Archivo']`}
                    >
                      ph{" "}
                    </span>
                    <Link
                      href={`tel:${data?.phone_contact || "0409-898-888"}`}
                      className={`${
                        dark ? "text-[#BD9574]" : "text-[#211F17]"
                      } font-light text-[16px] hover:text-[#BD9574] transition-colors font-['Archivo']`}
                    >
                      {data?.phone_contact || "0409-898-888"}
                    </Link>
                  </div>
                  <div className="text-center md:text-left">
                    <span
                      className={`${
                        dark ? "text-[#A1A1AA]" : "text-[#BD9574]"
                      } font-light text-[16px] font-['Archivo']`}
                    >
                      email{" "}
                    </span>
                    <Link
                      href={`mailto:${
                        data?.email_contact || "hello@blackdiamondz.co.au"
                      }`}
                      className={`${
                        dark ? "text-[#BD9574]" : "text-[#211F17]"
                      } font-light text-[16px] hover:text-[#BD9574] transition-colors font-['Archivo']`}
                    >
                      {data?.email_contact || "hello@blackdiamondz.co.au"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
