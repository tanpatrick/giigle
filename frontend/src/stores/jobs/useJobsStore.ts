import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { Job } from "@/types/Jobs";

type JobsStore = {
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
};

export const useJobsStore = create<JobsStore>()(
  devtools(
    persist(
      (set) => ({
        jobs: [],
        setJobs: (jobs) => set(() => ({ jobs })),
      }),
      {
        name: "jobs-storage",
      }
    )
  )
);
