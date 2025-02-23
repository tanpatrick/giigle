import clsx from "clsx";

import { GigsList } from "../GigsList";

export function GigsListPanel() {
  return (
    <div className={clsx(["pb-1 sm:pb-3", "overflow-y-auto"])} style={{ height: `calc(100vh - 7rem)` }}>
      <GigsList />
    </div>
  );
}
