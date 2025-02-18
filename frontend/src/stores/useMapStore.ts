import debounce from "lodash/debounce";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Coordinates } from "@/types/Coordinate";

type MapState = {
  coordinates: Coordinates;
  reset: () => void;
  setCoordinates: (coordinates: Coordinates) => void;
  setZoom: (zoom: number) => void;
  zoom: number;
};

export const DEFAULT_COORDINATES: Coordinates = {
  latitude: -40.5476913,
  longitude: 174.3049863,
};

export const DEFAULT_ZOOM = 6;
export const DEFAULT_MAX_ZOOM = 20;

export const useMapStore = create<MapState>()(
  devtools((set) => ({
    coordinates: DEFAULT_COORDINATES,
    reset: () => set(() => ({ coordinates: DEFAULT_COORDINATES, zoom: DEFAULT_ZOOM })),
    setCoordinates: debounce((coordinates) => set(() => ({ coordinates })), 500),
    setZoom: debounce((zoom) => set(() => ({ zoom })), 500),
    zoom: 6,
  }))
);
