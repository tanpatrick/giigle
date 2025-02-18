"use client";

import { useEffect } from "react";
import { BiCurrentLocation, BiReset } from "react-icons/bi";
import { Button, ButtonGroup } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";

import { useGigSelectionStore } from "@/stores/gigs/useGigSelectionStore";
import { useGigsStore } from "@/stores/gigs/useGigsStore";
import { useMapStore } from "@/stores/useMapStore";
import { Gig } from "@/types/Gigs";

import { GigsList } from "../GigsList";

export function GigsListPanel({ gigs }: { gigs: Gig[] }) {
  const { setGigs } = useGigsStore();
  const { setSelectedGig } = useGigSelectionStore((state) => state);
  const { reset } = useMapStore();

  useEffect(() => {
    setGigs(gigs);
  }, [gigs, setGigs]);

  return (
    <Card radius="none">
      <CardBody>
        <div className="overflow-y-auto pr-5" style={{ height: `calc(100vh - 6rem)` }}>
          <ButtonGroup className="p-2" fullWidth variant="faded">
            <Button endContent={<BiCurrentLocation />}>My Location</Button>
            <Button
              endContent={<BiReset />}
              onPress={() => {
                setSelectedGig(null);
                reset();
              }}
            >
              Reset Map
            </Button>
          </ButtonGroup>
          <GigsList />
        </div>
      </CardBody>
    </Card>
  );
}
