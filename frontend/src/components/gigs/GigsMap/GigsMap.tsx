"use client";

import { Map } from "@/components/common/Map";
import { useGigSelectionStore } from "@/stores/gigs/useGigSelectionStore";
import { useGigsStore } from "@/stores/gigs/useGigsStore";

import { GigsMarkers } from "./GigsMarker";

export function GigsMap() {
  const selectedGig = useGigSelectionStore((state) => state.selectedGig);

  const setSelectedGig = useGigSelectionStore((state) => state.setSelectedGig);
  const gigs = useGigsStore((state) => state.gigs);

  const { setVisibleGigs } = useGigsStore();

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

        setVisibleGigs(filteredJobs);

        if (filteredJobs.find(({ id }) => id !== selectedGig?.id) === undefined) {
          setSelectedGig(null);
        }
      }}
    >
      <GigsMarkers />
    </Map>
  );
}
