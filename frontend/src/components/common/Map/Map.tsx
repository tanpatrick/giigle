"use client";

import { useEffect, useState } from "react";
import { Map as GoggleMap, useMap } from "@vis.gl/react-google-maps";

import { useJobSelectionStore } from "@/stores/jobs/useJobSelectionStore";
import { useJobsStore } from "@/stores/jobs/useJobsStore";
import { useVisibleJobsStore } from "@/stores/jobs/useVisibleJobsStore";
import { Coordinates } from "@/types/Coordinate";

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
  const [initCoordinates, setInitCoordinates] = useState<Coordinates>({
    latitude: -36.8678925,
    longitude: 174.5918893,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setInitCoordinates({ latitude, longitude });
      });
    }
  }, [setInitCoordinates]);

  const mapRef = useMap();
  const { selectedJob, setSelectedJob } = useJobSelectionStore((state) => state);

  useEffect(() => {
    const coordinate = selectedJob?.location.coordinates;
    const currentCenter = mapRef?.getCenter();

    if (!coordinate) {
      return;
    }

    if (
      coordinate.latitude &&
      coordinate.longitude &&
      (currentCenter?.lat() !== coordinate.latitude || currentCenter?.lng()) !== coordinate.longitude
    ) {
      // mapRef?.setZoom(15);
      mapRef?.panTo({
        lat: coordinate.latitude,
        lng: coordinate.longitude,
      });
    }
  }, [mapRef, selectedJob]);

  const { jobs } = useJobsStore((state) => state);
  const { visibleJobs, setVisibleJobs } = useVisibleJobsStore();

  return (
    <GoggleMap
      // className="w-full"
      defaultCenter={{
        lat: initCoordinates?.latitude || 0,
        lng: initCoordinates?.longitude || 0,
      }}
      defaultZoom={11}
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
            setSelectedJob(job);
          }}
        />
      ))}
    </GoggleMap>
  );
}
