"use client"

import { useState, useEffect, useRef } from "react"
import { Archivo, Taviraj } from "next/font/google"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

import {
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  Autocomplete,
} from "@react-google-maps/api"
import Loading from "./loading"
import { getImageUrl, getItems } from "@/lib/api"
import { useMapLoader } from "@/lib/component/MapLoaderProvider"
import Select from "react-select"

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})
const taviraj = Taviraj({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#211f17",
    border: "none",
    boxShadow: "none",
    color: "#E2DBCC",
    height: "40px",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#211f17",
    border: "1px solid rgba(101, 101, 101, 0.3)",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#2c2a20" : "#211f17",
    color: "#E2DBCC",
    cursor: "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#E2DBCC",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#656565",
  }),
  input: (provided) => ({
    ...provided,
    color: "#E2DBCC",
  }),
  indicatorSeparator: (base) => ({
    display: "none",
  }),
}

const mapStyles = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [{ color: "#191714" }],
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [{ color: "#c9b18d" }],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#101010" }, { lightness: 13 }],
  },
  {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [{ color: "#23201b" }],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#3d2c1e" }, { lightness: 14 }, { weight: 1.4 }],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [{ color: "#23201b" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#23201b" }, { lightness: 5 }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [{ color: "#24231b" }, { lightness: 5 }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [{ color: "#bfa170" }, { lightness: -10 }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#bfa170" }, { lightness: -30 }, { weight: 0.2 }],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#28251c" }, { lightness: -10 }],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [{ color: "#23201b" }, { lightness: -10 }],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [{ color: "#23201b" }, { lightness: -10 }],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [{ color: "#252c33" }, { lightness: 10 }],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [{ color: "#252c33" }],
  },
  {
    featureType: "poi.business",
    stylers: [{ visibility: "simplified" }],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit.line",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit.station",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },
]

const travelModeOptions = [
  { value: "DRIVING", label: "Driving" },
  { value: "WALKING", label: "Walking" },
  { value: "BICYCLING", label: "Bicycling" },
  { value: "TRANSIT", label: "Transit" },
]

