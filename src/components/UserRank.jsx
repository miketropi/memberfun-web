import { useState, useMemo } from 'react';
import {
  Gem,
  Crown,
  Award,
  Zap,
  Sprout,
  CheckCircle2,
  Sparkles,
  Info,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import Modal from './Modal';

function normalizeRank(rank) {
  if (rank === null || rank === undefined || rank === '') return null;
  const n = typeof rank === 'number' ? rank : parseInt(String(rank).trim(), 10);
  return Number.isFinite(n) ? n : null;
}

function getRankConfig(tier) {
  switch (tier) {
    case 1:
      return {
        title: 'Diamond',
        tagline: 'Peak performance',
        Icon: Gem,
        chip: 'border border-white/25 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-violet-800 text-white shadow-lg shadow-violet-500/20 ring-1 ring-inset ring-white/20',
        iconWrap: 'bg-white/15 shadow-inner shadow-black/10 backdrop-blur-sm',
        modalRing: 'from-violet-500 via-fuchsia-500 to-violet-700',
        progressFrom: 'from-violet-500',
        progressTo: 'to-fuchsia-500',
      };
    case 2:
      return {
        title: 'Master',
        tagline: 'Elite contributor',
        Icon: Crown,
        chip: 'border border-white/20 bg-gradient-to-br from-violet-600 to-violet-900 text-white shadow-lg shadow-violet-600/25 ring-1 ring-inset ring-white/15',
        iconWrap: 'bg-white/15 shadow-inner shadow-black/10 backdrop-blur-sm',
        modalRing: 'from-violet-500 to-violet-950',
        progressFrom: 'from-violet-500',
        progressTo: 'to-violet-800',
      };
    case 3:
      return {
        title: 'Expert',
        tagline: 'Highly skilled',
        Icon: Award,
        chip: 'border border-white/20 bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-500/20 ring-1 ring-inset ring-white/15',
        iconWrap: 'bg-white/15 shadow-inner shadow-black/10 backdrop-blur-sm',
        modalRing: 'from-emerald-500 to-teal-600',
        progressFrom: 'from-emerald-500',
        progressTo: 'to-teal-600',
      };
    case 4:
    case 5:
      return {
        title: 'Advanced',
        tagline: 'Building momentum',
        Icon: Zap,
        chip: 'border border-violet-200/80 bg-gradient-to-b from-violet-50 to-white text-violet-950 shadow-md shadow-violet-500/5 ring-1 ring-violet-100/80 dark:border-violet-800/60 dark:from-violet-950/60 dark:to-zinc-900 dark:text-violet-50 dark:ring-violet-900/40',
        iconWrap: 'bg-violet-500/15 text-violet-700 shadow-inner dark:bg-violet-500/20 dark:text-violet-200',
        modalRing: 'from-violet-500 to-cyan-500',
        progressFrom: 'from-violet-400',
        progressTo: 'to-cyan-500',
      };
    default:
      return {
        title: 'Beginner',
        tagline: 'Start your climb',
        Icon: Sprout,
        chip: 'border border-zinc-200/90 bg-gradient-to-b from-zinc-50 to-white text-zinc-900 shadow-md ring-1 ring-zinc-100/80 dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-900 dark:text-zinc-100 dark:ring-zinc-800',
        iconWrap: 'bg-zinc-200/60 text-zinc-700 shadow-inner dark:bg-zinc-950 dark:text-zinc-300',
        modalRing: 'from-zinc-400 to-zinc-700',
        progressFrom: 'from-zinc-400',
        progressTo: 'to-zinc-600',
      };
  }
}

const LADDER_LABELS = ['D', 'M', 'E', '4', '5'];

const UserRank = ({ rank }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tier = useMemo(() => normalizeRank(rank), [rank]);
  const configTier = tier == null ? 100 : tier;
  const { title, tagline, Icon, chip, iconWrap, modalRing, progressFrom, progressTo } = useMemo(
    () => getRankConfig(configTier),
    [configTier]
  );

  const description = useMemo(() => {
    const t = tier == null ? 100 : tier;
    if (t < 1 || t > 5) {
      return 'Beginner is where every journey starts. Stay active, join challenges, and climb the ranks over time.';
    }
    switch (t) {
      case 1:
        return 'Diamond represents mastery and excellence—members who consistently deliver exceptional contributions and leadership.';
      case 2:
        return 'Master signals deep expertise and dedication. These members help shape the community and set the bar for others.';
      case 3:
        return 'Expert reflects strong proficiency and commitment—active participants who add real value in discussions and challenges.';
      case 4:
      case 5:
        return 'Advanced means you’re building momentum: regular engagement and growing impact on the way toward top ranks.';
      default:
        return 'Beginner is where every journey starts. Stay active, join challenges, and climb the ranks over time.';
    }
  }, [tier]);

  const progressPercent = useMemo(() => {
    if (tier == null || tier < 1) return 6;
    return Math.min(100, Math.round((tier / 5) * 100));
  }, [tier]);

  const levelUpTips = [
    'Join discussions and stay consistently active',
    'Complete challenges and attend seminars',
    'Help others and share high-quality work',
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        aria-expanded={isModalOpen}
        aria-haspopup="dialog"
        className={`group inline-flex max-w-full items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 text-left text-sm font-semibold tracking-tight transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950 ${chip}`}
      >
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 ${iconWrap}`}
          aria-hidden
        >
          <Icon className="h-[1.125rem] w-[1.125rem]" strokeWidth={2.25} />
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5 text-left">
          <span className="min-w-0 truncate leading-none">{title}</span>
          <span className="hidden text-[0.65rem] font-medium uppercase tracking-wider opacity-80 sm:block">
            {tagline}
          </span>
        </span>
        <ChevronRight
          className="h-4 w-4 shrink-0 opacity-50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:opacity-90"
          aria-hidden
        />
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Rank" size="lg">
        <div className="space-y-6">
          {/* Hero */}
          <div className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-gradient-to-b from-zinc-50 via-white to-zinc-50/80 p-8 text-center dark:border-zinc-800 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
            <div
              className={`pointer-events-none absolute -left-20 top-0 h-48 w-48 rounded-full bg-gradient-to-br ${modalRing} opacity-[0.12] blur-3xl dark:opacity-20`}
              aria-hidden
            />
            <div
              className={`pointer-events-none absolute -bottom-24 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${modalRing} opacity-[0.1] blur-3xl dark:opacity-15`}
              aria-hidden
            />

            <div className="relative mx-auto mb-5 flex w-fit flex-col items-center">
              <div
                className={`relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl bg-gradient-to-br ${modalRing} text-white shadow-xl`}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 to-transparent" aria-hidden />
                <Icon className="relative h-9 w-9 drop-shadow-md" strokeWidth={1.75} />
              </div>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-zinc-200/80 bg-white/90 px-3 py-1 text-xs font-semibold tabular-nums text-zinc-600 shadow-sm backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-300">
                <TrendingUp className="h-3.5 w-3.5 text-violet-500 dark:text-violet-400" />
                Level {tier != null ? tier : '—'}
              </div>
            </div>

            <p className="relative text-[0.65rem] font-bold uppercase tracking-[0.22em] text-violet-600 dark:text-violet-400">
              Current tier
            </p>
            <h3 className="relative mt-1.5 text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-[1.75rem]">
              {title}
            </h3>
            <p className="relative mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">{tagline}</p>

            {/* Tier ladder */}
            <div className="relative mx-auto mt-8 max-w-md">
              <div className="mb-2 flex justify-between px-1 text-[0.6rem] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {LADDER_LABELS.map((label, i) => {
                  const step = i + 1;
                  const active = tier != null && tier === step;
                  const passed = tier != null && tier > step;
                  return (
                    <span
                      key={label}
                      className={`w-8 text-center transition-colors ${
                        active
                          ? 'text-violet-600 dark:text-violet-400'
                          : passed
                            ? 'text-zinc-500 dark:text-zinc-400'
                            : ''
                      }`}
                    >
                      {label}
                    </span>
                  );
                })}
              </div>
              <div className="relative h-2 overflow-hidden rounded-full bg-zinc-200/90 dark:bg-zinc-800">
                <div
                  className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${progressFrom} ${progressTo} transition-[width] duration-700 ease-out`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="mt-2 text-center text-xs text-zinc-500 dark:text-zinc-400">
                Standing on the 5-level member ladder
              </p>
            </div>
          </div>

          {/* About */}
          <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50/80 p-5 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/40">
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-zinc-200/80 dark:bg-zinc-900 dark:ring-zinc-700">
                <Info className="h-4 w-4 text-violet-600 dark:text-violet-400" strokeWidth={2} />
              </div>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">About this rank</h4>
            </div>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 whitespace-normal">{description}</p>
          </div>

          {/* Privileges */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500 dark:text-amber-400" />
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Your privileges</h4>
            </div>
            <ul className="grid gap-2 sm:grid-cols-1">
              {tier != null && tier >= 1 && tier <= 3 && (
                <li className="flex items-start gap-3 rounded-xl border border-zinc-200/60 bg-white/60 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/30">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm leading-snug text-zinc-700 dark:text-zinc-300">
                    Priority access to new features
                  </span>
                </li>
              )}
              {tier != null && tier >= 1 && tier <= 5 && (
                <li className="flex items-start gap-3 rounded-xl border border-zinc-200/60 bg-white/60 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/30">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm leading-snug text-zinc-700 dark:text-zinc-300">
                    Special community recognition
                  </span>
                </li>
              )}
              <li className="flex items-start gap-3 rounded-xl border border-zinc-200/60 bg-white/60 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/30">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm leading-snug text-zinc-700 dark:text-zinc-300">
                  Participation rewards
                </span>
              </li>
            </ul>
          </div>

          {/* Level up */}
          <div className="relative overflow-hidden rounded-2xl border border-violet-200/70 bg-gradient-to-br from-violet-50 via-white to-violet-50/30 p-5 dark:border-violet-900/35 dark:from-violet-950/50 dark:via-zinc-900 dark:to-violet-950/20">
            <div
              className="pointer-events-none absolute right-0 top-0 h-24 w-24 translate-x-1/3 -translate-y-1/3 rounded-full bg-violet-400/20 blur-2xl dark:bg-violet-600/15"
              aria-hidden
            />
            <div className="relative flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Level up</h4>
            </div>
            <ul className="relative mt-4 space-y-3">
              {levelUpTips.map((tip, i) => (
                <li key={tip} className="flex gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-violet-600/10 text-xs font-bold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 leading-snug">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserRank;
