"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { Taviraj } from "next/font/google";
import { Archivo } from "next/font/google";
import { useState } from "react";

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300", "400"] });
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"] });

export default function OurTeamPage() {
  // Featured team members
  const featuredMembers = [
    {
      id: 1,
      name: "Monika (Yanling) Tu",
      title: "Founder & Director",
      image: "/monika-tu.png",
      bio: "Monika Tu, Founder and Director of Black Diamondz Group, is a Chinese-Australian executive known for bringing global buyers to the Australian property market. She has received multiple accolades, including the 2014 Hong Kong Business Association Success Story Award and recognition as a top Chinese entrepreneur in Australia (2016). Tu is regarded as Sydney's top luxury real estate agent and an expert on the future of Australian real estate.",
    },
    {
      id: 2,
      name: "Jad Khatar",
      title: "Director",
      image: "/jad-khatar.png",
      bio: "Jad Khattar is the Co-Director and Founder of Black Diamondz Group. Founded in 2009, it has gained a reputation as the top agency for off-market, ultra-high-end Sydney properties. In 2014, the company won the International Success Story Award, presented at Parliament House.",
    },
  ];

  // Support team members
  const supportTeam = [
    {
      id: 1,
      name: "Maylin Liu",
      title: "Property Sales",
      image: "/placeholder.svg?key=nyc6n",
    },
    {
      id: 2,
      name: "Courtney Wang",
      title: "Senior Sales Executive",
      image: "/professional-man-blue-suit.png",
    },
    {
      id: 3,
      name: "Blake Morris",
      title: "Property Sales",
      image: "/placeholder.svg?key=xm89l",
    },
    {
      id: 4,
      name: "Kelly Tepich",
      title: "Executive Assistant",
      image: "/professional-woman-long-hair.png",
    },
    {
      id: 5,
      name: "Phillip Shah",
      title: "Associate Director",
      image: "/professional-man-glasses.png",
    },
    {
      id: 6,
      name: "Eric Leung",
      title: "Property Sales",
      image: "/professional-asian-man-suit.png",
    },
    {
      id: 7,
      name: "Luke Pun",
      title: "Chief Operating Officer",
      image: "/placeholder.svg?key=0kcyx",
    },
    {
      id: 8,
      name: "Heather Chen",
      title: "Marketing Coordinator",
      image: "/placeholder.svg?key=zoc88",
    },
  ];

  function TeamMembersCarousel() {
    const [currentPage, setCurrentPage] = useState(0);

    // Team members data
    const allTeamMembers = [
      // Page 1
      [
        {
          id: 1,
          name: "Maylin Liu",
          title: "Property Sales Representative",
          image: "/placeholder.svg?key=nyc6n&text=Maylin+Liu",
        },
        {
          id: 2,
          name: "Courtney Wong",
          title: "Senior Sales Executive",
          image: "/professional-man-blue-suit.png",
        },
        {
          id: 3,
          name: "Blake Morris",
          title: "Property Sales Representative",
          image: "/placeholder.svg?key=xm89l&text=Blake+Morris",
        },
        {
          id: 4,
          name: "Kitty Tarchi",
          title: "Executive of Partnerships & Strategy",
          image: "/professional-woman-long-hair.png",
        },
        {
          id: 5,
          name: "Phillip Sheh",
          title: "Associate Director",
          image: "/professional-man-glasses.png",
        },
        {
          id: 6,
          name: "Eric Leung",
          title: "Property Sales Representative",
          image: "/professional-asian-man-suit.png",
        },
        {
          id: 7,
          name: "Luke Pun",
          title: "Chief Operating Officer",
          image: "/placeholder.svg?key=0kcyx&text=Luke+Pun",
        },
        {
          id: 8,
          name: "Heather Chen",
          title: "Marketing Coordinator",
          image: "/placeholder.svg?key=zoc88&text=Heather+Chen",
        },
      ],
      // Page 2
      [
        {
          id: 9,
          name: "Sarah Johnson",
          title: "Property Consultant",
          image: "/placeholder.svg?key=jk45l&text=Sarah+Johnson",
        },
        {
          id: 10,
          name: "Michael Zhang",
          title: "Investment Advisor",
          image: "/placeholder.svg?key=mn67p&text=Michael+Zhang",
        },
        {
          id: 11,
          name: "Jessica Lee",
          title: "Marketing Specialist",
          image: "/placeholder.svg?key=op89q&text=Jessica+Lee",
        },
        {
          id: 12,
          name: "David Chen",
          title: "Property Analyst",
          image: "/placeholder.svg?key=rs12t&text=David+Chen",
        },
      ],
      // Page 3
      [
        {
          id: 13,
          name: "Emma Wilson",
          title: "Client Relations",
          image: "/placeholder.svg?key=uv34w&text=Emma+Wilson",
        },
        {
          id: 14,
          name: "James Taylor",
          title: "Property Manager",
          image: "/placeholder.svg?key=xy56z&text=James+Taylor",
        },
        {
          id: 15,
          name: "Olivia Brown",
          title: "Executive Assistant",
          image: "/placeholder.svg?key=ab78c&text=Olivia+Brown",
        },
      ],
      // Page 4
      [
        {
          id: 16,
          name: "Daniel Kim",
          title: "International Sales",
          image: "/placeholder.svg?key=de90f&text=Daniel+Kim",
        },
        {
          id: 17,
          name: "Sophia Wang",
          title: "Property Stylist",
          image: "/placeholder.svg?key=gh12i&text=Sophia+Wang",
        },
      ],
      // Page 5
      [
        {
          id: 18,
          name: "Ryan Park",
          title: "Development Manager",
          image: "/placeholder.svg?key=jk34l&text=Ryan+Park",
        },
        {
          id: 19,
          name: "Isabella Chen",
          title: "Legal Advisor",
          image: "/placeholder.svg?key=mn56o&text=Isabella+Chen",
        },
      ],
    ];

    const totalPages = allTeamMembers.length;

    // Navigation functions
    const goToNextPage = () => {
      setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
    };

    const goToPrevPage = () => {
      setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const goToPage = (pageIndex) => {
      if (pageIndex >= 0 && pageIndex < totalPages) {
        setCurrentPage(pageIndex);
      }
    };

    // Get current page team members
    const currentTeamMembers = allTeamMembers[currentPage];

    return (
      <>
        {/* Team Grid - Single Row with Overflow */}
        <div className="flex overflow-x-auto pb-8 gap-6 max-w-[1200px] mx-auto hide-scrollbar">
          {currentTeamMembers.map((member) => (
            <Link
              key={member.id}
              href={`/team/${member.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex-none w-[150px] group cursor-pointer"
            >
              <div className="relative w-[150px] h-[200px] mb-4 overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h4 className="text-[#E2DBCC] font-light text-[16px] leading-[150%] mb-1 text-center group-hover:text-[#BD9574] transition-colors">
                {member.name}
              </h4>
              <p className="text-[#BD9574] font-light text-[14px] leading-[150%] text-center">
                {member.title}
              </p>
            </Link>
          ))}
        </div>

        {/* Pagination and Navigation */}
        <div className="flex justify-between items-center mt-8 max-w-[1200px] mx-auto px-4">
          {/* Diamond Pagination Indicators */}
          <div className="flex items-center gap-4">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-2 h-2 ${
                  currentPage === index ? "bg-[#BD9574]" : "bg-[#656565]"
                } rotate-45 transition-colors hover:bg-[#BD9574]/80`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-4">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 0}
              className={`w-12 h-12 border ${
                currentPage === 0
                  ? "border-[#656565]/50 text-[#656565]/50 cursor-not-allowed"
                  : "border-[#656565] text-[#E2DBCC] hover:border-[#BD9574] hover:text-[#BD9574]"
              } flex items-center justify-center transition-colors`}
              aria-label="Previous page"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1}
              className={`w-12 h-12 border ${
                currentPage === totalPages - 1
                  ? "border-[#656565]/50 text-[#656565]/50 cursor-not-allowed"
                  : "border-[#656565] text-[#E2DBCC] hover:border-[#BD9574] hover:text-[#BD9574]"
              } flex items-center justify-center transition-colors`}
              aria-label="Next page"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <main className="min-h-screen bg-[#211f17]">
      <Header />
      {/* Hero Section */}
      <section className="relative h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/81168bd59b8a757f470ee84d7530722806a8a703-WcLYrGzxzWcCjAyuDsChhkXpFWlnSm.png"
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
            Meet Our Team!
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
            Our point of difference in a saturated market is our unmatched
            international database, specializing in high-end luxury residential
            property sales, investment properties and business solutions.
          </p>

          <p
            className={`${archivo.className} text-[#E2DBCC] font-light text-[16px] leading-[150%] tracking-[0px] text-center max-w-3xl mx-auto`}
          >
            Our industry expertise, negotiating prowess and suite of integrated
            services ensure that we remain firmly at the forefront of the
            market, all while providing a bespoke and VIP client offering. With
            a bilingual Chinese-Australian team, and partners in China, Hong
            Kong, Asia Pacific, Europe and the Middle East, Black Diamondz
            proudly integrates a local global presence with local expertise to
            ensure that we provide the very best solutions to buyers and sellers
            alike.
          </p>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center">
            <div className="w-1 h-16 bg-gradient-to-b from-[#BD9574] to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Featured Team Members */}
      <section className="py-16 bg-[#211f17]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-start">
            {/* First Member */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right md:w-1/2 md:pr-12 mb-16 md:mb-0">
              <Link
                href={`/team/monika-tu`}
                className="group cursor-pointer text-center"
              >
                <div className="w-[400px] h-[400px] mb-8 overflow-hidden mr-4">
                  <Image
                    src="/monika-tu.png"
                    alt="Monika (Yanling) Tu"
                    width={400}
                    height={400}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3
                  className={`${taviraj.className} text-[#E2DBCC] text-[32px] font-normal leading-[100%] tracking-[0px] mb-2 group-hover:text-[#BD9574] transition-colors`}
                >
                  Monika (Yanling) Tu
                </h3>
                <p
                  className={`${archivo.className} text-[#E2DBCC] text-[20px] font-normal leading-[100%] tracking-[0px] mb-6`}
                >
                  Founder & Director
                </p>
              </Link>

              <p
                className={`${archivo.className} text-[#BD9574] font-light text-[16px] leading-[150%] tracking-[0px] text-center max-w-md`}
              >
                Monika Tu, Founder and Director of Black Diamondz Group, is a
                Chinese-Australian executive known for bringing global buyers to
                the Australian property market. She has received multiple
                accolades, including the 2014 Hong Kong Business Association
                Success Story Award and recognition as a top Chinese
                entrepreneur in Australia (2016). Tu is regarded as Sydney's top
                luxury real estate agent and an expert on the future of
                Australian real estate.
              </p>
            </div>

            {/* Center Divider */}
            <div className="hidden md:flex flex-col items-center justify-center mx-4">
              <div className="h-[400px] w-[1px] bg-[#656565]/30"></div>
              <div className="my-4 w-3 h-3 bg-[#BD9574] rotate-45"></div>
              <div className="h-[290px] w-[1px] bg-[#656565]/30"></div>
            </div>

            {/* Second Member */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/2 md:pl-12">
              <Link
                href={`/team/jad-khatar`}
                className="group cursor-pointer text-center"
              >
                <div className="w-[400px] h-[400px] mb-8 overflow-hidden ml-4">
                  <Image
                    src="/jad-khatar.png"
                    alt="Jad Khatar"
                    width={400}
                    height={400}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3
                  className={`${taviraj.className} text-[#E2DBCC] text-[32px] font-normal leading-[100%] tracking-[0px] mb-2 group-hover:text-[#BD9574] transition-colors`}
                >
                  Jad Khatar
                </h3>
                <p
                  className={`${archivo.className} text-[#E2DBCC] text-[20px] font-normal leading-[100%] tracking-[0px] mb-6 `}
                >
                  Director
                </p>
              </Link>

              <p
                className={`${archivo.className} text-[#BD9574] font-light text-[16px] leading-[150%] tracking-[0px] text-center max-w-md`}
              >
                Jad Khattar is the Co-Director and Founder of Black Diamondz
                Group. Founded in 2009, it has gained a reputation as the top
                agency for off-market, ultra-high-end Sydney properties. In
                2014, the company won the International Success Story Award,
                presented at Parliament House.
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
                      src="/placeholder.svg?key=masm4&text=Team+Member+Red+Dress"
                      alt="Team member in red dress"
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>
                <td style={{ width: "200px", height: "200px", padding: 0 }}>
                  <div className="relative w-full h-full">
                    <Image
                      src="/placeholder.svg?key=tvzfl&text=Team+Members+Meeting"
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
                      src="/placeholder.svg?key=1hcwm&text=Female+Agent+Red+Dress"
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
                      src="/placeholder.svg?key=qgysd&text=Team+Members+With+Clients"
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
                        src="/placeholder.svg?key=8obl5&text=Director+Portrait+1"
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
                        src="/placeholder.svg?key=9jkl7&text=Director+Portrait+2"
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
                      src="/modern-house-exterior.png"
                      alt="Modern house exterior"
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>
                <td style={{ width: "200px", height: "200px", padding: 0 }}>
                  <div className="relative w-full h-full">
                    <Image
                      src="/placeholder.svg?key=8uisy&text=Luxury+Property"
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
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14c9f6ad02d6218a6dad20e7c953c0cbd154b6d6-5SHgedm8E6YGVT6GpxEDR5sEdjRhmO.png"
            alt="Business professionals shaking hands"
            fill
            className="object-cover"
          />
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
          <TeamMembersCarousel />
        </div>
      </section>
      <Footer />
    </main>
  );
}
