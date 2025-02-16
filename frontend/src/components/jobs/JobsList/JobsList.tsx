"use client";

import { useEffect } from "react";
import { Card, CardBody } from "@heroui/card";
import { Listbox, ListboxItem } from "@heroui/listbox";

import { MarkerIcon } from "@/components/common/icons/MarkerIcon";
import { useJobSelectionStore } from "@/stores/jobs/useJobSelectionStore";
import { useJobsStore } from "@/stores/jobs/useJobsStore";
import { useVisibleJobsStore } from "@/stores/jobs/useVisibleJobsStore";
import { Job } from "@/types/Jobs";

export function JobsList({ jobs }: { jobs: Job[] }) {
  const { setJobs } = useJobsStore();

  const { selectedJob, setSelectedJob } = useJobSelectionStore((state) => state);

  useEffect(() => {
    setJobs(jobs);
  }, [jobs, setJobs]);

  const { visibleJobs } = useVisibleJobsStore();
  const selectedKeys = selectedJob?.id ? [selectedJob.id] : [];

  return (
    <Card radius="none">
      <CardBody>
        <div className="overflow-y-auto" style={{ height: `calc(100vh - 5rem)` }}>
          <Listbox selectedKeys={selectedKeys} selectionBehavior="replace" selectionMode="single">
            {visibleJobs.map((job) => (
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
                startContent={<MarkerIcon />}
              >
                {job.title}
              </ListboxItem>
            ))}
          </Listbox>
        </div>
      </CardBody>
    </Card>
  );
}
