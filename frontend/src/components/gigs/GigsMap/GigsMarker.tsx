import { Marker } from "@/components/common/Map";
import { sendGAEvent } from "@/components/ga/sendGAEvent";
import { useGigSelectionStore } from "@/stores/gigs/useGigSelectionStore";
import { useGigsStore } from "@/stores/gigs/useGigsStore";

export function GigsMarkers() {
  const { selectedGig: selectedJob, setSelectedGig: setSelectedJob } = useGigSelectionStore();
  const { visibleGigs } = useGigsStore();

  return visibleGigs.map((gig) => (
    <Marker
      isSelected={selectedJob?.id === gig.id}
      key={gig.id}
      location={gig.location.coordinates}
      onClick={() => {
        sendGAEvent({ event: "job_selected_via_map", value: gig });
        setSelectedJob(gig);
      }}
    />
  ));
}
