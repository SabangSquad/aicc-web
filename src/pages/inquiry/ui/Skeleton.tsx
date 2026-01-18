import { Separator } from '@/shared/ui/separator';
import { Skeleton } from '@/shared/ui/skeleton';

export function RightPanelSkeleton() {
  return (
    <div className="space-y-8 p-6 animate-pulse">
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="flex items-start gap-4 p-4 rounded-md">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-32" />
            <div className="pt-2 space-y-1">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        </div>
      </div>
      <Separator />

      <div className="space-y-3">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-16 w-full rounded-md" />
      </div>
      <Separator />

      <div className="flex flex-row gap-6">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-28" />
          <div className="space-y-2">
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        </div>
      </div>
      <Separator />

      <div className="flex flex-row gap-6">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-40 w-full rounded-md" />
        </div>
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-[120px] w-full rounded-md" />
          <Skeleton className="h-10 w-20 rounded-md" />
        </div>
      </div>
    </div>
  );
}
