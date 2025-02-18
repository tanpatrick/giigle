import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Gig } from "@/types/Gigs";

type JobsStore = {
  gigs: Gig[];
  setGigs: (gigs: Gig[]) => void;
};

export const useGigsStore = create<JobsStore>()(
  devtools((set) => ({
    gigs: [],
    setGigs: (gigs) => set(() => ({ gigs })),
  }))
);