export default function PropertyMap({ onClose, property, type }) {
  const [mapType, setMapType] = useState("Map")
  const [otherProperty, setOtherProperty] = useState([])
  const [error, setError] = useState(null)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const mapRef = useRef(null)

  // Directions-related state
  const originAutocompleteRef = useRef(null)
  const [originInput, setOriginInput] = useState("")
  const [travelMode, setTravelMode] = useState("DRIVING")
  const [directions, setDirections] = useState(null)
  const [showDirectionsPanel, setShowDirectionsPanel] = useState(false)

  const { isLoaded } = useMapLoader()

  const handleMapTypeChange = (type) => {
    setMapType(type)
  }

  useEffect(() => {
    if (!property?.id) return
    const fetchOtherProperty = async () => {
      try {
        const data = await getItems("properties", {
          fields: [
            "id",
            "geo_lat",
            "geo_lon",
            "name",
            "address_street",
            "address_suburb",
            "address_state",
            "address_postcode",
            "images.directus_files_id.*",
          ],
          filter: {
            is_off_market: { _eq: false },
            status: { _eq: "Current" },
            id: { _neq: property.id },
          },
          limit: -1,
        })
        setOtherProperty(data)
      } catch (error) {
        setError("Error fetching property: " + error.message)
      }
    }
    fetchOtherProperty()
  }, [property?.id])

  // useEffect(() => {
  //   if (
  //     !searchMarker ||
  //     !property?.geo_lat ||
  //     !property?.geo_lon ||
  //     !window.google?.maps?.geometry
  //   )
  //     return
  //   const center = new window.google.maps.LatLng(
  //     property.geo_lat,
  //     property.geo_lon
  //   )
  //   const searched = new window.google.maps.LatLng(
  //     searchMarker.lat,
  //     searchMarker.lng
  //   )
  //   const meters = window.google.maps.geometry.spherical.computeDistanceBetween(
  //     center,
  //     searched
  //   )
  //   setDistance(meters)
  // }, [searchMarker, property])

  useEffect(() => {
    if (!selectedProperty || !mapRef.current) return
    // Pan to the marker
    mapRef.current.panTo({
      lat: selectedProperty.geo_lat,
      lng: selectedProperty.geo_lon,
    })

    mapRef.current.setZoom(16)
  }, [selectedProperty])

  useEffect(() => {
    if (!selectedProperty || !mapRef.current) return
    // Pan to the marker
    mapRef.current.panTo({
      lat: selectedProperty.geo_lat,
      lng: selectedProperty.geo_lon,
    })

    mapRef.current.setZoom(16)
  }, [selectedProperty])

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setOriginInput(
            `${position.coords.latitude},${position.coords.longitude}`
          )
        },
        () => alert("Unable to retrieve your location")
      )
    }
  }

  const handleGetDirections = async (e) => {
    e.preventDefault()
    if (!selectedProperty) {
      alert("Please select a property as your destination.")
      return
    }
    if (!originInput) {
      alert("Please enter your starting location or use your current location.")
      return
    }
    const directionsService = new window.google.maps.DirectionsService()
    directionsService.route(
      {
        origin: originInput,
        destination: {
          lat: selectedProperty.geo_lat,
          lng: selectedProperty.geo_lon,
        },
        travelMode: window.google.maps.TravelMode[travelMode],
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result)
          setShowDirectionsPanel(true)
        } else {
          alert("Directions request failed: " + status)
        }
      }
    )
  }

  useEffect(() => {
    setDirections(null)
  }, [originInput, selectedProperty])

  return (
    <div className="relative bg-[#211f17] z-[1001] flex flex-col">
      {/* Property Info - Updated with correct font sizes */}
      <div className="container mx-auto px-4 py-6">
        <div
          className={`${archivo.className} text-[#e2dbcc] text-[16px] leading-[150%] mb-4`}
        >
          <span>{type}</span>
        </div>

        <div className="flex justify-between items-start">
          <div>
            <h1
              className={`${taviraj.className} text-[#bd9574] text-[24px] font-light leading-[125%] tracking-[0px] mb-0`}
            >
              {property?.name || ""}
            </h1>
          </div>
          <div className="text-right">
            <p
              className={`${archivo.className} text-[#e2dbcc] font-[300] text-[16px] leading-[150%] tracking-[0px] mb-2`}
            >
              {property?.address_street + ", " + property?.address_suburb || ""}
            </p>
            <p
              className={`${archivo.className} text-[#e2dbcc] font-[300] text-[16px] leading-[150%] tracking-[0px]`}
            >
              {property?.address_state +
                ", " +
                property?.address_postcode.toString().padStart(4, "0") || ""}
            </p>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <form
          onSubmit={handleGetDirections}
          className="flex flex-col gap-2 py-3 bg-[#bd9574] md:flex-row md:items-center md:gap-3"
        >
          <div className="flex-1">
            {/* <Autocomplete
                      onLoad={(autocomplete) =>
                        (originAutocompleteRef.current = autocomplete)
                      }
                      onPlaceChanged={() => {
                        const place = originAutocompleteRef.current.getPlace()
                        if (place && place.formatted_address) {
                          setOriginInput(place.formatted_address)
                        } else if (place && place.name) {
                          setOriginInput(place.name)
                        }
                      }}
                    > */}
            <input
              type="text"
              placeholder="Enter your location"
              value={originInput}
              onChange={(e) => setOriginInput(e.target.value)}
              className="w-full px-3 py-2 rounded border border-[#bd9574] focus:outline-none"
            />
            {/* </Autocomplete> */}
          </div>
          <button
            type="button"
            onClick={handleUseMyLocation}
            className="w-full md:w-auto px-3 py-2 rounded bg-[#211f17] text-[#FBF4E4] hover:bg-[#3a2e1e]"
          >
            Use My Location
          </button>
          <Select
            value={travelModeOptions.find((opt) => opt.value === travelMode)}
            onChange={(option) => setTravelMode(option.value)}
            options={travelModeOptions}
            isSearchable={false}
            className="w-full md:w-[200px] h-10"
            styles={customStyles}
          />
          <button
            type="submit"
            className="w-full md:w-auto px-3 py-2 rounded bg-[#211f17] text-[#FBF4E4] hover:bg-[#3a2e1e]"
          >
            Get Directions
          </button>
        </form>

        <div className="h-[50vh] min-h-[300px] max-h-[500px] md:h-[500px] w-full">
          {isLoaded ? (
            <>
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={
                  property?.geo_lat && property?.geo_lon
                    ? { lat: property?.geo_lat, lng: property?.geo_lon }
                    : { lat: -33.8688, lng: 151.2093 }
                }
                zoom={18}
                mapTypeId={mapType === "Satellite" ? "satellite" : "roadmap"}
                options={{
                  disableDefaultUI: true,
                  zoomControl: true,
                  fullscreenControl: true,
                  streetViewControl: true,
                  mapTypeControl: true,
                  scaleControl: true,
                  styles: mapStyles,
                }}
              >
                {/* Custom Black Diamondz Pin Marker */}
                <Marker
                  position={{ lat: property.geo_lat, lng: property.geo_lon }}
                  icon={{
                    url: "/red-marker.png",
                    scaledSize: { width: 70, height: 70 },
                    anchor: { x: 40, y: 70 },
                  }}
                  onClick={() =>
                    setSelectedProperty({ ...property, isMain: true })
                  }
                />
                {otherProperty.map((item) => (
                  <Marker
                    key={item.id}
                    position={{ lat: item.geo_lat, lng: item.geo_lon }}
                    icon={{
                      url: "/white-marker.png",
                      scaledSize: { width: 50, height: 50 },
                      anchor: { x: 25, y: 50 },
                    }}
                    onClick={() => setSelectedProperty(item)}
                  />
                ))}
                {/* {searchMarker && <Marker position={searchMarker} />} */}
                {selectedProperty && (
                  <InfoWindow
                    position={{
                      lat: selectedProperty.geo_lat,
                      lng: selectedProperty.geo_lon,
                    }}
                    onCloseClick={() => setSelectedProperty(null)}
                  >
                    <div style={{ width: 220 }}>
                      {/* Image at the top */}
                      {selectedProperty.images?.length > 0 &&
                        selectedProperty.images[0]?.directus_files_id?.id && (
                          <img
                            src={getImageUrl(
                              selectedProperty.images[0].directus_files_id.id
                            )}
                            alt={selectedProperty.name}
                            style={{
                              width: "100%",
                              maxHeight: 160,
                              objectFit: "cover",
                              borderRadius: 8,
                              marginBottom: 8,
                            }}
                          />
                        )}
                      <div
                        style={{
                          fontWeight: "bold",
                          color: "#bd9574",
                          marginBottom: 4,
                        }}
                      >
                        {selectedProperty.name || "Property"}
                      </div>
                      <div
                        style={{ color: "#333", fontSize: 14, marginBottom: 6 }}
                      >
                        {selectedProperty.address_street
                          ? `${selectedProperty.address_street}, ${selectedProperty.address_suburb}`
                          : ""}
                        <br />
                        {selectedProperty.address_state
                          ? `${
                              selectedProperty.address_state
                            }, ${selectedProperty.address_postcode
                              ?.toString()
                              .padStart(4, "0")}`
                          : ""}
                      </div>
                      <a
                        href={`/property/${selectedProperty.id}`}
                        style={{
                          color: "#bd9574",
                          textDecoration: "underline",
                          fontWeight: 500,
                        }}
                      >
                        View Details
                      </a>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
              {/* {distance !== null && (
                <div className="mt-2 text-[#bd9574] font-semibold">
                  Distance to property: {(distance / 1000).toFixed(2)} km
                </div>
              )} */}
            </>
          ) : (
            <section className="flex justify-center items-center h-[800px] bg-[#211f17]">
              <Loading />
            </section>
          )}
        </div>
      </div>

      {/* Back Button - Moved below the map */}
      {/* <div className="py-6 flex justify-center bg-[#211f17]">
        <button
          onClick={onClose}
          className="flex items-center justify-center gap-2 px-8 py-3 border border-[#656565] text-[#bd9574] hover:bg-[#2c2920] transition-colors"
          id="go-back-button"
        >
          <ArrowLeft size={20} />
          <span className={`${archivo.className} font-light`}>Go Back</span>
        </button>
      </div> */}
    </div>
  )
}
