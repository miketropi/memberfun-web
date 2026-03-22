const HistoryTimeline = () => {
  const timelineItems = [
    {
      year: '2025',
      title: 'Foundation',
      description:
        'MemberFun launches with a focus on member management, seminar scheduling, and reward points for organizations like Beplus.',
    },
    {
      year: '2025',
      title: 'Profiles & directory',
      description:
        'Core member profiles ship so groups can onboard people quickly and keep contact paths accurate.',
    },
    {
      year: '2025',
      title: 'Events & schedules',
      description:
        'Seminar and event tooling rolls out — fewer lost links, clearer expectations for attendees.',
    },
    {
      year: '2025',
      title: 'Points & communication',
      description:
        'Bonus points and structured announcements help leaders recognize participation without noisy side channels.',
    },
  ];

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">
            Our journey
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
            MemberFun timeline
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-700 dark:text-zinc-300">
            From first commit to the product you see today — built with member communities
            in mind.
          </p>
        </div>

        <dl className="mt-14 space-y-10 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-12 md:space-y-0">
          {timelineItems.map((item, index) => (
            <div key={item.title} className="relative">
              <dt>
                <div className="absolute flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600 text-sm font-bold text-white shadow-md dark:from-violet-500 dark:to-cyan-500">
                  {index + 1}
                </div>
                <p className="ml-16 text-lg font-bold leading-6 text-zinc-950 dark:text-zinc-50">
                  <span className="text-violet-600 dark:text-violet-400">{item.year}</span>
                  {' — '}
                  {item.title}
                </p>
              </dt>
              <dd className="ml-16 mt-2 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                {item.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default HistoryTimeline;
