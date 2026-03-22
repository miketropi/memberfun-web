const MissionVision = ({
  missionTitle = 'Our mission',
  missionContent = [
    'Help member organizations spend less time herding links and more time building community — through one calm, structured hub.',
    'We prioritize readable interfaces, clear roles, and workflows that match how real teams run programs and seminars.',
  ],
  visionTitle = 'Our vision',
  visionContent = [
    'Every member-led group — from clubs to professional circles — deserves tooling that feels intentional, not improvised.',
    'We aim to be the default place Beplus-style communities trust for knowledge sharing, events, and staying in sync.',
  ],
}) => {
  return (
    <div className="relative overflow-hidden border-b border-zinc-200/90 bg-zinc-100/80 py-20 dark:border-zinc-800 dark:bg-zinc-900/40 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#71717a0d_1px,transparent_1px),linear-gradient(to_bottom,#71717a0d_1px,transparent_1px)] bg-[size:3rem_3rem] dark:bg-[linear-gradient(to_right,#fafafa06_1px,transparent_1px),linear-gradient(to_bottom,#fafafa06_1px,transparent_1px)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="rounded-2xl border border-zinc-200/90 bg-white/90 p-8 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80 lg:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
              <span className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-cyan-400">
                {missionTitle}
              </span>
            </h2>
            {missionContent.map((paragraph, index) => (
              <p
                key={index}
                className="mt-5 text-base leading-relaxed text-zinc-700 dark:text-zinc-300"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="rounded-2xl border border-zinc-200/90 bg-white/90 p-8 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80 lg:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
              <span className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-cyan-400">
                {visionTitle}
              </span>
            </h2>
            {visionContent.map((paragraph, index) => (
              <p
                key={index}
                className="mt-5 text-base leading-relaxed text-zinc-700 dark:text-zinc-300"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
