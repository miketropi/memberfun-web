import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Award, Clock, Tag } from 'lucide-react';

export default function ChallengeCard({ challenge }) {
  const {
    id,
    title,
    excerpt,
    featured_media,
    max_score,
    submission_deadline_enabled,
    submission_deadline,
    challenge_category,
  } = challenge;

  return (
    <Link
      to={`/dashboard/challenges/${id}`}
      className="block overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm transition-all hover:border-violet-200/80 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-violet-900/50"
    >
      <div className="relative overflow-hidden pt-[56.25%]">
        {featured_media ? (
          <img
            src={featured_media.large}
            alt={title.rendered}
            className="absolute left-0 top-0 h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-zinc-100 text-zinc-400 dark:bg-zinc-800">
            No image
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="mb-4 line-clamp-2 text-xl font-semibold text-zinc-950 dark:text-zinc-50" dangerouslySetInnerHTML={{ __html: title.rendered }} />

        <div className="mb-5 flex flex-wrap gap-2.5">
          {max_score && (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-200/80 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-800 dark:border-violet-900/50 dark:bg-violet-950/40 dark:text-violet-200">
              <Award className="h-3.5 w-3.5" />
              {max_score} points
            </div>
          )}

          {challenge_category && challenge_category.length > 0 && (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
              <Tag className="h-3.5 w-3.5" />
              {challenge_category.map((category) => category.name).join(', ')}
            </div>
          )}

          {submission_deadline_enabled && (
            <div
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                new Date(submission_deadline) < new Date()
                  ? 'border-rose-200/80 bg-rose-50 text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-200'
                  : 'border-emerald-200/80 bg-emerald-50 text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200'
              }`}
            >
              <Clock className="h-3.5 w-3.5" />
              {new Date(submission_deadline) < new Date()
                ? 'Expired'
                : formatDistanceToNow(new Date(submission_deadline), { addSuffix: true })}
            </div>
          )}
        </div>

        <div className="line-clamp-3 text-zinc-600 dark:text-zinc-400" dangerouslySetInnerHTML={{ __html: excerpt.rendered }} />
      </div>
    </Link>
  );
}
