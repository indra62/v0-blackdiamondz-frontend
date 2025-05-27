/**
 * Property Detail Page
 *
 * Dynamic page that displays detailed information about a specific property.
 * Supports different view modes for property images (grid, gallery, map).
 *
 * Uses dynamic routing with [id] parameter to fetch the specific property.
 *
 * @page
 * @param {Object} props - Component props
 * @param {Object} props.params - Route parameters
 * @param {string} props.params.id - Property ID from the URL
 */
"use client";

import { useState, useEffect, use } from "react";
import Footer from "@/components/footer";
import { Taviraj } from "next/font/google";
import { Archivo } from "next/font/google";
import { Inter } from "next/font/google";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { AgentIcon } from "@/components/icons/AgentIcon";
import Paddington from "@/components/paddington";
import PropertyImagesGallery from "@/components/property-images-gallery";
import PropertyGridGallery from "@/components/property-grid-gallery";
import PropertyMap from "@/components/property-map";
import PropertyAgents from "@/components/property-agents";
import { getItem, getImageUrl, findFeature } from "@/lib/api";
import Loading from "@/components/loading";
import { getYouTubeEmbedUrl } from "@/lib/utils";

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const inter = Inter({ subsets: ["latin"], weight: ["500"] });

export default function PropertyDetailPage({ params }) {
  const { id: propertyId } = use(params);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProperty = async (id) => {
    try {
      const data = await getItem("properties", id, {
        fields: [
          "*",
          "translations.*",
          "images.directus_files_id.*",
          "plans.directus_files_id.*",
          "videos.*",
          "features.feature_id.*",
          "features.value",
          "agents.agent_id.user_id.*",
          "type.*.*",
        ],
      });
      return data;
    } catch (error) {
      setError("Error fetching property:", error);
      return null;
    }
  };

  // State management for different view modes and selected images
  const [viewMode, setViewMode] = useState("grid"); // "grid", "gallery", "gridGallery", "map", or "agents"
  const [selectedImageId, setSelectedImageId] = useState(0); // Default to first image
  const [property, setProperty] = useState(null);
  const [allMedia, setAllMedia] = useState([]);
  const [language, setLanguage] = useState("en");
  const [imageAlbum, setImageAlbum] = useState([]);
  const [plansAlbum, setPlansAlbum] = useState([]);
  const [album, setAlbum] = useState([]);
  const [videoLightboxOpen, setVideoLightboxOpen] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const description = property?.description || "";
  const showReadMore = description.length > 300;
  const displayedText = expanded ? description : description.slice(0, 300);

  useEffect(() => {
    fetchProperty(propertyId).then((data) => {
      setProperty(data);
      const combinedMedia = (data?.images || []).concat(data?.plans || []);
      setImageAlbum(data?.images || []);
      setPlansAlbum(data?.plans || []);
      setAllMedia(combinedMedia);
      setAlbum(combinedMedia);
      setLoading(false);
    });

    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language");
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    }
  }, [propertyId]);

  const findFeature = (feature) => {
    if (!property || !property.features) return undefined;
    return property.features.find((f) => f.feature_id?.slug === feature);
  };

  const translation =
    property?.type?.translations?.find((t) => t.languages_code === language) ||
    property?.type?.translations?.[0];

  /**
   * Toggle between different view modes (grid, gallery, gridGallery)
   * Preserves the selected image when switching to gallery view
   *
   * @param {React.SyntheticEvent} event - Click event
   */
  const toggleViewMode = (event) => {
    if (viewMode === "grid") {
      setViewMode("gallery");
    } else if (
      viewMode === "gallery" &&
      event?.currentTarget?.dataset?.action === "grid"
    ) {
      setViewMode("gridGallery");
    } else {
      setViewMode("grid");
    }
  };

  // Update the switchToGridGallery function to accept an event parameter
  const switchToGridGallery = (event) => {
    setViewMode("gridGallery");
  };

  const showMap = () => {
    setViewMode("map");
  };

  const showAgents = () => {
    setViewMode("agents");
  };

  const hideMap = () => {
    setViewMode("grid");
  };

  const handleShowImages = (imageIndex = 0, all = false) => {
		if (all){
			setAlbum(allMedia);
		} else {
			setAlbum(imageAlbum);
		}
    setSelectedImageId(typeof imageIndex === "number" ? imageIndex : 0);
    setViewMode("gallery");
  };

  const handleShowPlans = (planIndex = 0) => {
    setAlbum(plansAlbum);
    setSelectedImageId(typeof planIndex === "number" ? planIndex : 0);
    setViewMode("gallery");
  };

  const handleShowAllMedia = () => {
    setAlbum(allMedia);
    setSelectedImageId(0);
    setViewMode("gallery");
  };

  const handleVideoClick = () => {
    setVideoLightboxOpen(true);
  };

  // Handle clicking on an image in the grid gallery
  const handleGridImageClick = (imageId) => {
    setSelectedImageId(imageId); // Store which image was clicked
    setViewMode("gallery"); // Switch to gallery view
  };

  // Special case: Map view takes over the entire page
  // Return early to avoid rendering the standard layout
  // If we're in map view, show only the map
  if (viewMode === "map") {
    return (
      <PropertyMap
        onClose={hideMap}
        property={property}
        type={translation?.name}
      />
    );
  }
  // Special case: Agents view takes over the entire page
  if (viewMode === "agents") {
    return (
      <PropertyAgents
        onClose={hideMap}
        property={property}
        type={translation?.name}
      />
    );
  }

  return (
		<main className="min-h-screen bg-[#211f17]">
			{loading ? (
				<section className="flex justify-center items-center h-[800px] bg-[#211f17]">
					<Loading error={error} />
				</section>
			) : (
				<>
					<div className="container mx-auto px-4">
						{/* Breadcrumb */}
						<div className="py-6">
							<div
								className={`${archivo.className} text-[#e2dbcc] text-[16px] font-light`}
							>
								<span>{translation?.name || ""}</span>
							</div>
						</div>

						{/* Main Property Content */}
						<div className="flex flex-col md:flex-row">
							{/* Left Column - Property Info */}
							<div
								className="w-full md:w-[420px] md:max-w-[420px] pr-0 md:pr-5 pb-8 md:pb-[60px] mb-8 md:mb-0"
								style={{ gap: "20px" }}
							>
								{/* Property Title */}
								<h1
									className={`${taviraj.className} text-[#bd9574] text-[32px] font-normal leading-[100%] tracking-[0px] mb-4`}
								>
									{property?.name}
								</h1>

								<p
									className={`${archivo.className} text-[#e2dbcc] font-[300] text-[16px] leading-[150%] tracking-[0px] mb-2`}
								>
									{property?.address_street}
								</p>
								<p
									className={`${archivo.className} text-[#e2dbcc] font-[300] text-[16px] leading-[150%] tracking-[0px] mb-4`}
								>
									{property?.address_suburb}, {property?.address_state}{" "}
									{property?.address_postcode.toString().padStart(4, "0")}
								</p>

								<p
									className={`${archivo.className} text-[#bd9574] font-bold text-[16px] leading-[150%] tracking-[0px] mb-6`}
								>
									{property?.price_view || ""}
								</p>

								{/* Property Features */}

								<div className="flex flex-wrap items-center gap-4 mb-6">
									{findFeature("bedrooms")?.value > 0 && (
										<div className="flex items-center gap-1" title="Bedrooms">
											<svg
												width="22"
												height="23"
												viewBox="0 0 22 23"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M4.47949 5.33887C3.34888 5.33887 2.41699 6.27075 2.41699 7.40137V12.0635C1.99805 12.4421 1.72949 12.9846 1.72949 13.5889V19.7764H20.9795V13.5889C20.9795 12.9846 20.7109 12.4421 20.292 12.0635V7.40137C20.292 6.27075 19.3601 5.33887 18.2295 5.33887H4.47949ZM4.47949 6.71387H18.2295C18.6108 6.71387 18.917 7.02002 18.917 7.40137V11.5264H17.542V10.8389C17.542 9.70825 16.6101 8.77637 15.4795 8.77637H12.7295C12.2031 8.77637 11.7197 8.98315 11.3545 9.31348C10.9893 8.98315 10.5059 8.77637 9.97949 8.77637H7.22949C6.09888 8.77637 5.16699 9.70825 5.16699 10.8389V11.5264H3.79199V7.40137C3.79199 7.02002 4.09815 6.71387 4.47949 6.71387ZM7.22949 10.1514H9.97949C10.3608 10.1514 10.667 10.4575 10.667 10.8389V11.5264H6.54199V10.8389C6.54199 10.4575 6.84815 10.1514 7.22949 10.1514ZM12.7295 10.1514H15.4795C15.8608 10.1514 16.167 10.4575 16.167 10.8389V11.5264H12.042V10.8389C12.042 10.4575 12.3481 10.1514 12.7295 10.1514ZM3.79199 12.9014H18.917C19.2983 12.9014 19.6045 13.2075 19.6045 13.5889V18.4014H3.10449V13.5889C3.10449 13.2075 3.41065 12.9014 3.79199 12.9014Z"
													fill="#BD9574"
												/>
											</svg>
											<span
												className={`${archivo.className} font-light text-[#E2DBCC] text-[14px]`}
											>
												{findFeature("bedrooms")?.value
													? findFeature("bedrooms")?.value
													: 0}
											</span>
										</div>
									)}
									{findFeature("bathrooms")?.value > 0 && (
										<div className="flex items-center gap-1" title="Bathrooms">
											<svg
												width="22"
												height="23"
												viewBox="0 0 22 23"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M3.1748 12.2113H4.09147M4.09147 12.2113H18.7581M4.09147 12.2113V14.0446C4.09147 15.0878 4.62589 17.0219 6.60772 17.5655M18.7581 12.2113C19.0013 12.2113 19.2344 12.1147 19.4063 11.9428C19.5782 11.7709 19.6748 11.5377 19.6748 11.2946V7.62793C19.6748 6.71126 19.1248 4.87793 16.9248 4.87793C14.7248 4.87793 14.1748 6.71126 14.1748 7.62793M18.7581 12.2113V14.0446C18.7581 15.0878 18.2237 17.0219 16.2419 17.5655M14.1748 7.62793H12.3415M14.1748 7.62793H16.0081M16.2419 17.5655C15.8667 17.6656 15.4798 17.7146 15.0915 17.7113H7.75814C7.32914 17.7113 6.94689 17.659 6.60772 17.5655M16.2419 17.5655L16.9248 19.5446M6.60772 17.5655L5.9248 19.5446"
													stroke="#BD9574"
													strokeWidth="1.56292"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
											<span
												className={`${archivo.className} font-light text-[#E2DBCC] text-[14px]`}
											>
												{findFeature("bathrooms")?.value
													? findFeature("bathrooms")?.value
													: 0}
											</span>
										</div>
									)}
									{(findFeature("garages")?.value > 0 ||
										findFeature("carports")?.value > 0) && (
										<div className="flex items-center gap-1" title="Garages">
											<svg
												width="22"
												height="23"
												viewBox="0 0 22 23"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M19.5332 12.1894H19.5112L17.7744 8.28125C17.6121 7.91684 17.3477 7.60724 17.0132 7.38991C16.6787 7.17258 16.2884 7.05682 15.8895 7.05664H6.67695C6.27807 7.05685 5.88779 7.17262 5.55331 7.38995C5.21883 7.60728 4.95447 7.91686 4.79221 8.28125L3.05516 12.1894H3.0332C2.66866 12.1898 2.31916 12.3348 2.06138 12.5926C1.80361 12.8504 1.65861 13.1999 1.6582 13.5644V18.3769C1.65861 18.7415 1.80361 19.091 2.06138 19.3487C2.31916 19.6065 2.66866 19.7515 3.0332 19.7519V21.4941C3.03352 21.7675 3.14227 22.0297 3.3356 22.223C3.52893 22.4163 3.79105 22.5251 4.06445 22.5254H6.4707C6.74411 22.5251 7.00623 22.4163 7.19956 22.223C7.39288 22.0297 7.50164 21.7675 7.50195 21.4941V19.7519H15.0645V21.4941C15.0648 21.7675 15.1735 22.0297 15.3669 22.223C15.5602 22.4163 15.8223 22.5251 16.0957 22.5254H18.502C18.7754 22.5251 19.0375 22.4163 19.2308 22.223C19.4241 22.0297 19.5329 21.7675 19.5332 21.4941V19.7519C19.8978 19.7515 20.2472 19.6065 20.505 19.3487C20.7628 19.091 20.9078 18.7415 20.9082 18.3769V13.5644C20.9078 13.1999 20.7628 12.8504 20.505 12.5926C20.2472 12.3348 19.8978 12.1898 19.5332 12.1894ZM6.04854 8.83984C6.10263 8.71835 6.19077 8.61513 6.3023 8.54269C6.41383 8.47024 6.54396 8.43167 6.67695 8.43164H15.8895C16.0224 8.43171 16.1525 8.4703 16.264 8.54274C16.3755 8.61519 16.4636 8.71838 16.5177 8.83984L18.0064 12.1894H4.55984L6.04854 8.83984ZM6.12695 21.1504H4.4082V19.7519H6.12695V21.1504ZM18.1582 21.1504H16.4395V19.7519H18.1582V21.1504ZM19.5332 18.3769H3.0332V13.5644H19.5332V18.3769Z"
													fill="#BD9574"
												/>
												<path
													d="M7.8457 15.3066H4.4082V16.6816H7.8457V15.3066Z"
													fill="#BD9574"
												/>
												<path
													d="M18.1572 15.3066H14.7197V16.6816H18.1572V15.3066Z"
													fill="#BD9574"
												/>
												<path
													d="M11.2822 1.84863L0.969727 5.98923V7.47092L11.2822 3.33037L21.5947 7.47092V5.98923L11.2822 1.84863Z"
													fill="#BD9574"
												/>
											</svg>
											<span
												className={`${archivo.className} font-light text-[#E2DBCC] text-[14px]`}
											>
												{Number(findFeature("garages")?.value || 0) +
													Number(findFeature("carports")?.value || 0)}
											</span>
										</div>
									)}
									{findFeature("pool")?.value > 0 && (
										<div className="flex items-center gap-1" title="Pool">
											<svg
												width="22"
												height="23"
												viewBox="0 0 22 23"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M16.9811 19.9676C16.4998 20.3113 15.7436 20.3113 15.2623 19.9676C14.2998 19.2113 12.7873 19.2113 11.8248 19.9676C11.3436 20.3113 10.5873 20.3113 10.1061 19.9676C9.14356 19.2113 7.63106 19.2113 6.66856 19.9676C6.18731 20.3113 5.43106 20.3113 4.94981 19.9676C3.98731 19.2113 2.47481 19.2113 1.51231 19.9676C1.23731 20.1738 1.16856 20.6551 1.37481 20.9301C1.58106 21.2051 2.06231 21.2738 2.33731 21.0676C2.81856 20.7238 3.57481 20.7238 4.05606 21.0676C4.53731 21.4801 5.15606 21.6176 5.77481 21.6176C6.39356 21.6176 7.01231 21.4113 7.49356 21.0676C7.97481 20.7238 8.73106 20.7238 9.21231 21.0676C10.1748 21.8238 11.6873 21.8238 12.6498 21.0676C13.1311 20.7238 13.8873 20.7238 14.3686 21.0676C15.3311 21.8238 16.8436 21.8238 17.8061 21.0676C18.2873 20.7238 19.0436 20.7238 19.5248 21.0676C19.7998 21.2738 20.2811 21.2738 20.4873 20.9301C20.6936 20.6551 20.6936 20.1738 20.3498 19.9676C19.3873 19.2113 17.9436 19.2113 16.9811 19.9676Z"
													fill="#BD9574"
												/>
												<path
													d="M19.9379 7.11133C20.3504 7.11133 20.6254 6.83633 20.6254 6.42383V5.39258C20.6254 3.67383 19.2504 2.29883 17.5316 2.29883C15.8129 2.29883 14.4379 3.67383 14.4379 5.39258V8.48633H9.62539C9.21289 8.48633 8.93789 8.76133 8.93789 9.17383C8.93789 9.58633 9.21289 9.86133 9.62539 9.86133H14.4379V11.2363H9.62539C9.21289 11.2363 8.93789 11.5113 8.93789 11.9238C8.93789 12.3363 9.21289 12.6113 9.62539 12.6113H14.4379V13.9863H9.62539C9.21289 13.9863 8.93789 14.2613 8.93789 14.6738C8.93789 15.0863 9.21289 15.3613 9.62539 15.3613H14.4379V16.1176C13.5441 15.8426 12.5816 15.9801 11.8254 16.5301C11.3441 16.8738 10.5879 16.8738 10.1066 16.5301C9.62539 16.1176 8.93789 15.9113 8.25039 15.9801V5.39258C8.25039 4.43008 9.00664 3.67383 9.96914 3.67383C10.9316 3.67383 11.6879 4.43008 11.6879 5.39258V6.42383C11.6879 6.83633 11.9629 7.11133 12.3754 7.11133C12.7879 7.11133 13.0629 6.83633 13.0629 6.42383V5.39258C13.0629 3.67383 11.6879 2.29883 9.96914 2.29883C8.25039 2.29883 6.87539 3.67383 6.87539 5.39258V16.4613C6.80664 16.4613 6.80664 16.5301 6.73789 16.5301C6.25664 16.8738 5.50039 16.8738 5.01914 16.5301C4.05664 15.7738 2.54414 15.7738 1.58164 16.5301C1.30664 16.7363 1.23789 17.2176 1.44414 17.4926C1.65039 17.7676 2.13164 17.8363 2.40664 17.6301C2.88789 17.2863 3.64414 17.2863 4.12539 17.6301C4.60664 18.0426 5.22539 18.1801 5.84414 18.1801C6.46289 18.1801 7.08164 17.9738 7.56289 17.6301C8.04414 17.2863 8.80039 17.2863 9.28164 17.6301C10.2441 18.3863 11.7566 18.3863 12.7191 17.6301C13.2004 17.2863 13.9566 17.2863 14.4379 17.6301C15.4004 18.3863 16.9129 18.3863 17.8754 17.6301C18.3566 17.2863 19.1129 17.2863 19.5941 17.6301C19.8691 17.8363 20.3504 17.8363 20.5566 17.4926C20.7629 17.2176 20.7629 16.7363 20.4191 16.5301C19.4566 15.7738 17.9441 15.7738 16.9816 16.5301C16.7066 16.8051 16.2254 16.8051 15.8129 16.7363C15.8129 16.7363 15.8129 16.7363 15.8129 16.6676V5.39258C15.8129 4.43008 16.5691 3.67383 17.5316 3.67383C18.4941 3.67383 19.2504 4.43008 19.2504 5.39258V6.42383C19.2504 6.83633 19.5254 7.11133 19.9379 7.11133Z"
													fill="#BD9574"
												/>
											</svg>
											<span
												className={`${archivo.className} font-light text-[#E2DBCC] text-[14px]`}
											>
												{findFeature("pool")?.value || 0}
											</span>
										</div>
									)}
									{findFeature("study")?.value > 0 && (
										<div className="flex items-center gap-1" title="Study">
											<svg
												width="22"
												height="23"
												viewBox="0 0 22 23"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M11.4248 3.11816V19.6182M11.4248 3.11816C9.723 3.11816 8.09089 3.7942 6.88754 4.99756C5.68418 6.20092 5.00814 7.83303 5.00814 9.53483V19.6182H17.8415V9.53483C17.8415 7.83303 17.1654 6.20092 15.9621 4.99756C14.7587 3.7942 13.1266 3.11816 11.4248 3.11816ZM17.8415 11.3682H5.00814M3.1748 19.6182H19.6748"
													stroke="#BD9574"
													strokeWidth="1.56292"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
											<span
												className={`${archivo.className} font-light text-[#E2DBCC] text-[14px]`}
											>
												{findFeature("study")?.value || 0}
											</span>
										</div>
									)}
									{findFeature("openSpaces")?.value > 0 && (
										<div
											className="flex items-center gap-1"
											title="Open Spaces"
										>
											<svg
												width="22"
												height="23"
												viewBox="0 0 22 23"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M17.5378 8.85628C17.3939 8.84783 17.1115 8.83159 16.5401 8.96249C16.9399 8.53625 17.067 8.28513 17.1315 8.15724C18.0631 6.31377 17.3114 4.06108 15.4559 3.13557C14.5734 2.69535 13.5659 2.63783 12.6191 2.97383C12.0248 3.18464 11.4696 3.54338 11.0003 4.01294C10.5309 3.54338 9.97577 3.1846 9.38144 2.97383C8.43467 2.63794 7.42717 2.69543 6.54464 3.13557C4.68916 4.06108 3.93752 6.31377 4.86904 8.1572C4.93368 8.28509 5.06066 8.53628 5.46061 8.96265C4.88901 8.83171 4.60656 8.84798 4.4628 8.85636C2.39016 8.97662 0.802474 10.7497 0.923474 12.8089C0.98102 13.7882 1.43465 14.6838 2.2009 15.3307C2.68187 15.7367 3.27214 16.035 3.91609 16.204C3.74144 16.8426 3.70631 17.4997 3.81975 18.1164C4.00042 19.0991 4.55418 19.9373 5.37916 20.4765C6.01539 20.8924 6.73272 21.0912 7.44277 21.0911C8.6684 21.0911 9.87155 20.4985 10.5941 19.4074C10.6733 19.2879 10.8287 19.053 11.0003 18.4958C11.172 19.053 11.3274 19.2878 11.4066 19.4074C12.1292 20.4986 13.3322 21.0911 14.5579 21.0911C15.2678 21.0911 15.9853 20.8923 16.6215 20.4765C17.4464 19.9373 18.0002 19.0991 18.1809 18.1164C18.2943 17.4997 18.2592 16.8426 18.0846 16.204C18.7286 16.035 19.3188 15.7367 19.7997 15.3307C20.566 14.6838 21.0196 13.7883 21.0772 12.8089C21.1982 10.7496 19.6105 8.97654 17.5378 8.85628ZM7.17816 4.38925C7.46018 4.24861 7.79198 4.16823 8.14399 4.16823C8.90709 4.16823 9.76484 4.54602 10.4143 5.5062L11.0003 6.37255L11.5863 5.5062C12.5352 4.10303 13.9291 3.94356 14.8225 4.38921C15.9821 4.96765 16.4519 6.37556 15.8697 7.52777C15.7524 7.75987 15.2483 8.45868 13.1119 9.94408C12.5623 9.42231 11.8186 9.10079 11.0003 9.10079C10.182 9.10079 9.43828 9.42231 8.88878 9.94408C6.75242 8.45872 6.24829 7.75991 6.13095 7.52777C5.54876 6.3756 6.01854 4.96769 7.17816 4.38925ZM9.41457 18.6364C8.70133 19.7134 7.23917 20.0131 6.15518 19.3045C4.96381 18.5257 4.98598 17.0257 5.51075 15.9615L5.97293 15.0241L4.92474 14.9531C3.73475 14.8725 2.41608 14.1415 2.33301 12.7271C2.25739 11.4401 3.24973 10.3319 4.54508 10.2567C4.56071 10.2558 4.57848 10.2553 4.59864 10.2553C4.91454 10.2553 5.80837 10.3915 8.02851 11.4207C7.97183 11.6516 7.94114 11.8924 7.94114 12.1403C7.94114 13.5201 8.87164 14.6874 10.1417 15.057C9.91527 17.6368 9.55833 18.4192 9.41457 18.6364ZM11.0003 13.7769C10.092 13.7769 9.35304 13.0427 9.35304 12.1403C9.35304 11.2378 10.092 10.5036 11.0003 10.5036C11.9086 10.5036 12.6476 11.2378 12.6476 12.1403C12.6476 13.0427 11.9086 13.7769 11.0003 13.7769ZM19.6676 12.7271C19.5845 14.1415 18.2659 14.8725 17.0759 14.9531L16.0277 15.0241L16.4899 15.9615C17.0146 17.0257 17.0368 18.5257 15.8454 19.3045C14.7614 20.0131 13.2993 19.7133 12.5861 18.6363C12.4424 18.4193 12.0854 17.6369 11.8588 15.057C13.1289 14.6873 14.0595 13.5201 14.0595 12.1403C14.0595 11.8923 14.0288 11.6516 13.9721 11.4207C16.3336 10.3261 17.1937 10.2415 17.4555 10.2567C18.7509 10.3319 19.7433 11.44 19.6676 12.7271Z"
													fill="#BD9574"
												/>
											</svg>
											<span
												className={`${archivo.className} font-light text-[#E2DBCC] text-[14px]`}
											>
												{findFeature("openSpaces")?.value}
											</span>
										</div>
									)}
								</div>

								{/* Map Button */}
								<div className="grid grid-cols-2 gap-0">
									<button
										onClick={showMap}
										className="w-full border border-[#656565] py-3 px-4 flex items-center justify-center gap-2 text-[#bd9574] hover:bg-[#2c2920] transition-colors mb-8"
									>
										<MapPin size={20} />
										<span
											className={`${archivo.className} font-light text-base`}
										>
											See map
										</span>
									</button>
									<button
										onClick={showAgents}
										className="w-full border border-[#656565] py-3 px-4 flex items-center justify-center gap-2 text-[#bd9574] hover:bg-[#2c2920] transition-colors mb-8"
									>
										<AgentIcon width="22" height="22" color="currentColor" />
										<span
											className={`${archivo.className} font-light text-base`}
										>
											Agents
										</span>
									</button>
								</div>

								{/* Property Description with 'Read More' functionality */}
								{(() => {
									return (
										<div>
											<p
												className={`${archivo.className} text-[#e2dbcc] font-[300] text-[16px] leading-[150%] tracking-[0px] whitespace-pre-line`}
											>
												{displayedText}
												{showReadMore && !expanded && "..."}
											</p>
											{showReadMore && !expanded && (
												<button
													className="text-[#bd9574] underline mt-2 cursor-pointer bg-transparent border-none p-0"
													onClick={() => setExpanded(true)}
													type="button"
												>
													Read more...
												</button>
											)}
											{showReadMore && expanded && (
												<button
													className="text-[#bd9574] underline mt-2 cursor-pointer bg-transparent border-none p-0"
													onClick={() => setExpanded(false)}
													type="button"
												>
													Read less...
												</button>
											)}
										</div>
									);
								})()}
							</div>

							{/* Property Images - Right Column */}
							<div className="flex-1">
								{viewMode === "grid" ? (
									/* Grid View - Responsive Layout */
									<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
										{/* Column 1 (Left) */}
										<div className="flex flex-col gap-2">
											{/* Row 1: Large Image */}
											<div className="relative h-56 md:h-64">
												{property?.images?.[0] && (
													<div onClick={() => handleShowImages(0, true)}>
														<Image
															src={getImageUrl(
																property?.images?.[0]?.directus_files_id?.id,
																{
																	quality: 80,
																	fit: "cover",
																}
															)}
															alt={property?.name}
															fill
															sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
															style={{ objectFit: "cover" }}
															className="transition-transform duration-700 hover:scale-110"
														/>
													</div>
												)}
											</div>

											{/* Row 2: Two Half-Size Images */}
											<div className="grid grid-cols-2 gap-2">
												<div className="relative h-32 md:h-40">
													{property?.images?.[1] && (
														<div onClick={() => handleShowImages(1, true)}>
															<Image
																src={getImageUrl(
																	property?.images?.[1]?.directus_files_id?.id,
																	{
																		quality: 80,
																		fit: "cover",
																	}
																)}
																alt={property?.images?.[1]?.directus_files_id?.title}
																fill
																className="transition-transform duration-700 hover:scale-110"
															/>
														</div>
													)}
												</div>
												<div className="relative h-32 md:h-40">
													{property?.images?.[2] && (
														<div onClick={() => handleShowImages(2, true)}>
															<Image
																src={getImageUrl(
																	property?.images?.[2]?.directus_files_id?.id,
																	{
																		quality: 80,
																		fit: "cover",
																	}
																)}
																alt={property?.images?.[2]?.directus_files_id?.title}
																fill
																className="transition-transform duration-700 hover:scale-110"
															/>
														</div>
													)}
												</div>
											</div>

											{/* Row 3: Don't Miss It Section */}
											<div className="flex flex-col mt-4">
												<h3
													className={`${archivo.className} text-[#E2DBCC] text-[20px] font-[400] leading-[100%] tracking-[0%] mb-2`}
												>
													Don't miss it !
												</h3>
												<p
													className={`${inter.className} text-[#757575] font-[500] text-[12px] leading-[150%] tracking-[-1.1%] mb-4`}
												>
													Follow the updates about this property by subscribing
													to our newsletter and stay in the loop with news &
													updates.
												</p>
											</div>
										</div>

										{/* Column 2 (Right) */}
										<div className="flex flex-col gap-2">
											{/* Row 1: Image */}
											<div className="relative h-56 md:h-64">
												{property?.images?.[3] && (
													<div onClick={() => handleShowImages(3, true)}>
														<Image
															src={getImageUrl(
																property?.images?.[3]?.directus_files_id?.id,
																{
																	quality: 80,
																	fit: "cover",
																}
															)}
															alt={
																property?.images?.[3]?.directus_files_id.title
															}
															fill
															className="transition-transform duration-700 hover:scale-110"
														/>
													</div>
												)}
											</div>

											{/* Row 2: Image */}
											<div className="relative h-32 md:h-40">
												{property?.images?.[4] && (
													<div onClick={() => handleShowPlans(0)}>
														<Image
															src={getImageUrl(
																property?.images?.[4]?.directus_files_id?.id,
																{
																	quality: 80,
																	fit: "cover",
																}
															)}
															alt={
																property?.images?.[4]?.directus_files_id.title
															}
															fill
															className="object-cover transition-transform duration-700 hover:scale-110"
														/>
													</div>
												)}
											</div>

											{/* Row 3: Icons and All Media Button */}
											<div className="flex items-center justify-end gap-6 mt-4">
												<div className="flex items-center gap-6">
													<div
														className={`${archivo.className} flex flex-col justify-center items-center text-[#bd9574] font-[300] text-[16px] leading-[150%] tracking-[0px] cursor-pointer`}
														title="Images"
														onClick={handleShowImages}
													>
														<div className="flex items-center gap-2 text-[#bd9574]">
															<svg
																width="23"
																height="22"
																viewBox="0 0 23 22"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	d="M8.55014 10.1999C9.43376 10.1999 10.1501 9.48359 10.1501 8.59994C10.1501 7.71632 9.43376 7 8.55014 7C7.66651 7 6.9502 7.71632 6.9502 8.59994C6.9502 9.48359 7.66651 10.1999 8.55014 10.1999Z"
																	stroke="currentColor"
																	strokeWidth="1.56"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																/>
																<path
																	d="M7.39844 18.2002C11.8542 8.5205 15.5581 6.82456 19.75 13.1044"
																	stroke="currentColor"
																	strokeWidth="1.56"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																/>
																<path
																	d="M16.5505 3.7998H6.95086C5.18361 3.7998 3.75098 5.23244 3.75098 6.99969V14.9994C3.75098 16.7666 5.18361 18.1993 6.95086 18.1993H16.5505C18.3177 18.1993 19.7504 16.7666 19.7504 14.9994V6.99969C19.7504 5.23244 18.3177 3.7998 16.5505 3.7998Z"
																	stroke="currentColor"
																	strokeWidth="1.56"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																/>
															</svg>
															<span
																className={`${archivo.className} text-[#E2DBCC] font-[300] text-[16px] leading-[150%] tracking-[0px]`}
															>
																{property?.images?.length}
															</span>
														</div>
														<span>Images</span>
													</div>
													{property?.video && (
														<div
															className={`${archivo.className} flex flex-col justify-center items-center text-[#bd9574] font-[300] text-[16px] leading-[150%] tracking-[0px] cursor-pointer`}
															title="Video"
															onClick={handleVideoClick}
														>
															<div className="flex items-center gap-2 text-[#bd9574]">
																<svg
																	width="23"
																	height="22"
																	viewBox="0 0 23 22"
																	fill="none"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<path
																		d="M14.75 9.16667L18.9236 7.08033C19.0633 7.01052 19.2185 6.97756 19.3746 6.98458C19.5306 6.99161 19.6823 7.03839 19.8151 7.12049C19.948 7.20258 20.0577 7.31727 20.1338 7.45367C20.2099 7.59006 20.2499 7.74364 20.25 7.89983V14.1002C20.2499 14.2564 20.2099 14.4099 20.1338 14.5463C20.0577 14.6827 19.948 14.7974 19.8151 14.8795C19.6823 14.9616 19.5306 15.0084 19.3746 15.0154C19.2185 15.0224 19.0633 14.9895 18.9236 14.9197L14.75 12.8333V9.16667ZM3.75 7.33333C3.75 6.8471 3.94315 6.38079 4.28697 6.03697C4.63079 5.69315 5.0971 5.5 5.58333 5.5H12.9167C13.4029 5.5 13.8692 5.69315 14.213 6.03697C14.5568 6.38079 14.75 6.8471 14.75 7.33333V14.6667C14.75 15.1529 14.5568 15.6192 14.213 15.963C13.8692 16.3068 13.4029 16.5 12.9167 16.5H5.58333C5.0971 16.5 4.63079 16.3068 4.28697 15.963C3.94315 15.6192 3.75 15.1529 3.75 14.6667V7.33333Z"
																		stroke="currentColor"
																		strokeWidth="1.56"
																		strokeLinecap="round"
																		strokeLinejoin="round"
																	/>
																</svg>
																<span
																	className={`${archivo.className} text-[#E2DBCC] font-[300] text-[16px] leading-[150%] tracking-[0px]`}
																>
																	{property?.video ? 1 : 0}
																</span>
															</div>
															<span>Video</span>
														</div>
													)}
													<div
														className={`${archivo.className} flex flex-col justify-center items-center text-[#bd9574] font-[300] text-[16px] leading-[150%] tracking-[0px] cursor-pointer`}
														title="Floor Plans"
														onClick={handleShowPlans}
													>
														<div className="flex items-center gap-2 text-[#bd9574]">
															<svg
																width="18"
																height="18"
																viewBox="0 0 23 22"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	d="M22 2V22H2V11H4V20H9V14H11V20H20V11H17V9H20V4H11V9H14V11H9V4H4V8H2V2H22Z"
																	fill="currentColor"
																></path>
															</svg>
															<span
																className={`${archivo.className} text-[#E2DBCC] font-[300] text-[16px] leading-[150%] tracking-[0px]`}
															>
																{property?.plans?.length}
															</span>
														</div>
														<span>Floor Plans</span>
													</div>
												</div>
												{/* Update the button onClick handler to pass the event */}
												<button
													onClick={handleShowAllMedia}
													className="px-6 py-3 border border-[#bd9574] text-[#bd9574] hover:border-[#BD9574] hover:text-[#BD9574] transition-colors"
												>
													View All Media
												</button>
											</div>
										</div>
									</div>
								) : viewMode === "gallery" ? (
									/* Gallery View - Replaces the grid when "View All Media" is clicked */
									<div className="w-full h-[500px]">
										<PropertyImagesGallery
											onClose={toggleViewMode}
											onGridView={switchToGridGallery}
											initialImageId={selectedImageId}
											album={album}
										/>
									</div>
								) : (
									/* Grid Gallery View - Replaces the gallery when "Grid" button is clicked */
									<div className="w-full h-[500px] relative">
										<PropertyGridGallery
											onClose={() => setViewMode("grid")}
											onImageClick={handleGridImageClick}
											album={album}
										/>
									</div>
								)}
							</div>
						</div>
						{videoLightboxOpen && (
							<div className="fixed inset-0 z-[1001] bg-[#211f17]/60 backdrop-blur-md flex items-center justify-center">
								{/* Close Button (Top Right) */}
								<button
									className={`absolute top-4 right-4 z-50 ${archivo.className} text-[#bd9574] bg-[#211f17]/60 hover:bg-[#211f17] border border-[#bd9574]/50 px-6 py-3 transition-colors`}
									onClick={() => setVideoLightboxOpen(false)}
								>
									Close
								</button>
								{/* Responsive Video Container */}
								<div className="relative w-full max-w-[1200px] aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
									<iframe
										src={getYouTubeEmbedUrl(property.video)}
										title="YouTube video player"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
										className="absolute inset-0 w-full h-full"
										frameBorder="0"
									/>
								</div>
							</div>
						)}
					</div>
					<Paddington />
				</>
			)}
			<Footer />
		</main>
	);
}
