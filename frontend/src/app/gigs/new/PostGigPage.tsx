"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { DatePicker } from "@heroui/date-picker";
import { Divider } from "@heroui/divider";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { getLocalTimeZone, today } from "@internationalized/date";

export enum PayType {
  FIXED = "FIXED",
  HOURLY = "HOURLY",
}

const items: { key: keyof typeof PayType; label: string }[] = [
  { key: "FIXED", label: "Fixed" },
  { key: "HOURLY", label: "Hourly" },
];

export function PostGigPage() {
  const [selectedPayType, setSelectedPayType] = useState<PayType | null>(null);

  return (
    <div className="w-full sm:w-[50%] md:w-[40%] lg:w-[30%] mx-auto p-5">
      <Card>
        <CardHeader>Got a Gig? Post It Here!</CardHeader>
        <Divider />
        <Form onSubmit={() => {}}>
          <CardBody className="w-full flex flex-col gap-4">
            <Input
              label="Title"
              name="title"
              placeholder="e.g. Dishwashing Ninja: One Day, One Mission, Zero Leftovers!"
            />
            <Textarea
              label="Description"
              labelPlacement="outside"
              name="description"
              placeholder="e.g. Scrubbing, sudsing, and saving the day—one dish at a time!"
            />
            <Select
              items={items}
              label="Pay Type"
              placeholder="Select pay type e.g. Hourly"
              onSelectionChange={({ currentKey }) => {
                setSelectedPayType(currentKey as PayType);
              }}
            >
              {({ label }) => <SelectItem>{label}</SelectItem>}
            </Select>
            {selectedPayType === PayType.FIXED && (
              <>
                <DatePicker label="Date" minValue={today(getLocalTimeZone())} />
                <Input label="Pay" name="rate" placeholder="0.00" startContent="$" type="number" />
              </>
            )}
            {selectedPayType === PayType.HOURLY && (
              <>
                <Input label="Hourly Rate" name="rate" placeholder="0.00" startContent="$" type="number" />
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
