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

import { useState, useEffect, Suspense, useRef, useMemo } from "react";
import Footer from "@/components/footer";
import ExploreCity from "@/components/explore-city";
import BuyMap from "@/components/buy-map";
import OffMarket from "@/components/off-market";
import { getImageUrl, getItems } from "@/lib/api";
import Link from "next/link";
import { Property } from "@/lib/component/property";
import { Taviraj } from "next/font/google";
import { Archivo } from "next/font/google";
import Loading from "@/components/loading";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/searchBar";

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

const ITEMS_PER_PAGE = 12;

export function BuyPageContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [dataExplore, setDataExplore] = useState(null);
  const [properties, setProperties] = useState([]);
  const [propertiesCurrentPage, setPropertiesCurrentPage] = useState(0);
  const [propertiesTotalPages, setPropertiesTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const [explore, setExplore] = useState(null);
  const [offMarket, setOffMarket] = useState(null);
  const [offMarketSection, setOffMarketSection] = useState(null);
  const [language, setLanguage] = useState("en");
  const city = searchParams.get("city");
  const type = searchParams.get("type");
  const bedroom = searchParams.get("bedroom");
  const priceMin = searchParams.get("price_min");
  const priceMax = searchParams.get("price_max");
  const features = searchParams.getAll("features");
  const featuresKey = features.join(",");
  const rangesParam = searchParams.get("ranges");
  const ranges =
    rangesParam && rangesParam.length > 0
      ? rangesParam.split(",").map((r) => {
          const [start, end] = r.split("-").map(Number);
          return { start, end };
        })
      : [];
  const [isMobileView, setIsMobileView] = useState(false);
  const gridRef = useRef(null);
  const prevFilters = useRef({
    city,
    type,
    bedroom,
    priceMin,
    priceMax,
    features,
    rangesParam,
  });

  useEffect(() => {
		// Compare each primitive filter value
		const prev = prevFilters.current;
		if (
			prev.city !== city ||
			prev.type !== type ||
			prev.bedroom !== bedroom ||
			prev.priceMin !== priceMin ||
			prev.priceMax !== priceMax ||
			prev.featuresKey !== featuresKey ||
			prev.rangesParam !== rangesParam
		) {
			setPropertiesCurrentPage(0);
			prevFilters.current = {
				city,
				type,
				bedroom,
				priceMin,
				priceMax,
				featuresKey,
				rangesParam,
			};
		}
		// eslint-disable-next-line
	}, [city, type, bedroom, priceMin, priceMax, featuresKey, rangesParam]);

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
		status = "Current",
		type = [],
		city,
		bedroom,
		priceMin,
		priceMax,
		ranges = [],
		features = []
	) => {
		try {
			const directusPage = page + 1;

			const filter = {
				is_off_market: { _eq: false },
				status:
					status === "Current"
						? { _eq: "Current" }
						: { _eq: "Sold", _neq: "Inactive" },
			};

			if (city) {
				filter.address_suburb = { _eq: city };
			}
			if (type && type.length > 0) {
				filter.type = { id: { _in: type } };
			}

			if (priceMin || priceMax) {
				filter.price = {};
				if (priceMin) filter.price._gte = Number(priceMin);
				if (priceMax) filter.price._lte = Number(priceMax);
			}

			if (bedroom !== undefined && bedroom !== null && bedroom !== "") {
				const is6Plus = bedroom === "6";
				filter.features = {
					_some: {
						feature_id: { slug: { _eq: "bedrooms" } },
						value: is6Plus ? { _gte: 6 } : { _eq: bedroom },
					},
				};
			}

			// Ranges (_or for postcode ranges)
			if (ranges.length > 0) {
				filter._or = [
					...(filter._or || []),
					...ranges.map(({ start, end }) => ({
						address_postcode: {
							_gte: start,
							_lte: end,
						},
					})),
				];
			}

			// Features (_or for features, using _some for relational filtering)
			if (features.length > 0) {
				filter._or = [
					...(filter._or || []),
					...features.map((feature) => ({
						features: {
							_some: {
								value: { _contains: feature },
							},
						},
					})),
				];
			}

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
    const fetchDataBuy = async () => {
      try {
        const dataExplore = await getItems("property_buy", {
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
						is_off_market: { _eq: true },
						status: { _eq: "Offmarket" },
					},
					limit: 4,
				});

        setExplore(dataExplore_section);
        setDataExplore(dataExplore);
        setOffMarketSection(dataOffMarketSection);
        setOffMarket(dataOffMarketProperties);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
      }
    };
    fetchDataBuy();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
		fetchProperties(
			propertiesCurrentPage,
			"Current",
			type ? [type] : [],
			city,
			bedroom,
			priceMin,
			priceMax,
			ranges,
			features
		);
		// eslint-disable-next-line
	}, [
		propertiesCurrentPage,
		city,
		type,
		bedroom,
		priceMin,
		priceMax,
		rangesParam,
		featuresKey,
	]);

  const translationExplore =
    dataExplore?.translations?.find((t) => t.languages_code === language) ||
    dataExplore?.translations?.[0];

  return (
		<main className="min-h-screen bg-[#211f17]">
			{loading ? (
				<section className="flex justify-center items-center h-[800px] bg-[#211f17]">
					<Loading error={error} />
				</section>
			) : (
				<>
					<div className="container mx-auto px-4 pt-16">
						{/* Heading */}
						<div
							ref={gridRef}
							className="flex flex-col items-center text-center mb-12"
						>
							<h2
								className={`${taviraj.className} text-[#e2dbcc] text-[48px] font-light leading-[60px] tracking-[2px] mb-8`}
							>
								{translationExplore?.property_buy_title}
							</h2>
							<div className="flex justify-center mb-6">
								<div className="w-24 h-px bg-[#bd9574] relative">
									<div className="absolute w-2 h-2 bg-[#bd9574] rotate-45 -top-[3px] left-1/2 transform -translate-x-1/2"></div>
								</div>
							</div>

							<div
								className={`${archivo.className} text-[#e2dbcc] text-base mb-6 text-center max-w-[732px]`}
							>
								{translationExplore?.property_buy_description}
							</div>
						</div>
					</div>

					<div className="container mb-6 mx-auto px-4 py-16">
						<BuyMap />
					</div>
					
					<SearchBar />

					{/* Property Grid */}
					<div className="container mx-auto px-4 py-16">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
					<div className="py-16 px-[40px]">
						<ExploreCity data={explore} />
					</div>

					{/* Off-Market Properties Section */}
					<OffMarket data={offMarket} section={offMarketSection} />
				</>
			)}
			<Footer />
		</main>
	);
}
export default function BuyPage() {
  return (
		<Suspense fallback={<div className="min-h-screen bg-[#211f17]"></div>}>
			<BuyPageContent />
		</Suspense>
	);
}
