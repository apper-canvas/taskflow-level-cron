import { cn } from "@/utils/cn";

const Loading = ({ className, ...props }) => {
  return (
    <div className={cn("w-full space-y-6 p-6", className)} {...props}>
      {/* Task Input Skeleton */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Filter Bar Skeleton */}
      <div className="flex flex-wrap gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>

      {/* Task List Skeleton */}
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse mt-0.5"></div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-48"></div>
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;