"use client";

import { useEffect } from "react";
import { Card, CardBody } from "@heroui/card";
import { Listbox, ListboxItem } from "@heroui/listbox";

import { useJobSelectionStore } from "@/stores/jobs/useJobSelectionStore";
import { useJobsStore } from "@/stores/jobs/useJobsStore";
import { useVisibleJobsStore } from "@/stores/jobs/useVisibleJobsStore";
import { Job } from "@/types/Jobs";

export function JobsList({ jobs }: { jobs: Job[] }) {
  const { setJobs } = useJobsStore();

  const setSelectedJob = useJobSelectionStore((state) => state.selectedJob);

  useEffect(() => {
    setJobs(jobs);
  }, [jobs, setJobs]);

  const { visibleJobs } = useVisibleJobsStore();

  return (
    <Card radius="none">
      <CardBody>
        <div className="overflow-y-auto" style={{ height: `calc(100vh - 5rem)` }}>
          <Listbox items={visibleJobs}>
            {(job) => (
              <ListboxItem
                description={
                  <div>
                    <div>{job.description}</div>
                    <div className="text-right">{job.location.address}</div>
                  </div>
                }
                key={job.id}
                onPress={() => {
                  setSelectedJob(job);
                }}
              >
                {job.title}
              </ListboxItem>
            )}
          </Listbox>
        </div>
      </CardBody>
    </Card>
  );
}
