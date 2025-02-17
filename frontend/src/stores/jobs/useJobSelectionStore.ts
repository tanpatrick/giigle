import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { Job } from "@/types/Jobs";

type JobSelectionState = {
  selectedJob: Job | null;
  setSelectedJob: (job: Job | null) => void;
};

export const useJobSelectionStore = create<JobSelectionState>()(
  devtools(
    persist(
      (set) => ({
        selectedJob: null,
        setSelectedJob: (selectedJob) => set(() => ({ selectedJob })),
      }),
      {
        name: "job-selection-storage",
      }
    )
  )
);
