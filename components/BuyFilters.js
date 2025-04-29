const filters = [
  {
    id: "buy",
    label: "Buy",
    type: "text",
    active: true,
  },
  {
    id: "sell",
    label: "Sell",
    type: "text",
    active: false,
  },
  {
    id: "city",
    label: "City",
    type: "icon",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 21H21M6 18V9.99998M10 18V9.99998M14 18V9.99998M18 18V9.99998M20 21V6.99998L12 2.99998L4 6.99998V21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "country",
    label: "Country",
    type: "icon",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 21V12M16 21V12M4 21H20M4 7H20M6 7L9 4M18 7L15 4M11 7V4H13V7M4 7V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "beachfront",
    label: "Beachfront",
    type: "icon",
    active: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4 19H20M4 15L7 14C8.5 13.5 10.5 13.5 12 14C13.5 14.5 15.5 14.5 17 14L20 15M4 11L7 10C8.5 9.5 10.5 9.5 12 10C13.5 10.5 15.5 10.5 17 10L20 11"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "apartment",
    label: "Apartment",
    type: "icon",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 21H21M5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21M9 21V17C9 15.8954 9.89543 15 11 15H13C14.1046 15 15 15.8954 15 17V21M9 7H11M9 11H11M13 7H15M13 11H15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "suburbs",
    label: "Suburbs",
    type: "icon",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 21H21M5 21V8L12 3L19 8V21M9 21V12H15V21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "ocean-view",
    label: "Ocean View",
    type: "icon",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 16C3 16 7 10 12 10C17 10 21 16 21 16M3 12C3 12 7 6 12 6C17 6 21 12 21 12M3 20C3 20 7 14 12 14C17 14 21 20 21 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "pool",
    label: "Pool",
    type: "icon",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4 15C4 15 5 14 7 14C9 14 10 15 12 15C14 15 15 14 17 14C19 14 20 15 20 15M4 19C4 19 5 18 7 18C9 18 10 19 12 19C14 19 15 18 17 18C19 18 20 19 20 19M4 11C4 11 5 10 7 10C9 10 10 11 12 11C14 11 15 10 17 10C19 10 20 11 20 11M12 4V7M15 5V8M9 5V8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

export default function BuyFilters() {
  return (
    <div className="bg-[#211f17] border-b border-[#656565]/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex gap-8">
            {filters
              .filter((filter) => filter.type === "text")
              .map((filter) => (
                <div
                  key={filter.id}
                  className={`cursor-pointer ${filter.active ? "text-[#d4af37]" : "text-[#656565]"}`}
                >
                  <span className="text-lg font-light">{filter.label}</span>
                  {filter.active && <div className="w-full h-[2px] bg-[#d4af37] mt-2" />}
                </div>
              ))}
          </div>

          <div className="flex gap-8">
            {filters
              .filter((filter) => filter.type === "icon")
              .map((filter) => (
                <div
                  key={filter.id}
                  className={`flex flex-col items-center cursor-pointer ${
                    filter.active ? "text-[#d4af37]" : "text-[#656565]"
                  }`}
                >
                  <div className="mb-1">{filter.icon}</div>
                  <span className="text-xs">{filter.label}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
