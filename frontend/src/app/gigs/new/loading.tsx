import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Skeleton } from "@heroui/skeleton";

export default function Loading() {
  return (
    <div className="w-full sm:w-[50%] md:w-[40%] lg:w-[30%] mx-auto p-5">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-full rounded-lg" />
        </CardHeader>
        <Divider />
        <CardBody className="w-full flex flex-col gap-4">
          <Skeleton className="h-14 w-full rounded-lg" />
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-16 w-full rounded-lg" />
        </CardBody>
        <Divider />
        <CardFooter>
          <Skeleton className="h-12 w-1/5 rounded-lg" />
        </CardFooter>
      </Card>
    </div>
  );
}
