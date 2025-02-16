import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { Job } from "@/types/Jobs";

type VisibleJobsState = {
  visibleJobs: Job[];
  setVisibleJobs: (visibleJobs: Job[]) => void;
};

export const useVisibleJobsStore = create<VisibleJobsState>()(
  devtools(
    persist(
      (set) => ({
        visibleJobs: [],
        setVisibleJobs: (visibleJobs) => set(() => ({ visibleJobs })),
      }),
      {
        name: "visible-jobs-storage",
      }
    )
  )
);
