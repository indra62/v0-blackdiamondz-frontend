"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Archivo, Taviraj } from "next/font/google";
import Footer from "@/components/footer";
import Loading from "@/components/loading";
import { getImageUrl, getItems, getItem, getFileUrl } from "@/lib/api";
import { useParams } from "next/navigation";
import VideoSection from "@/components/VideoSection";

const taviraj = Taviraj({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});
const archivo = Archivo({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-archivo",
});

export default function MediaVideoDetail() {
	const params = useParams();
	const { id } = params;

	const router = useRouter();
	const [isPlaying, setIsPlaying] = useState(false);
	const [activeSlide, setActiveSlide] = useState(0);

	const [video, setVideos] = useState(null);
	const [relatedVideos, setRelatedVideos] = useState(null);
	const [loading, setLoading] = useState(true);
	const [language, setLanguage] = useState("en");
	const [error, setError] = useState(null);
	const videoRef = useRef(null);

	const translation =
		video?.translations?.find((t) => t.languages_code === language) ||
		video?.translations?.[0];

	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedLanguage = localStorage.getItem("language");
			if (storedLanguage) {
				setLanguage(storedLanguage);
			}
		}
		const fetchVideos = async () => {
			try {
				const dataVideo = await getItem("videos", id, {
					fields: ["*.*", "translations.*"],
				});

				const dataVideoRelated = await getItems("videos", {
					fields: ["*.*", "translations.*"],
					filter: { id: { _neq: id }, status: { _eq: "published" } },
				});

				setVideos(dataVideo);
				if (dataVideo) {
					setRelatedVideos(dataVideoRelated);
				}
				setLoading(false);
			} catch (error) {
				setError("Error fetching videos:", error);
				setLoading(false);
			}
		};

		fetchVideos();
	}, []);

	// Helper to get YouTube thumbnail from video_url
	function getYoutubeThumbnail(url) {
		if (!url) return "/placeholder-image.jpg";
		try {
			// Try to match ?v=VIDEO_ID
			let match = url.match(/[?&]v=([^&#]+)/);
			if (match && match[1]) {
				return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
			}
			// Try to match youtu.be/VIDEO_ID or /live/VIDEO_ID or /embed/VIDEO_ID
			match = url.match(
				/(?:youtu\.be\/|\/live\/|\/embed\/)([a-zA-Z0-9_-]{11})/
			);
			if (match && match[1]) {
				return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
			}
			return "/placeholder-image.jpg";
		} catch {
			return "/placeholder-image.jpg";
		}
	}

	const handlePlayPause = () => {
		setIsPlaying(true);
	};

	const navigateToVideo = (id) => {
		router.push(`/media/${id}`);
	};

	const handlePrevious = () => {
		const prevIndex =
			(activeSlide - 1 + relatedVideos.length) % relatedVideos.length;
		setActiveSlide(prevIndex);
	};

	const handleNext = () => {
		const nextIndex = (activeSlide + 1) % relatedVideos.length;
		setActiveSlide(nextIndex);
	};

	useEffect(() => {
		if (
			isPlaying &&
			videoRef.current &&
			!(
				video?.video_url &&
				(video.video_url.includes("youtube.com") ||
					video.video_url.includes("youtu.be"))
			)
		) {
			// Try to play the video when it appears
			videoRef.current.play().catch((e) => {
				// Some browsers may block autoplay, handle error if needed
				console.warn("Video play failed:", e);
			});
		}
	}, [isPlaying, video]);

	return (
		<div className="bg-[#211f17] min-h-screen text-[#e2dbcc]">
			{loading ? (
				<section className="flex justify-center items-center h-[800px] bg-[#211f17]">
					<Loading error={error} />
				</section>
			) : (
				<>
					{/* Hero Video Section */}
					<div className="w-full bg-[#211f17]">
						<div className="relative w-full aspect-video bg-black">
							{/* Overlay when not playing */}
							{!isPlaying && (
								<div className="absolute inset-0 bg-black/70 z-10"></div>
							)}
							{video?.video_url ? (
								(() => {
									// Extract YouTube Video ID
									let videoId = null;
									const url = video.video_url;
									let match = url.match(/[?&]v=([^&#]+)/);
									if (match && match[1]) {
										videoId = match[1];
									} else {
										match = url.match(
											/(?:youtu\.be\/|\/live\/|\/embed\/)([a-zA-Z0-9_-]{11})/
										);
										if (match && match[1]) {
											videoId = match[1];
										}
									}
									return videoId ? (
										isPlaying ? (
											<iframe
												src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&loop=1&playlist=${videoId}`}
												className="absolute top-0 left-0 w-full h-full z-20"
												allow="autoplay; encrypted-media"
												allowFullScreen
												title={video?.video_title}
												frameBorder="0"
											/>
										) : (
											<Image
												src={
													getYoutubeThumbnail(video?.video_url) ||
													"/placeholder-image.jpg"
												}
												alt={video?.video_title}
												fill
												className="object-cover w-full h-full"
												priority
											/>
										)
									) : (
										<Image
											src={
												getYoutubeThumbnail(video?.video_url) ||
												"/placeholder-image.jpg"
											}
											alt={video?.video_title}
											fill
											className="object-cover w-full h-full"
											priority
										/>
									);
								})()
							) : !isPlaying ? (
								<Image
									src={
										getImageUrl(video?.video_thumbnail?.id, {
											format: "webp",
											quality: 80,
											fit: "cover",
										}) || "/placeholder-image.jpg"
									}
									alt={video?.video_title}
									fill
									className="object-cover w-full h-full"
									priority
								/>
							) : (
								<video
									ref={videoRef}
									loop
									playsInline
									controls
									className="absolute top-0 left-0 w-full h-full object-cover"
									poster={getImageUrl(video?.video_thumbnail?.id, {
										format: "webp",
										quality: 80,
										fit: "cover",
									})}
								>
									{getFileUrl(video?.video_media?.filename_disk) && (
										<source
											src={getFileUrl(video.video_media.filename_disk)}
											type={video.video_media.type}
										/>
									)}
								</video>
							)}
							{/* Play button overlay */}
							{!isPlaying && (
								<div className="absolute inset-0 flex flex-col items-center max-w-[800px] mx-auto justify-center z-20">
									<h1 className={`${taviraj.className} text-2xl md:text-5xl font-light text-center max-w-4xl mb-8`}>
										{video?.video_title || ""}
									</h1>
									<button
										onClick={handlePlayPause}
										className="w-16 h-16 rounded-full border border-[#bd9574] flex items-center justify-center mb-4 hover:bg-[#bd9574]/20 transition-all"
										aria-label={isPlaying ? "Pause video" : "Play video"}
									>
										<svg
											width="32"
											height="32"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className="ml-1"
										>
											<path d="M6 4L18 12L6 20V4Z" fill="#bd9574" />
										</svg>
									</button>
								</div>
							)}
						</div>
					</div>

					{/* More from this Topic Section */}
					<div className="py-16 px-4 md:px-8 lg:px-16 bg-[#211f17]">
						<div className="mb-10 flex items-center justify-center">
							<div className="h-px w-16 bg-[#bd9574]"></div>
							<h2 className={`${taviraj.className} text-3xl font-light text-[#e2dbcc] px-6`}>
								More from this Topic
							</h2>
							<div className="h-px w-16 bg-[#bd9574]"></div>
						</div>
						<VideoSection
							title="More from this Topic"
							videos={relatedVideos}
							count={relatedVideos?.length || 0}
							slideKey={video?.video_category?.[0] || ""}
							hideTitle={true}
						/>
					</div>
				</>
			)}

			<Footer />
		</div>
	);
}
