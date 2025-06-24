"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { Archivo, Taviraj } from "next/font/google"

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

export default function BuyMap({ propertyStatus = "Current" }) {
  const [mapType, setMapType] = useState("Map")
  const [property, setProperty] = useState([])
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

  useEffect(() => {
    const fetchProperty = async () => {
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
            "images.directus_files_id.id",
          ],
          filter: {
            is_off_market: { _eq: false },
            status: { _eq: propertyStatus },
          },
          limit: -1,
        })
        setProperty(data)
      } catch (error) {
        setError("Error fetching property: " + error.message)
      }
    }
    fetchProperty()
  }, [])

  useEffect(() => {
    if (!isLoaded || property.length === 0 || !mapRef.current) return

    const lats = property.map((p) => p.geo_lat).filter((lat) => lat != null)
    const lngs = property.map((p) => p.geo_lon).filter((lng) => lng != null)

    if (lats.length === 0 || lngs.length === 0) return

    const bounds = new window.google.maps.LatLngBounds()

    property.forEach((p) => {
      if (p.geo_lat != null && p.geo_lon != null) {
        bounds.extend({ lat: p.geo_lat, lng: p.geo_lon })
      }
    })

    mapRef.current.fitBounds(bounds)
  }, [isLoaded, property])

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
    <div className="relative bg-[#bd9574] z-[1004] flex flex-col rounded-md">
      <div className="flex-1 relative">
        <form
          onSubmit={handleGetDirections}
          className="flex flex-col gap-2 mb-3 bg-[#bd9574] md:flex-row md:items-center md:gap-3"
        >
          {/* Row 1: Autocomplete and Use My Location */}
          <div className="flex w-full items-center gap-2 md:gap-3">
            <div className="flex-1">
              <Autocomplete>
                <input
                  type="text"
                  placeholder="Enter your location"
                  value={originInput}
                  onChange={(e) => setOriginInput(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-[#bd9574] focus:outline-none"
                />
              </Autocomplete>
            </div>
            <button
              type="button"
              onClick={handleUseMyLocation}
              className="w-auto px-3 py-2 rounded bg-[#211f17] text-[#FBF4E4] hover:bg-[#3a2e1e]"
            >
              <svg
                fill="#FBF4E4"
                width="22px"
                height="22px"
                viewBox="0 0 0.66 0.66"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M0.084 0.357H0.028v-0.055h0.057A0.248 0.248 0 0 1 0.302 0.084V0.028h0.055v0.057A0.248 0.248 0 0 1 0.576 0.302H0.632v0.055h-0.057A0.248 0.248 0 0 1 0.357 0.576V0.632h-0.055v-0.057A0.248 0.248 0 0 1 0.084 0.357M0.33 0.138a0.193 0.193 0 1 0 0 0.385 0.193 0.193 0 0 0 0 -0.385m0 0.083a0.11 0.11 0 1 1 0 0.22 0.11 0.11 0 0 1 0 -0.22m0 0.055a0.055 0.055 0 1 0 0 0.11 0.055 0.055 0 0 0 0 -0.11"
                />
              </svg>
            </button>
          </div>

          {/* Row 2: Travel mode, submit, and show direction */}
          <div className="flex items-center gap-2 md:gap-3 w-full">
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
              className="w-auto px-3 py-2 rounded bg-[#211f17] text-[#FBF4E4] hover:bg-[#3a2e1e]"
            >
              <svg
                fill="#FBF4E4"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 3.515L3.515 12 12 20.485 20.485 12 12 3.515zm.707-2.122l9.9 9.9a1 1 0 0 1 0 1.414l-9.9 9.9a1 1 0 0 1-1.414 0l-9.9-9.9a1 1 0 0 1 0-1.414l9.9-9.9a1 1 0 0 1 1.414 0zM13 10V7.5l3.5 3.5-3.5 3.5V12h-3v3H8v-4a1 1 0 0 1 1-1h4z" />
                </g>
              </svg>
            </button>
          {directions && (
            <button
              type="button"
              onClick={() => setShowDirectionsPanel(!showDirectionsPanel)}
              className="w-full md:w-auto px-3 py-2 rounded bg-[#211f17] text-[#FBF4E4] hover:bg-[#3a2e1e]"
            >
              {showDirectionsPanel ? "Hide Directions" : "Show Directions"}
            </button>
          )}
          </div>
        </form>

        <div className="h-[70vh] min-h-[300px] max-h-[600px] md:h-[600px] w-full">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              onLoad={(map) => {
                mapRef.current = map
              }}
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
              {property.map((item) => (
                <Marker
                  key={item.id}
                  position={{ lat: item.geo_lat, lng: item.geo_lon }}
                  icon={{
                    url: "/gold-marker.png",
                    scaledSize: { width: 50, height: 50 },
                    anchor: { x: 25, y: 50 },
                  }}
                  onClick={() => {
                    setSelectedProperty(item)
                    setDirections(null)
                    setShowDirectionsPanel(false)
                  }}
                />
              ))}
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
              {directions && (
                <DirectionsRenderer
                  directions={directions}
                  options={{
                    suppressMarkers: false,
                    polylineOptions: {
                      strokeColor: "#FBF4E4",
                      strokeWeight: 5,
                    },
                  }}
                />
              )}
            </GoogleMap>
          ) : (
            <section className="flex justify-center items-center h-[800px] bg-[#211f17]">
              <Loading />
            </section>
          )}
        </div>
        {showDirectionsPanel && directions && (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 130,
              width: 320,
              maxHeight: 600,
              overflowY: "auto",
              background: "#23201b",
              color: "#FBF4E4",
              borderRadius: 8,
              padding: 16,
              zIndex: 10,
              boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
            }}
          >
            <h4 style={{ color: "#bd9574", marginBottom: 12 }}>Directions</h4>
            {directions.routes[0].legs[0].steps.map((step, idx) => (
              <div key={idx} style={{ marginBottom: 8 }}>
                <span dangerouslySetInnerHTML={{ __html: step.instructions }} />
                <div style={{ fontSize: 12, color: "#bd9574" }}>
                  {step.distance.text} ({step.duration.text})
                </div>
              </div>
            ))}
            <button
              onClick={() => setShowDirectionsPanel(false)}
              style={{
                marginTop: 12,
                padding: 8,
                borderRadius: 4,
                background: "#bd9574",
                color: "#211f17",
                border: "none",
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
