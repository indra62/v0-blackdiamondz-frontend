"use client";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Archivo } from "next/font/google";
import Menu from "./menu";
import { getImageUrl, getItems } from "@/lib/api";
import { createPortal } from "react-dom";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, usePathname } from "next/navigation";
import "react-range-slider-input/dist/style.css";

const archivo = Archivo({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

export default function Header() {
	const [hasMounted, setHasMounted] = useState(false);
	useEffect(() => {
		setHasMounted(true);
	}, []);
	const router = useRouter();
	const pathname = usePathname();
	const { logout, isAuthenticated } = useAuth();
	const [error, setError] = useState(null);
	const languageButtonRef = useRef(null);
	const [dataLogo, setDataLogo] = useState(null);
	const [dataSocial, setDataSocial] = useState(null);
	const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
	const languageDropdownRef = useRef(null);
	const [selectedLanguage, setSelectedLanguage] = useState("en");
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isMobileView, setIsMobileView] = useState(false);
	const [isValueDropdownOpen, setIsValueDropdownOpen] = useState(false);
	const valueDropdownRef = useRef();
	const valueDropdownPortalRef = useRef();
	const activeTab = pathname.startsWith("/buy")
		? "buy"
		: pathname.startsWith("/sell")
		? "sell"
		: pathname.startsWith("/sold-properties")
		? "sold"
		: "";

	const languages = [
		{ name: "English", country: "UK", flag: "🇬🇧", value: "en" },
		{ name: "中文", country: "CN", flag: "🇨🇳", value: "cn" },
	];

	const toggleLanguageDropdown = () => {
		setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
	};

	const selectLanguage = (language) => {
		setSelectedLanguage(language);
		localStorage.setItem("language", language.value);
		setIsLanguageDropdownOpen(false);
		window.location.reload();
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleSearch = () => {
		const params = new URLSearchParams();
		if (formData.city) params.set("city", formData.city);
		if (formData.type) params.set("type", formData.type);
		if (formData.bedroom) params.set("bedroom", formData.bedroom);

		if (formData.price_min) params.set("price_min", formData.price_min);
		if (formData.price_max) params.set("price_max", formData.price_max);

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
		const savedLanguage = localStorage.getItem("language");
		if (savedLanguage) {
			const foundLanguage = languages.find(
				(lang) => lang.value === savedLanguage
			);
			if (foundLanguage) {
				setSelectedLanguage(foundLanguage);
			}
		} else {
			localStorage.setItem("language", "en");
		}
	}, []);

	useEffect(() => {
		const fetchDataSocial = async () => {
			try {
				const dataLogo = await getItems("Global", {
					fields: ["Logo.*"],
				});
				const dataFooter = await getItems("footer", {
					fields: ["*.*"],
				});
				setDataLogo(dataLogo);
				setDataSocial(dataFooter);
			} catch (err) {
				setError("Failed to load home data:" + err.message);
			}
		};
		fetchDataSocial();
	}, []);

	useEffect(() => {
		const handleResize = () => {
			setIsMobileView(window.innerWidth < 768);
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				valueDropdownRef.current &&
				!valueDropdownRef.current.contains(event.target) &&
				valueDropdownPortalRef.current &&
				!valueDropdownPortalRef.current.contains(event.target)
			) {
				setIsValueDropdownOpen(false);
			}
		}
		if (isValueDropdownOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isValueDropdownOpen]);

	useEffect(() => {
		if (!isLanguageDropdownOpen) return;

		function handleClickOutside(event) {
			// If click is outside both the dropdown and the button, close
			if (
				languageDropdownRef.current &&
				!languageDropdownRef.current.contains(event.target) &&
				languageButtonRef.current &&
				!languageButtonRef.current.contains(event.target)
			) {
				setIsLanguageDropdownOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isLanguageDropdownOpen]);

	return (
		<>
			<header
				className={`${archivo.className} font-light sticky-header h-[140px]`}
			>
				{/* Main Navigation */}
				<div
					className={`bg-[#211F17]/80 backdrop-blur-md text-[#BD9574] border-b border-[#333] transition-colors duration-300 h-[70px] md:h-[140px]`}
				>
					{/* Mobile Header */}
					<div className="md:hidden flex items-center justify-between px-4 h-[70px]">
						<Link href="/">
							<div className="flex items-center justify-center">
								<img
									src={
										getImageUrl(dataLogo?.Logo?.id, {
											format: "webp",
											quality: 80,
											fit: "fit",
										}) || "/images/smallLogoBD.png"
									}
									alt="Black Diamondz Logo"
									className="w-auto h-6"
								/>
							</div>
						</Link>

						<div className="flex items-center gap-6 mobile-header-actions">
							<button
								ref={languageButtonRef}
								onTouchStart={(e) => {
									e.preventDefault();
									toggleLanguageDropdown();
								}}
								aria-expanded={isLanguageDropdownOpen}
								aria-haspopup="true"
								className="flex items-center w-10 h-10 gap-1 text-[#BD9574] focus:outline-none relative z-[999]"
							>
								<span className="text-xl">{selectedLanguage.flag}</span>
								<ChevronDown className="h-4 w-4 text-[#BD9574]" />
							</button>

							<button
								onClick={toggleMenu}
								className="text-[#BD9574] hover:text-[#D4AF37] transition-colors"
							>
								<div className="flex flex-col gap-2">
									<div className="w-[24px] h-[1px] bg-current"></div>
									<div className="w-[24px] h-[1px] bg-current"></div>
								</div>
							</button>
						</div>
					</div>

					{/* Desktop Header */}
					<div className="hidden md:grid grid-cols-[repeat(3,1fr)] md:grid-rows-[1fr] md:gap-y-[10px] md:gap-x-[10px] md:justify-items-stretch">
						{/* Logo Section */}
						<div className="row-1 row-2 col-1 col-2 flex flex-col justify-start items-start">
							<div className="px-7 py-4 h-[70px]">
								<Link href="/">
									<img
										src={
											getImageUrl(dataLogo?.Logo?.id, {
												format: "webp",
												quality: 80,
												fit: "fit",
											}) || "/images/smallLogoBD.png"
										}
										alt="Black Diamondz Logo"
										className="w-auto h-7"
									/>
								</Link>
							</div>
							<div className="flex h-[70px]">
								<Link
									href="/buy"
									className={`flex items-center px-7 py-4 text-sm font-light border-r border-[#333] ${
										activeTab === "buy" ? "text-[#BD9574]" : "text-[#888]"
									}`}
								>
									Buy
								</Link>
								<Link
									href="/sell"
									className={`flex items-center px-7 py-4 text-sm font-light border-r border-[#333] ${
										activeTab === "sell" ? "text-[#BD9574]" : "text-[#888]"
									}`}
								>
									Sell
								</Link>
								<Link
									href="/sold-properties"
									className={`flex items-center px-7 py-4 text-sm font-light ${
										activeTab === "sold" ? "text-[#BD9574]" : "text-[#888]"
									}`}
								>
									Sold
								</Link>
							</div>
						</div>

						<div className="row-1 row-2 col-2 col-3 flex justify-center items-center">
							<Link href="/">
								<img
									src={
										getImageUrl(dataSocial?.footer_logo?.id, {
											format: "webp",
											quality: 80,
											fit: "fit",
										}) || "/images/smallLogoBD.png"
									}
									alt="Black Diamondz Logo"
									className="w-auto h-14"
								/>
							</Link>
						</div>

						{/* Language Selection */}
						<div className="row-1 row-2 col-3 col-4 flex-col items-center justify-end">
							<div className="flex items-center justify-end px-6 h-[70px]">
								{/* Login Button */}
								<div className="flex items-center justify-center px-6 py-4 w-[120px]">
									{hasMounted ? (
										isAuthenticated ? (
											<button
												onClick={logout}
												className="text-[#BD9574] hover:text-[#D4AF37] transition-colors text-[16px] leading-[150%] font-light"
											>
												Logout
											</button>
										) : (
											<Link
												href="/login"
												className="text-[#BD9574] hover:text-[#D4AF37] transition-colors text-[16px] leading-[150%] font-light"
											>
												Login
											</Link>
										)
									) : (
										<span style={{ visibility: "hidden" }}>Login</span>
									)}
								</div>
								<div className="flex items-center justify-center px-6 py-4">
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
												className="bg-[#211f17] border border-[#333] shadow-lg z-[1000]"
												ref={languageDropdownRef}
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
										className="text-[#BD9574] hover:text-[#D4AF37] transition-colors"
									>
										<div className="flex flex-col gap-2">
											<div className="w-[32px] h-[1px] bg-current"></div>
											<div className="w-[32px] h-[1px] bg-current"></div>
										</div>
									</button>
								</div>
							</div>
							{!isMobileView && (
								<div className="hidden md:flex items-stretch text-[#888] h-[70px]">
									{/* Spacer */}
									<div className="flex-grow"></div>
									<Link
										href="/our-team"
										className={`flex items-center px-7 py-4 text-sm font-light text-[#888]`}
									>
										Our Team
									</Link>
									<Link
										href="/club-diamondz"
										className={`flex items-center px-7 py-4 text-sm font-light border-l border-[#333] text-[#888]`}
									>
										<svg
											width="25"
											height="25"
											viewBox="0 0 25 25"
											fill="currentColor"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M16.933 4.375H6.818L3.125 8.956l8.75 10.367 8.75 -10.366zM4.857 8.981l2.529 -3.152H16.363l2.529 3.152L11.875 17.261z"
												fill="currentColor"
											/>
											<path
												d="M16.902 19.12H6.848V20.625h10.054z"
												fill="currentColor"
											/>
										</svg>
										Club Diamondz
									</Link>
									<Link
										href="/contact-us"
										className={`flex items-center px-7 py-4 text-sm font-light border-l border-[#333] text-[#888]`}
									>
										Contact Us
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			</header>

			{/* Language Dropdown for Mobile */}
			{isMobileView && isLanguageDropdownOpen && (
				<div
					className="bg-[#211f17] border border-[#333] shadow-lg fixed z-[1000]"
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
				</div>
			)}

			{/* Menu Overlay */}
			<Menu
				dataSocial={dataSocial}
				dataLogo={dataLogo}
				isOpen={isMenuOpen}
				isAuthenticated={isAuthenticated}
				onClose={() => setIsMenuOpen(false)}
			/>
		</>
	);
}
