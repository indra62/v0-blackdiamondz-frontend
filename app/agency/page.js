"use client"
import Footer from "@/components/footer"
import StatsHome from "@/components/stats_home"
import AgencyCarousel from "@/components/AgencyCarousel"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import { getImageUrl, getItems, submitAgencyApplication } from "@/lib/api"
import Loading from "@/components/loading"
import toast from "react-hot-toast"
import AsyncSelect from "react-select/async"
import Select from "react-select"
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

const genderOptions = [
  { value: "1", label: "Male" },
  { value: "2", label: "Female" },
]

export default function AgencyPage() {
  const [isMobileView, setIsMobileView] = useState(false)
  const [data, setData] = useState(null)
  const [dataStatistic, setDataStatistic] = useState(null)
  const [collaboratingAgency, setCollaboratingAgency] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [language, setLanguage] = useState("en")
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "", // 1: male, 2: female
    years_of_experience: "",
    country_id: "",
    country: "",
    city_id: "",
    city: "",
    email: "",
    phone: "",
    message: "",
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language")
      if (storedLanguage) {
        setLanguage(storedLanguage)
      }
    }
  }, [])

  const translation =
    data?.translations?.find((t) => t.languages_code === language) ||
    data?.translations?.[0]

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataStatistic_section = await getItems("statistic_section", {
          fields: ["*", "translations.*"],
        })
        const dataAgency = await getItems("agency", {
          fields: [
            "*.*",
            "translations.*",
            "collaborating_agency.image.*",
            "collaborating_agency.translations.*",
          ],
        })
        setDataStatistic(dataStatistic_section)
        setData(dataAgency)
        setCollaboratingAgency(dataAgency?.collaborating_agency)
        setLoading(false)
      } catch (err) {
        setError("Failed to load home data:" + err.message)
      }
    }
    fetchData()
  }, [])

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
        city_id: "",
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const dataToSubmit = { ...formData }
    delete dataToSubmit.country
    delete dataToSubmit.city

    try {
      setSubmitting(true)

      await submitAgencyApplication(formData)
      toast.success("Form submitted successfully!")

      // Reset form
      setFormData({
        first_name: "",
        last_name: "",
        gender: "",
        years_of_experience: "",
        country_id: "",
        country: "",
        city_id: "",
        city: "",
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

  const translationData =
    data?.translations?.find((t) => t.languages_code === language) ||
    data?.translations?.[0]

  return (
    <main className="min-h-screen bg-[#211f17] text-white">
      {loading ? (
        <section className="flex justify-center items-center h-[800px] bg-[#211f17]">
          <Loading error={error} />
        </section>
      ) : (
        <>
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
                src={getImageUrl(data?.heroImage?.id, {
                  format: "webp",
                  quality: 80,
                  fit: "cover",
                })}
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
                {translationData?.hero_title}
              </h1>
              <div className="w-20 h-[1px] bg-[#BD9574] mb-8"></div>
              <p
                className={`${archivo.className} text-[16px] font-light max-w-3xl text-center text-[#E2DBCC] leading-[150%]`}
              >
                {translationData?.hero_description}
              </p>
            </div>
          </section>

          {/* Stats Section */}
          <StatsHome data={dataStatistic} isMobileView={isMobileView} />

          {/* Property Concierge Section */}
          <section className="py-16 bg-[#211f17]">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column - Text Content */}
                <div
                  className={`${archivo.className} font-light text-[16px] leading-[150%] text-[#E2DBCC]`}
                  dangerouslySetInnerHTML={{
                    __html: translationData?.recruitment_message,
                  }}
                />

                {/* Right Column - Contact Form */}
                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2">
                      {/* First Name */}
                      <div className="border border-[#656565]/30 p-4">
                        <input
                          type="text"
                          placeholder="First Name"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] placeholder-[#656565] font-light text-[16px] focus:outline-none`}
                        />
                      </div>

                      {/* Last Name */}
                      <div className="border border-[#656565]/30 p-4 border-l-0">
                        <input
                          type="text"
                          placeholder="Last Name"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] placeholder-[#656565] font-light text-[16px] focus:outline-none`}
                        />
                      </div>

                      {/* Gender */}
                      <div className="border border-[#656565]/30 px-2 py-4 border-t-0">
                        <Select
                          name="gender"
                          value={genderOptions.find(
                            (option) => option.value === formData.gender
                          )}
                          onChange={(option) =>
                            setFormData((prev) => ({
                              ...prev,
                              gender: option ? option.value : "",
                            }))
                          }
                          options={genderOptions}
                          placeholder="Gender"
                          styles={customStyles}
                          className={archivo.className}
                          isClearable
                        />
                      </div>

                      {/* Years of Experience */}
                      <div className="border border-[#656565]/30 p-4 border-l-0 border-t-0 flex justify-center">
                        <input
                          type="text"
                          placeholder="Years of Experience"
                          name="years_of_experience"
                          value={formData.years_of_experience}
                          onChange={handleChange}
                          className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] placeholder-[#656565] font-light text-[16px] focus:outline-none`}
                        />
                      </div>

                      {/* Country */}
                      <div className="border border-[#656565]/30 px-2 py-4 border-t-0 relative">
                        <AsyncSelect
                          instanceId="agency-country-select"
                          name="country"
                          value={
                            formData.country_id
                              ? {
                                  id: formData.country_id,
                                  name: formData.country,
                                }
                              : null
                          }
                          loadOptions={debouncedLoadCountryOptions}
                          onChange={(option) => {
                            setFormData((prev) => ({
                              ...prev,
                              country_id: option ? option.id : "",
                              country: option ? option.name : "",
                              city_id: "",
                              city: "",
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
                      <div className="border border-[#656565]/30 px-2 py-4 border-l-0 border-t-0 relative">
                        <AsyncSelect
                          instanceId="agency-city-select"
                          name="city"
                          value={
                            formData.city_id
                              ? { id: formData.city_id, name: formData.city }
                              : null
                          }
                          loadOptions={debouncedLoadCityOptions}
                          onChange={(option) => {
                            setFormData((prev) => ({
                              ...prev,
                              city_id: option ? option.id : "",
                              city: option ? option.name : "",
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
                      <div className="border border-[#656565]/30 p-4 border-t-0">
                        <input
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] placeholder-[#656565] font-light text-[16px] focus:outline-none`}
                        />
                      </div>

                      {/* Phone */}
                      <div className="border border-[#656565]/30 p-4 border-l-0 border-t-0">
                        <input
                          type="tel"
                          placeholder="Phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] placeholder-[#656565] font-light text-[16px] focus:outline-none`}
                        />
                      </div>

                      {/* Message */}
                      <div className="border border-[#656565]/30 p-4 border-t-0 col-span-2">
                        <textarea
                          placeholder="Message"
                          rows="8"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] placeholder-[#656565] font-light text-[16px] focus:outline-none resize-none`}
                        ></textarea>
                      </div>
                    </div>

                    {/* Send Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`${archivo.className} w-full bg-[#BD9574] text-[#211f17] py-6 font-light text-[18px] hover:bg-[#BD9574] transition-colors`}
                    >
                      {submitting ? "Sending..." : "Send"}
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
                <h2
                  className={`${taviraj.className} text-[48px] font-light mb-8 text-[#E2DBCC]`}
                >
                  {translationData?.collaborating_title}
                </h2>
                <div className="flex items-center justify-center mb-12">
                  <div className="w-32 h-[1px] bg-[#656565]/50"></div>
                  <div className="w-2 h-2 bg-[#BD9574] transform rotate-45 mx-4"></div>
                  <div className="w-32 h-[1px] bg-[#656565]/50"></div>
                </div>
                <p
                  className={`${archivo.className} text-[16px] font-light max-w-3xl mx-auto text-center text-[#E2DBCC] leading-[150%]`}
                >
                  {translationData?.collaborating_description}
                </p>
              </div>

              {/* Agency Logos Grid */}
              <AgencyCarousel
                agency={collaboratingAgency}
                language={language}
                getImageUrl={getImageUrl}
                archivo={archivo}
              />
            </div>
          </section>
        </>
      )}
      {/* Footer */}
      <Footer />
    </main>
  )
}
