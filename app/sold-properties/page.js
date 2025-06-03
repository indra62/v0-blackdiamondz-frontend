/**
 * Buy Page
 *
 * Property listings page for properties available for purchase.
 * Includes property grid with filtering options, explore city section,
 * and off-market properties.
 *
 * @page
 */
"use client";

import { useState, useEffect, useRef } from "react";
import Footer from "@/components/footer";
import ExploreCity from "@/components/explore-city";
import SoldMap from "@/components/sold-map";
import OffMarket from "@/components/off-market";
import { getItems } from "@/lib/api";
import Link from "next/link";
import { Property } from "@/lib/component/property";
import { Taviraj } from "next/font/google";
import { Archivo } from "next/font/google";
import Loading from "@/components/loading";

const taviraj = Taviraj({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});
const archivo = Archivo({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

const ITEMS_PER_PAGE = 12;

export default function SoldPage() {
	const [loading, setLoading] = useState(true);
	const [dataSold, setDataSold] = useState(null);
	const [properties, setProperties] = useState([]);
	const [propertiesCurrentPage, setPropertiesCurrentPage] = useState(0);
	const [propertiesTotalPages, setPropertiesTotalPages] = useState(0);
	const [error, setError] = useState(null);
	const [explore, setExplore] = useState(null);
	const [offMarket, setOffMarket] = useState(null);
	const [offMarketSection, setOffMarketSection] = useState(null);
	const [language, setLanguage] = useState("en");
	const [isMobileView, setIsMobileView] = useState(false);
	const gridRef = useRef(null);

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
		if (typeof window !== "undefined") {
			const storedLanguage = localStorage.getItem("language");
			if (storedLanguage) {
				setLanguage(storedLanguage);
			}
		}
	}, []);

	const fetchProperties = async (
		page = 0,
	) => {
		try {
			const directusPage = page + 1;

			const filter = {
				is_off_market: { _eq: false },
				status: { _eq: "Sold", _neq: "Inactive" },
			};

			// Fetch properties with pagination
			const data = await getItems(
				"properties",
				{
					fields: [
						"*",
						"translations.*",
						"images.directus_files_id.*",
						"plans.*",
						"videos.*",
						"features.feature_id.*",
						"features.value",
						"agents.agent_id.user_id.*",
						"type.*.*",
					],
					filter,
					limit: ITEMS_PER_PAGE,
					page: directusPage,
					meta: "filter_count,total_count",
					sort: ["-date_created"],
				},
				{},
				true
			);

			setProperties(data?.data || []);
			const totalCount = data.meta?.filter_count || 0;
			setPropertiesTotalPages(Math.ceil(totalCount / ITEMS_PER_PAGE));
			return data;
		} catch (err) {
			console.error("Error fetching properties:", err);
			setError("Failed to load properties");
			return { data: [] };
		}
	};

	const handlePropertyPageChange = (page) => {
		if (page >= 0 && page < propertiesTotalPages) {
			setPropertiesCurrentPage(page);
		}
	};

	useEffect(() => {
		if (gridRef.current) {
			gridRef.current.scrollIntoView({ top: -80, behavior: "smooth" });
		}
	}, [propertiesCurrentPage]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const dataSold = await getItems("property_sold", {
					fields: ["*", "translations.*", "cities.*"],
				});
				const dataExplore_section = await getItems("explore_section", {
					fields: ["*", "translations.*", "cities.*"],
				});
				const dataOffMarketSection = await getItems("offMarket_section", {
					fields: ["*", "translations.*"],
				});
				const dataOffMarketProperties = await getItems("properties", {
					fields: [
						"*",
						"translations.*",
						"images.directus_files_id.*",
						"plans.*",
						"videos.*",
						"features.feature_id.*",
						"features.value",
						"agents.agent_id.user_id.*",
						"type.*.*",
					],
					filter: {
						status: { _eq: "Offmarket" },
					},
					limit: 4,
					sort: ["-date_created"],
				});

				setExplore(dataExplore_section);
				setDataSold(dataSold);
				setOffMarketSection(dataOffMarketSection);
				setOffMarket(dataOffMarketProperties);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setError("Failed to load data");
			}
		};
		fetchData();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		fetchProperties(
			propertiesCurrentPage,
		);
		// eslint-disable-next-line
	}, [propertiesCurrentPage]);

	const translationSold =
		dataSold?.translations?.find((t) => t.languages_code === language) ||
		dataSold?.translations?.[0];

	return (
		<main className="min-h-screen bg-[#211f17]">
			{loading ? (
				<section className="flex justify-center items-center h-[800px] bg-[#211f17]">
					<Loading error={error} />
				</section>
			) : (
				<>
					<div className="container mx-auto px-4 py-16">
						{/* Heading */}
						<div
							ref={gridRef}
							className="flex flex-col items-center text-center mb-12"
						>
							<h2
								className={`${taviraj.className} text-[#e2dbcc] text-[48px] font-light leading-[60px] tracking-[2px] mb-8`}
							>
								{translationSold?.property_sold_title}
							</h2>
							<div className="flex justify-center mb-6">
								<div className="w-24 h-px bg-[#bd9574] relative">
									<div className="absolute w-2 h-2 bg-[#bd9574] rotate-45 -top-[3px] left-1/2 transform -translate-x-1/2"></div>
								</div>
							</div>

							<div
								className={`${archivo.className} text-[#e2dbcc] text-base mb-6 text-center max-w-[732px]`}
							>
								{translationSold?.property_sold_description}
							</div>
						</div>

						{/* Property Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							<div className="md:col-span-2 lg:col-span-4">
								<SoldMap />
							</div>
							{properties.length > 0 ? (
								<>
									{properties.map((property) => (
										<Property
											key={property.id}
											property={property}
											taviraj={taviraj}
											archivo={archivo}
										/>
									))}

									{propertiesTotalPages > 1 && (
										<div className="flex items-center justify-between mt-12 w-full md:col-span-2 lg:col-span-4">
											{!isMobileView && (
												<div className="flex gap-8">
													{Array.from(
														{ length: propertiesTotalPages },
														(_, index) => (
															<div
																key={index}
																className={`w-3 h-3 ${
																	index === propertiesCurrentPage
																		? "bg-[#BD9574]"
																		: "bg-[#656565]"
																} transform rotate-45 cursor-pointer`}
																onClick={() => handlePropertyPageChange(index)}
															/>
														)
													)}
												</div>
											)}

											<div className="flex items-center gap-4 text-white">
												<button
													className={`p-2 border border-[#656565] rounded ${
														propertiesCurrentPage === 0
															? "opacity-50 cursor-not-allowed"
															: "hover:border-[#BD9574] hover:text-[#BD9574]"
													} transition-colors`}
													onClick={() =>
														handlePropertyPageChange(propertiesCurrentPage - 1)
													}
													disabled={propertiesCurrentPage === 0}
												>
													<svg
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M15 18l-6-6 6-6"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
												</button>
												<button
													className={`p-2 border border-[#656565] rounded ${
														propertiesCurrentPage === propertiesTotalPages - 1
															? "opacity-50 cursor-not-allowed"
															: "hover:border-[#BD9574] hover:text-[#BD9574]"
													} transition-colors`}
													onClick={() =>
														handlePropertyPageChange(propertiesCurrentPage + 1)
													}
													disabled={
														propertiesCurrentPage === propertiesTotalPages - 1
													}
												>
													<svg
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M9 6l6 6-6 6"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
												</button>
											</div>
										</div>
									)}
								</>
							) : (
								<div className="col-span-4 p-32 text-center italic text-[#e2dbcc]">
									{language === "en"
										? "No properties found."
										: "未找到任何属性。"}
								</div>
							)}
						</div>
					</div>

					{/* Explore City Section */}
					<ExploreCity data={explore} />

					{/* Off-Market Properties Section */}
					<OffMarket data={offMarket} section={offMarketSection} />
				</>
			)}
			<Footer />
		</main>
	);
}
