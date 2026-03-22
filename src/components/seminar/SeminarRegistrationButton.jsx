import { CheckCircle, XCircle, Download } from 'lucide-react';

export default function SeminarRegistrationButton({
  seminarId,
  isRegistered,
  onRegister,
  onCancelRegistration,
  onExportCalendar,
  loading = false,
}) {
  if (isRegistered) {
    return (
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
        <button
          type="button"
          onClick={() => onCancelRegistration(seminarId)}
          disabled={loading}
          className="inline-flex items-center justify-center rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-60"
        >
          {loading ? (
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <XCircle className="mr-2 h-5 w-5" />
          )}
          Cancel registration
        </button>
        {onExportCalendar && (
          <button
            type="button"
            onClick={() => onExportCalendar(seminarId)}
            className="inline-flex items-center justify-center rounded-xl border-2 border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            <Download className="mr-2 h-5 w-5" />
            Add to calendar
          </button>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onRegister(seminarId)}
      disabled={loading}
      className="inline-flex items-center justify-center rounded-xl bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
    >
      {loading ? (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent dark:border-zinc-950 dark:border-t-transparent" />
      ) : (
        <CheckCircle className="mr-2 h-5 w-5" />
      )}
      Register for seminar
    </button>
  );
}
