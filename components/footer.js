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
import { Archivo } from "next/font/google"
import { X } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import { getImageUrl, getItems, submitSubscribe } from "@/lib/api"
import Image from "next/image"

const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"] })
const currentyear = new Date().getFullYear()

export default function Footer() {
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

      await submitSubscribe(formPayload)
      setFormData({
        email: "",
      })

      // Show success toast
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
      <footer className={`${archivo.className} bg-[#211f17] text-white py-16`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Logo and Copyright */}
            <div className="flex flex-col items-center">
              {/* Logo - Using the CMS image */}
              <div className="mb-8">
                <div className="flex flex-col items-center">
                  <div className="mb-4 relative w-[400px] h-14">
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
                  </div>
                </div>
              </div>

              {/* Copyright */}
              <div className="font-light text-[14px] text-white opacity-80 mb-8 text-center hover:opacity-100 transition-opacity">
                © 2005–{currentyear} • Black Diamondz Corp.
              </div>
            </div>

            {/* Right Column - Newsletter, Contact and Social Media */}
            <div className="flex flex-col gap-16">
              {/* Newsletter */}
              <div className="flex flex-col items-start gap-4 w-full">
                <div className="w-full text-[#A1A1AA] font-light text-[16px] leading-[150%] font-['Archivo']">
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
                      className="bg-[#BD9574] text-[#211f17] px-6 py-3 h-[60px] w-[160px] font-light font-['Archivo'] hover:bg-[#BD9574] transition-colors flex justify-center items-center"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>

              {/* Contact and Social Media in a row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact */}
                <div className="flex flex-col gap-4">
                  <div className="text-[#A1A1AA] font-light text-[16px] leading-[150%] font-['Archivo']">
                    OUR CONTACT
                  </div>
                  <div className="flex flex-col gap-2">
                    <div>
                      <span className="text-[#A1A1AA] font-light text-[16px] font-['Archivo']">
                        ph{" "}
                      </span>
                      <Link
                        href={`tel:${data?.phone_contact || "0409-898-888"}`}
                        className="text-[#BD9574] font-light text-[16px] hover:text-[#BD9574] transition-colors font-['Archivo']"
                      >
                        {data?.phone_contact || "0409-898-888"}
                      </Link>
                    </div>
                    <div>
                      <span className="text-[#A1A1AA] font-light text-[16px] font-['Archivo']">
                        email{" "}
                      </span>
                      <Link
                        href={`mailto:${
                          data?.email_contact || "hello@blackdiamondz.co.au"
                        }`}
                        className="text-[#BD9574] font-light text-[16px] hover:text-[#BD9574] transition-colors font-['Archivo']"
                      >
                        {data?.email_contact || "hello@blackdiamondz.co.au"}
                      </Link>
                    </div>
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
