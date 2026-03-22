import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div
        className="h-12 w-12 animate-spin rounded-full border-2 border-zinc-200 border-t-violet-600 dark:border-zinc-700 dark:border-t-violet-400"
        aria-hidden
      />
    </div>
  );
};

export default LoadingSpinner; 