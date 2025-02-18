import { Marker } from "@/components/common/Map";
import { sendGAEvent } from "@/components/ga/sendGAEvent";
import { useGigSelectionStore } from "@/stores/gigs/useGigSelectionStore";
import { useVisibleJobsStore } from "@/stores/gigs/useVisibleGigsStore";

export function GigsMarkers() {
  const { selectedGig: selectedJob, setSelectedGig: setSelectedJob } = useGigSelectionStore();
  const { visibleGigs: visibleJobs } = useVisibleJobsStore();

  return visibleJobs.map((job) => (
    <Marker
      isSelected={selectedJob?.id === job.id}
      key={job.id}
      location={job.location.coordinates}
      onClick={() => {
        sendGAEvent({ event: "job_selected_via_map", value: job });
        setSelectedJob(job);
      }}
    />
  ));
}
