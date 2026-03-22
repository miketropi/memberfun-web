import ChallengesList from './ChallengesList';

export default function ChallengesTab() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">Compete</p>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">Challenges</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Browse challenges, submit solutions, and earn points.</p>
      </div>
      <ChallengesList />
    </div>
  );
}
