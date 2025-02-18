"use client";

import { PropsWithChildren } from "react";
import { Map as GoggleMap } from "@vis.gl/react-google-maps";

import { DEFAULT_COORDINATES } from "@/stores/useMapStore";

type MapProps = {
  onBoundsChanged?: (args: { map: google.maps.Map }) => void;
  onZoomChanged?: (args: { map: google.maps.Map }) => void;
};

export const DEFAULT_ZOOM = 6;

export function Map({ children, onBoundsChanged, onZoomChanged }: PropsWithChildren<MapProps>) {
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
      onZoomChanged={({ map }) => onZoomChanged?.({ map })}
      reuseMaps
      style={{
        height: `calc(100vh - 4rem)`,
      }}
    >
      {children}
    </GoggleMap>
  );
}
