import { GigsList } from "../GigsList";

export function GigsListPanel() {
  return (
    <div className="overflow-y-auto" style={{ height: `calc(100vh - 4rem)` }}>
      <GigsList />
    </div>
  );
}
