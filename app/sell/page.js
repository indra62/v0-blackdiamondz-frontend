"use client"

/**
 * Sell Page
 *
 * Information page for property sellers.
 * Includes stats, property image gallery, and contact form.
 *
 * @page
 */

// Update import statements to use kebab-case
import Footer from "@/components/footer"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"
import Image from "next/image"
import { useEffect, useState } from "react"
import StatsHome from "@/components/stats_home"
import { getImageUrl, getItems, submitPropertySellSubmission } from "@/lib/api"
import Loading from "@/components/loading"
import toast from "react-hot-toast"
import AsyncSelect from "react-select/async"
import Select from "react-select" 
import { useDebouncedCallback } from "use-debounce"
import SearchBarAddressCorelogic from "@/components/SearchBarAddressCorelogic";

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })

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

export default function SellPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    country: "",
    country_id: "",
    city: "",
    city_id: "",
    email: "",
    phone: "",
    property_type: "",
    sale_type: "",
    property_address: "",
    message: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [language, setLanguage] = useState("en")
  const [dataExplore, setDataExplore] = useState([])
  const [statistic, setDataStatistic] = useState([])
  const [isMobileView, setIsMobileView] = useState(false)
  const [saleType, setSaleType] = useState([])
  const [propertyType, setPropertyType] = useState([])

  const translation =
    dataExplore?.translations?.find((t) => t.languages_code === language) ||
    dataExplore?.translations?.[0]

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language")
      if (storedLanguage) {
        setLanguage(storedLanguage)
      }
    }
  }, [])

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
    const fetchDataSell = async () => {
      try {
        const dataExplore = await getItems("property_sell", {
          fields: ["*", "translations.*", "images.directus_files_id.*"],
        })

        const dataStatistic_section = await getItems("statistic_section", {
          fields: ["*", "translations.*"],
        })

        const dataPropertyTypes = await getItems("property_types", {
          fields: ["*", "translations.*"],
        })

        const dataSaleType = await getItems("sale_type", {
          fields: ["*", "translations.*"],
        })

        setPropertyType(dataPropertyTypes)
        setSaleType(dataSaleType)
        setDataExplore(dataExplore)
        setDataStatistic(dataStatistic_section)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Failed to load data")
      }
    }
    fetchDataSell()
    // eslint-disable-next-line
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
        city: "",
        city_id: "",
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setSubmitting(true)
      await submitPropertySellSubmission(formData)
      toast.success("Form submitted successfully!")

      // Reset form
      setFormData({
        first_name: "",
        last_name: "",
        country: "",
        country_id: "",
        city: "",
        city_id: "",
        email: "",
        phone: "",
        property_type: "",
        sale_type: "",
        property_address: "",
        message: "",
      })
    } catch (error) {
      toast.error("Failed to submit form. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const propertyTypeOptions = propertyType.map((type) => {
    const translation =
      type.translations.find((t) => t.languages_code === language) ||
      type.translations[0]
    return {
      value: type.id,
      label: translation?.name || "",
    }
  })

  const saleTypeOptions = saleType.map((type) => {
    const translation =
      type.translations.find((t) => t.languages_code === language) ||
      type.translations[0]
    return {
      value: type.id,
      label: translation?.name || "",
    }
  })

  return (
    <main className="min-h-screen bg-[#211f17]">
      {loading ? (
        <section className="flex justify-center items-center h-[800px] bg-[#211f17]">
          <Loading error={error} />
        </section>
      ) : (
        <>
          {/* Hero Section */}
          <section className="flex flex-col items-center pt-32 text-center">
            <h1 className={`${taviraj.className} text-[#e2dbcc] text-4xl md:text-5xl mb-8 leading-[125%] tracking-[2px] max-w-5xl`}>
              {translation?.property_sell_title}
            </h1>

            {/* Diamond Separator */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-24 h-[1px] bg-[#BD9574]"></div>
                <div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
                <div className="w-24 h-[1px] bg-[#BD9574]"></div>
              </div>

            <p className={`${archivo.className} text-[#e2dbcc] max-w-3xl mx-auto text-base md:text-lg mb-6`}>
              {translation?.property_sell_description}
            </p>
          </section>

          {/* Stats Section */}
          <section className="pb-16">
            <div className="container mx-auto px-4">
              <StatsHome data={statistic} isMobileView={isMobileView} />
            </div>
          </section>

          {/* Property Images Grid */}
          <section className="pb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              <div className="h-64 md:h-[392px] relative">
                <Image
                  src={getImageUrl(
                    dataExplore?.images?.[0].directus_files_id.id
                  )}
                  alt="Modern luxury house"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="h-64 md:h-[392px] relative">
                <Image
                  src={getImageUrl(
                    dataExplore?.images?.[1].directus_files_id.id
                  )}
                  alt="Luxury interior"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-rows-2 gap-1">
                <div className="h-32 md:h-[204px] relative">
                  <Image
                    src={getImageUrl(
                      dataExplore?.images?.[2].directus_files_id.id
                    )}
                    alt="Coastal property"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="h-32 md:h-[180px] relative">
                    <Image
                      src={getImageUrl(
                        dataExplore.images?.[3].directus_files_id.id
                      )}
                      alt="Modern apartment"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="h-32 md:h-[180px] relative">
                    <Image
                      src={getImageUrl(
                        dataExplore.images?.[4].directus_files_id.id
                      )}
                      alt="Architectural detail"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact form for property sellers
      In production, this would submit to a CRM or email service */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Left Column - Text Content */}
                <div
                  className={`${archivo.className} text-[#E2DBCC] font-light text-base leading-6 space-y-6`}
                >
                  <p
                    dangerouslySetInnerHTML={{
                      __html: translation?.property_sell_requirements || "",
                    }}
                  />
                </div>

                {/* Right Column - Contact Form */}
                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2">
                      <div className="border border-[#656565]/30 p-4">
                        <input
                          type="text"
                          placeholder="First Name*"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          required
                          className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] placeholder-[#656565] font-light text-[16px] focus:outline-none`}
                        />
                      </div>

                      {/* Last Name */}
                      <div className="border border-[#656565]/30 p-4 border-l-0">
                        <input
                          type="text"
                          placeholder="Last Name*"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          required
                          className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] placeholder-[#656565] font-light text-[16px] focus:outline-none`}
                        />
                      </div>

                      <div className="border border-[#656565]/30 p-4 border-t-0">
                        <input
                          type="email"
                          placeholder="Email*"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] placeholder-[#656565] font-light text-[16px] focus:outline-none`}
                        />
                      </div>

                      {/* Phone */}
                      <div className="border border-[#656565]/30 p-4 border-l-0 border-t-0">
                        <input
                          type="tel"
                          placeholder="Phone*"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] placeholder-[#656565] font-light text-[16px] focus:outline-none`}
                        />
                      </div>

                      <div className="border border-[#656565]/30 border-t-0 px-2 py-4 relative">
                        <AsyncSelect
                          instanceId="property-submission-country-select"
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
                          required
                        />
                      </div>

                      {/* City */}
                      <div className="border border-[#656565]/30 border-t-0 px-2 py-4 relative">
                        <AsyncSelect
                          instanceId="property-submission-city-select"
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
                          required
                        />
                      </div>

                      <div className="border border-[#656565]/30 border-t-0 px-2 py-4 relative">
                        <Select
                          instanceId="property-submission-type-select"
                          name="property_type"
                          value={propertyTypeOptions.find(
                            (option) => option.value === formData.property_type
                          )}
                          onChange={(option) =>
                            setFormData((prev) => ({
                              ...prev,
                              property_type: option ? option.value : "",
                            }))
                          }
                          options={propertyTypeOptions}
                          placeholder="Property Type"
                          styles={customStyles}
                          menuPortalTarget={
                            typeof window !== "undefined" ? document.body : null
                          }
                          menuPosition="fixed"
                          className={archivo.className}
                          required
                        />
                      </div>

                      <div className="border border-[#656565]/30 border-t-0 px-2 py-4 relative">
                        <Select
                          instanceId="property-submission-sale-select"
                          name="sale_type"
                          value={saleTypeOptions.find(
                            (option) => option.value === formData.sale_type
                          )}
                          onChange={(option) =>
                            setFormData((prev) => ({
                              ...prev,
                              sale_type: option ? option.value : "",
                            }))
                          }
                          options={saleTypeOptions}
                          placeholder="Sale Type"
                          styles={customStyles}
                          menuPortalTarget={
                            typeof window !== "undefined" ? document.body : null
                          }
                          menuPosition="fixed"
                          className={archivo.className}
                          required
                        />
                      </div>

                      <div className="border border-[#656565]/30 p-4 border-t-0 col-span-2">
                        <input
                          type="text"
                          placeholder="Property Address*"
                          name="property_address"
                          value={formData.property_address}
                          onChange={handleChange}
                          required
                          className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] placeholder-[#656565] font-light text-[16px] focus:outline-none`}
                        />
                      </div>
                      <div className="border border-[#656565]/30 p-4 border-t-0 col-span-2">
                        <textarea
                          placeholder="Message"
                          rows="8"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className={`${archivo.className} w-full bg-transparent text-[#E2DBCC] placeholder-[#656565] font-light text-[16px] focus:outline-none resize-none`}
                        ></textarea>
                      </div>
                    </div>
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

          {/* Second Sell Section */}
          <section className="py-16 text-center">
            <h2
              className={`${taviraj.className} text-[#e2dbcc] text-[48px] font-light leading-[60px] tracking-[2px] mb-8`}
            >
              {translation?.property_sell_secondary_title}
            </h2>

            {/* Diamond Separator */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-24 h-[1px] bg-[#BD9574]"></div>
              <div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
              <div className="w-24 h-[1px] bg-[#BD9574]"></div>
            </div>

            <div className="max-w-3xl mx-auto mb-8">
              <p
                className={`${archivo.className} text-[#E2DBCC] font-light text-base leading-6 mb-4`}
              >
                {translation?.property_sell_secondary_description}
              </p>

              <SearchBarAddressCorelogic />
            </div>
          </section>
        </>
      )}

      <Footer />
    </main>
  )
}
