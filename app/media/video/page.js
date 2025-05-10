"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Archivo } from "next/font/google";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";
import Loading from "@/components/loading";
import { getImageUrl, getItems } from "@/lib/api";
import VideoSection from "@/components/VideoSection";

const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400", "500"] });

export default function MediaVideo() {
  const [heroData, setHeroData] = useState(null);
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState("all");
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("en");
  const translation =
    heroData?.translations?.find((t) => t.languages_code === language) ||
    heroData?.translations?.[0];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language");
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    }
    const fetchVideos = async () => {
      try {

        const dataHero = await getItems("media_video_hero_section", {
          fields: ["*", "hero_image.*", "translations.*"],
        });

        const dataVideo = await getItems("videos", {
          fields: ["*", "hero_image.*", "translations.*"],
        });

        setHeroData(dataHero);
        setVideos(dataVideo);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);


  return (
    <div className="bg-[#211f17] min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src={getImageUrl(heroData?.hero_image?.id, {
              format: "webp",
              quality: 100,
              fit: "cover",
            })}
            alt="Black Diamondz Media"
            fill
            priority
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg, rgba(33, 31, 23, 0.7), rgba(33, 31, 23, 0.7)), linear-gradient(180deg, rgba(33, 31, 23, 0) 80.08%, #211F17 100%)",
            }}
          ></div>
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-serif mb-8">
            {translation?.title || ""}
          </h1>
          {/* Diamond Separator */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-24 h-[1px] bg-[#BD9574]"></div>
            <div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
            <div className="w-24 h-[1px] bg-[#BD9574]"></div>
          </div>
          <p className="text-white max-w-3xl mx-auto text-base md:text-lg">
            {translation?.description || ""}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {/* Recently Uploaded Section */}
        <VideoSection
          title="Recently uploaded"
          videos={videos}
          count={videos?.length || 0}
          slideKey="recent"
        />

        {/* Talks Section */}
        <VideoSection
          title="Talks"
          videos={videos}
          count={videos?.length || 0}
          slideKey="talks"
        />

        {/* House Tour Section */}
        <VideoSection
          title="House Tour"
          videos={videos}
          count={videos?.length || 0}
          slideKey="house tour"
        />

        {/* Events Section */}
        <VideoSection
          title="Events"
          videos={videos}
          count={videos?.length || 0}
          slideKey="events"
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
