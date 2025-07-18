/**
 * Home Page
 *
 * Main landing page of the website.
 * Assembles various components to create the complete homepage.
 *
 * Component order determines the visual hierarchy and flow of the page.
 *
 * @page
 */
"use client";

import Hero from "@/components/hero";
import SearchBar from "@/components/searchBar";
import Properties from "@/components/properties";
import StatsHome from "@/components/stats_home";
import AboutUs from "@/components/about-us";
import ExploreCity from "@/components/explore-city";
import OffMarket from "@/components/off-market";
import Footer from "@/components/footer";
import { getItems, getFilteredItems } from "@/lib/api";
import Loading from "@/components/loading";
import { useEffect, useState } from "react";

export default function Home() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [heroData, setHeroData] = useState(null);
	const [aboutUs, setAboutUs] = useState(null);
	const [statistic, setStatistic] = useState(null);
	const [explore, setExplore] = useState(null);
	const [properties, setProperties] = useState(null);
	const [offMarket, setOffMarket] = useState(null);
	const [offMarketSection, setOffMarketSection] = useState(null);
	const [categories, setCategories] = useState([]);
	const [propertiesCurrentPage, setPropertiesCurrentPage] = useState(0);
	const [propertiesTotalPages, setPropertiesTotalPages] = useState(0);
	const [propertiesStatus, setPropertiesStatus] = useState("Current");
	const [propertiesType, setPropertiesType] = useState([]);
	const ITEMS_PER_PAGE = 12;
	const [isMobileView, setIsMobileView] = useState(false);

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

	const fetchProperties = async (page = 0, status = "Current", type = []) => {
		try {
			// Convert page index to Directus page number (1-based)
			const directusPage = page + 1;

			// Create filter based on status
			const filter = {
				is_off_market: { _eq: false },
				status:
					status === "Current"
						? { _eq: "Current" }
						: { _eq: "Sold", _neq: "Inactive" },
			};

			if (type.length > 0) {
				// For One-to-Many relationship
				filter.type = {
					id: { _in: type },
				};

				// For Many-to-Many relationship, use this instead:
				// filter.type = {
				//   _some: {
				//     id: { _in: type }
				//   }
				// }
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
						"agents.agent_id.*",
            "agents.agent_id.agent_photo.directus_files_id.*",
            "agents.agent_id.external_logo.directus_files_id.*",
						"agents.agent_id.user_id.*",
						"type.*.*",
					],
					filter,
					limit: ITEMS_PER_PAGE,
					page: directusPage,
					sort: ["-date_listed"],
					meta: "filter_count,total_count",
				},
				{},
				true
			);

			// Update properties state
			setProperties(data?.data || []);

			// Calculate total pages
			const totalCount = data?.meta?.filter_count || 0;
			// setPropertiesCount(totalCount)
			setPropertiesTotalPages(Math.ceil(totalCount / ITEMS_PER_PAGE));

			return data;
		} catch (err) {
			console.error("Error fetching properties:", err);
			setError("Failed to load properties");
			return { data: [] };
		}
	};

	// Handle property filter change
	const handlePropertyFilterChange = (status) => {
		setPropertiesStatus(status);
		setPropertiesCurrentPage(0);
		fetchProperties(0, status, propertiesType);
	};

	const handlePropertyTypeChange = (type) => {
		setPropertiesType(type);
		setPropertiesCurrentPage(0);
		fetchProperties(0, propertiesStatus, type);
	};

	// Handle property page change
	const handlePropertyPageChange = (page) => {
		if (page >= 0 && page < propertiesTotalPages) {
			setPropertiesCurrentPage(page);
			fetchProperties(page, propertiesStatus, propertiesType);
		}
	};

	useEffect(() => {
		const fetchDataHome = async () => {
			try {
				const propertyTypes = await getItems("property_types", {
					fields: ["*", "translations.*"],
					filter: {
						is_filterable: { _eq: true },
					},
				});
				const dataHero = await getItems("hero_section", {
					fields: ["*", "hero_image.*", "translations.*"],
				});
				const dataAboutUs_section = await getItems("aboutUs_section", {
					fields: [
						"*",
						"translations.*",
						"aboutUs_images.directus_files_id.*",
					],
				});
				const dataStatistic_section = await getItems("statistic_section", {
					fields: ["*", "translations.*"],
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
						"agents.agent_id.*",
            "agents.agent_id.agent_photo.directus_files_id.*",
            "agents.agent_id.external_logo.directus_files_id.*",
						"agents.agent_id.user_id.*",
						"type.*.*",
					],
					filter: {
						status: { _eq: "Offmarket" },
					},
					sort: ["-date_listed"],
					limit: 8,
				});

				const propertiesData = await fetchProperties(0, "Current", []);

				setCategories(propertyTypes);
				setHeroData(dataHero);
				setAboutUs(dataAboutUs_section);
				setStatistic(dataStatistic_section);
				setExplore(dataExplore_section);
				setOffMarketSection(dataOffMarketSection);
				setOffMarket(dataOffMarketProperties);
				setLoading(false);
			} catch (err) {
				setError("Failed to load home data:" + err.message);
			}
		};
		fetchDataHome();
	}, []);

	return (
		<main className="min-h-screen bg-[#211f17]">
			{loading ? (
				<section className="flex justify-center items-center h-[800px] bg-[#211f17]">
					<Loading error={error} />
				</section>
			) : (
				<>
					<Hero data={heroData} />
					<SearchBar />
					<div className="px-4 md:px-[40px]">
						<Properties
							data={properties}
							currentPage={propertiesCurrentPage}
							totalPages={propertiesTotalPages}
							onPageChange={handlePropertyPageChange}
							onFilterChange={handlePropertyFilterChange}
							onTypeChange={handlePropertyTypeChange}
							categories={categories}
							isMobileView={isMobileView}
						/>
					</div>
					<div className="px-4 md:px-[40px] py-0 md:py-16">
						<StatsHome data={statistic} isMobileView={isMobileView} />
					</div>
					<div className="px-4 md:px-[40px] py-0 md:py-16">
						<AboutUs data={aboutUs} />
					</div>
					<div className="pt-16 md:py-16 px-0 md:px-[40px]">
						<ExploreCity data={explore} />
					</div>
					<div className="px-4 md:px-[40px]">
						<OffMarket data={offMarket} section={offMarketSection} />
					</div>
				</>
			)}
			<Footer />
		</main>
	);
}
