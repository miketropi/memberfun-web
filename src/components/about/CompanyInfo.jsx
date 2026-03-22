const CompanyInfo = ({
  title = 'Our story',
  description =
    'MemberFun started as a response to scattered group chats and lost links. We focus on clarity for admins and members alike.',
  whatWeDo = {
    title: 'What we do',
    content:
      'We provide a membership hub for organizations like Beplus: profiles, seminar scheduling, bonus points, and structured communication.',
  },
  expertise = {
    title: 'Where we focus',
    items: [
      'Member profiles & directory',
      'Seminars & calendars',
      'Points & engagement',
      'Newsletters & announcements',
      'Secure, web-first access',
      'Thoughtful admin workflows',
    ],
  },
  stats = [
    { value: '3-in-1', label: 'Core surfaces' },
    { value: '24/7', label: 'Web access' },
    { value: '100%', label: 'Member-first UX' },
    { value: '1 hub', label: 'Single source of truth' },
  ],
}) => {
  return (
    <section className="border-b border-zinc-200/90 py-20 dark:border-zinc-800 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
              {description}
            </p>
          </div>

          <div className="grid gap-14 md:grid-cols-2 md:gap-16">
            <div className="space-y-10">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
                  {whatWeDo.title}
                </h3>
                <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {whatWeDo.content}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
                  {expertise.title}
                </h3>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {expertise.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-zinc-700 dark:text-zinc-300"
                    >
                      <svg
                        className="mt-0.5 h-5 w-5 shrink-0 text-violet-600 dark:text-violet-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-base leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
                At a glance
              </h3>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-zinc-200/90 bg-white p-6 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900/85"
                  >
                    <div className="text-2xl font-bold text-violet-600 dark:text-violet-400 sm:text-3xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;
