import { GigsListPanel } from "@/components/gigs/GigsListPanel";
import { GigsMap } from "@/components/gigs/GigsMap";
import { GigsResponse } from "@/types/Gigs";

export async function HomePage() {
  const data = await fetch("https://dummyjson.com/c/f0b2-6c22-4776-b5a0");
  const { items: gigs }: GigsResponse = await data.json();

  return (
    <div className="w-full" style={{ height: `calc(100vh - 4rem)` }}>
      <div className="grid grid-cols-1 md:grid-cols-[30%,70%]">
        <GigsListPanel gigs={gigs} />
        <GigsMap />
      </div>
    </div>
  );
}
