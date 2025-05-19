import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getImageUrl } from "@/lib/api";

export default function TeamMembersCarousel({ data }) {
  if (!data?.agents || !Array.isArray(data.agents)) return null; // safeguard
  const [currentPage, setCurrentPage] = useState(0);

  const ITEMS_PER_PAGE = 7;
  const totalPages = Math.ceil(data.agents.length / ITEMS_PER_PAGE);

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
  const currentTeamMembers = data.agents.slice(
    currentPage * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  return (
    <>
      {/* Team Grid - Single Row with Overflow */}
      <div className="flex overflow-x-auto pb-8 gap-6 max-w-[1200px] mx-auto hide-scrollbar">
        {currentTeamMembers.map((member, idx) => (
          <Link
            key={member?.id || idx}
            href={
              "/team/" +
              member?.first_name?.toLowerCase().replace(/\s+/g, "-") +
              "-" +
              member?.last_name?.toLowerCase().replace(/\s+/g, "-")
            }
            className="flex-none w-[150px] group cursor-pointer"
          >
            <div className="relative w-[150px] h-[200px] mb-4 overflow-hidden">
              <Image
                src={
                  getImageUrl(member?.avatar?.id, {
                    format: "webp",
                    quality: 100,
                    fit: "cover",
                  }) || "/placeholder.svg"
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
  )
}
