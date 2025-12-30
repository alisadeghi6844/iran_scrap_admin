import React from "react";

// Extracted from ProductRequestSuggestionsModal without UI/logic changes
const LoadingSkeleton: React.FC = () => (
  <div className="p-4 animate-pulse">
    {/* Request Info Summary Skeleton */}
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index}>
            <div className="h-3 bg-gray-300 rounded w-16 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>
        ))}
      </div>
    </div>

    {/* Table Skeleton */}
    <div className="overflow-x-auto mb-6">
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Table Header */}
        <div className="border-b border-gray-200 p-4">
          <div className="grid grid-cols-7 gap-4">
            {[...Array(7)].map((_, index) => (
              <div key={index} className="h-4 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>

        {/* Table Rows */}
        {[...Array(5)].map((_, rowIndex) => (
          <div key={rowIndex} className="border-b border-gray-100 p-4 last:border-b-0">
            <div className="grid grid-cols-7 gap-4">
              {[...Array(7)].map((_, colIndex) => (
                <div key={colIndex}>
                  <div className="h-4 bg-gray-200 rounded mb-1"></div>
                  {colIndex === 0 && <div className="h-3 bg-gray-200 rounded w-3/4"></div>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Winner Box Skeleton */}
    <div className="mt-10 relative">
      {/* Winner Badge Skeleton */}
      <div className="absolute -top-6 right-4 z-10">
        <div className="bg-gray-300 px-4 py-2 rounded-full h-10 w-32"></div>
      </div>

      <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
        {/* Header Skeleton */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="h-6 bg-gray-300 rounded w-40 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-28"></div>
            </div>
            <div className="h-8 bg-gray-300 rounded-full w-24"></div>
          </div>
        </div>

        {/* Price Highlight Skeleton */}
        <div className="bg-white rounded-xl p-4 mb-6 border border-gray-100">
          <div className="text-center">
            <div className="h-3 bg-gray-300 rounded w-16 mx-auto mb-2"></div>
            <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-2"></div>
            <div className="flex justify-center gap-4">
              <div className="h-3 bg-gray-300 rounded w-24"></div>
              <div className="h-3 bg-gray-300 rounded w-1"></div>
              <div className="h-3 bg-gray-300 rounded w-20"></div>
            </div>
          </div>
        </div>

        {/* Details Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-4 w-4 bg-gray-300 rounded"></div>
                <div className="h-3 bg-gray-300 rounded w-20"></div>
              </div>
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </div>
          ))}
        </div>

        {/* Timeline Skeleton */}
        <div className="bg-white rounded-lg p-4 border border-gray-100 mb-4">
          <div className="h-4 bg-gray-300 rounded w-20 mb-3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
              <div key={index}>
                <div className="h-3 bg-gray-300 rounded w-16 mb-1"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Description Skeleton */}
        <div className="bg-white rounded-lg p-4 border border-gray-100">
          <div className="h-4 bg-gray-300 rounded w-28 mb-2"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-300 rounded w-full"></div>
            <div className="h-3 bg-gray-300 rounded w-4/5"></div>
            <div className="h-3 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LoadingSkeleton;


