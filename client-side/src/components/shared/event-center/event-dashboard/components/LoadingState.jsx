import React from "react";
import { motion } from "framer-motion";

const LoadingState = ({ type = "cards", count = 6 }) => {
  const SkeletonCard = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card border border-border rounded-xl shadow-sm overflow-hidden"
    >
      {/* Image skeleton */}
      <div className="h-48 bg-muted animate-pulse" />

      {/* Content skeleton */}
      <div className="p-6">
        {/* Title skeleton */}
        <div className="h-6 bg-muted rounded animate-pulse mb-3" />

        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
        </div>

        {/* Details skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
          <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
        </div>

        {/* Tags skeleton */}
        <div className="flex gap-2 mb-4">
          <div className="h-6 w-16 bg-muted rounded animate-pulse" />
          <div className="h-6 w-20 bg-muted rounded animate-pulse" />
          <div className="h-6 w-14 bg-muted rounded animate-pulse" />
        </div>

        {/* Button skeleton */}
        <div className="h-10 bg-muted rounded animate-pulse" />
      </div>
    </motion.div>
  );

  const MyEventSkeletonCard = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card border border-border rounded-xl shadow-sm overflow-hidden"
    >
      {/* Image skeleton */}
      <div className="h-40 bg-muted animate-pulse" />

      {/* Content skeleton */}
      <div className="p-5">
        {/* Title skeleton */}
        <div className="h-6 bg-muted rounded animate-pulse mb-3" />

        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
        </div>

        {/* Details skeleton */}
        <div className="h-4 bg-muted rounded animate-pulse w-3/4 mb-4" />

        {/* Statistics skeleton */}
        <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-muted rounded-lg">
          <div className="text-center">
            <div className="h-6 bg-background rounded animate-pulse mb-1" />
            <div className="h-3 bg-background rounded animate-pulse" />
          </div>
          <div className="text-center">
            <div className="h-6 bg-background rounded animate-pulse mb-1" />
            <div className="h-3 bg-background rounded animate-pulse" />
          </div>
          <div className="text-center">
            <div className="h-6 bg-background rounded animate-pulse mb-1" />
            <div className="h-3 bg-background rounded animate-pulse" />
          </div>
        </div>

        {/* Buttons skeleton */}
        <div className="flex gap-2">
          <div className="h-8 bg-muted rounded animate-pulse flex-1" />
          <div className="h-8 w-16 bg-muted rounded animate-pulse" />
          <div className="h-8 w-10 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </motion.div>
  );

  if (type === "my-events") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count })?.map((_, index) => (
          <MyEventSkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count })?.map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default LoadingState;
