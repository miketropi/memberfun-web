import { Star, Sparkles, Mic2, ClipboardCheck, Lightbulb } from 'lucide-react';
import Gavatar from '../../Gavatar';

const DIMENSION_META = {
  skill: { label: 'Skill', Icon: Mic2 },
  quality: { label: 'Quality', Icon: ClipboardCheck },
  usefulness: { label: 'Usefulness', Icon: Lightbulb },
};

function formatDimensionKey(key) {
  const k = key.toLowerCase();
  if (DIMENSION_META[k]) return DIMENSION_META[k];
  return {
    label: key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    Icon: Star,
  };
}

function ReadOnlyStars({ value }) {
  const n = Math.min(5, Math.max(0, Number(value) || 0));
  return (
    <div className="flex items-center gap-0.5" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 transition-colors duration-150 sm:h-[1.125rem] sm:w-[1.125rem] ${
            i <= n ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.25)]' : 'text-zinc-200 dark:text-zinc-700'
          }`}
          strokeWidth={i <= n ? 0 : 1.25}
        />
      ))}
    </div>
  );
}

function RatingRow({ dimKey, value }) {
  const { label, Icon } = formatDimensionKey(dimKey);
  const num = Number(value) || 0;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-zinc-200/60 bg-white/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800/80 dark:bg-zinc-950/40">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-50 text-violet-600 dark:from-zinc-800 dark:to-zinc-900 dark:text-violet-400">
          <Icon className="h-4 w-4" strokeWidth={2} />
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{label}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Out of 5</p>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:justify-end">
        <ReadOnlyStars value={num} />
        <span className="min-w-[2rem] text-right text-sm font-bold tabular-nums text-violet-700 dark:text-violet-300">{num}</span>
      </div>
    </div>
  );
}

function averageScore(ratingData) {
  const vals = Object.values(ratingData || {}).map((v) => Number(v)).filter((n) => !Number.isNaN(n));
  if (!vals.length) return null;
  return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
}

export default function SeminarRatingTable({ ratings = [] }) {
  if (!ratings || ratings.length === 0) {
    return (
      <div className="relative mb-4 overflow-hidden rounded-2xl border border-dashed border-zinc-300/90 bg-gradient-to-b from-zinc-50 to-white px-6 py-12 text-center dark:border-zinc-700 dark:from-zinc-950 dark:to-zinc-900/80">
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-500/10 blur-2xl dark:bg-violet-600/15"
          aria-hidden
        />
        <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/15 to-violet-600/5 text-violet-600 dark:from-violet-500/20 dark:to-transparent dark:text-violet-400">
          <Star className="h-7 w-7" strokeWidth={1.25} />
        </div>
        <p className="relative text-base font-semibold text-zinc-800 dark:text-zinc-200">No ratings yet</p>
        <p className="relative mx-auto mt-2 max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          When members rate this seminar, you&apos;ll see their feedback here.
        </p>
      </div>
    );
  }

  return (
    <div className="relative mb-4 overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm ring-1 ring-black/[0.03] dark:border-zinc-800 dark:bg-zinc-900/60 dark:ring-white/[0.04]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent dark:via-violet-500/40"
        aria-hidden
      />

      <div className="relative border-b border-zinc-200/90 bg-gradient-to-r from-zinc-50/80 via-white to-zinc-50/80 px-5 py-4 dark:border-zinc-800 dark:from-zinc-950/50 dark:via-zinc-900/40 dark:to-zinc-950/50 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-violet-800 text-white shadow-md shadow-violet-500/25">
              <Sparkles className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">Community</p>
              <h3 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-50">Seminar ratings</h3>
              <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                {ratings.length} {ratings.length === 1 ? 'review' : 'reviews'} from members
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-amber-200/80 bg-amber-50/90 px-3 py-1.5 text-sm font-semibold text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" strokeWidth={0} />
            Member feedback
          </div>
        </div>
      </div>

      <ul className="divide-y divide-zinc-200/80 dark:divide-zinc-800">
        {ratings.map((rating, index) => {
          const avg = averageScore(rating.rating_data);
          const key = rating.id ?? rating.user_email ?? `rating-${index}`;

          return (
            <li key={key} className="transition-colors duration-200 hover:bg-zinc-50/60 dark:hover:bg-zinc-950/30">
              <article className="p-5 sm:p-6">
                <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <Gavatar
                      email={rating.user_email}
                      size={40}
                      className="h-11 w-11 rounded-full ring-2 ring-zinc-100 shadow-sm dark:ring-zinc-800"
                    />
                    <div>
                      <p className="font-semibold text-zinc-900 dark:text-white">{rating.user_display_name}</p>
                    </div>
                  </div>
                  {avg != null && (
                    <div className="flex items-center gap-2 rounded-xl border border-violet-200/70 bg-violet-50/80 px-3 py-2 dark:border-violet-900/40 dark:bg-violet-950/35">
                      <span className="text-xs font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">
                        Avg
                      </span>
                      <span className="text-lg font-bold tabular-nums text-violet-900 dark:text-violet-100">{avg}</span>
                      <span className="text-sm text-violet-700/80 dark:text-violet-300/80">/ 5</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2.5">
                  {Object.entries(rating.rating_data || {}).map(([dimKey, val]) => (
                    <RatingRow key={dimKey} dimKey={dimKey} value={val} />
                  ))}
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
