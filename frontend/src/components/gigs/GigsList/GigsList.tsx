"use client";

import { BiCalendar, BiMap, BiMoney } from "react-icons/bi";
import { Alert } from "@heroui/alert";
import { Avatar } from "@heroui/avatar";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import clsx from "clsx";

import { sendGAEvent } from "@/components/ga/sendGAEvent";
import { useGigSelectionStore } from "@/stores/gigs/useGigSelectionStore";
import { useGigsStore } from "@/stores/gigs/useGigsStore";
import { formatCurrency, formatDate } from "@/utils/formatter";

export function GigsList() {
  const { selectedGig, setSelectedGig: setSelectedJob } = useGigSelectionStore((state) => state);
  const { visibleGigs } = useGigsStore();

  if (!visibleGigs.length) {
    return (
      <div className="my-4 mx-3">
        <Alert
          color="warning"
          description="No jobs here yet! Try expanding your search or checking back later—something great might pop up soon!"
          hideIcon
          title={<strong>Job Desert Ahead! 🌵</strong>}
        />
      </div>
    );
  }

  return visibleGigs.map((gig, index) => {
    const randomAvatarUrl = `https://api.dicebear.com/9.x/bottts/svg?seed=${index}`;
    const isSelected = gig.id === selectedGig?.id;

    return (
      <div className="my-4 mx-3" key={gig.id}>
        <Card
          className={clsx([{ "border-3": isSelected }])}
          fullWidth
          isHoverable
          isPressable
          onPress={() => {
            sendGAEvent({ event: "job_selected_via_list", value: gig });
            setSelectedJob(gig);
          }}
          radius="lg"
        >
          <CardHeader>
            <div className="flex gap-5">
              <Avatar isBordered radius="full" size="md" src={randomAvatarUrl} />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4
                  className={clsx([
                    "text-small font-semibold leading-none text-default-600",
                    {
                      "text-primary-600": isSelected,
                    },
                  ])}
                >
                  {gig.title}
                </h4>
                <div className="flex gap-1">
                  <BiMap className="font-semibold text-default-400 text-small" />
                  <p className="text-default-400 text-small">{gig.location.address}</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-3 py-0 text-medium text-default-400">
            <p>{gig.description}</p>
          </CardBody>
          <CardFooter className="gap-3">
            <div className="flex gap-1">
              <BiCalendar className="font-semibold text-default-400 text-small" />
              <p className=" text-default-400 text-small">{formatDate(gig.date)}</p>
            </div>
            <div className="flex gap-1">
              <BiMoney className="font-semibold text-default-400 text-small" />
              <p className=" text-default-400 text-small">
                {formatCurrency(gig.pay)} ({gig.payType.toLocaleLowerCase()})
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  });
}
