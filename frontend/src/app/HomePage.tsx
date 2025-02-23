"use client";

import { useEffect } from "react";

import { GigsListPanel } from "@/components/gigs/GigsListPanel";
import { GigsMap } from "@/components/gigs/GigsMap";
import { useGigsStore } from "@/stores/gigs/useGigsStore";
import { Gig } from "@/types/Gigs";

export function HomePage({ gigs }: { gigs: Gig[] }) {
  const { setGigs } = useGigsStore();

  useEffect(() => {
    setGigs(gigs);
  }, [gigs, setGigs]);

  return (
    <div className="w-full" style={{ height: `calc(100vh - 4rem)` }}>
      <div className="grid grid-cols-1 md:grid-cols-[70%,30%]">
        <GigsMap />
        <GigsListPanel />
      </div>
    </div>
  );
}
