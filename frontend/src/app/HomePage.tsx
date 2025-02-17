import { Map } from "@/components/common/Map";
import { JobsListPanel } from "@/components/jobs/JobsListPanel";
import { JobsResponse } from "@/types/Jobs";

export async function HomePage() {
  const data = await fetch("https://dummyjson.com/c/f0b2-6c22-4776-b5a0");
  const jobs: JobsResponse = await data.json();

  return (
    <div className="w-full" style={{ height: `calc(100vh - 4rem)` }}>
      <div className="grid grid-cols-1 md:grid-cols-[30%,70%]">
        <JobsListPanel jobs={jobs.items} />
        <Map />
      </div>
    </div>
  );
}
