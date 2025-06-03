"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Archivo, Taviraj } from "next/font/google";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

import {
	GoogleMap,
	Marker,
	InfoWindow,
	useJsApiLoader,
} from "@react-google-maps/api";
import Loading from "./loading";
import { getImageUrl, getItems } from "@/lib/api";

const archivo = Archivo({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});
const taviraj = Taviraj({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

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
];

export default function SoldMap() {
  const [mapType, setMapType] = useState("Map");
	const [property, setProperty] = useState([]);
	const [error, setError] = useState(null);
	const [selectedProperty, setSelectedProperty] = useState(null);
  const mapRef = useRef(null);
	// NOTE: To use Google Maps, you must set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env file.
	// Example: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
	// The @react-google-maps/api will automatically use this key if you use useJsApiLoader.

	const { isLoaded } = useJsApiLoader({
		id: "google-maps-script",
		googleMapsApiKey: "AIzaSyBQ7mtgk24xxFbuz7eS2KE93QRu3JzDLr0",
	});

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
						status: { _eq: "Sold" },
					},
					limit: -1,
				});
				setProperty(data);
			} catch (error) {
				setError("Error fetching property: " + error.message);
			}
		};
		fetchProperty();
	}, []);

  useEffect(() => {
		if (!isLoaded || property.length === 0 || !mapRef.current) return;

		const lats = property.map((p) => p.geo_lat).filter((lat) => lat != null);
		const lngs = property.map((p) => p.geo_lon).filter((lng) => lng != null);

		if (lats.length === 0 || lngs.length === 0) return;

		const bounds = new window.google.maps.LatLngBounds();

		property.forEach((p) => {
			if (p.geo_lat != null && p.geo_lon != null) {
				bounds.extend({ lat: p.geo_lat, lng: p.geo_lon });
			}
		});

		mapRef.current.fitBounds(bounds);
	}, [isLoaded, property]);

	return (
		<div className="relative bg-[#211f17] z-50 flex flex-col rounded-md">
			<div className="flex-1 relative">
				<div className="h-[500px] w-full">
					{isLoaded ? (
						<GoogleMap
							mapContainerStyle={{ width: "100%", height: "100%" }}
							onLoad={(map) => {
								mapRef.current = map;
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
										url: "/map-pointer-invert.png",
										scaledSize: { width: 50, height: 50 },
										anchor: { x: 25, y: 50 },
									}}
									onClick={() => setSelectedProperty(item)}
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
						</GoogleMap>
					) : (
						<section className="flex justify-center items-center h-[800px] bg-[#211f17]">
							<Loading />
						</section>
					)}
				</div>
			</div>
		</div>
	);
}
