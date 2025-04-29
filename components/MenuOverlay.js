"use client"

import { X, ArrowRight, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MenuOverlay({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-[#211f17] z-50 overflow-y-auto">
      {/* Top Search Bar */}
      <div className="border-b border-[#656565]/20">
        <div className="container mx-auto px-4">
          <div className="flex items-stretch h-[60px]">
            {/* Logo */}
            <div className="flex items-center px-6 border-r border-[#656565]/20">
              <div className="flex flex-col items-center">
                <Image
                  src="/Users/indrafahlevy/black-diamond/black-diamond-website/images/smallLogo.png"
                  alt="Black Diamondz Logo"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <div className="w-4 h-[2px] bg-[#d4af37] mt-1"></div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center px-6 border-r border-[#656565]/20 min-w-[250px]">
              <div className="flex flex-col w-full">
                <label className="text-xs text-[#656565]">Location</label>
                <input
                  type="text"
                  defaultValue="San Francisco"
                  className="bg-transparent text-[#d4af37] focus:outline-none w-full py-1"
                />
              </div>
            </div>

            {/* Type */}
            <div className="flex items-center px-6 border-r border-[#656565]/20 min-w-[250px]">
              <div className="flex flex-col w-full">
                <label className="text-xs text-[#656565]">Type</label>
                <Select>
                  <SelectTrigger className="border-0 p-0 h-auto bg-transparent focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="Select type..." className="text-[#656565]" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ChevronDown className="h-4 w-4 text-[#656565] ml-2" />
            </div>

            {/* Bedroom */}
            <div className="flex items-center px-6 border-r border-[#656565]/20 min-w-[250px]">
              <div className="flex flex-col w-full">
                <label className="text-xs text-[#656565]">Bedroom</label>
                <Select>
                  <SelectTrigger className="border-0 p-0 h-auto bg-transparent focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="Select qty..." className="text-[#656565]" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Bedroom</SelectItem>
                    <SelectItem value="2">2 Bedrooms</SelectItem>
                    <SelectItem value="3">3 Bedrooms</SelectItem>
                    <SelectItem value="4">4+ Bedrooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ChevronDown className="h-4 w-4 text-[#656565] ml-2" />
            </div>

            {/* Value */}
            <div className="flex items-center px-6 border-r border-[#656565]/20 min-w-[250px]">
              <div className="flex flex-col w-full">
                <label className="text-xs text-[#656565]">Value</label>
                <input
                  type="text"
                  defaultValue="87740245"
                  className="bg-transparent text-[#d4af37] focus:outline-none w-full py-1"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-center px-6 border-r border-[#656565]/20">
              <button className="flex items-center text-[#d4af37] hover:text-[#e5c04b] transition-colors">
                <span className="mr-2">Search</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Close Button */}
            <div className="flex items-center px-6">
              <button onClick={onClose} className="text-[#d4af37] hover:text-[#e5c04b] transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Navigation */}
          <div className="space-y-8">
            <nav className="space-y-6">
              <Link href="/buy" className="block text-3xl hover:text-[#d4af37] transition-colors">
                Buy
              </Link>
              <Link href="/sell" className="block text-3xl hover:text-[#d4af37] transition-colors">
                Sell
              </Link>
              <Link href="/our-story" className="block text-3xl hover:text-[#d4af37] transition-colors">
                Our Story
              </Link>
              <Link href="/team" className="block text-3xl hover:text-[#d4af37] transition-colors">
                Team & Agents
              </Link>
              <Link href="/club" className="block text-3xl hover:text-[#d4af37] transition-colors">
                Club Diamondz
              </Link>
              <Link href="/contact" className="block text-3xl hover:text-[#d4af37] transition-colors">
                Contact Us
              </Link>
              <Link href="/faq" className="block text-3xl hover:text-[#d4af37] transition-colors">
                FAQ
              </Link>
            </nav>
          </div>

          {/* Right Column - Newsletter & Contact */}
          <div className="space-y-16">
            {/* Newsletter */}
            <div>
              <h3 className="text-sm text-[#656565] mb-4">BLACK DIAMONDZ NEWSLETTER</h3>
              <div className="space-y-4">
                <h4 className="text-2xl">Subscribe to The Black Diamondz Newsletter</h4>
                <div className="flex items-center border-b border-[#656565]">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-transparent w-full py-2 focus:outline-none"
                  />
                  <ArrowRight className="h-4 w-4 text-[#d4af37]" />
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm text-[#656565] mb-8">OUR CONTACT</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Monika Tu */}
                <div>
                  <h4 className="text-xl mb-1">Monika Tu</h4>
                  <div className="text-sm text-[#656565] mb-4">Founder & Director</div>
                  <Link
                    href="tel:0409-898-888"
                    className="block text-[#d4af37] hover:text-[#e5c04b] transition-colors mb-2"
                  >
                    0409-898-888
                  </Link>
                  <Link
                    href="mailto:monika@blackdiamondz.co.au"
                    className="text-[#d4af37] hover:text-[#e5c04b] transition-colors"
                  >
                    monika@blackdiamondz.co.au
                  </Link>
                </div>

                {/* Jad Khatta */}
                <div>
                  <h4 className="text-xl mb-1">Jad Khatta</h4>
                  <div className="text-sm text-[#656565] mb-4">Director</div>
                  <Link
                    href="tel:0432-669-287"
                    className="block text-[#d4af37] hover:text-[#e5c04b] transition-colors mb-2"
                  >
                    0432-669-287
                  </Link>
                  <Link
                    href="mailto:jad@blackdiamondz.co.au"
                    className="text-[#d4af37] hover:text-[#e5c04b] transition-colors"
                  >
                    jad@blackdiamondz.co.au
                  </Link>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-6">
              <Link href="#" className="text-[#656565] hover:text-[#d4af37] transition-colors">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
              <Link href="#" className="text-[#656565] hover:text-[#d4af37] transition-colors">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </Link>
              <Link href="#" className="text-[#656565] hover:text-[#d4af37] transition-colors">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              <Link href="#" className="text-[#656565] hover:text-[#d4af37] transition-colors">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
