"use client";

import { useEffect } from "react";

import { FooterMenuBar } from "@/components/common/FooterMenuBar";
import { ResponsiveWrapper } from "@/components/common/ResponsiveWrapper/ResponsiveWrapper";
import { GigsListPanel } from "@/components/gigs/GigsListPanel";
import { GigsMap } from "@/components/gigs/GigsMap";
import { useGigsStore } from "@/stores/gigs/useGigsStore";
import { useHomeStore } from "@/stores/useHomeStore";
import { Gig } from "@/types/Gigs";

export function HomePage({ gigs }: { gigs: Gig[] }) {
  const setGigs = useGigsStore().setGigs;

  useEffect(() => {
    setGigs(gigs);
  }, [gigs, setGigs]);

  const viewMode = useHomeStore().viewMode;

  return (
    <div className="w-full" style={{ height: `calc(100vh - 4rem)` }}>
      <div className="grid grid-cols-1 md:grid-cols-[70%,30%]">
        <ResponsiveWrapper isHiddenOnMobile={viewMode === "list"}>
          <GigsMap />
        </ResponsiveWrapper>
        <ResponsiveWrapper isHiddenOnMobile={viewMode === "map"}>
          <GigsListPanel />
        </ResponsiveWrapper>
        <FooterMenuBar />
      </div>
    </div>
  );
}