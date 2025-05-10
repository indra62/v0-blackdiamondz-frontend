"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Archivo } from "next/font/google";
import Footer from "@/components/footer";
import Loading from "@/components/loading";
import { getImageUrl, getItems, getItem } from "@/lib/api";
import { useParams } from "next/navigation";
import VideoSection from "@/components/VideoSection";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo" });

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
          fields: ["*", "translations.*"],
        });

        const dataVideoRelated = await getItems("videos", {
          fields: ["*", "translations.*"],
        });

        setVideos(dataVideo);
        if (dataVideo) {
          setRelatedVideos(dataVideoRelated);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);


  // Helper to get YouTube thumbnail from video_url
  function getYoutubeThumbnail(url) {
    if (!url) return "/placeholder.svg";
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
      return "/placeholder.svg";
    } catch {
      return "/placeholder.svg";
    }
  }

  const handlePlayPause = () => {
    if (
      video?.video_url?.includes("youtube.com") ||
      video?.video_url?.includes("youtu.be")
    ) {
      setIsPlaying(true);
    }
    setIsPlaying(!isPlaying);
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

  return (
    <div className="bg-[#211f17] min-h-screen text-[#e2dbcc]">
      {/* Hero Video Section */}
      <div className="relative w-full h-screen overflow-hidden flex flex-col justify-center">
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
                  className="w-full h-full absolute inset-0 z-20"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={video?.video_title}
                  frameBorder="0"
                  scrolling="yes"
                />
              ) : (
                <Image
                  src={
                    getYoutubeThumbnail(video?.video_url) || "/placeholder.svg"
                  }
                  alt={video?.video_title}
                  fill
                  className="object-cover w-full h-full"
                />
              )
            ) : (
              <Image
                src={
                  getYoutubeThumbnail(video?.video_url) || "/placeholder.svg"
                }
                alt={video?.video_title}
                fill
                className="object-cover"
                priority
              />
            );
          })()
        ) : (
          <Image
            src={getYoutubeThumbnail(video?.video_url) || "/placeholder.svg"}
            alt={video?.video_title}
            fill
            className="object-cover"
            priority
          />
        )}

        <div className="relative z-20 flex flex-col items-center justify-center w-full px-4">
          {!isPlaying && (
            <>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-center max-w-4xl mb-16">
                {video?.video_title || ""}
              </h1>
              <button
                onClick={handlePlayPause}
                className="w-20 h-20 rounded-full border border-[#bd9574] flex items-center justify-center mb-8 hover:bg-[#bd9574]/20 transition-all"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1"
                >
                  <path d="M6 4L18 12L6 20V4Z" fill="#bd9574" />
                </svg>
              </button>
            </>
          )}
          {/* Navigation Buttons }
          
          <div className="flex justify-center space-x-4 mt-auto mb-12">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center space-x-3 px-8 py-3 border border-[#656565] text-[#bd9574] hover:bg-[#bd9574]/10 transition-colors w-40"
              aria-label="Go to previous video"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 12H5M5 12L12 19M5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Previous</span>
            </button>

            <button
              onClick={() => navigateToVideo(relatedVideos[0].id)}
              className="flex items-center justify-center space-x-3 px-8 py-3 border border-[#656565] text-[#bd9574] hover:bg-[#bd9574]/10 transition-colors w-40"
              aria-label="Go to next video"
            >
              <span>Next</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          {*/}
        </div>
      </div>

      {/* More from this Topic Section */}
      <div className="py-16 px-4 md:px-8 lg:px-16 bg-[#211f17]">
        <div className="mb-10 flex items-center justify-center">
          <div className="h-px w-16 bg-[#bd9574]"></div>
          <h2 className="text-3xl font-light text-[#e2dbcc] px-6">
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

      <Footer />
    </div>
  );
}
