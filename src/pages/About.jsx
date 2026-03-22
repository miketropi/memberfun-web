import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Mail,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';

const FOCUS_AREAS = [
  'Member profiles & directory',
  'Seminars & calendars',
  'Points & engagement',
  'Newsletters & announcements',
  'Secure, web-first access',
  'Thoughtful admin workflows',
];

const STATS = [
  { value: '3-in-1', label: 'Core surfaces' },
  { value: '24/7', label: 'Web access' },
  { value: '100%', label: 'Member-first UX' },
  { value: '1 hub', label: 'Single source of truth' },
];

const MISSION = [
  'Help member organizations spend less time herding links and more time building community — through one calm, structured hub.',
  'We prioritize readable interfaces, clear roles, and workflows that match how real teams run programs and seminars.',
];

const VISION = [
  'Every member-led group — from clubs to professional circles — deserves tooling that feels intentional, not improvised.',
  'We aim to be the default place Beplus-style communities trust for knowledge sharing, events, and staying in sync.',
];

const TEAM = [
  {
    name: 'Emma Wilson',
    role: 'CEO & Co-Founder',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  {
    name: 'David Chen',
    role: 'CTO & Co-Founder',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  {
    name: 'Sophia Martinez',
    role: 'Head of Product',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
];

const TIMELINE = [
  {
    year: '2025',
    title: 'Foundation',
    body: 'MemberFun launches with a focus on member management, seminar scheduling, and reward points for organizations like Beplus.',
  },
  {
    year: '2025',
    title: 'Profiles & directory',
    body: 'Core member profiles ship so groups can onboard people quickly and keep contact paths accurate.',
  },
  {
    year: '2025',
    title: 'Events & schedules',
    body: 'Seminar and event tooling rolls out — fewer lost links, clearer expectations for attendees.',
  },
  {
    year: '2025',
    title: 'Points & communication',
    body: 'Bonus points and structured announcements help leaders recognize participation without noisy side channels.',
  },
];

const About = () => {
  return (
    <div className="min-h-0">
      {/* Hero — same language as Contact */}
      <section className="relative overflow-hidden border-b border-zinc-200/90 dark:border-zinc-800">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#71717a0d_1px,transparent_1px),linear-gradient(to_bottom,#71717a0d_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] dark:bg-[linear-gradient(to_right,#fafafa08_1px,transparent_1px),linear-gradient(to_bottom,#fafafa08_1px,transparent_1px)]" />
        <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-600/15" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl dark:bg-cyan-600/10" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:flex lg:items-end lg:justify-between lg:gap-16 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">
              About
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
              One hub for people who{' '}
              <span className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-cyan-400">
                run member communities
              </span>
              .
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-xl">
              MemberFun exists so admins and members stop juggling threads, lost links, and duplicate
              calendars — and get back to learning together.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/"
                className="text-sm font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                ← Back to home
              </Link>
            </div>
          </div>

          <div className="mt-12 grid shrink-0 grid-cols-2 gap-3 sm:max-w-md lg:mt-0 lg:max-w-sm">
            <div className="rounded-2xl border border-zinc-200/90 bg-white/90 p-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
              <p className="text-2xl font-bold text-zinc-950 dark:text-white">2025</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Founded
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200/90 bg-white/90 p-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
              <p className="text-2xl font-bold text-zinc-950 dark:text-white">Beplus</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Built with
              </p>
            </div>
            <div className="col-span-2 rounded-2xl border border-violet-200/80 bg-violet-50/90 p-4 dark:border-violet-900/50 dark:bg-violet-950/40">
              <div className="flex items-center gap-2 text-violet-800 dark:text-violet-200">
                <Sparkles className="h-5 w-5 shrink-0" aria-hidden />
                <span className="text-sm font-semibold">
                  Articles, seminars, points, and announcements — designed to live together.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story + stats — mirrors Contact channels + form column balance */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-6 lg:col-span-5">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-zinc-50">Our story</h2>
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              We started from scattered group chats and “which link was the seminar again?” moments.
              MemberFun is our answer: one calm place for profiles, schedules, points, and official
              updates.
            </p>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Where we focus
              </h3>
              <ul className="mt-4 space-y-2">
                {FOCUS_AREAS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-zinc-200/90 bg-white px-4 py-3 text-sm font-medium text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-950/80 dark:text-violet-300">
                      <Check className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-lg shadow-zinc-200/40 dark:border-zinc-800 dark:bg-zinc-900/90 dark:shadow-black/40 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 border-b border-zinc-200/90 pb-6 dark:border-zinc-800">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600 text-white shadow-md">
                  <BookOpen className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-zinc-950 dark:text-white">What we do</h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Membership hub for organizations like Beplus.
                  </p>
                </div>
              </div>
              <p className="mt-6 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                We provide profiles, seminar scheduling, bonus points, and structured communication so
                your community spends energy on people — not tooling.
              </p>
              <h3 className="mt-10 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                At a glance
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-zinc-200/90 bg-zinc-50 p-4 text-center dark:border-zinc-800 dark:bg-zinc-950/60"
                  >
                    <p className="text-xl font-bold text-violet-600 dark:text-violet-400 sm:text-2xl">
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & vision — banded like Contact map */}
      <section className="border-y border-zinc-200/90 bg-zinc-100/80 py-16 dark:border-zinc-800 dark:bg-zinc-900/40 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">
                Direction
              </p>
              <h2 className="mt-2 text-2xl font-bold text-zinc-950 dark:text-white sm:text-3xl">
                Mission & vision
              </h2>
              <p className="mt-2 max-w-xl text-zinc-600 dark:text-zinc-400">
                Why we build and where we are headed.
              </p>
            </div>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/85 sm:p-8">
              <div className="flex items-center gap-2 text-violet-700 dark:text-violet-300">
                <Target className="h-5 w-5" aria-hidden />
                <span className="text-sm font-bold uppercase tracking-wide">Mission</span>
              </div>
              {MISSION.map((p, i) => (
                <p key={i} className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {p}
                </p>
              ))}
            </div>
            <div className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/85 sm:p-8">
              <div className="flex items-center gap-2 text-violet-700 dark:text-violet-300">
                <Sparkles className="h-5 w-5" aria-hidden />
                <span className="text-sm font-bold uppercase tracking-wide">Vision</span>
              </div>
              {VISION.map((p, i) => (
                <p key={i} className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      {/* <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">
            Team
          </p>
          <h2 className="mt-4 text-2xl font-bold text-zinc-950 dark:text-white sm:text-3xl">
            People behind the product
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
            A small group focused on member experience, reliable delivery, and clear communication.
          </p>
        </div>
        <ul className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((member) => (
            <li
              key={member.name}
              className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm transition hover:border-violet-300/60 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-violet-700/50 sm:p-8"
            >
              <img
                className="mx-auto h-36 w-36 rounded-full object-cover ring-2 ring-zinc-100 dark:ring-zinc-800"
                src={member.image}
                alt={member.name}
              />
              <h3 className="mt-5 text-center text-lg font-bold text-zinc-950 dark:text-white">
                {member.name}
              </h3>
              <p className="mt-1 text-center text-sm font-semibold text-violet-600 dark:text-violet-400">
                {member.role}
              </p>
            </li>
          ))}
        </ul>
      </section> */}

      {/* Timeline */}
      <section className="border-t border-zinc-200/90 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-950/50 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300 lg:text-center">
              Our journey
            </p>
            <h2 className="mt-4 text-2xl font-bold text-zinc-950 dark:text-white sm:text-3xl lg:text-center">
              MemberFun timeline
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400 lg:text-center">
              From foundation to the loops members use every week.
            </p>
          </div>
          <dl className="mt-12 space-y-8 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-10 md:space-y-0">
            {TIMELINE.map((item, index) => (
              <div key={item.title} className="relative md:pl-0">
                <dt className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600 text-sm font-bold text-white shadow-md dark:from-violet-500 dark:to-cyan-500">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-zinc-950 dark:text-white">
                      <span className="text-violet-600 dark:text-violet-400">{item.year}</span>
                      {' — '}
                      {item.title}
                    </p>
                  </div>
                </dt>
                <dd className="mt-2 pl-16 text-base leading-relaxed text-zinc-700 dark:text-zinc-300 md:pl-16">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA — match Contact tip strip energy */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="rounded-3xl border border-violet-200/80 bg-gradient-to-br from-violet-50 via-white to-cyan-50 p-8 shadow-sm dark:border-violet-900/40 dark:from-violet-950/50 dark:via-zinc-900 dark:to-zinc-900 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-violet-800 dark:text-violet-200">
              <Users className="h-6 w-6 shrink-0" aria-hidden />
              <span className="text-sm font-bold uppercase tracking-wide">Next step</span>
            </div>
            <h2 className="mt-3 text-2xl font-bold text-zinc-950 dark:text-white sm:text-3xl">
              Ready to simplify how your community runs?
            </h2>
            <p className="mt-3 text-zinc-700 dark:text-zinc-300">
              Tell us what you are trying to fix — demos, onboarding, or a quick question all start
              the same way.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-6 py-3.5 text-center text-base font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Contact us
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-xl border-2 border-zinc-300 bg-white px-6 py-3.5 text-center text-base font-semibold text-zinc-900 transition hover:border-zinc-400 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:border-zinc-500"
            >
              Create account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
