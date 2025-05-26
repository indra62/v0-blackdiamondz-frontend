"use client"
import { useAuth } from "@/hooks/useAuth"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ChevronDown, ArrowRight, Heart } from "lucide-react"
import { Archivo } from "next/font/google"
import Menu from "./menu"
import { getImageUrl, getItems } from "@/lib/api"
import { createPortal } from "react-dom"
import { useDebouncedCallback } from "use-debounce"
import AsyncSelect from "react-select/async"
import Select from "react-select"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import RangeSlider from "react-range-slider-input"
import "react-range-slider-input/dist/style.css"

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
    overflowY: "auto",
    border: "1px solid rgba(101, 101, 101, 0.3)",
    WebkitOverflowScrolling: "touch",
    zIndex: 1000,
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 1000, // or higher if needed
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
    color: "#888",
  }),
  input: (provided) => ({
    ...provided,
    color: "#E2DBCC",
  }),
  indicatorSeparator: (base) => ({
    display: "none",
  }),
}

const bedroomOptions = [
  { value: 1, label: "1 Bedroom" },
  { value: 2, label: "2 Bedrooms" },
  { value: 3, label: "3 Bedrooms" },
  { value: 4, label: "4 Bedrooms" },
  { value: 5, label: "5 Bedrooms" },
  { value: 6, label: "6+ Bedrooms" },
]

