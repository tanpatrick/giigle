import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ViewMode = "list" | "map";

type HomeState = {
  setListMode: () => void;
  setMapMode: () => void;
  viewMode: ViewMode;
};

export const useHomeStore = create<HomeState>()(
  devtools((set) => ({
    setListMode: () => set(() => ({ viewMode: "list" })),
    setMapMode: () => set(() => ({ viewMode: "map" })),
    viewMode: "list",
  }))
);
