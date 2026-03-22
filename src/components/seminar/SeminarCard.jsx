import { format, parseISO } from 'date-fns';
import { Calendar, MapPin, User, Star } from 'lucide-react';

export default function SeminarCard({ seminar, onClick, isPast = false }) {
  return (
    <tr
      onClick={() => onClick(seminar)}
      className={`cursor-pointer transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/60 ${isPast ? 'opacity-85' : ''}`}
    >
      <td className="whitespace-nowrap px-6 py-4">
        <div className="flex items-center">
          {seminar.featured_image ? (
            <img
              className={`mr-3 h-10 w-10 rounded-full object-cover ring-2 ring-zinc-100 dark:ring-zinc-800 ${isPast ? 'grayscale filter' : ''}`}
              src={seminar.featured_image}
              alt=""
            />
          ) : (
            <div className="mr-3 h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          )}
          <div className="text-sm font-medium text-zinc-900 dark:text-white">
            <div className="font-bold">{seminar.title}</div>
            {seminar.double_points && (
              <span className="mt-1 inline-flex items-center rounded-md border border-amber-400/80 bg-gradient-to-r from-amber-200 to-orange-400 px-2.5 py-0.5 text-xs font-bold text-amber-950 shadow-sm dark:border-amber-700 dark:from-amber-700 dark:to-orange-800 dark:text-amber-100">
                <Star className="mr-1 h-3.5 w-3.5" />
                Double points
                <Star className="ml-1 h-3.5 w-3.5" />
              </span>
            )}
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <div className="flex flex-col text-sm text-zinc-600 dark:text-zinc-300">
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4 shrink-0 text-violet-500 dark:text-violet-400" />
            <span>{seminar.formatted_date || format(parseISO(seminar.date), 'MMM d, yyyy')}</span>
          </div>
          <div className="mt-1 flex items-center">
            <MapPin className="mr-1 h-4 w-4 shrink-0 text-violet-500 dark:text-violet-400" />
            <span>{seminar.location}</span>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-300">
          <User className="mr-1 h-4 w-4 shrink-0 text-violet-500 dark:text-violet-400" />
          <span>{seminar.host?.name || 'Unknown'}</span>
        </div>
      </td>
      {!isPast && (
        <td className="whitespace-nowrap px-6 py-4">
          {seminar.status ? (
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              Upcoming
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
              Past
            </span>
          )}
        </td>
      )}
    </tr>
  );
} 