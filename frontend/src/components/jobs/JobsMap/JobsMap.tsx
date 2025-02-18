"use client";

import { Map } from "@/components/common/Map";
import { useJobSelectionStore } from "@/stores/jobs/useJobSelectionStore";
import { useJobsStore } from "@/stores/jobs/useJobsStore";
import { useVisibleJobsStore } from "@/stores/jobs/useVisibleJobsStore";

import { JobMarkers } from "./JobsMarker";

export function JobsMap() {
  const { selectedJob, setSelectedJob } = useJobSelectionStore((state) => state);
  const { jobs } = useJobsStore((state) => state);
  const { setVisibleJobs } = useVisibleJobsStore();

  return (
    <Map
      onBoundsChanged={({ map }) => {
        const filteredJobs = jobs
          .filter((job) => {
            const { latitude, longitude } = job.location.coordinates;
            const position = new google.maps.LatLng(latitude, longitude);
            return map.getBounds()?.contains(position);
          })
          .sort(({ location: a }, { location: b }) => b.coordinates.latitude - a.coordinates.latitude);

        setVisibleJobs(filteredJobs);

        if (filteredJobs.find((s) => s.id !== selectedJob?.id) === undefined) {
          setSelectedJob(null);
        }
      }}
    >
      <JobMarkers />
    </Map>
  );
}
