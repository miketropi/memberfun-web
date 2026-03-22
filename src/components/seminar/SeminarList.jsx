import SeminarCard from './SeminarCard';

export default function SeminarList({
  seminars,
  onSeminarClick,
  isPast = false,
  emptyMessage = 'No seminars available.',
}) {
  if (!seminars || seminars.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-200/90 bg-zinc-50/80 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
        <p className="text-zinc-500 dark:text-zinc-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-200/90 dark:border-zinc-800">
      <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
        <thead className="bg-zinc-50 dark:bg-zinc-900/80">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
            >
              Seminar
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
            >
              Date &amp; location
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
            >
              Host
            </th>
            {!isPast && (
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
              >
                Status
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-zinc-950/40">
          {seminars.map((seminar) => (
            <SeminarCard key={seminar.id} seminar={seminar} isPast={isPast} onClick={onSeminarClick} />
          ))}
        </tbody>
      </table>
    </div>
  );
} 