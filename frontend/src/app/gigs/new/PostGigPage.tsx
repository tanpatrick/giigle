"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { DatePicker } from "@heroui/date-picker";
import { Divider } from "@heroui/divider";
import { Form } from "@heroui/form";
import { getLocalTimeZone, today } from "@internationalized/date";

import { ENV_CONFIG } from "@/config";
import { Input, Textarea } from "@/ui-library/Input";
import { Select } from "@/ui-library/Select";

export enum PayType {
  FIXED = "FIXED",
  HOURLY = "HOURLY",
}

const items: { key: keyof typeof PayType; label: string }[] = [
  { key: "FIXED", label: "Fixed" },
  // { key: "HOURLY", label: "Hourly" },
];

export const NZ_COORDINATES = [
  { coordinates: { latitude: -36.8485, longitude: 174.7633 }, address: "Auckland, New Zealand" },
  { coordinates: { latitude: -41.2865, longitude: 174.7762 }, address: "Wellington, New Zealand" },
  { coordinates: { latitude: -43.5321, longitude: 172.6362 }, address: "Christchurch, New Zealand" },
  { coordinates: { latitude: -45.8788, longitude: 170.5028 }, address: "Dunedin, New Zealand" },
  { coordinates: { latitude: -45.0312, longitude: 168.6626 }, address: "Queenstown, New Zealand" },
  { coordinates: { latitude: -39.4928, longitude: 176.912 }, address: "Napier, New Zealand" },
  { coordinates: { latitude: -37.787, longitude: 175.2793 }, address: "Hamilton, New Zealand" },
  { coordinates: { latitude: -37.6878, longitude: 176.1651 }, address: "Tauranga, New Zealand" },
  { coordinates: { latitude: -39.0556, longitude: 174.0752 }, address: "New Plymouth, New Zealand" },
  { coordinates: { latitude: -41.2706, longitude: 173.284 }, address: "Nelson, New Zealand" },
  { coordinates: { latitude: -46.4132, longitude: 168.3538 }, address: "Invercargill, New Zealand" },
  { coordinates: { latitude: -38.1368, longitude: 176.2497 }, address: "Rotorua, New Zealand" },
  { coordinates: { latitude: -40.3523, longitude: 175.6082 }, address: "Palmerston North, New Zealand" },
  { coordinates: { latitude: -44.3968, longitude: 171.2543 }, address: "Timaru, New Zealand" },
  { coordinates: { latitude: -42.4012, longitude: 173.6819 }, address: "Kaikōura, New Zealand" },
];

export function PostGigPage() {
  const [selectedPayType, setSelectedPayType] = useState<PayType | null>(null);

  return (
    <div className="w-full sm:w-[50%] md:w-[40%] lg:w-[30%] mx-auto p-5">
      <Card>
        <CardHeader>Got a Gig? Post It Here!</CardHeader>
        <Divider />
        <Form
          onSubmit={(e) => {
            e.preventDefault();

            const data = Object.fromEntries(new FormData(e.currentTarget));
            const body = {
              ...data,
              location: NZ_COORDINATES[Math.floor(Math.random() * NZ_COORDINATES.length)],
              pay: Number(data.pay),
            };

            fetch(ENV_CONFIG.ENDPOINTS.GIGS, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            })
              .then((res) => res.json())
              .then(() => {
                alert("🎉 Congrats! Your job is now live and ready to rock!");
              })
              .catch(() => alert(`Soooory!`));
          }}
          validationBehavior="native"
        >
          <CardBody className="w-full flex flex-col gap-4">
            <Input
              isRequired
              label="Title"
              name="title"
              placeholder="e.g. Dishwashing Ninja: One Day, One Mission, Zero Leftovers!"
            />
            <Textarea
              isRequired
              label="Description"
              labelPlacement="outside"
              name="description"
              placeholder="e.g. Scrubbing, sudsing, and saving the day—one dish at a time!"
              required
            />
            <Select
              isRequired
              items={items}
              label="Pay Type"
              name="payType"
              placeholder="Select pay type e.g. Hourly"
              onSelectionChange={({ currentKey }) => {
                setSelectedPayType(currentKey as PayType);
              }}
            />

            {selectedPayType === PayType.FIXED && (
              <>
                <DatePicker label="Date" minValue={today(getLocalTimeZone())} name="date" />
                <Input isRequired label="Pay" name="pay" placeholder="0.00" startContent="$" type="number" />
              </>
            )}
            {selectedPayType === PayType.HOURLY && (
              <>
                <Input label="Hourly Rate" name="pay" placeholder="0.00" startContent="$" type="number" />
                <DatePicker granularity="minute" hourCycle={12} label="Start" minValue={today(getLocalTimeZone())} />
                <DatePicker granularity="minute" hourCycle={12} label="End" minValue={today(getLocalTimeZone())} />
              </>
            )}
          </CardBody>
          <Divider />
          <CardFooter>
            <Button color="secondary" type="submit" variant="bordered">
              Submit
            </Button>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}
