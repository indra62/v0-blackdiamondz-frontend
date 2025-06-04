/**
 * Signup Page
 *
 * User registration page with multi-field signup form.
 * Split layout with image on the left and form on the right.
 *
 * @page
 */
"use client"
import Link from "next/link"
import Image from "next/image"
import { Taviraj, Archivo } from "next/font/google"
import { apiSignup, getImageUrl, getItems, submitClubDiamondApplication } from "@/lib/api"
import { useEffect, useState, Suspense } from "react"
import Loading from "@/components/loading"
import { useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import AsyncSelect from "react-select/async"
import Select from "react-select"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })

const priceRangeOption = [
  { label: "Less than $5,000,000", value: 1 },
  { label: "$5,000,000 - $15,000,000", value: 2 },
  { label: "$15,000,000 - $25,000,0000", value: 3 },
  { label: "Greater  than $25,000,000", value: 4 },
]

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "transparent",
    border: "none",
    boxShadow: "none",
    color: "#211f17",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#E2DBCC",
    border: "1px solid rgba(101, 101, 101, 0.3)",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#E2DBCC" : "#FBF4E4",
    color: "#211f17",
    cursor: "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#211f17",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#656565",
  }),
  input: (provided) => ({
    ...provided,
    color: "#211f17",
  }),
  indicatorSeparator: (base) => ({
    display: "none",
  }),
}

