import { Calendar, Clock } from 'lucide-react';

export default function SeminarTabs({ activeTab, onTabChange }) {
  const tabClass = (id) =>
    [
      'flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all',
      activeTab === id
        ? 'bg-zinc-950 text-white shadow-md dark:bg-white dark:text-zinc-950'
        : 'border-2 border-zinc-200 bg-white text-zinc-700 hover:border-violet-300 hover:bg-violet-50/50 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-violet-800 dark:hover:bg-violet-950/20',
    ].join(' ');

  return (
    <div className="flex flex-wrap gap-3">
      <button type="button" className={tabClass('upcoming')} onClick={() => onTabChange('upcoming')}>
        <Calendar className="h-4 w-4" />
        Upcoming
      </button>
      <button type="button" className={tabClass('past')} onClick={() => onTabChange('past')}>
        <Clock className="h-4 w-4" />
        Past
      </button>
    </div>
  );
}