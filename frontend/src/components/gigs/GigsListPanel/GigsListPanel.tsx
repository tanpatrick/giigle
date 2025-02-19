import { Card, CardBody } from "@heroui/card";

import { GigsList } from "../GigsList";

export function GigsListPanel() {
  return (
    <Card radius="none">
      <CardBody>
        <div className="overflow-y-auto pr-5" style={{ height: `calc(100vh - 6rem)` }}>
          <GigsList />
        </div>
      </CardBody>
    </Card>
  );
}
