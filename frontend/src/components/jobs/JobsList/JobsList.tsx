"use client";

import { BiMap } from "react-icons/bi";
import { Chip } from "@heroui/chip";
import { Listbox, ListboxItem } from "@heroui/listbox";

import { MarkerIcon } from "@/components/common/icons/MarkerIcon";
import { sendGAEvent } from "@/components/ga/sendGAEvent";
import { useJobSelectionStore } from "@/stores/jobs/useJobSelectionStore";
import { useVisibleJobsStore } from "@/stores/jobs/useVisibleJobsStore";
import { useMapStore } from "@/stores/useMapStore";

import { JobTitle } from "./JobTitle";

export function JobsList() {
  const { setZoomIn } = useMapStore();
  const { selectedJob, setSelectedJob } = useJobSelectionStore((state) => state);
  const { visibleJobs } = useVisibleJobsStore();

  const selectedKeys = selectedJob?.id ? [selectedJob.id] : [];

  return (
    <Listbox
      aria-label="Jobs list"
      selectedKeys={selectedKeys}
      selectionBehavior="replace"
      selectionMode="single"
      variant="light"
    >
      {visibleJobs.map((job) => {
        const isSelected = job.id === selectedJob?.id;
        return (
          <ListboxItem
            aria-label={job.title}
            className={isSelected ? "border-b-1 bg-gray-200 border-2 border-dashed border-gray-500 p-5" : ""}
            description={
              <div className={`pt-1 ${isSelected ? "text-black" : ""}`}>
                <div>{job.description}</div>
                <div className="text-right mt-3">
                  <Chip size="sm" startContent={<BiMap />} variant="faded">
                    {job.location.address}
                  </Chip>
                </div>
              </div>
            }
            key={job.id}
            onPress={() => {
              sendGAEvent({ event: "job_selected_via_list", value: job });
              setSelectedJob(job);
            }}
            onDoubleClick={() => {
              setSelectedJob(job);
              setZoomIn(true);
            }}
            startContent={<MarkerIcon />}
          >
            <JobTitle isSelected={isSelected} title={job.title} />
          </ListboxItem>
        );
      })}
    </Listbox>
  );
}
