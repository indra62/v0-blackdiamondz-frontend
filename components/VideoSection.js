import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import VideoCard from "./VideoCard";

/**
 * VideoSection - Generic video section for any video category.
 *
 * Props:
 *  - title: string (section title)
 *  - videos: array (list of video objects)
 *  - count: number (display count)
 *  - activeDot: number (which dot to highlight, default 1)
 *  - slideKey: string (context key for navigation)
 *  - navigateSlide: function (slide navigation handler)
 */


import { useState } from "react";

const VideoSection = ({
  title,
  videos = [],
  count = 0,
  slideKey = "",
}) => {
  let currentVideos = [];
  if (slideKey.toLowerCase() === "recent") {
    currentVideos = videos?.slice(-8) || [];
  } else {
    currentVideos =
      videos?.filter(
        (video) =>
          Array.isArray(video.video_category) &&
          video.video_category.some(
            (cat) => cat.toLowerCase() === slideKey.toLowerCase()
          )
      ) || [];
  }

  const slides = Math.ceil(currentVideos.length / 4) || 1;
  const [activeDot, setActiveDot] = useState(1);

  if (!currentVideos || currentVideos.length === 0) {
    return null;
  }
  return (
    <div className="mb-16">
      <div className="flex items-center justify-center mb-10">
        <div className="flex-grow h-px bg-[#656565]/30"></div>
        <h2 className="text-[#e2dbcc] text-xl font-light px-6">
          {title}{" "}
          <span className="text-[#e2dbcc]">({currentVideos.length})</span>
        </h2>
        <div className="flex-grow h-px bg-[#656565]/30"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentVideos
          .slice((activeDot - 1) * 4, activeDot * 4)
          .map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
      </div>

      <div className="flex justify-between mt-8">
        <div className="flex space-x-4">
          {Array.from({ length: slides }, (_, i) => i + 1).map((dot) => (
            <button
              key={dot}
              className={`w-3 h-3 transform rotate-45 ${
                dot === activeDot ? "bg-[#BD9574]" : "bg-[#656565]/50"
              }`}
              aria-label={`Go to slide ${dot}`}
              onClick={() => setActiveDot(dot)}
            />
          ))}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveDot((prev) => (prev > 1 ? prev - 1 : slides))}
            className="w-10 h-10 border border-[#656565] flex items-center justify-center text-[#656565] hover:border-[#BD9574] hover:text-[#BD9574] transition-colors"
            aria-label="Previous videos"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setActiveDot((prev) => (prev < slides ? prev + 1 : 1))}
            className="w-10 h-10 border border-[#656565] flex items-center justify-center text-[#656565] hover:border-[#BD9574] hover:text-[#BD9574] transition-colors"
            aria-label="Next videos"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
