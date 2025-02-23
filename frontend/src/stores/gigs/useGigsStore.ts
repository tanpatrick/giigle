import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Gig } from "@/types/Gigs";

type GigStore = {
  gigs: Gig[];
  setGigs: (gigs: Gig[]) => void;
  setVisibleGigs: (gigs: Gig[]) => void;
  visibleGigs: Gig[];
};

export const useGigsStore = create<GigStore>()(
  devtools((set) => ({
    gigs: [],
    setGigs: (gigs) => set(() => ({ gigs, visibleGigs: gigs })),
    setVisibleGigs: (visibleGigs) => set(() => ({ visibleGigs })),
    visibleGigs: [],
  }))
);