export default function SearchBar() {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const city = searchParams.get("city")
  const type = searchParams.get("type")
  const bedroom = searchParams.get("bedroom")
  const priceMin = searchParams.get("price_min")
  const priceMax = searchParams.get("price_max");
	const features = searchParams.getAll("features");
  const { logout, isAuthenticated } = useAuth()
  const [error, setError] = useState(null)
	const [language, setLanguage] = useState("en");
  const activeTab = pathname.startsWith("/buy")
    ? "buy"
    : pathname.startsWith("/sell")
    ? "sell"
    : pathname.startsWith("/sold-properties")
    ? "sold"
    : ""
  const [dataLogo, setDataLogo] = useState(null)
  const [dataSocial, setDataSocial] = useState(null)
  const [dataType, setDataTypes] = useState([])
	const [dataViews, setDataViews] = useState([])
  const [formData, setFormData] = useState({
    city: city || "",
    type: type || "",
    bedroom: bedroom || "",
    price_min: priceMin || "",
    price_max: priceMax || "",
		features: features || "",
  })
	const [activeFilters, setActiveFilters] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  const [isValueDropdownOpen, setIsValueDropdownOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  })
  const valueDropdownRef = useRef()
  const buttonRef = useRef()
  const valueDropdownPortalRef = useRef()

  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen)
  }

	const handleFeatureClick = (feature) => {
		const params = new URLSearchParams(searchParams.toString());
		const currentFeatures = params.getAll("features");
		if (currentFeatures.includes(feature)) {
			// Remove feature
			const newFeatures = currentFeatures.filter((f) => f !== feature);
			params.delete("features");
			newFeatures.forEach((f) => params.append("features", f));
		} else {
			// Add feature
			params.append("features", feature);
		}
		router.push(`/buy?${params.toString()}`);
	};

  const handleSearch = (event) => {
		if (event) event.preventDefault();
		const params = new URLSearchParams();
		if (formData.city) params.set("city", formData.city);
		if (formData.type) params.set("type", formData.type);
		if (formData.bedroom) params.set("bedroom", formData.bedroom);

		if (formData.price_min) params.set("price_min", formData.price_min);
		if (formData.price_max) params.set("price_max", formData.price_max);

		if (activeFilters.length > 0) {
			activeFilters.forEach((feature) => {
				params.append("features", feature);
			});
		}

		const hasParams = Array.from(params).length > 0;
		if (hasParams) {
			router.push(`/buy?${params.toString()}`);
		} else {
			if (router.pathname !== "/buy") {
				router.push("/buy");
			} else {
				// Refresh the page
				router.replace(router.asPath);
			}
		}
		setIsMobileFiltersOpen(false);
	};


  useEffect(() => {
		if (typeof window !== "undefined") {
			const storedLanguage = localStorage.getItem("language");
			if (storedLanguage) {
				setLanguage(storedLanguage);
			}
		}
    const fetchDataSocial = async () => {
      try {
        const dataLogo = await getItems("Global", {
          fields: ["Logo.*"],
        })
        const dataFooter = await getItems("footer", {
          fields: ["*.*"],
        })
        const dataTypes = await getItems("property_types", {
          fields: ["*.*"],
        })
				const dataViews = await getItems("view_type", {
					fields: ["*.*"],
				})

        setDataTypes(dataTypes)
				setDataViews(dataViews)
        setDataLogo(dataLogo)
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        valueDropdownRef.current &&
        !valueDropdownRef.current.contains(event.target) &&
        valueDropdownPortalRef.current &&
        !valueDropdownPortalRef.current.contains(event.target)
      ) {
        setIsValueDropdownOpen(false)
      }
    }
    if (isValueDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isValueDropdownOpen])

  const formatPrice = (num) =>
    num
      ? new Intl.NumberFormat("en-AU", {
          style: "currency",
          currency: "AUD",
        }).format(num)
      : "Any"

  const minPrice = formData.price_min !== "" ? Number(formData.price_min) : 0
  const maxPrice =
    formData.price_max !== "" ? Number(formData.price_max) : 50000000

  const debouncedLoadCityOptions = useDebouncedCallback(
    (inputValue, callback) => {
      const fetchData = async () => {
        try {
          const data = await getItems("cities", {
            fields: ["*"],
            filter: {
              country_id: { _in: ["14"] },
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

  const propertyTypeOptions = dataType.map((type) => {
    const translation =
      type.translations.find(
        (t) => t.languages_code === language
      ) || type.translations[0]
    return {
      value: type.id,
      label: translation?.name || "",
    }
  })

  const openDropdown = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      })
    }
    setIsValueDropdownOpen(true)
  }

  return (
		<>
			<form
				onSubmit={handleSearch}
				className={`${archivo.className} font-light sticky top-[140px] z-[1000] bg-[#211F17]/80 border-none`}
			>
				{/* Main Navigation */}
				<div
					className={`backdrop-blur-md text-[#BD9574] border-b border-[#333] transition-colors duration-300 mx-[40px] h-[70px] mt-12`}
				>
					{/* Desktop Header */}
					<div className="hidden md:flex flex-col md:flex-row items-stretch">
						{/* Location Section */}
						<div className="flex items-center px-6 py-4 py-4 border-r border-[#333] w-1/2">
							<div className="flex flex-col w-full">
								<AsyncSelect
									instanceId="property-location-select"
									name="location"
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
										}));
									}}
									getOptionLabel={(option) => option.name}
									getOptionValue={(option) => option.id}
									placeholder={"Search Location"}
									menuPortalTarget={
										typeof window !== "undefined" ? document.body : null
									}
									menuPosition="fixed"
									styles={customStyles}
									className={archivo.className}
									isClearable
									components={{
										DropdownIndicator: () => null,
									}}
									noOptionsMessage={({ inputValue }) =>
										inputValue ? `No location found` : null
									}
								/>
							</div>
						</div>

						{/* Type Section */}
						<div className="flex items-center px-6 py-4 border-r border-[#333] w-1/4">
							<div className="flex flex-col w-full">
								<Select
									instanceId="property-type-select"
									name="type"
									value={propertyTypeOptions.find(
										(option) => option.value === formData.type
									)}
									onChange={(option) =>
										setFormData((prev) => ({
											...prev,
											type: option ? option.value : "",
										}))
									}
									options={propertyTypeOptions}
									placeholder="Type"
									styles={customStyles}
									menuPortalTarget={
										typeof window !== "undefined" ? document.body : null
									}
									menuPosition="fixed"
									className={archivo.className}
									isClearable
								/>
							</div>
						</div>

						{/* Bedroom Section */}
						<div className="flex items-center px-6 py-4 border-r border-[#333] w-1/4">
							<div className="flex flex-col w-full">
								<Select
									instanceId="property-bedroom-select"
									name="bedroom"
									value={bedroomOptions.find(
										(option) => option.value === formData.bedroom
									)}
									onChange={(option) =>
										setFormData((prev) => ({
											...prev,
											bedroom: option ? option.value : "",
										}))
									}
									options={bedroomOptions}
									placeholder="Bedroom"
									styles={customStyles}
									menuPortalTarget={
										typeof window !== "undefined" ? document.body : null
									}
									menuPosition="fixed"
									className={archivo.className}
									isClearable
								/>
							</div>
						</div>

						{/* Value Section */}
						<div
							className="flex items-center px-6 py-4 border-r border-[#333] w-1/3 relative"
							ref={valueDropdownRef}
						>
							<button
								ref={buttonRef}
								type="button"
								className="flex items-center justify-between w-full text-left"
								onClick={openDropdown}
							>
								{minPrice === 0 && maxPrice === 50000000 ? (
									<span className="text-[16px] leading-[150%] font-light text-[#888]">
										Value
									</span>
								) : (
									<span className="text-[16px] leading-[150%] font-light text-[#E2DBCC]">
										{formatPrice(minPrice)} - {formatPrice(maxPrice)}
									</span>
								)}

								<ChevronDown className="h-5 w-5 text-[#888] ml-2" />
							</button>
							{isValueDropdownOpen &&
								createPortal(
									<div
										className="z-[1000] bg-[#211f17] border border-[#333] rounded shadow-lg px-6 py-4 min-w-[240px] price-range-slider"
										style={{
											position: "absolute",
											top: dropdownPosition.top,
											left: dropdownPosition.left,
											width: dropdownPosition.width,
										}}
										ref={valueDropdownPortalRef}
										onClick={(e) => e.stopPropagation()}
									>
										<RangeSlider
											min={0}
											max={50000000}
											step={1000000}
											value={[minPrice, maxPrice]}
											onInput={([min, max]) => {
												setFormData((prev) => ({
													...prev,
													price_min: min,
													price_max: max,
												}));
											}}
										/>
										<div className="flex justify-between mt-4 text-[#E2DBCC] text-sm">
											<span>{formatPrice(minPrice)}</span>
											<span>{formatPrice(maxPrice)}</span>
										</div>
										<button
											className="mt-4 w-full border border-[#BD9574] text-[#BD9574] rounded py-1 hover:bg-[#BD9574] hover:text-[#211f17] transition-colors"
											onClick={(e) => {
												e.stopPropagation();
												setIsValueDropdownOpen(false);
											}}
										>
											Done
										</button>
									</div>,
									document.body
								)}
						</div>

						{/* Search Button */}
						<div className="flex items-center justify-center px-6 py-4 w-[140px]">
							<button
								className="flex items-center text-[#BD9574] hover:text-[#FFE55C] transition-colors text-[16px] leading-[150%] font-light"
								type="submit"
							>
								<span className="mr-2">Search</span>
								<ArrowRight className="h-5 w-5" />
							</button>
						</div>
					</div>
				</div>

				{/* Secondary Navigation - Property Filter */}
				<PropertyFilter
					activeTab={activeTab}
					isMobileView={isMobileView}
					toggleMobileFilters={toggleMobileFilters}
					isMobileFiltersOpen={isMobileFiltersOpen}
					isAuthenticated={isAuthenticated}
					logout={logout}
					language={language}
					dataViews={dataViews}
					formData={formData}
					setFormData={setFormData}
					propertyTypeOptions={propertyTypeOptions}
					debouncedLoadCityOptions={debouncedLoadCityOptions}
					formatPrice={formatPrice}
					handleSearch={handleSearch}
					activeFilters={activeFilters}
					setActiveFilters={setActiveFilters}
					handleFeatureClick={handleFeatureClick}
					features={features}
				/>
			</form>
		</>
	);
}

