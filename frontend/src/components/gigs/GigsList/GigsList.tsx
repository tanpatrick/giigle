"use client";

import { BiMap } from "react-icons/bi";
import { Chip } from "@heroui/chip";
import { Listbox, ListboxItem } from "@heroui/listbox";

import { sendGAEvent } from "@/components/ga/sendGAEvent";
import { useGigSelectionStore } from "@/stores/gigs/useGigSelectionStore";
import { useVisibleJobsStore } from "@/stores/gigs/useVisibleGigsStore";

import { GigTitle } from "./GigTitle";

export function GigsList() {
  const { selectedGig: selectedJob, setSelectedGig: setSelectedJob } = useGigSelectionStore((state) => state);
  const { visibleGigs: visibleJobs } = useVisibleJobsStore();

  const selectedKeys = selectedJob?.id ? [selectedJob.id] : [];

  return (
    <Listbox
      aria-label="Gigs list"
      selectedKeys={selectedKeys}
      selectionBehavior="replace"
      selectionMode="none"
      variant="light"
    >
      {visibleJobs.map((job) => {
        const isSelected = job.id === selectedJob?.id;
        return (
          <ListboxItem
            aria-label={job.title}
            className={isSelected ? "border-b-1 bg-gray-200 border-2 border-dashed border-gray-500 my-5 p-5" : ""}
            description={
              <div className={`pt-1 ${isSelected ? "text-black" : ""}`}>
                <div>{job.description}</div>
                <div className="text-right mt-3">
                  <Chip color={isSelected ? "primary" : "default"} size="sm" startContent={<BiMap />} variant="shadow">
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
            }}
          >
            <GigTitle isSelected={isSelected} title={job.title} />
          </ListboxItem>
        );
      })}
    </Listbox>
  );
}
