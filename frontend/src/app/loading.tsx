import { Skeleton } from "@heroui/skeleton";

export default function Loading() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-[30%,70%]">
        <div className="border-r" style={{ height: `calc(100vh - 4rem)` }}>
          <div className="w-full">
            <div className="p-2 space-y-2 animate-pulse">
              {Array.from({ length: 20 }).map((_, i) => (
                <div className="mb-3" key={i}>
                  <Skeleton className="h-8 mb-2 w-3/5 rounded-lg" />
                  <Skeleton className="h-24 mb-2 w-full rounded-lg" />
                  <Skeleton className="h-8 w-1/4 rounded-3xl ml-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white "></div>
      </div>
    </div>
  );
}
