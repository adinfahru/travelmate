import { Skeleton } from "@/app/components/Skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-10 w-3/4 mb-6" />
      <Skeleton className="h-5 w-full mb-2" />
      <Skeleton className="h-5 w-4/5 mb-6" />
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Skeleton className="h-5 w-1/3 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-5 w-1/3 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-5 w-1/3 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-5 w-1/3 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-5 w-1/3 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        
        <div className="mb-6">
          <Skeleton className="h-5 w-1/3 mb-2" />
          <Skeleton className="h-24 w-full" />
        </div>
        
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}
