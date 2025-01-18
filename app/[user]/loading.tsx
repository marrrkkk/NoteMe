import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <div className="flex justify-end p-3 space-x-3">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-24" />
      </div>
      <main className="max-w-screen-xl mx-auto p-4 sm:p-8 mt-14">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-8">
            <div className="flex items-center space-x-6">
              <Skeleton className="w-24 h-24 rounded-full" />
              <div>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-24 mt-2" />
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <Skeleton className="h-12 w-1/3" />
          </div>
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-6 w-5/6" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Loading;
