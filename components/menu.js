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
import { X, ChevronDown } from "lucide-react"
import { Taviraj } from "next/font/google"
import { Archivo } from "next/font/google"
import { useMediaQuery } from "../hooks/use-media-query"
import { getImageUrl, submitSubscribe } from "@/lib/api"
import { toast, Toaster } from "react-hot-toast"
import Image from "next/image"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })

export default function Menu({
  dataSocial,
  dataLogo,
  isOpen,
  onClose,
  isAuthenticated,
}) {
  const [formData, setFormData] = useState({
    email: "",
  })
  const [contactPosition, setContactPosition] = useState(0)
  const [newsletterPosition, setNewsletterPosition] = useState(0)
  const [showWeChatModal, setShowWeChatModal] = useState(false)
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false)
  const [isMediaSubmenuOpen, setIsMediaSubmenuOpen] = useState(false)
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

      setSubscriptionSuccess(true)

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubscriptionSuccess(false)
      }, 5000)
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

  // WeChat modal handlers
  const openWeChatModal = (e) => {
    e.preventDefault()
    setShowWeChatModal(true)
  }

  const closeWeChatModal = () => {
    setShowWeChatModal(false)
  }

  const toggleMediaSubmenu = (e) => {
    e.preventDefault()
    setIsMediaSubmenuOpen(!isMediaSubmenuOpen)
  }

  // Conditional rendering based on menu state
  // Early return pattern for closed menu state
  if (!isOpen) return null

  // Main menu overlay with responsive layout
  // Uses flex-col on mobile and standard flex on desktop
  return (
		<div className="fixed inset-0 bg-[#211f17]/80 z-[1003] backdrop-blur-2xl overflow-y-auto">
			<Toaster position="top-center" reverseOrder={false} />
			<div className="container mx-auto px-4 py-6 h-full flex flex-col">
				<div className="flex justify-between items-center mb-12">
					{/* Diamond Logo */}
					<Link href="/" className="text-white" onClick={onClose}>
						<img
							src={
								getImageUrl(dataLogo?.Logo?.id, {
									format: "webp",
									quality: 80,
									fit: "fit",
								}) || "/images/smallLogoBD.png"
							}
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

				<div
					className={`${
						isMobile ? "flex flex-col" : "flex flex-row justify-between"
					}`}
				>
					{/* Left Side - Navigation */}
					<div className={`${isMobile ? "w-full" : "flex-1"}`}>
						<nav className="flex flex-col content-start w-[359px] gap-4">
							<Link
								href="/buy"
								onClick={onClose}
								className={`${taviraj.className} text-white text-[28px] leading-[40px] font-normal hover:text-[#BD9574] transition-colors px-5`}
							>
								Buy
							</Link>
							<Link
								href="/sell"
								onClick={onClose}
								className={`${taviraj.className} text-white text-[28px] leading-[40px] font-normal hover:text-[#BD9574] transition-colors px-5`}
							>
								Sell
							</Link>
							<Link
								href="/sold-properties"
								onClick={onClose}
								className={`${taviraj.className} text-white text-[28px] leading-[40px] font-normal hover:text-[#BD9574] transition-colors px-5`}
							>
								Sold
							</Link>

							<div className="w-[359px] border-t-[1px] border-[#BD9574] my-1"></div>

							<Link
								href="/our-story"
								onClick={onClose}
								className={`${taviraj.className} text-white text-[28px] leading-[40px] font-normal hover:text-[#BD9574] transition-colors px-5`}
							>
								Our Story
							</Link>
							<Link
								href="/our-team"
								onClick={onClose}
								className={`${taviraj.className} text-white text-[28px] leading-[40px] font-normal hover:text-[#BD9574] transition-colors px-5`}
							>
								Our Team
							</Link>
							<Link
								href="/agency"
								onClick={onClose}
								className={`${taviraj.className} text-white text-[28px] leading-[40px] font-normal hover:text-[#BD9574] transition-colors px-5`}
							>
								Agency
							</Link>
							<div className="flex items-center justify-between w-full px-5">
								<button
									onClick={toggleMediaSubmenu}
									className={`${taviraj.className} text-white text-[28px] leading-[40px] font-normal hover:text-[#BD9574] transition-colors text-left`}
								>
									Media
								</button>
								<ChevronDown
									style={{ position: "absolute", left: "359px" }}
									className={`h-5 w-5 text-[#BD9574] transition-transform ${
										isMediaSubmenuOpen ? "rotate-180" : ""
									}`}
									onClick={toggleMediaSubmenu}
								/>
							</div>

							{isMediaSubmenuOpen && (
								<div className="ml-10 flex flex-col gap-3">
									<Link
										href="/media/video"
										onClick={onClose}
										className={`${taviraj.className} text-white text-[22px] leading-[40px] font-normal hover:text-[#BD9574] transition-colors`}
									>
										Video
									</Link>
									<Link
										href="/media/news"
										onClick={onClose}
										className={`${taviraj.className} text-white text-[22px] leading-[40px] font-normal hover:text-[#BD9574] transition-colors`}
									>
										News
									</Link>
								</div>
							)}

							<div className="w-[359px] border-t-[1px] border-[#BD9574] my-1"></div>
							<Link
								href="/club-diamondz"
								id="club-diamondz-link"
								onClick={onClose}
								className={`${taviraj.className} text-white text-[28px] leading-[40px] font-normal hover:text-[#BD9574] transition-colors px-5`}
							>
								Club Diamondz
							</Link>
							{isAuthenticated && (
								<Link
									href="/saved-properties"
									onClick={onClose}
									className={`${taviraj.className} text-white text-[28px] leading-[40px] font-normal hover:text-[#BD9574] transition-colors px-5`}
								>
									Favourites
								</Link>
							)}

							<div className="w-[359px] border-t-[1px] border-[#BD9574] my-1"></div>

							<Link
								href="/contact-us"
								id="contact-us-link"
								onClick={onClose}
								className={`${taviraj.className} text-white text-[28px] leading-[40px] font-normal hover:text-[#BD9574] transition-colors px-5`}
							>
								Contact Us
							</Link>
							<Link
								href="/privacy-policy"
								onClick={onClose}
								className={`${taviraj.className} text-white text-[28px] leading-[40px] font-normal hover:text-[#BD9574] transition-colors px-5`}
							>
								Privacy Policy
							</Link>
						</nav>
					</div>

					{/* Right Side - Newsletter and Contact */}
					<div
						className={isMobile ? "w-full mt-12" : ""}
						style={!isMobile ? { width: "633px" } : {}}
					>
						{/* Newsletter - Aligned with Club Diamondz */}
						<div
							style={
								!isMobile
									? {
											position: "absolute",
											top: newsletterPosition ? newsletterPosition : "auto",
											width: "633px",
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
							{subscriptionSuccess && (
								<div className="mt-4 text-[#BD9574] font-light text-base">
									Thank you, we will keep you updated
								</div>
							)}
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
										<span className="text-[#A1A1AA] font-light text-[16px] font-['Archivo'] mr-1">
											email{" "}
										</span>
										<Link
											href={`mailto:${
												dataSocial?.email_contact || "hello@blackdiamondz.co.au"
											}`}
											className="text-[#BD9574] font-light text-[16px] hover:text-[#BD9574] transition-colors font-['Archivo']"
										>
											{dataSocial?.email_contact || "hello@blackdiamondz.co.au"}
										</Link>
									</div>
								</div>

								{/* Social Media Icons - Aligned to the right */}
								<div className="flex items-center space-x-4 md:space-x-5">
									{/* Diamond Icon */}
									{dataSocial?.show_diamondz_group && (
										<a
											href={dataSocial?.diamondz_group_url}
											className="text-[#656565] hover:text-[#BD9574] transition-colors w-[40px] h-[40px] md:w-[49px] md:h-[49px] flex items-center justify-center"
										>
											<svg
												width="40"
												height="40"
												viewBox="0 0 40 40"
												fill="currentColor"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M27.0925 7H10.9087L5 14.3305L18.9994 30.9171L33 14.3305L27.0925 7ZM7.7717 14.3694L11.8177 9.32747H26.1811L30.2271 14.3708L18.9994 27.618L7.7717 14.3694Z"
													fill="currentColor"
												/>
												<path
													d="M27.0425 30.5919H10.9572V33H27.0425V30.5919Z"
													fill="currentColor"
												/>
											</svg>
										</a>
									)}

									{/* Facebook Icon */}
									{dataSocial?.show_facebook && (
										<a
											href={dataSocial?.facebook_url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-[#656565] hover:text-[#BD9574] transition-colors w-[40px] h-[40px] md:w-[49px] md:h-[49px] flex items-center justify-center"
										>
											<svg
												width="40"
												height="40"
												viewBox="0 0 40 40"
												fill="currentColor"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_4879_13252)">
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M18.2631 30.9323V22.9468H15.3606V19.6425H18.2631V17.1241C18.2631 14.2585 19.9699 12.677 22.58 12.677C23.8303 12.677 25.1386 12.9004 25.1386 12.9004V15.713H23.6969C22.2762 15.713 21.8342 16.5953 21.8342 17.4985V19.6425H25.0036L24.4973 22.9468H21.8342V30.9323C27.2979 30.0751 31.4773 25.3469 31.4773 19.6424C31.4773 13.3306 26.3605 8.21387 20.0487 8.21387C13.7369 8.21387 8.62012 13.3306 8.62012 19.6424C8.62012 25.3468 12.7994 30.0751 18.2631 30.9323ZM20.3848 31.0662C20.7638 31.0552 21.1382 31.0258 21.5071 30.9788C21.1382 31.0254 20.7638 31.0551 20.3848 31.0662Z"
														fill="currentColor"
													/>
												</g>
												<defs>
													<clipPath id="clip0_4879_13252">
														<rect
															width="22.8571"
															height="22.8571"
															fill="currentColor"
															transform="translate(8.62012 8.21289)"
														/>
													</clipPath>
												</defs>
											</svg>
										</a>
									)}

									{/* Instagram Icon */}
									{dataSocial?.show_instagram && (
										<a
											href={dataSocial?.instagram_url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-[#656565] hover:text-[#BD9574] transition-colors w-[40px] h-[40px] md:w-[49px] md:h-[49px] flex items-center justify-center"
										>
											<svg
												width="40"
												height="40"
												viewBox="0 0 40 40"
												fill="currentColor"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M14.6156 7.17969H25.3848C29.4874 7.17969 32.8207 10.513 32.8207 14.6156V25.3848C32.8207 27.3569 32.0373 29.2483 30.6428 30.6428C29.2483 32.0373 27.3569 32.8207 25.3848 32.8207H14.6156C10.513 32.8207 7.17969 29.4874 7.17969 25.3848V14.6156C7.17969 12.6435 7.96311 10.7521 9.35761 9.35761C10.7521 7.96311 12.6435 7.17969 14.6156 7.17969ZM14.3592 9.74379C13.1351 9.74379 11.9612 10.2301 11.0956 11.0956C10.2301 11.9612 9.74379 13.1351 9.74379 14.3592V25.6412C9.74379 28.1925 11.8079 30.2566 14.3592 30.2566H25.6412C26.8653 30.2566 28.0392 29.7704 28.9048 28.9048C29.7704 28.0392 30.2566 26.8653 30.2566 25.6412V14.3592C30.2566 11.8079 28.1925 9.74379 25.6412 9.74379H14.3592ZM26.731 11.6669C27.156 11.6669 27.5636 11.8357 27.8642 12.1362C28.1647 12.4368 28.3335 12.8444 28.3335 13.2694C28.3335 13.6945 28.1647 14.1021 27.8642 14.4026C27.5636 14.7032 27.156 14.872 26.731 14.872C26.3059 14.872 25.8983 14.7032 25.5978 14.4026C25.2972 14.1021 25.1284 13.6945 25.1284 13.2694C25.1284 12.8444 25.2972 12.4368 25.5978 12.1362C25.8983 11.8357 26.3059 11.6669 26.731 11.6669ZM20.0002 13.5899C21.7003 13.5899 23.3308 14.2653 24.5329 15.4675C25.7351 16.6696 26.4105 18.3001 26.4105 20.0002C26.4105 21.7003 25.7351 23.3308 24.5329 24.5329C23.3308 25.7351 21.7003 26.4105 20.0002 26.4105C18.3001 26.4105 16.6696 25.7351 15.4675 24.5329C14.2653 23.3308 13.5899 21.7003 13.5899 20.0002C13.5899 18.3001 14.2653 16.6696 15.4675 15.4675C16.6696 14.2653 18.3001 13.5899 20.0002 13.5899ZM20.0002 16.154C18.9801 16.154 18.0019 16.5593 17.2806 17.2806C16.5593 18.0019 16.154 18.9801 16.154 20.0002C16.154 21.0203 16.5593 21.9986 17.2806 22.7198C18.0019 23.4411 18.9801 23.8464 20.0002 23.8464C21.0203 23.8464 21.9986 23.4411 22.7198 22.7198C23.4411 21.9986 23.8464 21.0203 23.8464 20.0002C23.8464 18.9801 23.4411 18.0019 22.7198 17.2806C21.9986 16.5593 21.0203 16.154 20.0002 16.154Z"
													fill="currentColor"
												/>
											</svg>
										</a>
									)}

									{/* LinkedIn Icon */}
									{dataSocial?.show_linkedin && (
										<a
											href={dataSocial?.linkedin_url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-[#656565] hover:text-[#BD9574] transition-colors w-[40px] h-[40px] md:w-[49px] md:h-[49px] flex items-center justify-center"
										>
											<svg
												width="40"
												height="40"
												viewBox="0 0 40 40"
												fill="currentColor"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M28.9738 8.46191C29.6538 8.46191 30.306 8.73206 30.7869 9.21292C31.2677 9.69378 31.5379 10.346 31.5379 11.026V28.9747C31.5379 29.6548 31.2677 30.307 30.7869 30.7878C30.306 31.2687 29.6538 31.5388 28.9738 31.5388H11.025C10.345 31.5388 9.69281 31.2687 9.21195 30.7878C8.73108 30.307 8.46094 29.6548 8.46094 28.9747V11.026C8.46094 10.346 8.73108 9.69378 9.21195 9.21292C9.69281 8.73206 10.345 8.46191 11.025 8.46191H28.9738ZM28.3327 28.3337V21.5388C28.3327 20.4304 27.8924 19.3673 27.1086 18.5835C26.3248 17.7997 25.2617 17.3593 24.1532 17.3593C23.0635 17.3593 21.7943 18.026 21.1789 19.026V17.6029H17.602V28.3337H21.1789V22.0132C21.1789 21.026 21.9738 20.2183 22.9609 20.2183C23.437 20.2183 23.8935 20.4074 24.2301 20.744C24.5667 21.0806 24.7558 21.5372 24.7558 22.0132V28.3337H28.3327ZM13.4353 15.5901C14.0065 15.5901 14.5544 15.3632 14.9583 14.9593C15.3622 14.5553 15.5891 14.0075 15.5891 13.4363C15.5891 12.244 14.6276 11.2696 13.4353 11.2696C12.8607 11.2696 12.3096 11.4979 11.9032 11.9042C11.4969 12.3105 11.2686 12.8616 11.2686 13.4363C11.2686 14.6286 12.243 15.5901 13.4353 15.5901ZM15.2173 28.3337V17.6029H11.6661V28.3337H15.2173Z"
													fill="currentColor"
												/>
											</svg>
										</a>
									)}

									{/* Whatsapp Icon */}
									{dataSocial?.show_whatsapp !== false && (
										<a
											href={dataSocial?.whatsapp_url || ""}
											target="_blank"
											rel="noopener noreferrer"
											className="text-[#656565] hover:text-[#BD9574] transition-colors"
										>
											<div className="flex justify-center items-center h-10 w-10">
												<svg
													fill="currentColor"
													width="24px"
													height="24px"
													viewBox="0 0 0.72 0.72"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path d="M0.458 0.396a0.21 0.21 0 0 1 0.046 0.021l-0.001 -0.001c0.016 0.007 0.03 0.015 0.042 0.025l0 0q0.001 0.003 0.001 0.006l0 0.001v0c0 0.013 -0.003 0.025 -0.008 0.036l0 -0.001c-0.007 0.014 -0.018 0.025 -0.033 0.03l0 0a0.108 0.108 0 0 1 -0.047 0.012h0a0.249 0.249 0 0 1 -0.09 -0.029l0.001 0.001a0.267 0.267 0 0 1 -0.079 -0.055l0 0a0.615 0.615 0 0 1 -0.067 -0.084l-0.001 -0.002a0.162 0.162 0 0 1 -0.033 -0.09l0 0v-0.004a0.103 0.103 0 0 1 0.034 -0.073l0 0a0.035 0.035 0 0 1 0.024 -0.01h0q0.005 0 0.009 0.001l0 0c0.003 0 0.006 0.001 0.009 0.001h0l0.002 0c0.004 0 0.008 0.001 0.011 0.003l0 0c0.003 0.004 0.006 0.008 0.007 0.013l0 0q0.004 0.009 0.015 0.041c0.004 0.009 0.008 0.021 0.011 0.033l0 0.002a0.047 0.047 0 0 1 -0.016 0.027l0 0q-0.016 0.017 -0.016 0.022a0.013 0.013 0 0 0 0.002 0.007l0 0a0.21 0.21 0 0 0 0.047 0.064l0 0a0.297 0.297 0 0 0 0.068 0.046l0.002 0.001a0.021 0.021 0 0 0 0.01 0.003h0q0.007 0 0.025 -0.023t0.024 -0.023zm-0.094 0.246h0.001a0.282 0.282 0 0 0 0.114 -0.024l-0.002 0.001c0.071 -0.03 0.126 -0.085 0.155 -0.154l0.001 -0.002c0.015 -0.033 0.023 -0.072 0.023 -0.113s-0.009 -0.08 -0.024 -0.115l0.001 0.002c-0.03 -0.071 -0.085 -0.126 -0.154 -0.155l-0.002 -0.001c-0.033 -0.015 -0.072 -0.023 -0.113 -0.023s-0.08 0.009 -0.115 0.024l0.002 -0.001c-0.071 0.03 -0.126 0.085 -0.155 0.154l-0.001 0.002a0.285 0.285 0 0 0 -0.023 0.114 0.288 0.288 0 0 0 0.056 0.172l-0.001 -0.001 -0.037 0.108 0.113 -0.036a0.283 0.283 0 0 0 0.159 0.048h0.001zm0 -0.643h0.001c0.049 0 0.095 0.01 0.137 0.029L0.5 0.028c0.085 0.036 0.151 0.102 0.186 0.184l0.001 0.002c0.018 0.04 0.028 0.087 0.028 0.136s-0.01 0.096 -0.029 0.138l0.001 -0.002c-0.036 0.085 -0.102 0.151 -0.184 0.186l-0.002 0.001c-0.04 0.018 -0.086 0.028 -0.135 0.028h-0.001c-0.062 0 -0.12 -0.016 -0.17 -0.045l0.002 0.001L0 0.72l0.063 -0.188a0.345 0.345 0 0 1 -0.05 -0.18c0 -0.049 0.01 -0.096 0.029 -0.139l-0.001 0.002C0.077 0.13 0.143 0.064 0.225 0.029L0.228 0.028A0.336 0.336 0 0 1 0.363 0zh0z" />
												</svg>
											</div>
										</a>
									)}

									{/* WeChat Icon */}
									{dataSocial?.show_wechat ? (
										<button
											onClick={openWeChatModal}
											className="text-[#656565] hover:text-[#BD9574] transition-colors w-[40px] h-[40px] md:w-[49px] md:h-[49px] flex items-center justify-center"
										>
											<svg
												width="40"
												height="40"
												viewBox="0 0 40 40"
												fill="currentColor"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M19.3418 14.6356C18.7436 14.6466 18.238 15.1562 18.2485 15.7376C18.2595 16.3403 18.7554 16.8118 19.3706 16.8045C19.9874 16.797 20.4552 16.3206 20.4494 15.7051C20.4443 15.101 19.9505 14.6244 19.3418 14.6356ZM13.5191 15.7543C13.5414 15.1752 13.0395 14.6535 12.4435 14.636C11.8332 14.618 11.3312 15.0844 11.3134 15.6859C11.2954 16.2954 11.7616 16.7838 12.3763 16.7994C12.9857 16.8149 13.4965 16.3478 13.5191 15.7543ZM24.6792 16.741C22.2544 16.8677 20.1458 17.6028 18.4339 19.2635C16.7042 20.9415 15.9146 22.9975 16.1304 25.5464C15.1826 25.4288 14.3193 25.2996 13.4511 25.2266C13.1513 25.2013 12.7955 25.2372 12.5415 25.3805C11.6985 25.8562 10.8903 26.3932 9.93234 26.9921C10.1081 26.1971 10.2219 25.5009 10.4233 24.8314C10.5714 24.3392 10.5028 24.0655 10.0494 23.7448C7.13851 21.6898 5.91148 18.6141 6.82975 15.4476C7.67931 12.5182 9.7656 10.7417 12.6004 9.81562C16.4696 8.55175 20.8179 9.84096 23.1708 12.9129C24.0205 14.0226 24.5416 15.268 24.6792 16.741Z"
													fill="currentColor"
												/>
												<path
													d="M27.0212 21.5898C26.547 21.5865 26.1439 21.9748 26.1246 22.454C26.104 22.9664 26.5025 23.3873 27.0095 23.3886C27.5001 23.3901 27.8876 23.0192 27.9056 22.5311C27.9246 22.0174 27.5261 21.5933 27.0212 21.5898ZM21.3868 23.3947C21.8758 23.3952 22.2782 23.0127 22.2966 22.5299C22.3162 22.0187 21.905 21.59 21.3933 21.5878C20.8865 21.5855 20.4619 22.0204 20.4795 22.5238C20.4963 23.005 20.9015 23.3942 21.3868 23.3947ZM30.1272 31.8571C29.3593 31.5153 28.6549 31.0022 27.9052 30.924C27.1581 30.8459 26.3728 31.2769 25.5913 31.3568C23.2108 31.6003 21.0779 30.9369 19.3193 29.3107C15.9746 26.217 16.4525 21.4737 20.3221 18.9384C23.7613 16.6853 28.8051 17.4364 31.23 20.5628C33.3459 23.2907 33.0972 26.9121 30.5141 29.204C29.7666 29.8672 29.4975 30.4132 29.9771 31.2873C30.0657 31.4488 30.0757 31.6532 30.1272 31.8571Z"
													fill="currentColor"
												/>
											</svg>
										</button>
									) : null}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* WeChat QR Code Modal */}
			{showWeChatModal && (
				<div
					className="fixed inset-0 bg-black bg-opacity-70 z-[110] flex items-center justify-center p-4"
					onClick={() => setShowWeChatModal(false)}
				>
					<div
						className="bg-[#BD9574] rounded-lg max-w-md w-full p-6 relative"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={() => setShowWeChatModal(false)}
							className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
							aria-label="Close modal"
						>
							<X size={24} />
						</button>

						<div className="text-center">
							<h3 className="text-xl font-semibold mb-2 text-[#211F17]">
								Black Diamondz WeChat
							</h3>
							<p className="text-[#211F17] mb-4">
								Scan this QR code with your WeChat app to connect with us
							</p>

							<div className="flex justify-center mb-4">
								<div className="relative w-64 h-64">
									<Image
										src={getImageUrl(dataSocial?.wechat_qr_code.id, {
											format: "webp",
											quality: 80,
										})}
										alt="Black Diamondz WeChat QR Code"
										fill
										sizes="256px"
										style={{ objectFit: "contain" }}
									/>
								</div>
							</div>

							<p className="text-sm text-[#211F17]">
								Open WeChat, tap "+" and select "Scan" to scan this code
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
