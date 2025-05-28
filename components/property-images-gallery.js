"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { ChevronLeft, ChevronRight, Grid } from "lucide-react"
import { Archivo } from "next/font/google"
import { getImageUrl } from "@/lib/api"

const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })

export default function PropertyImagesGallery({
  onClose,
  onGridView,
  album,
  initialImageId = 0,
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  // Find the index of the image with the given ID, or default to 0
  const initialIndex = album.findIndex((img, idx) => idx === initialImageId)
  const [currentIndex, setCurrentIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0
  )

  const totalImages = album.length

  const handlePrevious = useCallback(() => {
		setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalImages - 1));
	}, [totalImages]);

	const handleNext = useCallback(() => {
		setCurrentIndex((prev) => (prev < totalImages - 1 ? prev + 1 : 0));
	}, [totalImages]);

  useEffect(() => {
		if (!lightboxOpen) return;

		let touchStartX = null;

		function onTouchStart(e) {
			if (e.touches.length === 1) {
				touchStartX = e.touches[0].clientX;
			}
		}

		function onTouchEnd(e) {
			if (touchStartX === null) return;
			const touchEndX = e.changedTouches[0].clientX;
			const dx = touchEndX - touchStartX;

			if (dx > 50) handlePrevious();
			else if (dx < -50) handleNext();
			touchStartX = null;
		}

		window.addEventListener("touchstart", onTouchStart, { passive: false });
		window.addEventListener("touchend", onTouchEnd, { passive: false });

		return () => {
			window.removeEventListener("touchstart", onTouchStart);
			window.removeEventListener("touchend", onTouchEnd);
		};
	}, [lightboxOpen, handlePrevious, handleNext]);

  return (
		<div className="relative h-full">
			{/* Main Image - Full Height */}
			<div className="relative h-[500px] w-full">
				<Image
					src={getImageUrl(album?.[currentIndex]?.directus_files_id?.id, {
						quality: 80,
						fit: "cover",
					})}
					alt={album?.[currentIndex]?.directus_files_id?.title}
					fill
					className="object-cover cursor-zoom-in"
					priority
					onClick={() => setLightboxOpen(true)}
				/>
			</div>

			{/* Navigation Controls - Positioned at the bottom */}
			<div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-4 bg-gradient-to-t from-[#211f17]/80 to-transparent">
				{/* Image Counter */}
				<div
					className={`${archivo.className} text-[#e2dbcc] font-light text-base`}
				>
					{currentIndex + 1} / {totalImages}
				</div>

				{/* Navigation Buttons */}
				<div className="flex items-center">
					<button
						onClick={lightboxOpen ? undefined : handlePrevious}
						className="w-16 h-16 flex items-center justify-center border border-[#656565]/50 hover:border-[#bd9574] hover:text-[#bd9574] transition-colors text-[#e2dbcc] bg-[#211f17]/30"
					>
						<ChevronLeft size={24} />
					</button>
					<button
						onClick={lightboxOpen ? undefined : handleNext}
						className="w-16 h-16 flex items-center justify-center border border-[#656565]/50 hover:border-[#bd9574] hover:text-[#bd9574] transition-colors text-[#e2dbcc] bg-[#211f17]/30"
					>
						<ChevronRight size={24} />
					</button>
					<button
						onClick={(e) => onGridView(e)}
						className="w-16 h-16 flex items-center justify-center border border-[#656565]/50 hover:border-[#bd9574] hover:text-[#bd9574] transition-colors text-[#e2dbcc] bg-[#211f17]/30"
						data-action="grid"
					>
						<Grid size={24} />
					</button>
					<button
						onClick={onClose}
						className="w-16 h-16 flex items-center justify-center border border-[#656565]/50 hover:border-[#bd9574] hover:text-[#bd9574] transition-colors text-[#e2dbcc] bg-[#211f17]/30"
					>
						<span className="text-[#e2dbcc] font-light">Close</span>
					</button>
				</div>
			</div>
			{lightboxOpen && (
				<div className="fixed inset-0 z-[1001] bg-[#211f17]/70 backdrop-blur-md flex flex-col items-center justify-center">
					{/* Close Button (Top Right) */}
					<button
						className={`absolute top-2 right-2 z-50 ${archivo.className} text-[#bd9574] bg-[#211f17]/80 hover:bg-[#211f17] border border-[#bd9574]/50 px-4 py-2 rounded-md text-sm md:text-base transition-colors`}
						onClick={() => setLightboxOpen(false)}
					>
						Close
					</button>
					<TransformWrapper
						initialScale={1}
						minScale={1}
						maxScale={4}
						doubleClick={{ mode: "zoomIn" }}
						wheel={{ step: 0.2 }}
						pinch={{ step: 5 }}
						limitToBounds={true}
						centerOnInit={true}
						panning={{
							velocityDisabled: true,
							lockAxisX: false,
							lockAxisY: false,
						}}
						bounce={{ disabled: false }}
					>
						{({ zoomIn, zoomOut, resetTransform }) => (
							<>
								{/* Zoom Controls (Top Left) */}
								<div className="absolute top-2 left-2 z-[1010] flex gap-2">
									<button
										className="bg-[#211f17]/80 text-[#bd9574] border-[#bd9574]/50 border p-2 rounded-md text-xl"
										onClick={() => zoomIn(1)}
									>
										＋
									</button>
									<button
										className="bg-[#211f17]/80 text-[#bd9574] border-[#bd9574]/50 border p-2 rounded-md text-xl"
										onClick={() => zoomOut(1)}
									>
										－
									</button>
									<button
										className="bg-[#211f17]/80 text-[#bd9574] border-[#bd9574]/50 border p-2 rounded-md text-xl"
										onClick={() => resetTransform()}
									>
										⟳
									</button>
								</div>
								{/* Main Image */}
								<TransformComponent wrapperClass="flex items-center justify-center cursor-grab w-full h-full">
									<Image
										src={getImageUrl(
											album?.[currentIndex]?.directus_files_id?.id,
											{ quality: 100 }
										)}
										alt={album?.[currentIndex]?.directus_files_id?.title}
										width={
											album?.[currentIndex]?.directus_files_id?.width || 1200
										}
										height={
											album?.[currentIndex]?.directus_files_id?.height || 800
										}
										className="object-contain max-h-[70vh] max-w-[95vw] bg-[#211f17]/70 rounded-md"
										priority
										draggable={false}
									/>
								</TransformComponent>
								{/* Thumbnails */}
								<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-[#211f17]/80 rounded-lg p-2 z-[1010] max-w-[95vw] overflow-x-auto scrollbar-thin scrollbar-thumb-[#bd9574]/60">
									{album.map((img, idx) => (
										<button
											key={img.directus_files_id.id}
											onClick={() => setCurrentIndex(idx)}
											className={`border-2 rounded-md overflow-hidden transition-all ${
												idx === currentIndex
													? "border-[#bd9574] scale-105"
													: "border-transparent opacity-70 hover:opacity-100"
											}`}
											style={{
												width: 48,
												height: 32,
												minWidth: 48,
												minHeight: 32,
											}}
										>
											<Image
												src={getImageUrl(img.directus_files_id.id, {
													quality: 60,
													fit: "cover",
												})}
												alt={img.directus_files_id.title || ""}
												width={48}
												height={32}
												className="object-cover"
												draggable={false}
											/>
										</button>
									))}
								</div>
								{/* Navigation Buttons (Left/Right) */}
								<button
									onClick={handlePrevious}
									className="absolute left-2 top-1/2 -translate-y-1/2 z-[1010] bg-[#211f17]/80 text-[#bd9574] border-[#bd9574]/50 rounded-md w-10 h-10 flex items-center justify-center md:hidden"
									aria-label="Previous image"
								>
									<ChevronLeft size={24} />
								</button>
								<button
									onClick={handleNext}
									className="absolute right-2 top-1/2 -translate-y-1/2 z-[1010] bg-[#211f17]/80 text-[#bd9574] border-[#bd9574]/50 rounded-md w-10 h-10 flex items-center justify-center md:hidden"
									aria-label="Next image"
								>
									<ChevronRight size={24} />
								</button>
							</>
						)}
					</TransformWrapper>
				</div>
			)}
		</div>
	);
}
