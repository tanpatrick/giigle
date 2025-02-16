import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { Job } from "@/types/Jobs";

type JobSelectionState = {
  job: Job | null;
  selectedJob: (job: Job) => void;
};

export const useJobSelectionStore = create<JobSelectionState>()(
  devtools(
    persist(
      (set) => ({
        job: null,
        selectedJob: (job) => set(() => ({ job: job })),
      }),
      {
        name: "job-storage",
      }
    )
  )
);
