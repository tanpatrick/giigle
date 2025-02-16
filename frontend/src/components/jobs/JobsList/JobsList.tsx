"use client";

import { Card, CardBody } from "@heroui/card";
import { Listbox, ListboxItem } from "@heroui/listbox";

import { JobsResponse } from "@/types/Jobs";

export function JobsList({ jobs }: { jobs: JobsResponse }) {
  return (
    <Card radius="none" className="h-[calc(100vh-4rem)] overflow-y-auto">
      <CardBody>
        <div>
          <Listbox onAction={(key) => alert(key)}>
            {jobs.items.map(({ description, id, location, title }) => (
              <ListboxItem
                description={
                  <div>
                    <div>{description}</div>
                    <div className="text-right">{location.address}</div>
                  </div>
                }
                key={id}
              >
                {title}
              </ListboxItem>
            ))}
          </Listbox>
        </div>
      </CardBody>
    </Card>
  );
}
