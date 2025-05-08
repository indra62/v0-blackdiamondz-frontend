"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { Taviraj } from "next/font/google";
import { Archivo } from "next/font/google";
import { useEffect, useState } from "react";
import { getImageUrl, getItems } from "@/lib/api";
import Loading from "@/components/loading";
import TeamMembersCarousel from "@/components/TeamMembersCarousel";

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400"] });
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"] });

export default function OurTeamPage() {
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
          fields: ["*", "hero_image.*", "translations.*"],
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
          fields: ["*", "translations.*", "agents.*"],
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
              <h1
                className={`${taviraj.className} text-[#E2DBCC] text-[48px] font-light leading-[125%] tracking-[2px] text-center mb-8`}
              >
                {translation?.hero_title || ""}
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
                  <div className="h-[400px] w-[1px] bg-[#656565]/30"></div>
                  <div className="my-4 w-3 h-3 bg-[#BD9574] rotate-45"></div>
                  <div className="h-[200px] w-[1px] bg-[#656565]/30"></div>
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

          {/* Team Gallery */}
          <section className="pt-16 pb-0 bg-[#211f17]">
            <div className="container mx-auto px-4">
              {/* Using HTML table for precise layout control */}
              <table
                className="mx-auto border-separate"
                style={{ borderSpacing: "2px" }}
              >
                <tbody>
                  <tr>
                    <td style={{ width: "200px", height: "200px", padding: 0 }}>
                      <div className="relative w-full h-full">
                        <Image
                          src={getImageUrl(
                            teamFounderData?.founder_image_1?.id,
                            {
                              format: "webp",
                              quality: 100,
                              fit: "cover",
                            }
                          )}
                          alt="Team member in red dress"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td style={{ width: "200px", height: "200px", padding: 0 }}>
                      <div className="relative w-full h-full">
                        <Image
                          src={getImageUrl(
                            teamFounderData?.founder_image_2?.id,
                            {
                              format: "webp",
                              quality: 100,
                              fit: "cover",
                            }
                          )}
                          alt="Team members meeting clients"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td
                      rowSpan={2}
                      style={{ width: "300px", height: "402px", padding: 0 }}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={getImageUrl(
                            teamFounderData?.founder_image_3?.id,
                            {
                              format: "webp",
                              quality: 100,
                              fit: "cover",
                            }
                          )}
                          alt="Female agent in red dress"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td
                      rowSpan={2}
                      style={{ width: "300px", height: "402px", padding: 0 }}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={getImageUrl(
                            teamFounderData?.founder_image_4?.id,
                            {
                              format: "webp",
                              quality: 100,
                              fit: "cover",
                            }
                          )}
                          alt="Team members with clients"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td style={{ width: "402px", height: "200px", padding: 0 }}>
                      <div className="flex w-full h-full">
                        <div
                          className="relative w-1/2 h-full"
                          style={{ marginRight: "1px" }}
                        >
                          <Image
                            src={getImageUrl(
                              teamFounderData?.founder_image_5?.id,
                              {
                                format: "webp",
                                quality: 100,
                                fit: "cover",
                              }
                            )}
                            alt="Director portrait 1"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div
                          className="relative w-1/2 h-full"
                          style={{ marginLeft: "1px" }}
                        >
                          <Image
                            src={getImageUrl(
                              teamFounderData?.founder_image_6?.id,
                              {
                                format: "webp",
                                quality: 100,
                                fit: "cover",
                              }
                            )}
                            alt="Director portrait 2"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={2}
                      style={{ width: "402px", height: "200px", padding: 0 }}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={getImageUrl(
                            teamFounderData?.founder_image_7?.id,
                            {
                              format: "webp",
                              quality: 100,
                              fit: "cover",
                            }
                          )}
                          alt="Modern house exterior"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td style={{ width: "200px", height: "200px", padding: 0 }}>
                      <div className="relative w-full h-full">
                        <Image
                          src={getImageUrl(
                            teamFounderData?.founder_image_8?.id,
                            {
                              format: "webp",
                              quality: 100,
                              fit: "cover",
                            }
                          )}
                          alt="Luxury property exterior"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Explore Our Story Section */}
          <section className="relative h-[365px] w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              {/* Only render the Image if a valid src is provided */}
              {false ? (
                <Image
                  src={undefined}
                  alt="Business professionals shaking hands"
                  fill
                  className="object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-[#211f17]/50"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center">
              <Link href="/our-story" className="cursor-pointer">
                <h2 className="font-serif text-[64px] font-light text-[#E2DBCC] tracking-wide hover:text-[#BD9574] transition-colors">
                  Explore Our Story
                </h2>
              </Link>
            </div>
          </section>

          {/* Support Section */}
          <section className="py-16 bg-[#211f17]">
            <div className="container mx-auto px-4">
              {/* Heading */}
              <h2 className="font-serif text-[48px] font-light text-[#E2DBCC] text-center mb-8">
                Support
              </h2>

              {/* Diamond Separator */}
              <div className="flex items-center justify-center gap-0 mb-12">
                <div className="w-[120px] h-[1px] bg-[#BD9574]"></div>
                <div className="w-2 h-2 bg-[#BD9574] rotate-45 mx-4"></div>
                <div className="w-[120px] h-[1px] bg-[#BD9574]"></div>
              </div>

              {/* Description Text */}
              <p
                className={`${archivo.className} text-[#E2DBCC] font-light text-[16px] leading-[150%] max-w-3xl mx-auto mb-16 text-center`}
              >
                The Black Diamondz team appreciates your interest in finding the
                right agency to help you sell your property. Our dedicated team
                members are here to guide you through every step of the process.
              </p>

              {/* Team Members Section with Pagination */}
              <TeamMembersCarousel data={supportData|| []} />
            </div>
          </section>
        </>
      )}
      <Footer />
    </main>
  );
}
