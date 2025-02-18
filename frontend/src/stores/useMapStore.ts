import debounce from "lodash/debounce";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Coordinates } from "@/types/Coordinate";

type MapState = {
  coordinates: Coordinates;
  reset: () => void;
  zoom: number;
  zoomIn?: boolean;
  setCoordinates: (coordinates: Coordinates) => void;
  setZoom: (zoom: number) => void;
  setZoomIn: (zoomIn: boolean) => void;
};

export const DEFAULT_COORDINATES: Coordinates = {
  latitude: -40.5476913,
  longitude: 174.3049863,
};

export const useMapStore = create<MapState>()(
  devtools((set) => ({
    coordinates: DEFAULT_COORDINATES,
    reset: () => set(() => ({ coordinates: DEFAULT_COORDINATES, zoom: 6 })),
    setCoordinates: debounce((coordinates) => set(() => ({ coordinates })), 500),
    setZoom: debounce((zoom) => set(() => ({ zoom })), 500),
    setZoomIn: (zoomIn) => set(() => ({ zoomIn })),
    zoom: 6,
  }))
);