export function Signup() {
  const searchParams = useSearchParams()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "",
    country_id: "",
    residential_property_price_range: "",
    investing_property_price_range: "",
    interested_in_concierge_services: false,
    message: "",
    password: "",
    confirmPassword: "",
  })
  const join_club = searchParams.get("joinclub")
  const [language, setLanguage] = useState("en")
  const [formError, setFormError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const isJoinClub = !!join_club
  const [isMobileView, setIsMobileView] = useState(false)

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

  const translation =
    data?.translations?.find((t) => t.languages_code === language) ||
    data?.translations?.[0]

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language")
      if (storedLanguage) {
        setLanguage(storedLanguage)
      }
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getItems("Global", {
          fields: ["signup_image.*", "translations.*"],
        })

        setData(data)
        setLoading(false)
      } catch (err) {
        setError("Failed to load signup image" + err.message)
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError("")

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match")
      return
    }

    if (formData.password.length < 8) {
      setFormError("Password must be at least 8 characters")
      return
    }

    try {
      setIsSubmitting(true)
      await apiSignup(formData)
      if (isJoinClub) await submitClubDiamondApplication(formData)
      setSuccess(true)
    } catch (err) {
      setFormError(
        err.response?.data?.errors?.[0]?.message ||
          "Registration failed. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
		<main
			className={`min-h-screen ${
				isJoinClub ? "bg-[#FBF4E4] px-10" : "bg-[#211f17]"
			}`}
		>
			{loading ? (
				<section
					className={`flex justify-center items-center h-[800px] ${
						isJoinClub ? "bg-[#FBF4E4]" : "bg-[#211f17]"
					}`}
				>
					<Loading error={error} dark={!isJoinClub} />
				</section>
			) : (
				<>
					<div className="flex flex-col min-h-[calc(100vh-60px)]">
						{isJoinClub && (
							<section className="pt-16 text-center">
								<h2
									className={`${taviraj.className} text-[#211f17] text-[48px] font-light leading-[60px] tracking-[2px] mb-8`}
								>
									{translation?.signup_title}
								</h2>

								{/* Diamond Separator */}
								<div className="flex items-center justify-center gap-4 mb-8">
									<div className="w-24 h-[1px] bg-[#BD9574]"></div>
									<div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
									<div className="w-24 h-[1px] bg-[#BD9574]"></div>
								</div>
							</section>
						)}
						<div className={`${isMobileView ? "flex-col" : "flex"}`}>
							{/* Left side - Sydney Harbour Image */}
							{isJoinClub ? (
								<div className="md:block md:w-1/2 w-full relative p-8 flex justify-center">
									<div
										className="dangerous text-[#211f17] font-['Archivo']"
										dangerouslySetInnerHTML={{
											__html: translation?.signup_body,
										}}
									/>
								</div>
							) : (
								<div className="hidden md:block w-1/2 relative min-h-screen">
									<Image
										src={getImageUrl(data?.signup_image?.id, {
											format: "webp",
											quality: 80,
											fit: "cover",
										})}
										alt="Sydney Harbour"
										fill
										priority
										className="object-cover"
									/>
								</div>
							)}

							{/* Right side - Signup Form */}
							<div
								className={`w-full md:w-1/2 ${
									isJoinClub ? "bg-[#FBF4E4]" : "bg-[#211f17]"
								} flex items-center justify-center p-8`}
							>
								<div className="w-full max-w-md">
									{!isJoinClub ? (
										<h1
											className={`${taviraj.className} ${
												isJoinClub ? "text-[#211f17]" : "text-[#E2DBCC]"
											}  text-5xl mb-12 text-center`}
										>
											Join the Club!
										</h1>
									) : (
										<h2
											className={`${taviraj.className} ${
												isJoinClub ? "text-[#211f17]" : "text-[#E2DBCC]"
											} mb-8 text-2xl text-center`}
										>
											{translation?.signup_pitch}
										</h2>
									)}

									{success ? (
										<div
											className={`font-['Archivo'] ${
												isJoinClub
													? "text-[#211f17] border-[#211f17]"
													: "text-[#E2DBCC] border-[#BD9574]"
											} text-center  p-4 border `}
										>
											<p className="mb-4">
												Registration successful! Please check your email to
												verify your account.
											</p>
											<Link
												href="/login"
												className="text-[#BD9574] hover:text-[#BD9574] transition-colors"
											>
												Go to login
											</Link>
										</div>
									) : (
										<>
											{formError && (
												<div className="mb-4 p-3 bg-red-900/50 text-white border border-red-500">
													{formError}
												</div>
											)}

											<form onSubmit={handleSubmit}>
												<div className="flex flex-col">
													<div className="flex w-full">
														<input
															type="text"
															name="first_name"
															placeholder="First Name"
															className={`w-1/2 bg-transparent border border-[#656565] border-r-0 border-b-0 p-4 ${
																isJoinClub ? "text-[#211f17]" : "text-[#E2DBCC]"
															} placeholder-[#656565] focus:outline-none focus:border-[#BD9574]`}
															required
															value={formData.first_name}
															onChange={handleChange}
														/>
														<input
															type="text"
															name="last_name"
															placeholder="Last Name"
															className={`w-1/2 bg-transparent border border-[#656565] border-b-0 p-4 ${
																isJoinClub ? "text-[#211f17]" : "text-[#E2DBCC]"
															} placeholder-[#656565] focus:outline-none focus:border-[#BD9574]`}
															required
															value={formData.last_name}
															onChange={handleChange}
														/>
													</div>

													<div className="flex w-full">
														<input
															type="email"
															name="email"
															placeholder="Email"
															className={`bg-transparent border border-[#656565] ${
																isJoinClub
																	? "border-r-0 w-1/2 text-[#211f17]"
																	: "w-full text-[#E2DBCC]"
															} placeholder-[#656565] border-b-0 p-4 focus:outline-none focus:border-[#BD9574]`}
															required
															value={formData.email}
															onChange={handleChange}
														/>

														{isJoinClub && (
															<input
																type="tel"
																name="phone"
																placeholder="Phone"
																className={`${
																	isJoinClub
																		? "w-1/2 text-[#211f17]"
																		: "w-full text-[#E2DBCC]"
																} placeholder-[#656565] bg-transparent border border-[#656565] border-b-0 p-4  focus:outline-none focus:border-[#BD9574]`}
																required
																value={formData.phone}
																onChange={handleChange}
															/>
														)}
													</div>

													{isJoinClub && (
														<>
															<div
																className={`w-full bg-transparent border border-[#656565] border-b-0 py-4 px-2 text-[#211f17] focus:outline-none focus:border-[#BD9574]`}
															>
																<AsyncSelect
																	instanceId="join-club-country-select"
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
																		setFormData((prev) => ({
																			...prev,
																			country: option ? option.name : "",
																			country_id: option ? option.id : "",
																		}));
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
															<div
																className={`w-full bg-transparent border border-[#656565] border-b-0 py-4 px-2 text-[#211f17] focus:outline-none focus:border-[#BD9574]`}
															>
																<Select
																	instanceId="residential-price-range-select"
																	name="residential_property_price_range"
																	value={priceRangeOption.find(
																		(option) =>
																			option.value ===
																			formData.residential_property_price_range
																	)}
																	onChange={(option) =>
																		setFormData((prev) => ({
																			...prev,
																			residential_property_price_range: option
																				? option.value
																				: "",
																		}))
																	}
																	options={priceRangeOption}
																	placeholder="Residential Property Price Range"
																	styles={customStyles}
																	menuPortalTarget={
																		typeof window !== "undefined"
																			? document.body
																			: null
																	}
																	menuPosition="fixed"
																	className={archivo.className}
																	isClearable
																/>
															</div>
															<div
																className={`w-full bg-transparent border border-[#656565] border-b-0 py-4 px-2 text-[#211f17] focus:outline-none focus:border-[#BD9574]`}
															>
																<Select
																	instanceId="investing-price-range-select"
																	name="investing_property_price_range"
																	value={priceRangeOption.find(
																		(option) =>
																			option.value ===
																			formData.investing_property_price_range
																	)}
																	onChange={(option) =>
																		setFormData((prev) => ({
																			...prev,
																			investing_property_price_range: option
																				? option.value
																				: "",
																		}))
																	}
																	options={priceRangeOption}
																	placeholder="Investing Property Price Range"
																	styles={customStyles}
																	menuPortalTarget={
																		typeof window !== "undefined"
																			? document.body
																			: null
																	}
																	menuPosition="fixed"
																	className={archivo.className}
																	isClearable
																/>
															</div>
															<div className="flex flex-row gap-2 items-center w-full bg-transparent border border-[#656565] border-b-0 p-4 text-[#211f17] placeholder-[#656565] focus:outline-none focus:border-[#BD9574]">
																<input
																	type="checkbox"
																	name="interested_in_concierge_services"
																	className=""
																	checked={
																		!!formData.interested_in_concierge_services
																	}
																	onChange={handleChange}
																/>
																<span className={`text-[#656565]`}>
																	Interested in Concierge Services
																</span>
															</div>
															<div className="flex w-full">
																<textarea
																	placeholder="Message"
																	rows="5"
																	name="message"
																	className={`bg-transparent border border-[#656565] text-[#211f17] w-full placeholder-[#656565] border-b-0 p-4 focus:outline-none focus:border-[#BD9574]`}
																	required
																	value={formData.message}
																	onChange={handleChange}
																/>
															</div>
														</>
													)}

													

												{isJoinClub ? (
													<button
														type="submit"
														className="w-full bg-[#BD9574] text-[#211f17] p-4 hover:bg-[#BD9574] transition-colors disabled:opacity-50"
														disabled={isSubmitting}
													>
														{isSubmitting ? "Submitting..." : "Submit"}
													</button>
												) : (
													<>
													<div className="flex w-full">
														<input
															type="password"
															name="password"
															placeholder="Password"
															className={`w-1/2 bg-transparent border border-[#656565] border-r-0 border-b-0 p-4 ${
																isJoinClub ? "text-[#211f17]" : "text-[#E2DBCC]"
															} placeholder-[#656565] focus:outline-none focus:border-[#BD9574]`}
															required
															value={formData.password}
															onChange={handleChange}
														/>
														<input
															type="password"
															name="confirmPassword"
															placeholder="Confirm Password"
															className={`w-1/2 bg-transparent border border-[#656565] border-b-0 p-4 ${
																isJoinClub ? "text-[#211f17]" : "text-[#E2DBCC]"
															} placeholder-[#656565] focus:outline-none focus:border-[#BD9574]`}
															required
															value={formData.confirmPassword}
															onChange={handleChange}
														/>
													</div>
													<button
														type="submit"
														className="w-full bg-[#BD9574] text-[#211f17] p-4 hover:bg-[#BD9574] transition-colors disabled:opacity-50"
														disabled={isSubmitting}
													>
														{isSubmitting ? "Signing Up..." : "Sign Up"}
													</button>
													</>
												)}
													
												</div>
											</form>

											<div className="mt-8 text-center">
												<p className="text-[#656565]">
												{isJoinClub ? "Already have a Member - " : "Already have an account? "}
													<Link
														href="/login"
														className="text-[#BD9574] hover:text-[#BD9574] transition-colors"
													>
														Sign in here.
													</Link>
												</p>
											</div>
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</main>
	);
}

export default function signUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#211f17]"></div>}>
      <Signup />
    </Suspense>
  )
}
