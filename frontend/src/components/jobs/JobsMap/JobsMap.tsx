"use client";

import { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";

import { Map } from "@/components/common/Map";
import { useJobSelectionStore } from "@/stores/jobs/useJobSelectionStore";
import { useJobsStore } from "@/stores/jobs/useJobsStore";
import { useVisibleJobsStore } from "@/stores/jobs/useVisibleJobsStore";
import { useMapStore } from "@/stores/useMapStore";

import { JobMarkers } from "./JobsMarker";

export function JobsMap() {
  const { selectedJob, setSelectedJob } = useJobSelectionStore((state) => state);

  const { jobs } = useJobsStore((state) => state);
  const { zoomIn } = useMapStore();
  const { setVisibleJobs } = useVisibleJobsStore();

  const mapRef = useMap();

  useEffect(() => {
    const location = selectedJob?.location;

    if (mapRef && zoomIn && location) {
      mapRef.setZoom(20);
      mapRef.panTo({
        lat: location.coordinates.latitude,
        lng: location.coordinates.longitude,
      });
    }
  }, [mapRef, selectedJob, zoomIn]);

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
