"use client"
import { ChevronDown } from "lucide-react"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"
import { useState, useEffect } from "react"
import { submitContact, getItems } from "@/lib/api"
import toast from "react-hot-toast"
import AsyncSelect from "react-select/async"
import { useDebouncedCallback } from "use-debounce"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"] })

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "transparent",
    border: "none",
    boxShadow: "none",
    color: "#E2DBCC",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#211f17",
    border: "1px solid rgba(101, 101, 101, 0.3)",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#2c2a20" : "#211f17",
    color: "#E2DBCC",
    cursor: "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#E2DBCC",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#656565",
  }),
  input: (provided) => ({
    ...provided,
    color: "#E2DBCC",
  }),
  indicatorSeparator: (base) => ({
    display: "none",
  }),
}

export default function ContactUs() {
  const [formData, setFormData] = useState({
    type: "buyer",
    first_name: "",
    last_name: "",
    country: "",
    country_id: "",
    city: "",
    city_id: "",
    email: "",
    phone: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const debouncedLoadCountryOptions = useDebouncedCallback(
    (inputValue, callback) => {
      const fetchData = async () => {
        try {
          const data = await getItems("countries", {
            fields: ["*"],
            search: inputValue,
            sort: ["name"],
          })
          callback(data)
        } catch (error) {
          console.error("Error fetching countries:", error)
          callback([])
        }
      }
      fetchData()
    },
    300
  )

  const debouncedLoadCityOptions = useDebouncedCallback(
    (inputValue, callback) => {
      if (!formData.country_id) {
        callback([])
        return
      }

      const fetchData = async () => {
        try {
          const data = await getItems("cities", {
            fields: ["*"],
            filter: {
              country_id: { _eq: formData.country_id },
            },
            search: inputValue,
            sort: ["name"],
          })
          callback(data)
        } catch (error) {
          console.error("Error fetching cities:", error)
          callback([])
        }
      }
      fetchData()
    },
    300
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Reset dependent fields
    if (name === "country") {
      setFormData((prev) => ({
        ...prev,
        city: "",
        city_id: "",
      }))
    }
  }

  const handleTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      type,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setSubmitting(true)
      await submitContact(formData)
      toast.success("Form submitted successfully!")

      // Reset form
      setFormData({
        type: "buyer",
        first_name: "",
        last_name: "",
        country: "",
        country_id: "",
        city: "",
        city_id: "",
        email: "",
        phone: "",
        message: "",
      })
    } catch (error) {
      toast.error("Failed to submit form. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="bg-[#211f17] min-h-screen">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Info */}
            <div className="flex flex-col justify-center">
              <h1
                className={`${taviraj.className} text-[#E2DBCC] text-5xl font-light leading-tight mb-12`}
              >
                More details?
                <br />
                Contact Us
              </h1>

              <div
                className={`${archivo.className} text-[#656565] font-light text-base mb-12`}
              >
                <p className="mb-1">
                  ph{" "}
                  <a
                    href="tel:0409-898-888"
                    className="text-[#BD9574] hover:text-[#BD9574] transition-colors"
                  >
                    0409-898-888
                  </a>
                </p>
                <p>
                  email{" "}
                  <a
                    href="mailto:hello@blackdiamondz.co.au"
                    className="text-[#BD9574] hover:text-[#BD9574] transition-colors"
                  >
                    hello@blackdiamondz.co.au
                  </a>
                </p>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              {/* User Type Selection */}
              <div className="flex space-x-8 mb-8">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="buyer"
                    checked={formData.type === "buyer"}
                    onChange={() => handleTypeChange("buyer")}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 border border-[#656565] rounded-full mr-2 flex items-center justify-center peer-checked:border-[#BD9574]">
                    <div
                      className={`w-3 h-3 rounded-full bg-[#BD9574] ${
                        formData.type === "buyer" ? "opacity-100" : "opacity-0"
                      }`}
                    ></div>
                  </div>
                  <span
                    className={`${archivo.className} text-[#E2DBCC] font-light`}
                  >
                    Buyer
                  </span>
                </label>

                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="seller"
                    checked={formData.type === "seller"}
                    onChange={() => handleTypeChange("seller")}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 border border-[#656565] rounded-full mr-2 flex items-center justify-center peer-checked:border-[#BD9574]">
                    <div
                      className={`w-3 h-3 rounded-full bg-[#BD9574] ${
                        formData.type === "seller" ? "opacity-100" : "opacity-0"
                      }`}
                    ></div>
                  </div>
                  <span
                    className={`${archivo.className} text-[#E2DBCC] font-light`}
                  >
                    Seller
                  </span>
                </label>

                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="agency"
                    checked={formData.type === "agency"}
                    onChange={() => handleTypeChange("agency")}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 border border-[#656565] rounded-full mr-2 flex items-center justify-center peer-checked:border-[#BD9574]">
                    <div
                      className={`w-3 h-3 rounded-full bg-[#BD9574] ${
                        formData.type === "agency" ? "opacity-100" : "opacity-0"
                      }`}
                    ></div>
                  </div>
                  <span
                    className={`${archivo.className} text-[#E2DBCC] font-light`}
                  >
                    Agency
                  </span>
                </label>
              </div>

              {/* Contact Form */}
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-0"
              >
                {/* First Name */}
                <div className="border border-[#656565]/30 p-4">
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="First Name*"
                    className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] placeholder-[#656565] focus:outline-none`}
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="border border-[#656565]/30 border-l-0 md:border-l-0 p-4">
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Last Name*"
                    className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] placeholder-[#656565] focus:outline-none`}
                    required
                  />
                </div>

                {/* Country */}
                <div className="border border-[#656565]/30 border-t-0 px-2 py-4 relative">
                  <AsyncSelect
                    instanceId="contact-us-country-select"
                    name="country"
                    value={
                      formData.country
                        ? {
                            id: formData.country_id,
                            name: formData.country,
                          }
                        : null
                    }
                    loadOptions={debouncedLoadCountryOptions}
                    onChange={(option) => {
                      // Update both the label and ID fields
                      setFormData((prev) => ({
                        ...prev,
                        country: option ? option.name : "",
                        country_id: option ? option.id : "",
                        // Clear city when country changes
                        city: "",
                        city_id: "",
                      }))
                    }}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    placeholder="Country"
                    styles={customStyles}
                    className={archivo.className}
                    defaultOptions={true}
                    cacheOptions
                  />
                </div>

                {/* City */}
                <div className="border border-[#656565]/30 border-t-0 px-2 py-4 relative">
                  <AsyncSelect
                    instanceId="contact-us-city-select"
                    name="city"
                    value={
                      formData.city
                        ? {
                            id: formData.city_id,
                            name: formData.city,
                          }
                        : null
                    }
                    loadOptions={debouncedLoadCityOptions}
                    onChange={(option) => {
                      // Update both the label and ID fields
                      setFormData((prev) => ({
                        ...prev,
                        city: option ? option.name : "",
                        city_id: option ? option.id : "",
                      }))
                    }}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    placeholder={loading ? "Loading cities..." : "City"}
                    styles={customStyles}
                    className={archivo.className}
                    isDisabled={!formData.country_id || loading}
                    defaultOptions={formData.country_id ? true : false}
                    cacheOptions
                  />
                </div>

                {/* Email */}
                <div className="border border-[#656565]/30 border-t-0 p-4">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email*"
                    className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] placeholder-[#656565] focus:outline-none`}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="border border-[#656565]/30 border-t-0 p-4">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone*"
                    className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] placeholder-[#656565] focus:outline-none`}
                    required
                  />
                </div>

                {/* Message */}
                <div className="border border-[#656565]/30 border-t-0 p-4 col-span-1 md:col-span-2">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] placeholder-[#656565] focus:outline-none h-32 resize-none`}
                  ></textarea>
                </div>

                {/* Send Button */}
                <div className="col-span-1 md:col-span-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`${archivo.className} w-full bg-[#BD9574] text-[#211f17] py-4 hover:bg-[#BD9574]/90 transition-colors disabled:opacity-50`}
                  >
                    {submitting ? "Sending..." : "Send"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
