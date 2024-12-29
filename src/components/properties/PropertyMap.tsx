"use client";
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { icon } from "leaflet";
const iconUrl =
  "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";
const markerIcon = icon({
  iconUrl: iconUrl,
  iconSize: [20, 30],
});

import { findCountryByName } from "@/Utils/countries";
import { useEffect, useRef } from "react";

export default function PropertyMap({ countryName }: { countryName: string }) {
  const defaultLocation = [51.505, -0.09] as [number, number];
  const locationName = findCountryByName(countryName)?.location as
    | [number, number]
    | undefined;
  //   console.log(countryName);
  //   console.log(locationName);

  const mapRef = useRef(null);

  useEffect(() => {
    return () => {
      const mapContainer = L.DomUtil.get("map") as
        | (HTMLElement & { _leaflet_id: number | null })
        | null;
      if (mapContainer) {
        mapContainer._leaflet_id = null;
      }
    };
  }, []);

  return (
    <div className="mt-4">
      <div className="mb-4 ">
        <h1 className=" font-bold text-xl my-2">Where you will be staying</h1>
        <p>{countryName}</p>
      </div>
      <MapContainer
        scrollWheelZoom={false}
        zoomControl={false}
        className="h-[50vh] rounded-lg relative z-0"
        center={locationName || defaultLocation}
        zoom={7}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        <Marker
          position={locationName || defaultLocation}
          icon={markerIcon}
        ></Marker>
      </MapContainer>
    </div>
  );
}
