"use client";
import { useJsApiLoader } from "@react-google-maps/api";
import { createContext, useContext } from "react";

const MapLoaderContext = createContext();

export function MapLoaderProvider({ children }) {
  const loaderOptions = {
    id: "google-maps-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    // libraries: ["places", "geometry"],
  };
  const { isLoaded } = useJsApiLoader(loaderOptions);

  return (
    <MapLoaderContext.Provider value={{ isLoaded }}>
      {children}
    </MapLoaderContext.Provider>
  );
}

export function useMapLoader() {
  return useContext(MapLoaderContext);
}