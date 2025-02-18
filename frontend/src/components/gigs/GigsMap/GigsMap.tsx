"use client";

import { Map } from "@/components/common/Map";
import { useGigSelectionStore } from "@/stores/gigs/useGigSelectionStore";
import { useGigsStore } from "@/stores/gigs/useGigsStore";
import { useVisibleJobsStore } from "@/stores/gigs/useVisibleGigsStore";

import { GigsMarkers } from "./GigsMarker";

export function GigsMap() {
  const { selectedGig, setSelectedGig } = useGigSelectionStore((state) => state);
  const { gigs } = useGigsStore((state) => state);
  const { setVisibleGigs: setVisibleJobs } = useVisibleJobsStore();

  return (
    <Map
      onBoundsChanged={({ map }) => {
        const filteredJobs = gigs
          .filter(({ location }) => {
            const { latitude, longitude } = location.coordinates;
            const position = new google.maps.LatLng(latitude, longitude);
            return map.getBounds()?.contains(position);
          })
          .sort(({ location: a }, { location: b }) => b.coordinates.latitude - a.coordinates.latitude);

        setVisibleJobs(filteredJobs);

        if (filteredJobs.find((s) => s.id !== selectedGig?.id) === undefined) {
          setSelectedGig(null);
        }
      }}
    >
      <GigsMarkers />
    </Map>
  );
}
