/**
 * Featured Properties Component
 *
 * Highlights selected properties in a responsive grid.
 * Each property card includes image, details, and key features.
 *
 * @component
 */

// Sample featured property data
// In production, this would be fetched from an API or CMS
import { MapPin, Bed, Bath, Square } from "lucide-react"

const properties = [
  {
    id: 1,
    title: "Luxurious Waterfront Mansion",
    location: "Sydney, NSW",
    price: "$12,500,000",
    bedrooms: 5,
    bathrooms: 4,
    area: 750,
    image: "/images/sydney",
  },
  {
    id: 2,
    title: "Modern Penthouse with City Views",
    location: "Melbourne, VIC",
    price: "$8,900,000",
    bedrooms: 3,
    bathrooms: 3,
    area: 350,
    image: "/images/sydney",
  },
  {
    id: 3,
    title: "Beachfront Villa",
    location: "Gold Coast, QLD",
    price: "$6,750,000",
    bedrooms: 4,
    bathrooms: 3,
    area: 450,
    image: "/images/sydney",
  },
]

export default function FeaturedProperties() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={property.image || "/placeholder-image.jpg"}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                <p className="text-gray-600 mb-4 flex items-center">
                  <MapPin size={16} className="mr-1" /> {property.location}
                </p>
                <p className="text-2xl font-bold text-blue-600 mb-4">{property.price}</p>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center">
                    <Bed size={16} className="mr-1" /> {property.bedrooms} Beds
                  </span>
                  <span className="flex items-center">
                    <Bath size={16} className="mr-1" /> {property.bathrooms} Baths
                  </span>
                  <span className="flex items-center">
                    <Square size={16} className="mr-1" /> {property.area} m²
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
