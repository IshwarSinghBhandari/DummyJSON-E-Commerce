import { Skeleton } from "@/components/ui/skeleton";

export default function DetailSkeleton() {
    return (
        <div className="min-h-screen">
            <div className="mx-auto py-12 space-y-10 animate-pulse">
                <Skeleton className="h-8 w-32" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <Skeleton className="aspect-square rounded-[8px]" />

                    <div className="space-y-4">

                        <Skeleton className="h-10 w-3/4" />
                        <Skeleton className="h-5 w-1/3" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/6" />
                        <Skeleton className="h-12 w-40 mt-4" />

                    </div>
                </div>
            </div>
        </div>
    );
}
