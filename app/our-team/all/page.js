"use client";

import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { Taviraj } from "next/font/google";
import { Archivo } from "next/font/google";
import { useEffect, useState } from "react";
import { getImageUrl, getItems } from "@/lib/api";
import Loading from "@/components/loading";

const taviraj = Taviraj({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});
const archivo = Archivo({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

export default function OurTeamAllPage() {
	const [language, setLanguage] = useState("en");
	const [loading, setLoading] = useState(true);
	const [heroData, setHeroData] = useState(null);
	const [teamFounderData, setTeamFounderData] = useState(null);
	const [supportData, setSupportData] = useState(null);
	const [error, setError] = useState(null);

	const translation =
		heroData?.translations?.find((t) => t.languages_code === language) ||
		heroData?.translations?.[0];

	const translationFounder =
		teamFounderData?.translations?.find((t) => t.languages_code === language) ||
		teamFounderData?.translations?.[0];

	const translationSupport =
		supportData?.translations?.find((t) => t.languages_code === language) ||
		supportData?.translations?.[0];

	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedLanguage = localStorage.getItem("language");
			if (storedLanguage) {
				setLanguage(storedLanguage);
			}
		}

		const fetchDataHome = async () => {
			try {
				const dataHero = await getItems("aboutUs_team_hero", {
					fields: ["*", "hero_image.*", "translations.*", "secondary_image.*"],
				});

				const dataTeamFounder = await getItems("aboutUs_team_founder", {
					fields: [
						"*",
						"founder_1.*",
						"founder_2.*",
						"founder_image_1.*",
						"founder_image_2.*",
						"founder_image_3.*",
						"founder_image_4.*",
						"founder_image_5.*",
						"founder_image_6.*",
						"founder_image_7.*",
						"founder_image_8.*",
						"translations.*",
					],
				});

				const dataSupport = await getItems("aboutUs_team_support", {
					fields: ["*", "translations.*", "agents.*.*"],
				});

				setHeroData(dataHero);
				setTeamFounderData(dataTeamFounder);
				setSupportData(dataSupport);
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
					{/* Hero Section */}
					<section className="relative h-screen">
						{/* Background Image */}
						<div className="absolute inset-0">
							{/* Only render the Image if a valid src is provided */}

							<Image
								src={getImageUrl(heroData?.hero_image?.id, {
									format: "webp",
									quality: 100,
									fit: "cover",
								})}
								alt="Sydney Harbour with Bridge and city skyline at sunset"
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

						{/* Hero Content */}
						<div className="relative h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
							<h1 className={`${taviraj.className} text-[#e2dbcc] text-4xl md:text-5xl mb-8 leading-[125%] tracking-[2px] max-w-5xl`}>
								{translation?.hero_title || ""}
							</h1>

							{/* Diamond Separator */}
							<div className="flex items-center justify-center gap-4 mb-8">
								<div className="w-24 h-[1px] bg-[#BD9574]"></div>
								<div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
								<div className="w-24 h-[1px] bg-[#BD9574]"></div>
							</div>

							<p className={`${archivo.className} text-[#e2dbcc] max-w-3xl mx-auto text-base md:text-lg`}>
								{translation?.hero_description || ""}
							</p>
						</div>

						{/* Scroll Indicator */}
						{/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="flex flex-col items-center">
                <div className="w-1 h-16 bg-gradient-to-b from-[#BD9574] to-transparent"></div>
              </div>
            </div> */}
					</section>

					{/* Featured Team Members */}
					<section className="py-16 bg-[#211f17]">
						<div className="container mx-auto px-4">
							<div className="flex flex-col md:flex-row justify-center items-start">
								{/* First Member */}
								<div className="flex flex-col items-center text-center w-full mb-16 md:mb-0">
									<Link
										href={`/team/monika-tu`}
										className="group cursor-pointer flex flex-col items-center"
									>
										<div className="w-[400px] h-[400px] mb-8 overflow-hidden">
											<Image
												src={getImageUrl(teamFounderData?.founder_1?.id, {
													format: "webp",
													quality: 100,
													fit: "cover",
												})}
												alt="Monika (Yanling) Tu"
												width={400}
												height={400}
												className="object-cover transition-transform duration-300 group-hover:scale-105"
											/>
										</div>
										<h3
											className={`${taviraj.className} text-[#E2DBCC] text-[32px] font-normal leading-[100%] tracking-[0px] mb-2 group-hover:text-[#BD9574] transition-colors text-center`}
										>
											{translationFounder?.founder_1_name}
										</h3>
									</Link>
									<p
										className={`${archivo.className} text-[#E2DBCC] text-[20px] font-normal leading-[100%] tracking-[0px] mb-6 text-center`}
									>
										{translationFounder?.founder_1_title}
									</p>
									<p
										className={`${archivo.className} text-[#BD9574] font-light text-[16px] leading-[150%] tracking-[0px] text-center mx-auto max-w-md`}
									>
										{translationFounder?.founder_1_description}
									</p>
								</div>

								{/* Center Divider */}
								<div className="hidden md:flex flex-col items-center justify-center mx-4">
									<div className="h-[350px] w-[1px] bg-[#656565]/30"></div>
									<div className="my-4 w-3 h-3 bg-[#BD9574] rotate-45"></div>
									<div className="h-[350px] w-[1px] bg-[#656565]/30"></div>
								</div>

								{/* Second Member */}
								<div className="flex flex-col items-center text-center w-full mb-16 md:mb-0">
									<Link
										href={`/team/jad-khattar`}
										className="group cursor-pointer"
									>
										<div className="w-[400px] h-[400px] mb-8 overflow-hidden">
											<Image
												src={getImageUrl(teamFounderData?.founder_2?.id, {
													format: "webp",
													quality: 100,
													fit: "cover",
												})}
												alt="Jad Khattar"
												width={400}
												height={400}
												className="object-cover transition-transform duration-300 group-hover:scale-105"
											/>
										</div>
										<h3
											className={`${taviraj.className} text-[#E2DBCC] text-[32px] font-normal leading-[100%] tracking-[0px] mb-2 group-hover:text-[#BD9574] transition-colors`}
										>
											{translationFounder?.founder_2_name}
										</h3>
									</Link>
									<p
										className={`${archivo.className} text-[#E2DBCC] text-[20px] font-normal leading-[100%] tracking-[0px] mb-6 text-center`}
									>
										{translationFounder?.founder_2_title}
									</p>

									<p
										className={`${archivo.className} text-[#BD9574] font-light text-[16px] leading-[150%] tracking-[0px] text-center max-w-md`}
									>
										{translationFounder?.founder_2_description}
									</p>
								</div>
							</div>
						</div>
					</section>
					{/* Support Section */}
					<section className="py-16 bg-[#211f17]">
						<div className="container mx-auto px-4">
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 pb-8 max-w-[1200px] mx-auto justify-center">
								{supportData?.agents.map((member, idx) => (
									<div className="flex flex-col justify-center items-center" key={member?.id || idx}>
										<Link
											key={member?.id || idx}
											href={
												"/team/" +
												member?.first_name?.toLowerCase().replace(/\s+/g, "-") +
												"-" +
												member?.last_name?.toLowerCase().replace(/\s+/g, "-")
											}
											className="flex flex-col justify-center group cursor-pointer"
										>
											<div className="relative w-[300px] h-[400px] mb-4 overflow-hidden">
												<Image
													src={
														getImageUrl(member?.avatar?.id, {
															format: "webp",
															quality: 100,
															fit: "cover",
														}) || "/placeholder-image.jpg"
													}
													alt={member?.first_name}
													fill
													className="object-cover transition-transform duration-300 group-hover:scale-105"
												/>
											</div>
											<h4 className="text-[#E2DBCC] font-light text-[16px] leading-[150%] mb-1 text-center group-hover:text-[#BD9574] transition-colors">
												{member?.first_name + " " + member?.last_name}
											</h4>
											<p className="text-[#BD9574] font-light text-[14px] leading-[150%] text-center">
												{member?.title || ""}
											</p>
										</Link>
									</div>
								))}
							</div>
						</div>
					</section>
				</>
			)}
			<Footer />
		</main>
	);
}
