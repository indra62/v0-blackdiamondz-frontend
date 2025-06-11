"use client";

/**
 * Hero Component
 *
 * Full-screen hero section with background image, overlay, and scroll indicator.
 * Includes parallax-like scroll effect using scroll position.
 *
 * @component
 */

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { Taviraj } from "next/font/google";
import { Archivo } from "next/font/google";
import { getImageUrl } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { BlurFade } from "./magicui/blur-fade";
import { TextAnimate } from "./magicui/text-animate";

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function Hero({ data }) {
  /**
   * Scroll effect handler
   * Updates scroll count based on window scroll position
   * Limited to max 100 to prevent excessive calculations
   */
  const { user } = useAuth();
  const [language, setLanguage] = useState("en");
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language");
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    }
  }, []);

  const translation =
    data?.translations?.find((t) => t.languages_code === language) ||
    data?.translations?.[0];

  return (
		<div className="relative h-screen w-full overflow-hidden">
			{/* Background Image with Overlay */}
			<div className="absolute inset-0">
				<Image
					src={getImageUrl(data?.hero_image?.id, {
						format: "webp",
						quality: 100,
						fit: "cover",
					})}
					alt="Sydney Harbour aerial view with Opera House and Harbour Bridge"
					fill
					sizes="100vw"
					style={{ objectFit: "cover" }}
					priority
				/>
				<div
					className="absolute inset-0"
					style={{
						background: `linear-gradient(0deg, rgba(33, 31, 23, 0.7), rgba(33, 31, 23, 0.7)),
          linear-gradient(180deg, rgba(33, 31, 23, 0) 80.08%, #211F17 100%)`,
					}}
				></div>
			</div>

			{/* Content */}
			<div className="relative h-full flex flex-col items-center justify-center text-center px-4">
				<TextAnimate as="h1" animation="slideLeft" className={`${taviraj.className} text-[#e2dbcc] text-4xl md:text-5xl mb-8 max-w-5xl -mt-32 leading-[125%] tracking-[2px]`}>
					{translation?.hero_text || ""}
				</TextAnimate>

				{/* Diamond divider */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-24 h-px bg-[#bd9574]"></div>
            <div className="w-2 h-2 mx-2 bg-[#bd9574] transform rotate-45"></div>
            <div className="w-24 h-px bg-[#bd9574]"></div>
          </div>

					<BlurFade delay={0.25} inView>
				<div
					className={`${archivo.className} text-[#E2DBCC] text-[16px] leading-[150%] tracking-[0px] text-center mb-2`}
				>
					{`${translation?.hero_greetings}`}{" "}
					<span className="text-[#BD9574] text-[16px] leading-[150%] tracking-[0px] text-center mb-2">
						{user?.first_name ? (
							user.first_name
						) : (
							<Link href="/signup" className="cursor-pointer">
								Guest
							</Link>
						)}
					</span>
				</div>
				</BlurFade>
				<BlurFade delay={0.25 * 2} inView>
				<div
					className={`${archivo.className} text-[#E2DBCC] text-[16px] leading-[150%] tracking-[0px] text-center mb-2`}
				>
					{translation?.hero_message}
				</div>
				</BlurFade>

				{/* Scroll Indicator */}
				<div className="absolute bottom-12 flex flex-col items-center">
					<div className="mb-2">
						<Image
							src="/images/scroll-icon.png"
							alt="Scroll indicator"
							width={24}
							height={40}
							className="animate-pulse"
						/>
					</div>
					<div className="text-[#FBF4E4] text-base mb-2">Scroll to start</div>
					<ChevronDown className="text-[#BD9574] animate-bounce" />
				</div>
			</div>
		</div>
	);
}
