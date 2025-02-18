"use client";

import { PropsWithChildren, useEffect } from "react";
import { Map as GoggleMap, useMap } from "@vis.gl/react-google-maps";

import { DEFAULT_COORDINATES, DEFAULT_ZOOM, useMapStore } from "@/stores/useMapStore";

import { MapControl } from "./MapControl";

type MapProps = {
  onBoundsChanged?: (args: { map: google.maps.Map }) => void;
  onZoomChanged?: (args: { map: google.maps.Map; zoom: number }) => void;
};

export function Map({ children, onBoundsChanged, onZoomChanged }: PropsWithChildren<MapProps>) {
  const { coordinates, setZoom, zoom } = useMapStore();

  const map = useMap();

  useEffect(() => {
    if (map && map.getZoom() !== zoom) {
      map.setZoom(zoom);
    }
  }, [coordinates, map, zoom]);

  useEffect(() => {
    map?.setCenter({
      lat: coordinates.latitude,
      lng: coordinates.longitude,
    });
  }, [map, coordinates]);

  return (
    <GoggleMap
      defaultCenter={{
        lat: DEFAULT_COORDINATES.latitude,
        lng: DEFAULT_COORDINATES.longitude,
      }}
      defaultZoom={DEFAULT_ZOOM}
      disableDefaultUI={true}
      gestureHandling="greedy"
      mapId="8d324fafd702673d"
      onBoundsChanged={({ map }) => onBoundsChanged?.({ map })}
      onZoomChanged={({ map }) => {
        const zoom = map.getZoom() ?? DEFAULT_ZOOM;
        onZoomChanged?.({ map, zoom });
        setZoom(zoom);
      }}
      reuseMaps
      style={{
        height: `calc(100vh - 4rem)`,
      }}
    >
      {children}
      <MapControl />
    </GoggleMap>
  );
}
