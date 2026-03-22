import React from 'react';

export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-zinc-200 border-t-violet-600 dark:border-zinc-700 dark:border-t-violet-400`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
} 