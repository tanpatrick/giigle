"use client";

import { useEffect } from "react";
import { Button, ButtonGroup } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Listbox, ListboxItem } from "@heroui/listbox";

import { MarkerIcon } from "@/components/common/icons/MarkerIcon";
import { useJobSelectionStore } from "@/stores/jobs/useJobSelectionStore";
import { useJobsStore } from "@/stores/jobs/useJobsStore";
import { useVisibleJobsStore } from "@/stores/jobs/useVisibleJobsStore";
import { useMapStore } from "@/stores/useMapStore";
import { Job } from "@/types/Jobs";

export function JobsList({ jobs }: { jobs: Job[] }) {
  const { setJobs } = useJobsStore();

  const { selectedJob, setSelectedJob } = useJobSelectionStore((state) => state);

  useEffect(() => {
    setJobs(jobs);
  }, [jobs, setJobs]);

  const { reset } = useMapStore();
  const { visibleJobs } = useVisibleJobsStore();

  const selectedKeys = selectedJob?.id ? [selectedJob.id] : [];

  return (
    <Card radius="none">
      <CardBody>
        <div className="overflow-y-auto" style={{ height: `calc(100vh - 5rem)` }}>
          <div>
            <ButtonGroup fullWidth>
              <Button>My Location</Button>
              <Button
                onPress={() => {
                  setSelectedJob(null);
                  reset();
                }}
              >
                Reset Map
              </Button>
            </ButtonGroup>
            <Divider className="my-5" />
          </div>
          <Listbox selectedKeys={selectedKeys} selectionBehavior="replace" selectionMode="single" variant="light">
            {visibleJobs.map((job) => {
              const isSelected = job.id === selectedJob?.id;
              return (
                <ListboxItem
                  className={isSelected ? "bg-gray-200 border-2 border-dashed border-gray-500 p-5" : ""}
                  description={
                    <div className={isSelected ? "text-black" : ""}>
                      <div>{job.description}</div>
                      <div className="text-right mt-3">{job.location.address}</div>
                    </div>
                  }
                  key={job.id}
                  onPress={() => {
                    setSelectedJob(job);
                  }}
                  startContent={<MarkerIcon />}
                >
                  <span className={isSelected ? "font-bold text-black" : ""}>{job.title}</span>
                </ListboxItem>
              );
            })}
          </Listbox>
        </div>
      </CardBody>
    </Card>
  );
}
