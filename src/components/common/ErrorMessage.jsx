import React from 'react';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

export default function ErrorMessage({
  message,
  variant = 'error',
  className = '',
  onRetry,
}) {
  const variants = {
    error:
      'border-red-200/80 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200',
    warning:
      'border-amber-200/80 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200',
    info:
      'border-violet-200/80 bg-violet-50 text-violet-900 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-200',
  };

  const icons = {
    error: <AlertCircle className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
  };

  return (
    <div
      className={`rounded-xl border p-4 ${variants[variant]} ${className}`}
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">{icons[variant]}</div>
        <div className="ml-3">
          <p className="text-sm font-medium">{message}</p>
          {onRetry && (
            <div className="mt-2">
              <button
                onClick={onRetry}
                className="text-sm font-medium underline hover:text-opacity-80 focus:outline-none"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 