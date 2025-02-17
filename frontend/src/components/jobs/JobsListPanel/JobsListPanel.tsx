"use client";

import { useEffect } from "react";
import { Button, ButtonGroup } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";

import { useJobSelectionStore } from "@/stores/jobs/useJobSelectionStore";
import { useJobsStore } from "@/stores/jobs/useJobsStore";
import { useMapStore } from "@/stores/useMapStore";
import { Job } from "@/types/Jobs";

import { JobsList } from "../JobsList/JobsList";

export function JobsListPanel({ jobs }: { jobs: Job[] }) {
  const { setJobs } = useJobsStore();
  const { setSelectedJob } = useJobSelectionStore((state) => state);
  const { reset } = useMapStore();

  useEffect(() => {
    setJobs(jobs);
  }, [jobs, setJobs]);

  return (
    <Card radius="none">
      <CardBody>
        <div className="overflow-y-auto" style={{ height: `calc(100vh - 5rem)` }}>
          <ButtonGroup className="p-2" fullWidth variant="faded">
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
          <JobsList />
        </div>
      </CardBody>
    </Card>
  );
}
