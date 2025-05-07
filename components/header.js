"use client"
import { useAuth } from "@/hooks/useAuth"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ChevronDown, ArrowRight } from "lucide-react"
import { Archivo } from "next/font/google"
import Menu from "./menu"
import { getItems } from "@/lib/api"
import { createPortal } from "react-dom"

const archivo = Archivo({ subsets: ["latin"], weight: ["300"] })

export default function Header() {
  const { logout, isAuthenticated } = useAuth()
  const [error, setError] = useState(null)
  const languageButtonRef = useRef(null)
  const [activeTab, setActiveTab] = useState("buy")
  const [dataSocial, setDataSocial] = useState(null)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState({
    name: "English",
    country: "UK",
    flag: "🇬🇧",
    value: "en",
  })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const languages = [
    { name: "English", country: "UK", flag: "🇬🇧", value: "en" },
    { name: "中文", country: "CN", flag: "🇨🇳", value: "cn" },
  ]

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
  }

  const selectLanguage = (language) => {
    setSelectedLanguage(language)
    localStorage.setItem("language", language.value)
    setIsLanguageDropdownOpen(false)
    window.location.reload()
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen)
  }

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      const foundLanguage = languages.find(
        (lang) => lang.value === savedLanguage
      )
      if (foundLanguage) {
        setSelectedLanguage(foundLanguage)
      }
    } else {
      localStorage.setItem("language", "en")
    }
  }, [])

  useEffect(() => {
    const fetchDataSocial = async () => {
      try {
        const dataFooter = await getItems("footer", {
          fields: ["*.*"],
        })
        setDataSocial(dataFooter)
      } catch (err) {
        setError("Failed to load home data:" + err.message)
      }
    }
    fetchDataSocial()
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

  return (
    <>
      <header className={`${archivo.className} font-light sticky-header`}>
        {/* Main Navigation */}
        <div
          className={`bg-[#211F17]/80 backdrop-blur-md text-[#BD9574] border-b border-[#333] transition-colors duration-300`}
        >
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between px-4 h-[60px]">
            <Link href="/">
              <div className="flex items-center justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smallLogoBD-zxDglqhR7Dv3zdEHln30LxjDUQXDD7.png"
                  alt="Black Diamondz Logo"
                  className="w-6 h-6"
                />
              </div>
            </Link>

            <div className="flex items-center gap-6">
              <button
                ref={languageButtonRef}
                onClick={toggleLanguageDropdown}
                aria-expanded={isLanguageDropdownOpen}
                aria-haspopup="true"
                className="flex items-center gap-1 text-[#BD9574] focus:outline-none relative z-90"
              >
                <span className="text-xl">{selectedLanguage.flag}</span>
                <ChevronDown className="h-4 w-4 text-[#BD9574]" />
              </button>

              <button
                onClick={toggleMenu}
                className="text-[#BD9574] hover:text-[#FFE55C] transition-colors"
              >
                <div className="flex flex-col gap-2">
                  <div className="w-[24px] h-[1px] bg-current"></div>
                  <div className="w-[24px] h-[1px] bg-current"></div>
                </div>
              </button>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex flex-col md:flex-row items-stretch">
            {/* Logo Section */}
            <div className="flex items-center justify-between px-4 h-[60px]">
              <Link href="/">
                <div className="flex items-center justify-center">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smallLogoBD-zxDglqhR7Dv3zdEHln30LxjDUQXDD7.png"
                    alt="Black Diamondz Logo"
                    className="w-6 h-6"
                  />
                </div>
              </Link>
            </div>

            {/* Location Section */}
            <div className="flex items-center px-6 border-r border-[#333] w-[220px]">
              <div className="flex flex-col w-full">
                <span className="text-[16px] leading-[150%] font-light text-[#888]">
                  Location
                </span>
              </div>
            </div>

            {/* Type Section */}
            <div className="flex items-center px-6 border-r border-[#333] w-[180px]">
              <div className="flex items-center justify-between w-full">
                <span className="text-[16px] leading-[150%] font-light text-[#888]">
                  Type
                </span>
                <ChevronDown className="h-5 w-5 text-[#888]" />
              </div>
            </div>

            {/* Bedroom Section */}
            <div className="flex items-center px-6 border-r border-[#333] w-[180px]">
              <div className="flex items-center justify-between w-full">
                <span className="text-[16px] leading-[150%] font-light text-[#888]">
                  Bedroom
                </span>
                <ChevronDown className="h-5 w-5 text-[#888]" />
              </div>
            </div>

            {/* Value Section */}
            <div className="flex items-center px-6 border-r border-[#333] w-[180px]">
              <div className="flex items-center justify-between w-full">
                <span className="text-[16px] leading-[150%] font-light text-[#888]">
                  Value
                </span>
                <ChevronDown className="h-5 w-5 text-[#888]" />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-center justify-center px-6 border-r border-[#333] w-[140px]">
              <button className="flex items-center text-[#BD9574] hover:text-[#FFE55C] transition-colors text-[16px] leading-[150%] font-light">
                <span className="mr-2">Search</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            {/* Login Button */}
            <div className="flex items-center justify-center px-6 border-r border-[#333] w-[120px]">
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="text-[#BD9574] hover:text-[#FFE55C] transition-colors text-[16px] leading-[150%] font-light"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="text-[#BD9574] hover:text-[#FFE55C] transition-colors text-[16px] leading-[150%] font-light"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Language Selection */}
            <div className="flex items-center justify-center px-6 border-r border-[#333] w-[80px] relative">
              <button
                ref={languageButtonRef}
                onClick={toggleLanguageDropdown}
                className="flex items-center gap-2 text-[#BD9574] focus:outline-none"
                aria-expanded={isLanguageDropdownOpen}
                aria-haspopup="true"
              >
                <span className="text-xl">{selectedLanguage.flag}</span>
                <ChevronDown className="h-4 w-4 text-[#BD9574]" />
              </button>

              {!isMobileView &&
                isLanguageDropdownOpen &&
                createPortal(
                  <div
                    className="bg-[#211f17] border border-[#333] shadow-lg z-[90]"
                    style={{
                      position: "fixed",
                      top:
                        languageButtonRef.current?.getBoundingClientRect()
                          .bottom + "px",
                      left:
                        languageButtonRef.current?.getBoundingClientRect()
                          .right -
                        128 +
                        "px",
                      width: "128px",
                    }}
                  >
                    {languages.map((language) => (
                      <button
                        key={language.country}
                        onClick={() => selectLanguage(language)}
                        className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-[#1A1814] transition-colors"
                      >
                        <span className="text-[#BD9574] text-xl">
                          {language.flag}
                        </span>
                        <div className="flex flex-col items-start">
                          <span className="text-[#BD9574] text-base font-light">
                            {language.name}
                          </span>
                          <span className="text-[#BD9574] text-xs font-light">
                            {language.country}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>,
                  document.body
                )}
            </div>

            {/* Menu Button */}
            <div className="flex items-center justify-center px-6 w-[80px]">
              <button
                onClick={toggleMenu}
                className="text-[#BD9574] hover:text-[#FFE55C] transition-colors"
              >
                <div className="flex flex-col gap-2">
                  <div className="w-[32px] h-[1px] bg-current"></div>
                  <div className="w-[32px] h-[1px] bg-current"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Navigation - Property Filter */}
        <PropertyFilter
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobileView={isMobileView}
          toggleMobileFilters={toggleMobileFilters}
          isMobileFiltersOpen={isMobileFiltersOpen}
          isAuthenticated={isAuthenticated}
        />
      </header>

      {/* Language Dropdown for Mobile */}
      {isMobileView &&
        isLanguageDropdownOpen &&
        createPortal(
          <div
            className="bg-[#211f17] border border-[#333] shadow-lg fixed language-dropdown"
            style={{
              top: "60px",
              right: "10px",
              width: "150px",
            }}
          >
            {languages.map((language) => (
              <button
                key={language.country}
                onClick={() => selectLanguage(language)}
                className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-[#1A1814] transition-colors"
              >
                <span className="text-[#BD9574] text-xl">{language.flag}</span>
                <span className="text-[#BD9574] text-base font-light">
                  {language.name}
                </span>
              </button>
            ))}
          </div>,
          document.body
        )}

      {/* Menu Overlay */}
      <Menu
        dataSocial={dataSocial}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  )
}

// Property Filter Component
function PropertyFilter({
  activeTab,
  setActiveTab,
  isMobileView,
  toggleMobileFilters,
  isMobileFiltersOpen,
  isAuthenticated,
}) {
  const [activeFilters, setActiveFilters] = useState([])

  const toggleFilter = (filterId) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    )
  }

  return (
    <div
      className={`bg-[#211F17]/80 backdrop-blur-md w-full border-b border-[#333] transition-colors duration-300`}
    >
      {/* Buy/Sell Tabs with Filters Button on Mobile */}
      <div className="flex justify-between items-center">
        <div className="flex">
          <Link
            href="/buy"
            className={`px-8 py-4 text-sm font-light border-r border-[#333] ${
              activeTab === "buy" ? "text-[#BD9574]" : "text-[#656565]"
            }`}
            onClick={() => setActiveTab("buy")}
          >
            Buy
          </Link>
          <Link
            href="/sell"
            className={`px-8 py-4 text-sm font-light border-r border-[#333] ${
              activeTab === "sell" ? "text-[#BD9574]" : "text-[#656565]"
            }`}
            onClick={() => setActiveTab("sell")}
          >
            Sell
          </Link>
        </div>
        {/* Desktop Property Filters */}
        {!isMobileView && (
          <div className="hidden md:flex items-stretch text-[#656565]">
            {/* Spacer */}
            <div className="flex-grow"></div>

            {/* Property Type Filters */}
            <button
              onClick={() => toggleFilter("city")}
              className={`flex flex-col items-center justify-center px-6 py-2 border-l border-[#333] ${
                activeFilters.includes("city") ? "text-[#BD9574]" : ""
              }`}
            >
              <svg
                className="h-5 w-5 mb-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 21H21M6 18V9.99998M10 18V9.99998M14 18V9.99998M18 18V9.99998M20 21V6.99998L12 2.99998L4 6.99998V21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs">City</span>
            </button>

            <button
              onClick={() => toggleFilter("country")}
              className={`flex flex-col items-center justify-center px-6 py-2 border-l border-[#333] ${
                activeFilters.includes("country") ? "text-[#BD9574]" : ""
              }`}
            >
              <svg
                className="h-5 w-5 mb-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 21V12M16 21V12M4 21H20M4 7H20M6 7L9 4M18 7L15 4M11 7V4H13V7M4 7V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs">Country</span>
            </button>

            <button
              onClick={() => toggleFilter("beachfront")}
              className={`flex flex-col items-center justify-center px-6 py-2 border-l border-[#333] ${
                activeFilters.includes("beachfront") ? "text-[#BD9574]" : ""
              }`}
            >
              <svg
                className="h-5 w-5 mb-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 19H20M4 15L7 14C8.5 13.5 10.5 13.5 12 14C13.5 14.5 15.5 14.5 17 14L20 15M4 11L7 10C8.5 9.5 10.5 9.5 12 10C13.5 10.5 15.5 10.5 17 10L20 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs">Beachfront</span>
            </button>

            <button
              onClick={() => toggleFilter("apartment")}
              className={`flex flex-col items-center justify-center px-6 py-2 border-l border-[#333] ${
                activeFilters.includes("apartment") ? "text-[#BD9574]" : ""
              }`}
            >
              <svg
                className="h-5 w-5 mb-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 21H21M5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21M9 21V17C9 15.8954 9.89543 15 11 15H13C14.1046 15 15 15.8954 15 17V21M9 7H11M9 11H11M13 7H15M13 11H15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs">Apartment</span>
            </button>

            <button
              onClick={() => toggleFilter("suburbs")}
              className={`flex flex-col items-center justify-center px-6 py-2 border-l border-[#333] ${
                activeFilters.includes("suburbs") ? "text-[#BD9574]" : ""
              }`}
            >
              <svg
                className="h-5 w-5 mb-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 21H21M5 21V8L12 3L19 8V21M9 21V12H15V21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs">Suburbs</span>
            </button>

            <button
              onClick={() => toggleFilter("ocean-view")}
              className={`flex flex-col items-center justify-center px-6 py-2 border-l border-[#333] ${
                activeFilters.includes("ocean-view") ? "text-[#BD9574]" : ""
              }`}
            >
              <svg
                className="h-5 w-5 mb-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 16C3 16 7 10 12 10C17 10 21 16 21 16M3 12C3 12 7 6 12 6C17 6 21 12 21 12M3 20C3 20 7 14 12 14C17 14 21 20 21 20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs">Ocean View</span>
            </button>

            <button
              onClick={() => toggleFilter("pool")}
              className={`flex flex-col items-center justify-center px-6 py-2 border-l border-[#333] ${
                activeFilters.includes("pool") ? "text-[#BD9574]" : ""
              }`}
            >
              <svg
                className="h-5 w-5 mb-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 15C4 15 5 14 7 14C9 14 10 15 12 15C14 15 15 14 17 14C19 14 20 15 20 15M4 19C4 19 5 18 7 18C9 18 10 19 12 19C14 19 15 18 17 18C19 18 20 19 20 19M4 11C4 11 5 10 7 10C9 10 10 11 12 11C14 11 15 10 17 10C19 10 20 11 20 11M12 4V7M15 5V8M9 5V8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs">Pool</span>
            </button>
          </div>
        )}
        {/* Filters button - Only on mobile */}
        {isMobileView && (
          <>
            <button
              onClick={toggleMobileFilters}
              className="text-[#BD9574] px-8 py-4 text-sm font-light"
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 0.45 0.45"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 0.075h0.45m-0.36 0.15h0.27m-0.21 0.15h0.15"
                  stroke="currentColor"
                  strokeWidth="0.03"
                />
              </svg>
            </button>
            <div className="flex items-center justify-center px-8 py-4 border-[#333] border-l">
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="text-[#BD9574] hover:text-[#FFE55C] transition-colors text-[16px] leading-[150%] font-light"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="text-[#BD9574] hover:text-[#FFE55C] transition-colors text-[16px] leading-[150%] font-light"
                >
                  Login
                </Link>
              )}
            </div>
          </>
        )}
      </div>

      {/* Mobile Filters Panel - Shows when toggled */}
      {isMobileView && isMobileFiltersOpen && (
        <div className="border-t border-[#333] overflow-x-auto hide-scrollbar">
          <div className="border-t border-[#333] px-4 py-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <span className="text-[14px] text-[#888] mb-1">Location</span>
                <button className="flex justify-between items-center text-[#BD9574] border border-[#333] rounded px-3 py-2">
                  <span>Any</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col">
                <span className="text-[14px] text-[#888] mb-1">Type</span>
                <button className="flex justify-between items-center text-[#BD9574] border border-[#333] rounded px-3 py-2">
                  <span>Any</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col">
                <span className="text-[14px] text-[#888] mb-1">Bedroom</span>
                <button className="flex justify-between items-center text-[#BD9574] border border-[#333] rounded px-3 py-2">
                  <span>Any</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col">
                <span className="text-[14px] text-[#888] mb-1">Value</span>
                <button className="flex justify-between items-center text-[#BD9574] border border-[#333] rounded px-3 py-2">
                  <span>Any</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>

            <button className="w-full flex items-center justify-center mt-3 py-2 border border-[#BD9574] text-[#BD9574] rounded">
              <span className="mr-2">Search</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="flex">
            <button
              onClick={() => toggleFilter("city")}
              className={`flex flex-col items-center justify-center px-4 py-2 ${
                activeFilters.includes("city")
                  ? "text-[#BD9574]"
                  : "text-[#656565]"
              }`}
            >
              <svg
                className="h-4 w-4 mb-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 21H21M6 18V9.99998M10 18V9.99998M14 18V9.99998M18 18V9.99998M20 21V6.99998L12 2.99998L4 6.99998V21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs whitespace-nowrap">City</span>
            </button>

            <button
              onClick={() => toggleFilter("country")}
              className={`flex flex-col items-center justify-center px-4 py-2 ${
                activeFilters.includes("country")
                  ? "text-[#BD9574]"
                  : "text-[#656565]"
              }`}
            >
              <svg
                className="h-4 w-4 mb-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 21V12M16 21V12M4 21H20M4 7H20M6 7L9 4M18 7L15 4M11 7V4H13V7M4 7V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs whitespace-nowrap">Country</span>
            </button>

            <button
              onClick={() => toggleFilter("beachfront")}
              className={`flex flex-col items-center justify-center px-4 py-2 ${
                activeFilters.includes("beachfront")
                  ? "text-[#BD9574]"
                  : "text-[#656565]"
              }`}
            >
              <svg
                className="h-4 w-4 mb-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 19H20M4 15L7 14C8.5 13.5 10.5 13.5 12 14C13.5 14.5 15.5 14.5 17 14L20 15M4 11L7 10C8.5 9.5 10.5 9.5 12 10C13.5 10.5 15.5 10.5 17 10L20 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs whitespace-nowrap">Beachfront</span>
            </button>

            <button
              onClick={() => toggleFilter("apartment")}
              className={`flex flex-col items-center justify-center px-4 py-2 ${
                activeFilters.includes("apartment")
                  ? "text-[#BD9574]"
                  : "text-[#656565]"
              }`}
            >
              <svg
                className="h-4 w-4 mb-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 21H21M5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21M9 21V17C9 15.8954 9.89543 15 11 15H13C14.1046 15 15 15.8954 15 17V21M9 7H11M9 11H11M13 7H15M13 11H15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs whitespace-nowrap">Apartment</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
