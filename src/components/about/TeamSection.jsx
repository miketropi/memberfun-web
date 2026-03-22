const TeamSection = () => {
  const teamMembers = [
    {
      name: 'Emma Wilson',
      role: 'CEO & Co-Founder',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    },
    {
      name: 'David Chen',
      role: 'CTO & Co-Founder',
      image:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    },
    {
      name: 'Sophia Martinez',
      role: 'Head of Product',
      image:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    },
  ];

  return (
    <section className="border-b border-zinc-200/90 py-20 dark:border-zinc-800 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">
          Team
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
          Meet the people behind MemberFun
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-700 dark:text-zinc-300">
          A small group obsessed with member experience, reliable software, and humane
          operations.
        </p>
        <ul className="mx-auto mt-14 grid max-w-5xl gap-12 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <li key={member.name}>
              <div className="rounded-2xl border border-zinc-200/90 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/85">
                <img
                  className="mx-auto h-40 w-40 rounded-full object-cover ring-2 ring-zinc-100 dark:ring-zinc-800 xl:h-48 xl:w-48"
                  src={member.image}
                  alt={member.name}
                />
                <div className="mt-6 space-y-1">
                  <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">
                    {member.name}
                  </h3>
                  <p className="text-base font-semibold text-violet-600 dark:text-violet-400">
                    {member.role}
                  </p>
                </div>
                <ul className="mt-5 flex justify-center gap-4">
                  <li>
                    <a
                      href="#"
                      className="text-zinc-400 transition hover:text-violet-600 dark:hover:text-violet-400"
                    >
                      <span className="sr-only">Twitter</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-zinc-400 transition hover:text-violet-600 dark:hover:text-violet-400"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                        <path
                          fillRule="evenodd"
                          d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TeamSection;
