"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProductSkeleton() {
  return (
    <div className="rounded-xl border shadow-sm p-4 space-y-3">
      <Skeleton className="aspect-[4/5] w-full rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-6 w-1/3 mt-2" />
    </div>
  );
}
