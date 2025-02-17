"use client";

import { useEffect } from "react";
import { sendGTMEvent } from "@next/third-parties/google";
import { Map as GoggleMap, useMap } from "@vis.gl/react-google-maps";

import { useJobSelectionStore } from "@/stores/jobs/useJobSelectionStore";
import { useJobsStore } from "@/stores/jobs/useJobsStore";
import { useVisibleJobsStore } from "@/stores/jobs/useVisibleJobsStore";
import { useMapStore } from "@/stores/useMapStore";

import { MapMarker } from "./MapMarker";

const mapStyles = [
  {
    featureType: "landscape",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

export function Map({ children }: { children?: React.ReactNode }) {
  const mapRef = useMap();

  const { selectedJob, setSelectedJob } = useJobSelectionStore((state) => state);
  const { coordinates, setCoordinates, setZoom, zoom } = useMapStore();

  useEffect(() => {
    const currentCenter = mapRef?.getCenter();

    if (
      coordinates.latitude &&
      coordinates.longitude &&
      (currentCenter?.lat() !== coordinates.latitude || currentCenter?.lng()) !== coordinates.longitude
    ) {
      mapRef?.setZoom(zoom);
      mapRef?.panTo({
        lat: coordinates.latitude,
        lng: coordinates.longitude,
      });
    }
  }, [coordinates, mapRef, zoom]);

  const { jobs } = useJobsStore((state) => state);
  const { visibleJobs, setVisibleJobs } = useVisibleJobsStore();

  return (
    <GoggleMap
      defaultCenter={{
        lat: coordinates.latitude,
        lng: coordinates.longitude,
      }}
      defaultZoom={6}
      disableDefaultUI={true}
      gestureHandling="greedy"
      mapId="8d324fafd702673d"
      onBoundsChanged={(bounds) => {
        const filteredJobs = jobs.filter((job) => {
          const { latitude, longitude } = job.location.coordinates;
          const position = new google.maps.LatLng(latitude, longitude);
          return bounds.map.getBounds()?.contains(position);
        });

        setVisibleJobs(filteredJobs);

        if (filteredJobs.find((s) => s.id !== selectedJob?.id) === undefined) {
          setSelectedJob(null);
        }
      }}
      onCenterChanged={({ map }) => {
        const center = map.getCenter();
        if (center) {
          setCoordinates({
            latitude: center.lat(),
            longitude: center.lng(),
          });
        }
      }}
      onZoomChanged={({ map }) => {
        const zoom = map.getZoom();
        if (zoom) {
          setZoom(zoom);
        }
      }}
      reuseMaps
      styles={mapStyles}
      style={{ height: `calc(100vh - 4rem)` }}
    >
      {children}
      {visibleJobs.map((job) => (
        <MapMarker
          isSelected={selectedJob?.id === job.id}
          key={job.id}
          location={job.location.coordinates}
          onClick={() => {
            sendGTMEvent({ event: "job_selected_via_map", value: job });
            setSelectedJob(job);
          }}
        />
      ))}
    </GoggleMap>
  );
}
