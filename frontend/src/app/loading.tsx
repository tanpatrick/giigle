export default function Loading() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-[30%,70%]">
        <div className="border-r" style={{ height: `calc(100vh - 4rem)` }}>
          <div className="w-full">
            <div className="p-2 space-y-2 animate-pulse">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="h-20 p-5 bg-gray-200 rounded-md"></div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white "></div>
      </div>
    </div>
  );
}
