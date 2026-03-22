import { useState, useRef, useCallback, useMemo } from 'react';
import { Star, Mic2, ClipboardCheck, Lightbulb, Loader2, Sparkles, Info } from 'lucide-react';
import Popover from '../../Popover';
import { seminarsAPI } from '../../../api/apiService';
import Toast from '../../Toast';

const KEYS = {
  Skill: 'skill',
  Quality: 'quality',
  Usefulness: 'usefulness',
};

function StarScale({ value, onChange, options }) {
  const [hover, setHover] = useState(null);
  const active = hover ?? value;

  return (
    <div className="space-y-3">
      <div
        className="flex items-center justify-center gap-1 sm:gap-1.5"
        onMouseLeave={() => setHover(null)}
        role="group"
        aria-label="Rating"
      >
        {[1, 2, 3, 4, 5].map((n) => {
          const filled = n <= active;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              onMouseEnter={() => setHover(n)}
              onFocus={() => setHover(n)}
              onBlur={() => setHover(null)}
              className="group relative rounded-xl p-1 transition-transform duration-200 ease-out hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900"
              aria-pressed={value === n}
              aria-label={`${n} of 5`}
            >
              <Star
                strokeWidth={filled ? 0 : 1.5}
                className={`h-8 w-8 transition-all duration-200 ease-out sm:h-9 sm:w-9 ${
                  filled
                    ? 'scale-100 fill-amber-400 text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.35)]'
                    : 'text-zinc-300 group-hover:scale-105 group-hover:text-amber-200/80 dark:text-zinc-600 dark:group-hover:text-zinc-500'
                }`}
              />
            </button>
          );
        })}
      </div>
      <p
        className="min-h-[1.25rem] text-center text-sm font-medium text-violet-700 transition-all duration-200 dark:text-violet-300"
        key={active}
      >
        {options.find((o) => o.value === active)?.label ?? '—'}
      </p>
    </div>
  );
}

