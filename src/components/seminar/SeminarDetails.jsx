import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Users,
  FileText,
  Download,
  Undo2,
  Star,
} from 'lucide-react';
import SeminarAddRating from './components/SeminarAddRating';
import SeminarRatingTable from './components/SeminarRatingTable';
import { seminarsAPI } from '../../api/apiService';
import Comment from '../common/Comment';

export default function SeminarDetails({ seminar, onClose }) {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    if (!seminar?.id) return;
    const fetchRatings = async () => {
      const data = await seminarsAPI.getRatings(seminar.id);
      setRatings(data);
    };
    fetchRatings();
  }, [seminar?.id]);

  const handleRatingAdded = async () => {
    if (!seminar?.id) return;
    const data = await seminarsAPI.getRatings(seminar.id);
    setRatings(data);
  };

  if (!seminar) return null;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-zinc-200/90 bg-white sm:p-6 md:p-8 dark:border-zinc-800 dark:bg-zinc-900/60">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2.5 font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
            >
              <Undo2 className="h-5 w-5" />
              Back
            </button>
            <div className="min-w-0">
              <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-2xl">{seminar.title}</h2>
              {seminar.double_points && (
                <span className="mt-2 inline-flex items-center rounded-md border border-amber-400/80 bg-gradient-to-r from-amber-200 to-orange-400 px-2.5 py-0.5 text-xs font-bold text-amber-950 dark:border-amber-700 dark:from-amber-700 dark:to-orange-800 dark:text-amber-100">
                  <Star className="mr-1 h-3.5 w-3.5" />
                  Double points
                  <Star className="ml-1 h-3.5 w-3.5" />
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-5">
          <div className="col-span-1 md:col-span-8">
            <div
              className="prose prose-zinc mb-6 max-w-none dark:prose-invert sm:mb-8"
              dangerouslySetInnerHTML={{ __html: seminar.content }}
            />

            <section
              className="relative mb-6 overflow-hidden rounded-2xl border border-zinc-200/80 bg-gradient-to-b from-zinc-50 to-white p-4 shadow-sm ring-1 ring-black/[0.02] sm:mb-8 sm:p-5 dark:border-zinc-800 dark:from-zinc-950 dark:to-zinc-900/90 dark:ring-white/[0.04]"
              aria-label="Session details"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-600/15"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/45 to-transparent dark:via-violet-500/35"
                aria-hidden
              />

              <header className="relative mb-4 flex items-center gap-2 sm:mb-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-violet-800 text-white shadow-md shadow-violet-500/20">
                  <Calendar className="h-4 w-4" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                    At a glance
                  </p>
                  <h3 className="text-sm font-bold text-zinc-950 dark:text-zinc-50 sm:text-base">Session details</h3>
                </div>
              </header>

              <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex gap-3 rounded-xl border border-zinc-200/70 bg-white/90 p-4 backdrop-blur-sm transition-shadow duration-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/50">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-50 text-violet-600 dark:from-zinc-800 dark:to-zinc-900 dark:text-violet-400">
                    <Calendar className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      Date
                    </p>
                    <p className="mt-0.5 font-semibold leading-snug text-zinc-900 dark:text-zinc-100">
                      {seminar.formatted_date || format(parseISO(seminar.date), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-xl border border-zinc-200/70 bg-white/90 p-4 backdrop-blur-sm transition-shadow duration-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/50">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-50 text-violet-600 dark:from-zinc-800 dark:to-zinc-900 dark:text-violet-400">
                    <Clock className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      Time
                    </p>
                    <p className="mt-0.5 font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
                      {seminar.formatted_time || seminar.time}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-xl border border-zinc-200/70 bg-white/90 p-4 backdrop-blur-sm transition-shadow duration-200 hover:shadow-md sm:col-span-2 dark:border-zinc-800 dark:bg-zinc-950/50">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-50 text-violet-600 dark:from-zinc-800 dark:to-zinc-900 dark:text-violet-400">
                    <MapPin className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      Location
                    </p>
                    <p className="mt-0.5 break-words font-semibold leading-snug text-zinc-900 dark:text-zinc-100">
                      {seminar.location}
                    </p>
                  </div>
                </div>

                <div
                  className={`flex gap-3 rounded-xl border border-zinc-200/70 bg-white/90 p-4 backdrop-blur-sm transition-shadow duration-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/50 ${
                    !seminar.capacity ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-50 text-violet-600 dark:from-zinc-800 dark:to-zinc-900 dark:text-violet-400">
                    <User className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      Host
                    </p>
                    <p className="mt-0.5 font-semibold text-zinc-900 dark:text-zinc-100">
                      {seminar.host?.name || 'Unknown'}
                    </p>
                  </div>
                </div>

                {seminar.capacity ? (
                  <div className="flex gap-3 rounded-xl border border-zinc-200/70 bg-white/90 p-4 backdrop-blur-sm transition-shadow duration-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/50">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-50 text-violet-600 dark:from-zinc-800 dark:to-zinc-900 dark:text-violet-400">
                      <Users className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        Capacity
                      </p>
                      <p className="mt-0.5 font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
                        {seminar.capacity}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </section>

            {/* {
              JSON.stringify(seminar.ratings)
            } */}
            <SeminarRatingTable ratings={ratings} />
            <SeminarAddRating seminar={seminar} onRatingAdded={handleRatingAdded} />
          </div>
          
          <div className="col-span-1 md:col-span-4">
            {seminar.featured_image && (
              <div className="mb-6 sm:mb-8">
                <img
                  src={seminar.featured_image}
                  alt={seminar.title}
                  className="h-auto w-full rounded-2xl border border-zinc-200/90 object-cover shadow-md dark:border-zinc-800"
                />
              </div>
            )}
            
            <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50 p-4 sm:p-6 dark:border-zinc-800 dark:bg-zinc-950/50">
              <h3 className="mb-4 flex items-center text-base font-semibold text-zinc-900 dark:text-zinc-100 sm:text-lg">
                <FileText className="mr-3 h-5 w-5 shrink-0 text-violet-600 dark:text-violet-400" />
                Seminar documents
              </h3>

              {seminar.documents && seminar.documents.length > 0 ? (
                <ul className="space-y-3">
                  {seminar.documents.map((doc) => (
                    <li key={doc.id}>
                      <a
                        href={doc.url}
                        download={doc.filename}
                        className="group flex items-center rounded-xl border border-zinc-200/90 bg-white p-3 transition-colors hover:border-violet-200 hover:bg-violet-50/40 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-violet-900 dark:hover:bg-violet-950/20"
                      >
                        <Download className="mr-3 h-5 w-5 shrink-0 text-violet-600 group-hover:text-violet-500 dark:text-violet-400" />
                        <span className="break-words font-medium text-zinc-800 group-hover:text-zinc-950 dark:text-zinc-200 dark:group-hover:text-white">
                          {doc.title}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-zinc-500 dark:text-zinc-400">No documents available for this seminar.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <SeminarComments seminarId={seminar.id} isHost={isHost} /> */}
      <Comment postId={seminar.id} />
    </div>
  );
}