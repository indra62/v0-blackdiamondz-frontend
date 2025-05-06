
"use client";
import Header from "@/components/header";
import Stats from "@/components/stats";
import Footer from "@/components/footer";
import Image from "next/image";
import PartnerCarousel from "@/components/PartnerCarousel";
import { Taviraj } from "next/font/google";
import { Archivo } from "next/font/google";
import Loading from "@/components/loading";
import { useEffect, useState } from "react";
import { getImageUrl, getItems } from "@/lib/api";

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400"] });
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"] });

export default function OurStoryPage() {
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("en");
  const [heroData, setHeroData] = useState(null);
  const [aboutStats, setAboutStats] = useState(null);
  const [storyImageLink, setStoryImageLink] = useState(null);
  const [storyStory, setStoryStory] = useState(null);
  const [storyPartner, setStoryPartner] = useState(null);
  const [error, setError] = useState(null);

  const translation =
    heroData?.translations?.find((t) => t.languages_code === language) ||
    heroData?.translations?.[0];

  const translationStory =
    storyImageLink?.translations?.find((t) => t.languages_code === language) ||
    storyImageLink?.translations?.[0];

  const translationStoryStory =
    storyStory?.translations?.find((t) => t.languages_code === language) ||
    storyStory?.translations?.[0];

  const translationStoryPartner =
    storyPartner?.translations?.find((t) => t.languages_code === language) ||
    storyPartner?.translations?.[0];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language");
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    }

    const fetchDataHome = async () => {
      try {
        const dataHero = await getItems("aboutUs_ourStory_section", {
          fields: ["*", "aboutUs_ourStory_heroImage.*", "translations.*"],
        });

        const dataStats = await getItems("aboutUs_ourStory_stats", {
          fields: ["*", "translations.*"],
        });

        const dataStoryImageLink = await getItems(
          "aboutUs_ourStory_image_link",
          {
            fields: [
              "*",
              "image_1.*",
              "image_2.*",
              "image_3.*",
              "image_4.*",
              "image_5.*",
              "translations.*",
            ],
          }
        );

        const dataStoryStory = await getItems("aboutUs_ourStory_story", {
          fields: ["*", "translations.*"],
        });

        const dataStoryPartner = await getItems("aboutUs_ourStory_partners", {
          fields: [
            "*",
            "partner_1.*",
            "partner_2.*",
            "partner_3.*",
            "partner_4.*",
            "partner_5.*",
            "partner_6.*",
            "partner_7.*",
            "partner_8.*",
            "translations.*",
          ],
        });

        setHeroData(dataHero);
        setAboutStats(dataStats);
        setStoryImageLink(dataStoryImageLink);
        setStoryStory(dataStoryStory);
        setStoryPartner(dataStoryPartner);
        setLoading(false);
      } catch (err) {
        setError("Failed to load home data:" + err.message);
      }
    };
    fetchDataHome();
  }, []);

  return (
    <main className="min-h-screen bg-[#211f17]">
      {/* Hero Section */}
      <section className="relative h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={getImageUrl(heroData?.aboutUs_ourStory_heroImage?.id, {
              format: "webp",
              quality: 100,
              fit: "cover",
            }) || "/placeholder.png"}
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
          <h1
            className={`${taviraj.className} text-[#E2DBCC] text-[48px] font-light leading-[125%] tracking-[2px] text-center mb-8`}
          >
            {translation?.title}
          </h1>

          {/* Diamond Separator */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-24 h-[1px] bg-[#BD9574]"></div>
            <div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
            <div className="w-24 h-[1px] bg-[#BD9574]"></div>
          </div>

          <p
            className={`${archivo.className} text-[#E2DBCC] font-light text-[16px] leading-[150%] tracking-[0px] text-center max-w-3xl mx-auto mb-4`}
          >
            {translation?.description}
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center">
            <div className="w-1 h-16 bg-gradient-to-b from-[#BD9574] to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <Stats data={aboutStats} />

      {/* Services Section */}
      <section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-4">
          {/* Market with Us */}
          <div className="relative h-[400px] group overflow-hidden">
            <Image
              src={getImageUrl(storyImageLink?.image_1?.id, {
                format: "webp",
                quality: 100,
                fit: "cover",
              }) || "/placeholder.png"}
              alt="Market with Us - Professional real estate agents"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, rgba(33, 31, 23, 0.7), rgba(33, 31, 23, 0.7)), linear-gradient(180deg, #211F17 0%, rgba(33, 31, 23, 0) 25%, rgba(33, 31, 23, 0) 75%, #211F17 100%)",
              }}
            ></div>
            <div className="absolute bottom-12 left-0 right-0 text-center">
              <h3
                className={`${taviraj.className} text-white text-[32px] font-light leading-[120%]`}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: translationStory?.text_1 ?? "",
                  }}
                />
              </h3>
            </div>
          </div>

          {/* Buy Property */}
          <div className="relative h-[400px] group overflow-hidden">
            <Image
              src={getImageUrl(storyImageLink?.image_2?.id, {
                format: "webp",
                quality: 100,
                fit: "cover",
              }) || "/placeholder.png"}
              alt="Buy Property - Luxury interior design"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, rgba(33, 31, 23, 0.7), rgba(33, 31, 23, 0.7)), linear-gradient(180deg, #211F17 0%, rgba(33, 31, 23, 0) 25%, rgba(33, 31, 23, 0) 75%, #211F17 100%)",
              }}
            ></div>
            <div className="absolute bottom-12 left-0 right-0 text-center">
              <h3
                className={`${taviraj.className} text-white text-[32px] font-light leading-[120%]`}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: translationStory?.text_2 ?? "",
                  }}
                />
              </h3>
            </div>
          </div>

          {/* Sell Your Property */}
          <div className="relative h-[400px] group overflow-hidden">
            <Image
              src={getImageUrl(storyImageLink?.image_3?.id, {
                format: "webp",
                quality: 100,
                fit: "cover",
              }) || "/placeholder.png"}
              alt="Sell Your Property - Luxury oceanfront property"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, rgba(33, 31, 23, 0.7), rgba(33, 31, 23, 0.7)), linear-gradient(180deg, #211F17 0%, rgba(33, 31, 23, 0) 25%, rgba(33, 31, 23, 0) 75%, #211F17 100%)",
              }}
            ></div>
            <div className="absolute bottom-12 left-0 right-0 text-center">
              <h3
                className={`${taviraj.className} text-white text-[32px] font-light leading-[120%]`}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: translationStory?.text_3 ?? "",
                  }}
                />
              </h3>
            </div>
          </div>

          {/* Club Diamondz */}
          <div className="relative h-[400px] group overflow-hidden">
            <Image
              src={getImageUrl(storyImageLink?.image_4?.id, {
                format: "webp",
                quality: 100,
                fit: "cover",
              }) || "/placeholder.png"}
              alt="Club Diamondz - Exclusive membership"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, rgba(33, 31, 23, 0.7), rgba(33, 31, 23, 0.7)), linear-gradient(180deg, #211F17 0%, rgba(33, 31, 23, 0) 25%, rgba(33, 31, 23, 0) 75%, #211F17 100%)",
              }}
            ></div>
            <div className="absolute bottom-12 left-0 right-0 text-center">
              <h3
                className={`${taviraj.className} text-white text-[32px] font-light leading-[120%]`}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: translationStory?.text_4 ?? "",
                  }}
                />
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Beyond Selling Properties Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left Column */}
            <div>
              <h2
                className={`${taviraj.className} text-[#E2DBCC] text-[24px] font-normal leading-[100%] tracking-[0%] mb-8`}
              >
                {translationStoryStory?.story_1}
              </h2>
            </div>

            {/* Right Column */}
            <div>
              <p
                className={`${archivo.className} text-[#BD9574] font-light text-base leading-[150%] tracking-[0px] mb-6`}
              >
                {translationStoryStory?.story_2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section - Updated to match Figma design */}
      <section className="relative">
        {/* Banner Image with Text Overlay */}
        <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
          <Image
            src={getImageUrl(storyImageLink?.image_5?.id, {
              format: "webp",
              quality: 100,
              fit: "cover",
            }) || "/placeholder.png"}
            alt="Meet Our Team"
            fill
            priority
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg, rgba(33, 31, 23, 0.7), rgba(33, 31, 23, 0.7)), linear-gradient(180deg, #211F17 0%, rgba(33, 31, 23, 0) 25%, rgba(33, 31, 23, 0) 75%, #211F17 100%)",
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h3
              className={`${taviraj.className} text-white text-[32px] font-light leading-[120%]`}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: translationStory?.text_5 ?? "",
                }}
              />
            </h3>
          </div>
        </div>

        {/* Team Content */}
        <div className="bg-[#211f17] py-4"></div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-[#211f17]">
        <div className="container mx-auto px-4 text-center">
          <h2
            className={`${taviraj.className} text-[#E2DBCC] text-[48px] font-light leading-[120%] mb-8`}
          >
            {translationStoryPartner?.title}
          </h2>

          {/* Diamond Separator */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="w-36 h-[1px] bg-[#BD9574]"></div>
            <div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
            <div className="w-36 h-[1px] bg-[#BD9574]"></div>
          </div>

          <p
            className={`${archivo.className} text-[#E2DBCC] font-light text-base leading-[150%] max-w-3xl mx-auto mb-16`}
          >
            {translationStoryPartner?.description}
          </p>

          {/* Partners Grid - Single row with exact Figma dimensions */}
          <PartnerCarousel
            storyPartner={storyPartner}
            translationStoryPartner={translationStoryPartner}
            getImageUrl={getImageUrl}
            archivo={archivo}
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