export default function SeminarAddRating({ seminar, onRatingAdded }) {
  const toastRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState({
    skill: 5,
    quality: 5,
    usefulness: 5,
  });

  const rateMethods = useMemo(
    () => [
      {
        name: 'Skill',
        key: KEYS.Skill,
        description: 'How clearly did the speaker explain the topic?',
        icon: Mic2,
      },
      {
        name: 'Quality',
        key: KEYS.Quality,
        description: 'How well structured and organized was the session?',
        icon: ClipboardCheck,
      },
      {
        name: 'Usefulness',
        key: KEYS.Usefulness,
        description: 'How valuable was this seminar for you?',
        icon: Lightbulb,
      },
    ],
    []
  );

  const optionsByKey = useMemo(
    () => ({
      [KEYS.Skill]: [
        { label: 'Poor', value: 1 },
        { label: 'Average', value: 2 },
        { label: 'Good', value: 3 },
        { label: 'Excellent', value: 4 },
        { label: 'Outstanding', value: 5 },
      ],
      [KEYS.Quality]: [
        { label: 'Poor', value: 1 },
        { label: 'Average', value: 2 },
        { label: 'Good', value: 3 },
        { label: 'Excellent', value: 4 },
        { label: 'Outstanding', value: 5 },
      ],
      [KEYS.Usefulness]: [
        { label: 'Not at all', value: 1 },
        { label: 'Somewhat', value: 2 },
        { label: 'Very', value: 3 },
        { label: 'Extremely', value: 4 },
        { label: 'Absolutely', value: 5 },
      ],
    }),
    []
  );

  const setDimension = useCallback((key, next) => {
    setRating((r) => ({ ...r, [key]: next }));
  }, []);

  const handleSubmit = async () => {
    if (!seminar?.id || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ratingData: {
          skill: Number(rating.skill),
          quality: Number(rating.quality),
          usefulness: Number(rating.usefulness),
        },
      };
      const response = await seminarsAPI.addRating(seminar.id, payload);
      const { success, message } = response;

      if (success) {
        toastRef.current?.show('Thanks — your rating was saved.', {
          type: 'success',
          duration: 3200,
          position: 'top-right',
        });
        onRatingAdded?.(response);
        setIsOpen(false);
      } else {
        toastRef.current?.show(message || 'Could not save rating.', {
          type: 'error',
          duration: 4000,
          position: 'top-right',
        });
      }
    } catch (err) {
      console.error('Error adding rating:', err);
      toastRef.current?.show('Something went wrong. Try again.', {
        type: 'error',
        duration: 4000,
        position: 'top-right',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const average = useMemo(() => {
    const s = rating.skill + rating.quality + rating.usefulness;
    return (s / 3).toFixed(1);
  }, [rating]);

  if (!seminar?.id) return null;

  const ratingContent = (
    <div className="max-h-[min(85vh,640px)] overflow-y-auto overscroll-contain rounded-2xl border border-zinc-200/90 bg-white/95 p-1 shadow-2xl shadow-zinc-900/10 ring-1 ring-black/5 backdrop-blur-sm dark:border-zinc-700/90 dark:bg-zinc-900/95 dark:ring-white/10">
      <div className="relative overflow-hidden rounded-[0.875rem] bg-gradient-to-b from-zinc-50 to-white px-5 pb-5 pt-6 dark:from-zinc-950 dark:to-zinc-900">
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-violet-500/15 blur-3xl dark:bg-violet-600/20"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-500/15"
          aria-hidden
        />

        <header className="relative mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-violet-700 text-white shadow-lg shadow-violet-500/30">
            <Sparkles className="h-6 w-6" strokeWidth={1.75} />
          </div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-violet-600 dark:text-violet-400">Feedback</p>
          <h3 className="mt-1 text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-xl">Rate this seminar</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Your scores help members choose great sessions. Takes under a minute.
          </p>
        </header>

        <div className="relative mb-5 flex items-center justify-center gap-3 rounded-2xl border border-violet-200/60 bg-violet-50/80 px-4 py-3 dark:border-violet-900/40 dark:bg-violet-950/30">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold tabular-nums text-violet-900 dark:text-violet-100">{average}</span>
            <span className="text-sm font-medium text-violet-700/80 dark:text-violet-300/80">/ 5</span>
          </div>
          <span className="h-4 w-px bg-violet-300/80 dark:bg-violet-700" aria-hidden />
          <span className="text-xs font-medium text-violet-800 dark:text-violet-200">Overall preview</span>
        </div>

        <div className="relative space-y-4">
          {rateMethods.map((method) => {
            const Icon = method.icon;
            return (
              <section
                key={method.key}
                className="rounded-2xl border border-zinc-200/70 bg-white/80 p-4 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/50 dark:hover:border-zinc-700"
              >
                <div className="mb-4 flex gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-50 text-violet-600 shadow-inner dark:from-zinc-800 dark:to-zinc-900 dark:text-violet-400">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{method.name}</h4>
                    <p className="mt-0.5 text-sm leading-snug text-zinc-500 dark:text-zinc-400">{method.description}</p>
                  </div>
                </div>
                <StarScale
                  value={rating[method.key]}
                  onChange={(v) => setDimension(method.key, v)}
                  options={optionsByKey[method.key]}
                />
              </section>
            );
          })}
        </div>

        <div className="relative mt-6 flex gap-3 rounded-xl border border-amber-200/70 bg-gradient-to-r from-amber-50/90 to-orange-50/50 px-4 py-3 text-sm text-amber-950 dark:border-amber-900/50 dark:from-amber-950/40 dark:to-orange-950/20 dark:text-amber-100/95">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400" aria-hidden />
          <p className="leading-snug">Ratings are final after you submit. Double-check your choices.</p>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-zinc-950 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-zinc-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Saving…
            </>
          ) : (
            <>
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              Submit rating
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <Popover
        width={420}
        placement="right"
        className="border-0 bg-transparent shadow-none ring-0"
        content={ratingContent}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <button
          type="button"
          className="group inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200/90 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm transition-all duration-200 hover:border-violet-300/80 hover:bg-violet-50/50 hover:shadow-md active:scale-[0.98] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:border-violet-700 dark:hover:bg-violet-950/40"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-violet-800 text-white shadow-md shadow-violet-500/25 transition-transform duration-200 group-hover:scale-105">
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Star className="h-4 w-4 fill-white/90" strokeWidth={1.5} />
            )}
          </span>
          {isSubmitting ? 'Submitting…' : 'Rate seminar'}
        </button>
      </Popover>

      <Toast ref={toastRef} />
    </div>
  );
}
