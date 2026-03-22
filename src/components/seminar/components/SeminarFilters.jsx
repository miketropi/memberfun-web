import { Search } from 'lucide-react';

const fieldClass =
  'w-full rounded-xl border-2 border-zinc-200 bg-white py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500';

export default function SeminarFilters({ filters, onFilterChange }) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="relative md:col-span-2">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          placeholder="Search seminars..."
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          className={`${fieldClass} pl-10 pr-4`}
        />
      </div>
      {/* <div className="relative">
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Filter by host..."
          value={filters.host}
          onChange={(e) => onFilterChange('host', e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
      </div> */}
      <select
        value={filters.status}
        onChange={(e) => onFilterChange('status', e.target.value)}
        className={`${fieldClass} px-4`}
      >
        <option value="all">All Seminars</option>
        <option value="upcoming">Upcoming Only</option>
        {/* <option value="past">Past Only</option> */}
      </select>
    </div>
  );
} 