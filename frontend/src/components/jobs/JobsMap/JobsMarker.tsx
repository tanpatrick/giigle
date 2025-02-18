import { Marker } from "@/components/common/Map";
import { sendGAEvent } from "@/components/ga/sendGAEvent";
import { useJobSelectionStore } from "@/stores/jobs/useJobSelectionStore";
import { useVisibleJobsStore } from "@/stores/jobs/useVisibleJobsStore";

export function JobMarkers() {
  const { selectedJob, setSelectedJob } = useJobSelectionStore();
  const { visibleJobs } = useVisibleJobsStore();

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