// Property Filter Component
function PropertyFilter({
	activeTab,
	isMobileView,
	toggleMobileFilters,
	isMobileFiltersOpen,
	isAuthenticated,
	logout,
	language,
	dataViews,
	formData,
	setFormData,
	propertyTypeOptions,
	debouncedLoadCityOptions,
	formatPrice,
	handleSearch,
	activeFilters,
	setActiveFilters,
	handleFeatureClick,
	features,
}) {
	const [hasMounted, setHasMounted] = useState(false);
	useEffect(() => {
		setHasMounted(true);
	}, []);

	const toggleFilter = (filterId) => {
		setActiveFilters((prev) =>
			prev.includes(filterId)
				? prev.filter((id) => id !== filterId)
				: [...prev, filterId]
		);
	};

	return (
		<div className={`backdrop-blur-md w-full transition-colors duration-300`}>
			{/* Buy/Sell Tabs with Filters Button on Mobile */}
			<div className="flex justify-between items-center">
				{/* Filters button - Only on mobile */}
				{isMobileView && (
					<>
						<div className="flex items-center">
							<div className="flex items-center justify-center px-7 py-4 border-[#333] border-l">
								<button
									onClick={toggleMobileFilters}
									className="text-[#BD9574] text-sm font-light"
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
							</div>
						</div>
					</>
				)}
			</div>

			{/* Mobile Filters Panel - Shows when toggled */}
			{isMobileView && isMobileFiltersOpen && (
				<div className="bg-[#211F17]/90 w-full border-t border-[#333] overflow-x-auto hide-scrollbar">
					<div className="backdrop-blur-md border-t border-[#333] px-4 py-3">
						<div className="grid grid-cols-2 gap-3">
							<div className="flex flex-col col-span-2">
								<span className="text-[14px] text-[#888] mb-1">Location</span>
								<AsyncSelect
									instanceId="property-location-select-mobile"
									name="location"
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
										}));
									}}
									getOptionLabel={(option) => option.name}
									getOptionValue={(option) => option.id}
									placeholder={"Search.."}
									menuPortalTarget={document.body}
									menuPosition="absolute"
									styles={customStyles}
									className={archivo.className}
									isClearable
									components={{
										DropdownIndicator: () => null,
									}}
									noOptionsMessage={({ inputValue }) =>
										inputValue ? `No location found` : null
									}
								/>
							</div>

							<div className="flex flex-col">
								<span className="text-[14px] text-[#888] mb-1">Type</span>
								<Select
									instanceId="property-type-select-mobile"
									name="type"
									value={propertyTypeOptions.find(
										(option) => option.value === formData.type
									)}
									onChange={(option) =>
										setFormData((prev) => ({
											...prev,
											type: option ? option.value : "",
										}))
									}
									options={propertyTypeOptions}
									placeholder="Any"
									styles={customStyles}
									menuPortalTarget={document.body}
									menuPosition="absolute"
									className={`${archivo.className}`}
									isClearable
									isSearchable={false}
								/>
							</div>

							<div className="flex flex-col">
								<span className="text-[14px] text-[#888] mb-1">Bedroom</span>
								<Select
									instanceId="property-bedroom-select-mobile"
									name="type"
									value={bedroomOptions.find(
										(option) => option.value === formData.bedroom
									)}
									onChange={(option) =>
										setFormData((prev) => ({
											...prev,
											bedroom: option ? option.value : "",
										}))
									}
									options={bedroomOptions}
									placeholder="Any"
									styles={customStyles}
									menuPortalTarget={document.body}
									menuPosition="absolute"
									className={`${archivo.className}`}
									isClearable
									isSearchable={false}
								/>
							</div>

							<div className="flex flex-col">
								<span className="text-[14px] text-[#888] mb-1">Value</span>
								<input
									name="price_min"
									type="number"
									min={0}
									step={1000}
									placeholder="Min"
									value={formData.price_min}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											price_min: e.target.value,
										}))
									}
									className="bg-[#211F17] rounded border border-[#333] text-[#e2dbcc] placeholder:text-[#888] text-sm p-2 pr-8 appearance-none focus:outline-none"
								/>
							</div>
							<div className="flex flex-col">
								<span className="text-[14px] text-[#888] mb-1 invisible">
									Max Value
								</span>
								<input
									name="price_max"
									type="number"
									min={0}
									step={1000}
									placeholder="Max"
									value={formData.price_max}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											price_max: e.target.value,
										}))
									}
									className="bg-[#211F17] rounded border border-[#333] text-[#e2dbcc] placeholder:text-[#888] text-sm p-2 pr-8 appearance-none focus:outline-none"
								/>
							</div>
						</div>

						<button
							onClick={handleSearch}
							className="w-full flex items-center justify-center mt-3 py-2 border border-[#BD9574] text-[#BD9574] rounded"
						>
							<span className="mr-2">Search</span>
							<ArrowRight className="h-4 w-4" />
						</button>
					</div>
				</div>
			)}
			<div className="flex justify-end backdrop-blur-md z-[1000] mr-[40px] h-[70px]">
				{dataViews.length > 0 &&
					dataViews?.map((views) => {
						const translation =
							views?.translations?.find((t) => t.languages_code === language) ||
							views?.translations?.[0];

						return (
							<button
								type="button"
								key={views?.slug}
								onClick={() => handleFeatureClick(views.contain)}
								className={`flex flex-col items-center justify-center px-4 py-2 ${
									features.includes(views.contain)
										? "text-[#BD9574]"
										: "text-[#656565]"
								}`}
							>
								<div dangerouslySetInnerHTML={{ __html: views.svg }}></div>
								<span className="text-xs whitespace-nowrap">
									{translation?.view_type}
								</span>
							</button>
						);
					})}
			</div>
		</div>
	);
}
