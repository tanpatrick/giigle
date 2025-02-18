import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Gig } from "@/types/Gigs";

type VisibleJobsState = {
  visibleGigs: Gig[];
  setVisibleGigs: (visibleGigs: Gig[]) => void;
};

export const useVisibleJobsStore = create<VisibleJobsState>()(
  devtools((set) => ({
    visibleGigs: [],
    setVisibleGigs: (visibleGigs) => set(() => ({ visibleGigs })),
  }))
);
