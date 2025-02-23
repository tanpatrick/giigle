import { Skeleton } from "@heroui/skeleton";

export default function Loading() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-[70%,30%]">
        <div className="bg-white p-5">
          <Skeleton className="h-full rounded-lg w-full" />
        </div>
        <div className="border-r" style={{ height: `calc(100vh - 4rem)` }}>
          <div className="w-full p-5">
            <div className="p-2 space-y-2 animate-pulse">
              {Array.from({ length: 20 }).map((_, i) => (
                <div className="mb-3" key={i}>
                  <div className="max-w-[300px] w-full flex items-center gap-3">
                    <div>
                      <Skeleton className="flex rounded-full w-12 h-12" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <Skeleton className="h-3 w-3/5 rounded-lg" />
                      <Skeleton className="h-3 w-4/5 rounded-lg" />
                    </div>
                  </div>
                  <div className="py-3">
                    <Skeleton className="h-16 rounded-lg w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
