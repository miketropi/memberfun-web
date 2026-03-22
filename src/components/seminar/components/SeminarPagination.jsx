export default function SeminarPagination({ pagination, onPageChange }) {
  if (pagination.pages <= 1) return null;

  return (
    <div className="mt-6 flex justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(pagination.page - 1)}
        disabled={pagination.page === 1}
        className="rounded-xl border-2 border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
      >
        Previous
      </button>
      <span className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">
        Page {pagination.page} of {pagination.pages}
      </span>
      <button
        type="button"
        onClick={() => onPageChange(pagination.page + 1)}
        disabled={pagination.page === pagination.pages}
        className="rounded-xl border-2 border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
      >
        Next
      </button>
    </div>
  );
} 