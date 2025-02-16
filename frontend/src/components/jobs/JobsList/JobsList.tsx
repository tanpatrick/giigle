"use client";

import { Card, CardBody } from "@heroui/card";
import { Listbox, ListboxItem } from "@heroui/listbox";

import { JobsResponse } from "@/types/Jobs";

export function JobsList({ jobs }: { jobs: JobsResponse }) {
  return (
    <Card>
      <CardBody>
        <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 12rem)" }}>
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
