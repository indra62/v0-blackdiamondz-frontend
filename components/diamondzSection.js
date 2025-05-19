import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Taviraj, Archivo } from "next/font/google";
const taviraj = Taviraj({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});
// Section component with pagination
const DiamondzSection = ({
  title,
  items,
  currentPage,
  totalPages,
  onNavigate,
  CardComponent,
}) => (
  <div className="py-16 px-4 bg-[#FBF4E4]">
    <div className="container mx-auto">
      {/* Section Heading with Diamond Separator */}
      <div className="text-center mb-16">
        <h2
          className={`${taviraj.className} text-[#211f17] text-5xl md:text-6xl font-light mb-8`}
        >
          {title}
        </h2>
        <div className="flex items-center justify-center gap-4">
          <div className="w-24 h-[1px] bg-[#bd9574]"></div>
          <div className="w-2 h-2 bg-[#bd9574] rotate-45"></div>
          <div className="w-24 h-[1px] bg-[#bd9574]"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <CardComponent key={item.id} item={item} />
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <div className="flex space-x-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 transform rotate-45 ${
                index === currentPage ? "bg-[#BD9574]" : "bg-[#656565]/50"
              }`}
              aria-label={`Go to page ${index + 1}`}
              onClick={() => onNavigate(index)}
            />
          ))}
        </div>
        <div className="flex space-x-4">
          <button
            className="w-10 h-10 border border-[#656565] flex items-center justify-center text-[#656565] hover:border-[#BD9574] hover:text-[#BD9574] transition-colors"
            aria-label="Previous items"
            onClick={() => onNavigate("prev")}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="w-10 h-10 border border-[#656565] flex items-center justify-center text-[#656565] hover:border-[#BD9574] hover:text-[#BD9574] transition-colors"
            aria-label="Next items"
            onClick={() => onNavigate("next")}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default DiamondzSection;
