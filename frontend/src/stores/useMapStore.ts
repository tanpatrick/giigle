import debounce from "lodash/debounce";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { Coordinates } from "@/types/Coordinate";

type MapState = {
  coordinates: Coordinates;
  reset: () => void;
  zoom: number;
  setCoordinates: (coordinates: Coordinates) => void;
  setZoom: (zoom: number) => void;
};

const defaultCoordinates: Coordinates = {
  latitude: -40.5476913,
  longitude: 174.3049863,
};

export const useMapStore = create<MapState>()(
  devtools(
    persist(
      (set) => ({
        coordinates: defaultCoordinates,
        reset: () => set(() => ({ coordinates: defaultCoordinates, zoom: 6 })),
        setCoordinates: debounce((coordinates) => set(() => ({ coordinates })), 500),
        setZoom: debounce((zoom) => set(() => ({ zoom })), 500),
        zoom: 6,
      }),
      {
        name: "map-storage",
      }
    )
  )
);
