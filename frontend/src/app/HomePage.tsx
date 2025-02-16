import { JobsList } from "@/components/jobs/JobsList";
import { JobsResponse } from "@/types/Jobs";

export async function HomePage() {
  const data = await fetch("https://dummyjson.com/c/f0b2-6c22-4776-b5a0");
  const jobs: JobsResponse = await data.json();

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="col-span-1 md:col-span-4">
        <JobsList jobs={jobs} />
      </div>
    </div>
  );
}
