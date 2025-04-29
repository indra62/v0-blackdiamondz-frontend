export default function ExploreProperties() {
  return (
    <div className="bg-[#211f17] text-white py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[#d4af37] text-5xl md:text-6xl font-serif mb-8">Explore our properties!</h2>

          {/* Diamond Separator */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-[1px] bg-[#d4af37]"></div>
            <div className="w-2 h-2 bg-[#d4af37] rotate-45"></div>
            <div className="w-12 h-[1px] bg-[#d4af37]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
