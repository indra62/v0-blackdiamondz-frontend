/**
 * Explore City Component
 *
 * Horizontal scrollable gallery of city cards with hover effects.
 * Each card shows a city image with name overlay.
 *
 * Uses a fixed-width container with overflow to create the scrollable effect.
 *
 * @component
 */
"use client"

import { useState, useEffect, useCallback } from "react"
import { Archivo, Taviraj } from "next/font/google"
import Image from "next/image"
import { getImageUrl } from "@/lib/api"
import Link from "next/link"

const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })

import { useRef } from "react"

export default function ExploreCity({ data }) {
  const [language, setLanguage] = useState("en")
  const showNavigation = true
  const scrollRef = useRef(null)
  const wasDragged = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);

  // Helper to detect mobile width
  const getImageWidth = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= 768 ? 280 : 508
    }
    return 508
  }

  const onMouseDown = useCallback((e) => {
		setIsDragging(true);
		setDragStart({ x: e.clientX, y: e.clientY });
		setStartX(e.pageX - scrollRef.current.offsetLeft);
		setScrollLeft(scrollRef.current.scrollLeft);
		wasDragged.current = false; // Reset at drag start
	}, []);

	const onMouseMove = useCallback(
		(e) => {
			if (!isDragging) return;
			const distance = Math.sqrt(
				Math.pow(e.clientX - dragStart.x, 2) +
					Math.pow(e.clientY - dragStart.y, 2)
			);
			if (distance > 5) {
				wasDragged.current = true; // Mark as dragged
				e.preventDefault();
				const x = e.pageX - scrollRef.current.offsetLeft;
				const walk = (x - startX) * 1.2;
				scrollRef.current.scrollLeft = scrollLeft - walk;
			}
		},
		[isDragging, dragStart, startX, scrollLeft]
	);

	const onMouseUp = useCallback(() => {
		setIsDragging(false);
	}, []);

  const handleScrollRight = () => {
    if (scrollRef.current) {
      const scrollAmount = getImageWidth()
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      const scrollAmount = getImageWidth()
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language")
      if (storedLanguage) {
        setLanguage(storedLanguage)
      }
    }
  }, [])

  useEffect(() => {
		const container = scrollRef.current;
		if (!container) return;

		const handleDragStart = (e) => {
			e.preventDefault();
		};

		const images = container.querySelectorAll("img");
		images.forEach((img) => img.addEventListener("dragstart", handleDragStart));

		return () => {
			images.forEach((img) =>
				img.removeEventListener("dragstart", handleDragStart)
			);
		};
	}, []);

  useEffect(() => {
		if (!isDragging) return;

		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseup", onMouseUp);

		return () => {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
		};
	}, [isDragging, onMouseMove, onMouseUp]);

  const translation =
    data?.translations?.find((t) => t.languages_code === language) ||
    data?.translations?.[0]

  return (
		<div className="bg-[#211f17]">
			<div className={data?.cities.length <= 3 ? "" : "px-[40px]"}>
				{/* Header */}
				<div className="text-center mb-16">
					<h2
						className={`${taviraj.className} text-[#e2dbcc] text-[48px] font-light leading-[60px] tracking-[2px] mb-8`}
					>
						{translation?.explore_title}
					</h2>

					{/* Diamond Separator */}
					<div className="flex items-center justify-center gap-4 mb-16">
						<div className="w-24 h-[1px] bg-[#BD9574]"></div>
						<div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
						<div className="w-24 h-[1px] bg-[#BD9574]"></div>
					</div>
				</div>

				{/* Container with fixed width to show 3 full images + 250px of the fourth */}
				<div
					ref={scrollRef}
					className="overflow-x-auto pl-2 pb-8 max-w-full md:max-w-[calc(508px*3+270px+12px)] hide-scrollbar cursor-grab active:cursor-grabbing"
					onMouseDown={onMouseDown}
					style={{ userSelect: isDragging ? "none" : "auto" }}
				>
					<div
						className={`flex items-center gap-6  ${
							data?.cities.length <= 3 ? "w-fit mx-auto" : "w-max"
						}`}
					>
						{data?.cities.map((city) => {
							const rangesParam = city.ranges
								.map((r) => `${r.start}-${r.end}`)
								.join(",");
							return (
								<div
									key={city.id}
									className="relative w-[280px] md:w-[508px] h-[460px] flex-none group cursor-pointer overflow-hidden"
								>
									<Link
										href={`/buy?ranges=${encodeURIComponent(rangesParam)}`}
										onClick={(e) => {
											if (wasDragged.current) {
												e.preventDefault();
												wasDragged.current = false;
											}
										}}
										onDragStart={(e) => e.preventDefault()}
									>
										<Image
											src={getImageUrl(city?.image, {
												format: "webp",
												quality: 100,
												fit: "cover",
											})}
											alt={`${city.name} cityscape`}
											fill
											sizes="(max-width: 768px) 280px, 508px"
											style={{ objectFit: "cover" }}
											className="transition-transform duration-700 group-hover:scale-110"
											draggable={false}
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
										<div className="absolute bottom-4 left-8">
											<h3
												className={`${archivo.className} font-light text-base leading-[40px] text-[#FBF4E4]`}
											>
												{city.name}
											</h3>
										</div>
									</Link>
								</div>
							);
						})}
					</div>
				</div>
				{/* Navigation - only show if showNavigation prop is true */}
				{showNavigation && (
					<div className="flex items-center justify-end mt-12">
						<div className="flex items-center gap-4">
							<button
								className={`p-2 border border-[#656565] text-[#656565] rounded hover:border-[#BD9574] hover:text-[#BD9574] transition-colors`}
								onClick={handleScrollLeft}
								disabled={false}
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
								className={`p-2 border border-[#656565] text-[#656565] rounded hover:border-[#BD9574] hover:text-[#BD9574] transition-colors`}
								onClick={handleScrollRight}
								disabled={false}
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
			</div>
		</div>
	);
}
