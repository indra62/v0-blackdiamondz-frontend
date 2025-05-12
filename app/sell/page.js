"use client";

/**
 * Sell Page
 *
 * Information page for property sellers.
 * Includes stats, property image gallery, and contact form.
 *
 * @page
 */

// Update import statements to use kebab-case
import Footer from "@/components/footer";
import { Taviraj } from "next/font/google";
import { Archivo } from "next/font/google";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

import { getImageUrl, getItems, getItem } from "@/lib/api";

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400"] });
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"] });

export default function SellPage() {
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("en");
  const [dataExplore, setDataExplore] = useState([]);

  const translation =
    dataExplore?.translations?.find((t) => t.languages_code === language) ||
    dataExplore?.translations?.[0];

  useEffect(() => {
    const fetchDataSell = async () => {
      try {
        const dataExplore = await getItems("property_sell", {
          fields: ["*", "translations.*", "images.directus_files_id.*"],
        });
        setDataExplore(dataExplore);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
      }
    };
    fetchDataSell();
    // eslint-disable-next-line
  }, []);

  return (
    <main className="min-h-screen bg-[#211f17]">
      {/* Hero Section */}
      <section className="py-16 text-center">
        <h1
          className={`${taviraj.className} text-[#e2dbcc] text-[48px] font-light leading-[60px] tracking-[2px] mb-8`}
        >
          {translation?.property_sell_title}
        </h1>

        {/* Diamond Separator */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-24 h-[1px] bg-[#BD9574]"></div>
          <div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
          <div className="w-24 h-[1px] bg-[#BD9574]"></div>
        </div>

        <p
          className={`${archivo.className} text-[#E2DBCC] font-light text-base leading-6 max-w-2xl mx-auto mb-16`}
        >
          {translation?.property_sell_description}
        </p>
      </section>

      {/* Stats Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            {/* Black Diamondz Stats */}
            <div className="flex-1 mb-12 md:mb-0">
              <div className="flex items-center gap-6 mb-12 pl-24">
                <h2 className="font-archivo font-normal text-[20px] leading-[21.76px] text-white text-center">
                  Black Diamondz
                </h2>
                <button className="px-6 py-2 border border-[#BD9574] text-[#BD9574] hover:border-[#BD9574] hover:text-[#BD9574] transition-colors font-archivo font-light text-base leading-6">
                  More about Black Diamondz
                </button>
              </div>
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div
                    className={`${taviraj.className} font-normal text-[48px] leading-[81.89px] text-[#BD9574] mb-2`}
                  >
                    9
                  </div>
                  <div
                    className={`${archivo.className} font-light text-base leading-6 text-white`}
                  >
                    Project
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`${taviraj.className} font-normal text-[48px] leading-[81.89px] text-[#BD9574] mb-2`}
                  >
                    34
                  </div>
                  <div
                    className={`${archivo.className} font-light text-base leading-6 text-white`}
                  >
                    Units
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`${taviraj.className} font-normal text-[48px] leading-[81.89px] text-[#BD9574] mb-2`}
                  >
                    9428
                  </div>
                  <div
                    className={`${archivo.className} font-light text-base leading-6 text-white`}
                  >
                    Total SQM
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:flex flex-col items-center mx-12">
              <div className="flex-1 w-[1px] bg-[#656565]"></div>
              <div className="my-4">
                <div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
              </div>
              <div className="flex-1 w-[1px] bg-[#656565]"></div>
            </div>

            {/* Australian Market Stats */}
            <div className="flex-1">
              <div className="flex items-center gap-6 mb-12 pl-24">
                <h2
                  className={`${archivo.className} font-normal text-[20px] leading-[21.76px] text-white`}
                >
                  Australian Market
                </h2>
                <button className="px-6 py-2 border border-[#BD9574] text-[#BD9574] hover:border-[#BD9574] hover:text-[#BD9574] transition-colors font-archivo font-light text-base leading-6">
                  See Market Insight
                </button>
              </div>
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div
                    className={`${taviraj.className} font-normal text-[48px] leading-[81.89px] text-[#BD9574] mb-2`}
                  >
                    4
                  </div>
                  <div
                    className={`${archivo.className} font-light text-base leading-6 text-white`}
                  >
                    Project
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`${taviraj.className} font-normal text-[48px] leading-[81.89px] text-[#BD9574] mb-2`}
                  >
                    24
                  </div>
                  <div
                    className={`${archivo.className} font-light text-base leading-6 text-white`}
                  >
                    Units
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`${taviraj.className} font-normal text-[48px] leading-[81.89px] text-[#BD9574] mb-2`}
                  >
                    7325
                  </div>
                  <div
                    className={`${archivo.className} font-light text-base leading-6 text-white`}
                  >
                    Total SQM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Images Grid */}
      <section className="pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          <div className="h-64 md:h-[392px] relative">
            <Image
              src={getImageUrl(dataExplore.images?.[0].directus_files_id.id)}
              alt="Modern luxury house"
              fill
              className="object-cover"
            />
          </div>
          <div className="h-64 md:h-[392px] relative">
            <Image
              src={getImageUrl(dataExplore.images?.[1].directus_files_id.id)}
              alt="Luxury interior"
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-rows-2 gap-1">
            <div className="h-32 md:h-[204px] relative">
              <Image
                src={getImageUrl(dataExplore.images?.[2].directus_files_id.id)}
                alt="Coastal property"
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="h-32 md:h-[180px] relative">
                <Image
                  src={getImageUrl(dataExplore.images?.[3].directus_files_id.id)}
                  alt="Modern apartment"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="h-32 md:h-[180px] relative">
                <Image
                  src={getImageUrl(dataExplore.images?.[4].directus_files_id.id)}
                  alt="Architectural detail"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Sell Section */}
      <section className="py-16 text-center">
        <h2
          className={`${taviraj.className} text-[#e2dbcc] text-[48px] font-light leading-[60px] tracking-[2px] mb-8`}
        >
          {translation?.property_sell_secondary_title}
        </h2>

        {/* Diamond Separator */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-24 h-[1px] bg-[#BD9574]"></div>
          <div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
          <div className="w-24 h-[1px] bg-[#BD9574]"></div>
        </div>

        <div className="max-w-3xl mx-auto mb-8">
          <p
            className={`${archivo.className} text-[#E2DBCC] font-light text-base leading-6 mb-4`}
          >
            {translation?.property_sell_secondary_description}
          </p>

          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <input
              type="text"
              placeholder="Start typing to find your address..."
              className="flex-grow bg-transparent border border-[#656565] p-4 text-white focus:outline-none focus:border-[#BD9574]"
            />
            <button className="bg-[#BD9574] text-[#211f17] px-8 py-4 hover:bg-[#BD9574] transition-colors">
              Find Out
            </button>
          </div>
        </div>
      </section>

      {/* Contact form for property sellers
      In production, this would submit to a CRM or email service */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left Column - Text Content */}
            <div
              className={`${archivo.className} text-[#E2DBCC] font-light text-base leading-6 space-y-6`}
            >
              <p dangerouslySetInnerHTML={{ __html: translation?.property_sell_requirements || "" }} />
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name*"
                    className="bg-transparent border border-[#656565] p-4 text-white focus:outline-none focus:border-[#BD9574]"
                  />
                  <input
                    type="text"
                    placeholder="Last Name*"
                    className="bg-transparent border border-[#656565] p-4 text-white focus:outline-none focus:border-[#BD9574]"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email*"
                  className="bg-transparent border border-[#656565] p-4 text-white focus:outline-none focus:border-[#BD9574]"
                />

                <input
                  type="tel"
                  placeholder="Phone No.*"
                  className="bg-transparent border border-[#656565] p-4 text-white focus:outline-none focus:border-[#BD9574]"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <select className="w-full bg-transparent border border-[#656565] p-4 text-[#656565] focus:outline-none focus:border-[#BD9574] appearance-none">
                      <option value="">Country</option>
                      <option value="australia">Australia</option>
                      <option value="china">China</option>
                      <option value="usa">USA</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-[#656565]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>

                  <div className="relative">
                    <select className="w-full bg-transparent border border-[#656565] p-4 text-[#656565] focus:outline-none focus:border-[#BD9574] appearance-none">
                      <option value="">Property Type</option>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-[#656565]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Property Address"
                  className="bg-transparent border border-[#656565] p-4 text-white focus:outline-none focus:border-[#BD9574]"
                />

                <textarea
                  placeholder="Message"
                  rows="5"
                  className="bg-transparent border border-[#656565] p-4 text-white focus:outline-none focus:border-[#BD9574]"
                ></textarea>

                <button className="bg-[#BD9574] text-[#211f17] px-8 py-4 hover:bg-[#BD9574] transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
