import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Gig } from "@/types/Gigs";

type GigSelectionState = {
  selectedGig: Gig | null;
  setSelectedGig: (job: Gig | null) => void;
};

export const useGigSelectionStore = create<GigSelectionState>()(
  devtools((set) => ({
    selectedGig: null,
    setSelectedGig: (selectedGig) => set(() => ({ selectedGig })),
  }))
);
