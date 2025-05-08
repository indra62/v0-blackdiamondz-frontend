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

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400"] });
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"] });

export default function SellPage() {
  return (
    <main className="min-h-screen bg-[#211f17]">
      {/* Hero Section */}
      <section className="py-16 text-center">
        <h1
          className={`${taviraj.className} text-[#e2dbcc] text-[48px] font-light leading-[60px] tracking-[2px] mb-8`}
        >
          Sell your properties
          <br />
          with us!
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
          On behalf of the Black Diamondz team we thank you for making the first
          step in looking for a preferred agency to secure the sale of your
          property asset.
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
              src="/modern-white-luxury-house.png"
              alt="Modern luxury house"
              fill
              className="object-cover"
            />
          </div>
          <div className="h-64 md:h-[392px] relative">
            <Image
              src="/luxury-terracotta-interior.png"
              alt="Luxury interior"
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-rows-2 gap-1">
            <div className="h-32 md:h-[204px] relative">
              <Image
                src="/coastal-luxury-property.png"
                alt="Coastal property"
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="h-32 md:h-[180px] relative">
                <Image
                  src="/modern-apartment-building.png"
                  alt="Modern apartment"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="h-32 md:h-[180px] relative">
                <Image
                  src="/contemporary-architectural-detail.png"
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
          Sell your properties
          <br />
          with us!
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
            Looking to buy or sell a property? Search the address below for a
            Digital Property Report that highlights the market value including
            recent sales, rental history, suburb report and more.
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
              <p>
                On behalf of the Black Diamondz team we thank you for making the
                first step in looking for a preferred agency to secure the sale
                of your property asset.
              </p>

              <p>
                Founded as the agency that is literally redefining the APAC
                property market, Black Diamondz Property Concierge offers an
                astute, innovative and a non-transactional approach to the
                traditional real estate industry. With a diverse and passionate
                team of property experts, we provide a bespoke service that
                delivers exceptional value, ease and comfort to our private
                clients throughout the sales process.
              </p>

              <p>
                Leveraging our industry expertise, we create and advise our
                private clients on the most appropriate, personal and engaging
                method of the sale of their unique property. With our tested
                method we can ensure our private clients achieve their desired
                outcome for their primary residence, investment property or
                holiday home.
              </p>

              <p>
                With an outstanding track record and unparalleled success in
                quality and ever- changing residential sales market, we ensure
                an ease and comfort to our clients throughout the sales process.
                With proven sales records in a wide scope of properties from
                luxury apartments to waterfront mansions, Black Diamondz
                Property Concierge we leverage our network of private buyers
                locally and internationally through our established
                international marketing channels and a private network of
                contacts that we have worked with for decades.
              </p>

              <p>
                At Black Diamondz Property Concierge we consider each of our
                private client's unique requirements of their property, we use
                our local and international expertise to ensure we update all
                our clients with the relevant information they require to ensure
                the best outcome for their property.
              </p>

              <p>
                We focus on the requirements below before we list or showcase
                their property to the market:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Information on current market conditions.</li>
                <li>Any comparable listings within their area.</li>
                <li>Previous sales within their area.</li>
                <li>
                  We create and execute innovative, engaging and inspiring
                  marketing strategies for all forms of their property.
                </li>
                <li>
                  We leverage our well-established private buyer network locally
                  and internationally to ensure we get the best outcome.
                </li>
              </ul>

              <p>
                Finding the buyers for unique residences is something that Black
                Diamondz Property Concierge has an advantage. We have
                established connections with a vast local and international
                database of high-net-worth private clients. Black Diamondz
                Property Concierge has cultivated strong and trusted personal
                relationships with our clients. This engaged client base and
                successful professionals are drawn to us in the midst of the
                very best local and international real estate opportunities.
              </p>

              <p>
                At Black Diamondz Property Concierge, we have successfully sold
                many properties at premium buyers and even offer an exclusive
                Property Concierge Service to help interstate and international
                buyers view our private clients properties with ease, as our
                clients' best interests as the primary focus and with our team
                of experts, we leverage our combined negotiation skills to allow
                us to secure timely deals with market leading results finding
                buyers other agencies simply don't have access to.
              </p>

              <p>
                We thank you for the opportunity and look forward to hearing
                further about your unique property.
              </p>

              <p>
                Warmest Regards,
                <br />
                Monika Tu & The Black Diamondz Team
              </p>
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
