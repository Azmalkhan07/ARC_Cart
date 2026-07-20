import React from 'react';

// Skeleton card for loading state
export const SkeletonCard = () => (
  <div className="card-arc overflow-hidden animate-pulse">
    <div className="skeleton-arc" style={{ aspectRatio: '1/1' }} />
    <div className="p-4 space-y-3">
      <div className="skeleton-arc h-3 w-20 rounded" />
      <div className="skeleton-arc h-4 w-full rounded" />
      <div className="skeleton-arc h-4 w-3/4 rounded" />
      <div className="skeleton-arc h-3 w-24 rounded" />
      <div className="skeleton-arc h-5 w-28 rounded" />
    </div>
  </div>
);

// Generic text skeleton
export const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="skeleton-arc h-4 rounded"
        style={{ width: i === lines - 1 ? '60%' : '100%' }}
      />
    ))}
  </div>
);

// Hero skeleton
export const SkeletonHero = () => (
  <div className="skeleton-arc rounded-3xl" style={{ height: '560px' }} />
);

export default SkeletonCard;
