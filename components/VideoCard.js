import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/lib/api";

const VideoCard = ({ video }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/media/${video.id}`);
  };

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
      match = url.match(/(?:youtu\.be\/|\/live\/|\/embed\/)([a-zA-Z0-9_-]{11})/);
      if (match && match[1]) {
        return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
      }
      return "/placeholder.svg";
    } catch {
      return "/placeholder.svg";
    }
  }

  return (
    <div
      className="relative group cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative w-full aspect-video overflow-hidden">
        {(() => {
          const thumbnailSrc = getYoutubeThumbnail(video.video_url);
          return thumbnailSrc ? (
            <Image
              src={thumbnailSrc}
              alt={video.video_title || "Video Thumbnail"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : null;
        })()}

        <div className="absolute top-0 left-0 p-3">
          <div className="w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <Play className="text-white w-4 h-4 ml-0.5" />
          </div>
        </div>
        {video.duration && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 px-2 py-1 text-white text-xs">
            {video.duration}
          </div>
        )}
      </div>
      <div className="mt-3">
        <div className="text-[#BD9574] text-sm font-light">
          {video.category || (video.video_category ? video.video_category.join(", ") : "")}
        </div>
        <h3 className="text-white text-lg font-light mt-1 line-clamp-2 group-hover:text-[#BD9574] transition-colors">
          {video.video_title}
        </h3>
        {video.date && (
          <div className="text-[#A1A1AA] text-sm mt-1">{video.date}</div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
