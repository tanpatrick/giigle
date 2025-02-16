"use client";
import { useEffect, useState } from "react";
import { Map as GoggleMap } from "@vis.gl/react-google-maps";

import { Coordinates } from "@/types/Coordinate";

const mapStyles = [
  {
    featureType: "landscape",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

export function Map({ children }: { children?: React.ReactNode }) {
  const [initCoordinates, setInitCoordinates] = useState<Coordinates>({
    latitude: -36.8678925,
    longitude: 174.5918893,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setInitCoordinates({ latitude, longitude });
      });
    }
  }, [setInitCoordinates]);

  return (
    <GoggleMap
      defaultCenter={{
        lat: initCoordinates?.latitude || 0,
        lng: initCoordinates?.longitude || 0,
      }}
      defaultZoom={11}
      disableDefaultUI={true}
      gestureHandling="greedy"
      // onTilesLoaded={() => setIsTilesLoaded(true)}
      // onZoomChanged={({ map }) => setZoom(map.getZoom())}
      className="h-[calc(100vh-4rem)]"
      styles={mapStyles}
      reuseMaps
    >
      {children}
    </GoggleMap>
  );
}
