import { createElement, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  ChevronDown,
  Layers,
  Mail,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const shell = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';
const sectionY = 'py-20 sm:py-24 lg:py-28';

const cardBase =
  'rounded-2xl border border-zinc-200/90 bg-white shadow-sm transition hover:border-violet-300/60 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/85 dark:shadow-none dark:hover:border-violet-700/50';

const band =
  'border-y border-zinc-200/80 bg-zinc-100/80 dark:border-zinc-800/60 dark:bg-zinc-900/45';

function SectionHeader({ kicker, title, lead, className = '' }) {
  return (
    <div className={`home-section-header mx-auto max-w-3xl text-center ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">
        {kicker}
      </p>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl lg:text-[2.45rem] lg:leading-[1.15]">
        {title}
      </h2>
      {lead ? (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-lg">
          {lead}
        </p>
      ) : null}
    </div>
  );
}

const heroStats = [
  { value: 'Unified', label: 'Member surface' },
  { value: 'Beplus', label: 'Built with' },
];

const valueProps = [
  {
    title: 'Tech & learning',
    body: 'Publish articles, link resources, and keep technical discussions in one thread.',
    icon: BookOpen,
  },
  {
    title: 'Faster coordination',
    body: 'Fewer scattered chats — schedules and updates land where members already look.',
    icon: Zap,
  },
  {
    title: 'Trust & clarity',
    body: 'Roles, profiles, and announcements so everyone knows who said what, and when.',
    icon: ShieldCheck,
  },
  {
    title: 'Human tone',
    body: 'Interfaces stay calm and readable so admins spend time on people, not tooling.',
    icon: MessageCircle,
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Onboard your circle',
    body: 'Invite members, set basics, and align on how you will use the hub.',
  },
  {
    step: '02',
    title: 'Publish & schedule',
    body: 'Share articles, post seminars, and keep calendars accurate without duplicate work.',
  },
  {
    step: '03',
    title: 'Stay in sync',
    body: 'Use newsletters and in-app updates so momentum does not depend on side channels.',
  },
];

const features = [
  {
    title: 'Profile management',
    description:
      'A single profile story per member — skills, interests, and contact paths that stay current.',
    highlights: ['Self-serve edits', 'Clear member directory', 'Admin-friendly review'],
    icon: Users,
    accent: 'from-violet-600 to-fuchsia-500',
  },
  {
    title: 'Seminar scheduling',
    description:
      'Plan sessions, surface them on a timeline, and reduce “which link was it again?” moments.',
    highlights: ['Shared calendar view', 'Reminders members notice', 'Room for notes'],
    icon: Calendar,
    accent: 'from-sky-600 to-cyan-500',
  },
  {
    title: 'Communication',
    description:
      'Newsletters and announcements that feel intentional — not another noisy chat thread.',
    highlights: ['Structured updates', 'Consistent tone', 'Reach the whole group'],
    icon: Mail,
    accent: 'from-amber-500 to-orange-600',
  },
];

const testimonials = [
  {
    quote:
      'We finally have one place for articles, events, and “official” news. Onboarding new members takes half the time.',
    name: 'Sarah Johnson',
    role: 'Community manager',
    tag: 'Operations',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    quote:
      'Seminar attendance picked up once schedules lived next to member profiles. The context matters.',
    name: 'Michael Chen',
    role: 'Club president',
    tag: 'Programs',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    quote:
      'Our newsletter actually gets read now — it is the one channel people associate with real updates.',
    name: 'Emily Rodriguez',
    role: 'Non-profit director',
    tag: 'Comms',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

const faqItems = [
  {
    q: 'Who is MemberFun for?',
    a: 'Beplus-style member communities that mix learning, events, and ongoing conversation. If you outgrew ad-hoc group chats but do not need a heavyweight LMS, you are in the right place.',
  },
  {
    q: 'Can members update their own profiles?',
    a: 'Yes. Members can keep their own details fresh while admins retain oversight, so directories stay accurate without constant manual cleanup.',
  },
  {
    q: 'How do seminars and articles work together?',
    a: 'Articles build long-term knowledge; seminars anchor time-bound gatherings. Both live in the same hub so people connect “what we are reading” with “what we are attending.”',
  },
  {
    q: 'Is my data locked in?',
    a: 'We design around export-friendly patterns and clear ownership of your content. For enterprise specifics, reach out through Contact and we will walk through your requirements.',
  },
];

const Home = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reduced) return;

      const enterEase = 'expo.out';
      const batchReveal = (selector, start = 'top 86%') => {
        const els = gsap.utils.toArray(root.querySelectorAll(selector));
        if (!els.length) return;
        gsap.set(els, { opacity: 0, y: 48, scale: 0.97 });
        ScrollTrigger.batch(els, {
          start,
          once: true,
          onEnter: (elements) => {
            gsap.to(elements, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.82,
              stagger: 0.11,
              ease: enterEase,
            });
          },
        });
      };

      gsap.set(
        [
          '.home-hero-eyebrow',
          '.home-hero-line',
          '.home-hero-lead',
          '.home-hero-cta',
          '.home-hero-stat',
          '.home-hero-tip',
        ],
        { opacity: 0, y: 36 },
      );
      gsap.set('.home-hero-media', { opacity: 0, y: 40, scale: 0.94, rotate: -1.5 });

      const heroTl = gsap.timeline({ defaults: { ease: enterEase } });
      heroTl
        .to('.home-hero-eyebrow', { opacity: 1, y: 0, duration: 0.5 })
        .to(
          '.home-hero-line',
          { opacity: 1, y: 0, duration: 0.62, stagger: 0.11 },
          '-=0.28',
        )
        .to('.home-hero-lead', { opacity: 1, y: 0, duration: 0.55 }, '-=0.42')
        .to(
          '.home-hero-cta',
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          '-=0.35',
        )
        .to(
          '.home-hero-stat',
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 },
          '-=0.32',
        )
        .to('.home-hero-tip', { opacity: 1, y: 0, duration: 0.5 }, '-=0.28')
        .to(
          '.home-hero-media',
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.95,
            ease: 'power3.out',
          },
          '-=0.65',
        );

      gsap.to('.home-hero-float', {
        y: -10,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      batchReveal('.home-reveal-trust', 'top 90%');
      batchReveal('.home-section-header', 'top 88%');
      batchReveal('.home-reveal-value', 'top 86%');
      batchReveal('.home-step', 'top 86%');
      batchReveal('.home-feature-card', 'top 84%');
      batchReveal('.home-testimonial-card', 'top 84%');
      batchReveal('.home-faq-item', 'top 90%');
      batchReveal('.home-reveal-news', 'top 86%');
      batchReveal('.home-cta-banner > *', 'top 88%');

      gsap.to('.home-orb-a', {
        y: -40,
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.home-orb-b', {
        y: 48,
        x: -16,
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.15,
        },
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative min-h-screen overflow-x-hidden bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50"
    >
      {/* Hero — Contact / About editorial layout + video row */}
      <section className="relative overflow-hidden border-b border-zinc-200/90 dark:border-zinc-800">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#71717a0d_1px,transparent_1px),linear-gradient(to_bottom,#71717a0d_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] dark:bg-[linear-gradient(to_right,#fafafa08_1px,transparent_1px),linear-gradient(to_bottom,#fafafa08_1px,transparent_1px)]" />
        <div className="home-orb-a pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-600/15" />
        <div className="home-orb-b pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl dark:bg-cyan-600/10" />

        <div className={`${shell} pb-16 pt-16 lg:pb-20 lg:pt-20`}>
          <div className="lg:flex lg:items-end lg:justify-between lg:gap-16">
            <div className="max-w-2xl flex-1">
              <p className="home-hero-eyebrow text-xs font-semibold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-violet-600 dark:text-violet-400" aria-hidden />
                  Member hub for Beplus
                </span>
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                <span className="home-hero-line block">One calm home for</span>
                <span className="home-hero-line mt-1 block bg-gradient-to-r from-violet-600 via-violet-500 to-cyan-600 bg-clip-text text-transparent dark:from-violet-400 dark:via-violet-300 dark:to-cyan-400">
                  learning, events, and member life
                </span>
              </h1>
              <p className="home-hero-lead mt-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-xl">
                Publish technology articles, coordinate seminars, and track bonus points without
                losing the plot across email threads and chat apps. Built for communities that grow
                through shared curiosity — not through admin busywork.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  className="home-hero-cta inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-zinc-900/25 transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:shadow-none dark:hover:bg-zinc-100"
                  to="/register"
                >
                  Create your space
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  className="home-hero-cta inline-flex items-center justify-center gap-1 rounded-xl border-2 border-zinc-300 bg-white px-7 py-4 text-base font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:border-zinc-500 dark:hover:bg-zinc-800/80"
                  to="/contact"
                >
                  Talk to us
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  className="home-hero-cta text-center text-sm font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 sm:ml-2"
                  to="/about"
                >
                  About us →
                </Link>
              </div>
            </div>

            <div className="mt-12 grid w-full max-w-md shrink-0 grid-cols-2 gap-3 sm:max-w-md lg:mt-0 lg:max-w-sm">
              {heroStats.map((s) => (
                <div
                  key={s.label}
                  className="home-hero-stat rounded-2xl border border-zinc-200/90 bg-white/90 p-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80"
                >
                  <p className="text-2xl font-bold text-zinc-950 dark:text-white">{s.value}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {s.label}
                  </p>
                </div>
              ))}
              <div className="home-hero-tip col-span-2 rounded-2xl border border-violet-200/80 bg-violet-50/90 p-4 dark:border-violet-900/50 dark:bg-violet-950/40">
                <div className="flex items-center gap-2 text-violet-800 dark:text-violet-200">
                  <Sparkles className="h-5 w-5 shrink-0" aria-hidden />
                  <span className="text-sm font-semibold">
                    Web-first — no installs. Members join from a link you already share.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="home-hero-float mx-auto mt-14 max-w-4xl lg:mt-16">
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-violet-500/25 via-transparent to-cyan-500/25 blur-2xl dark:from-violet-500/15 dark:to-cyan-500/12" />
              <div className="home-hero-media relative overflow-hidden rounded-3xl border-2 border-zinc-200/90 bg-zinc-900 shadow-2xl ring-1 ring-black/5 dark:border-zinc-700">
                <video
                  className="aspect-video w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="https://i.pinimg.com/1200x/d1/35/56/d13556ec053cffc2410a682ee33436d6.jpg"
                >
                  <source src="/video-77a4da11.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2 text-base font-medium text-white">
                  <span className="rounded-lg bg-white/20 px-3 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                    Live space
                  </span>
                  <span className="text-white/95 drop-shadow-sm">
                    Where your community actually shows up
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust + value */}
      <section
        id="home-value"
        className={`border-b border-zinc-200/90 dark:border-zinc-800/80 ${sectionY}`}
      >
        <div className={shell}>
          <div
            id="home-trust"
            className="border-b border-zinc-200/80 pb-14 dark:border-zinc-800/80"
          >
            <p className="home-reveal-trust text-center text-base font-medium text-zinc-700 dark:text-zinc-300 sm:text-lg">
              Designed for member-led orgs that care about clarity, not clutter
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
              {['Articles', 'Seminars', 'Points', 'Newsletters', 'Directory'].map((pill) => (
                <span
                  key={pill}
                  className={`home-reveal-trust ${cardBase} px-4 py-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200`}
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-16 lg:pt-20">
            <SectionHeader
              kicker="Why teams pick MemberFun"
              title="Rich enough to run the community. Light enough to enjoy it."
              lead="Every block below maps to a real job your admins and members do weekly — not a feature matrix nobody asked for."
            />
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
              {valueProps.map(({ title, body, icon }) => (
                <li
                  key={title}
                  className={`home-reveal-value ${cardBase} flex flex-col p-6 sm:p-7`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                    {createElement(icon, { className: 'h-5 w-5', 'aria-hidden': true })}
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-zinc-950 dark:text-zinc-50">
                    {title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="home-how" className={`${band} ${sectionY}`}>
        <div className={shell}>
          <SectionHeader
            kicker="How it works"
            title="From first invite to steady rhythm"
            lead="Three beats that match how healthy communities actually operate."
          />
          <ol className="relative mx-auto mt-12 max-w-5xl lg:mt-14">
            <li
              className="pointer-events-none absolute left-[8%] right-[8%] top-10 hidden h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent lg:block dark:via-zinc-600"
              aria-hidden
            />
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
              {howItWorks.map((item) => (
                <li
                  key={item.step}
                  className={`home-step relative ${cardBase} p-7 sm:p-8`}
                >
                  <span className="font-mono text-sm font-bold text-violet-700 dark:text-violet-300">
                    {item.step}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-zinc-950 dark:text-zinc-50">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {item.body}
                  </p>
                </li>
              ))}
            </div>
          </ol>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className={`border-b border-zinc-200/90 dark:border-zinc-800/80 ${sectionY}`}
      >
        <div className={shell}>
          <SectionHeader
            kicker="Features"
            title="The core loops your members will feel every week"
            lead="Profiles anchor identity, seminars anchor time, communication anchors attention. Together they replace three disconnected habits."
          />
          <ul className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {features.map(({ title, description, highlights, icon, accent }) => (
              <li
                key={title}
                className={`home-feature-card group ${cardBase} flex flex-col p-7 transition-shadow hover:shadow-lg dark:hover:shadow-black/40 sm:p-8`}
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-white shadow-md`}
                >
                  {createElement(icon, { className: 'h-6 w-6', 'aria-hidden': true })}
                </div>
                <h3 className="mt-7 text-xl font-bold text-zinc-950 dark:text-zinc-50">
                  {title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {description}
                </p>
                <ul className="mt-6 space-y-3 border-t border-zinc-200/90 pt-6 dark:border-zinc-700">
                  {highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2.5 text-base text-zinc-700 dark:text-zinc-300"
                    >
                      <Layers className="mt-0.5 h-5 w-5 shrink-0 text-violet-600 dark:text-violet-400" />
                      {h}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section id="home-testimonials" className={`${band} ${sectionY}`}>
        <div className={shell}>
          <SectionHeader
            kicker="Voices from the field"
            title="Proof from people shipping real programs"
            lead="Quotes below are illustrative — swap them for your own member stories as you collect them."
          />
          <ul className="mx-auto mt-12 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {testimonials.map((t) => (
              <li
                key={t.name}
                className={`home-testimonial-card flex flex-col ${cardBase} p-7 sm:p-8`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-lg bg-violet-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-violet-900 dark:bg-violet-950/80 dark:text-violet-200">
                    {t.tag}
                  </span>
                  <svg
                    className="h-7 w-9 shrink-0 text-violet-500 dark:text-violet-400"
                    viewBox="0 0 45 36"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path d="M13.415.43c-2.523 0-4.75 1.173-6.682 3.52C4.8 6.298 3.756 9.38 3.756 12.89c0 3.28.986 6.296 2.959 9.048 1.973 2.752 4.49 4.128 7.552 4.128 2.43 0 4.386-.76 5.87-2.28 1.483-1.52 2.225-3.405 2.225-5.656 0-2.153-.74-3.94-2.225-5.36-1.484-1.52-3.24-2.28-5.267-2.28-1.862 0-3.147.42-3.855 1.26.296-2.153 1.187-3.99 2.67-5.51 1.484-1.52 3.24-2.28 5.267-2.28V.43zm25.04 0c-2.524 0-4.75 1.173-6.682 3.52-1.933 2.347-2.977 5.43-2.977 9.048 0 3.28.986 6.296 2.959 9.048 1.973 2.752 4.49 4.128 7.552 4.128 2.43 0 4.386-.76 5.87-2.28 1.483-1.52 2.225-3.405 2.225-5.656 0-2.153-.74-3.94-2.225-5.36-1.484-1.52-3.24-2.28-5.267-2.28-1.862 0-3.147.42-3.855 1.26.296-2.153 1.187-3.99 2.67-5.51 1.484-1.52 3.24-2.28 5.267-2.28V.43z" />
                  </svg>
                </div>
                <p className="mt-5 flex-1 text-base leading-relaxed text-zinc-800 dark:text-zinc-200">
                  {t.quote}
                </p>
                <div className="mt-8 flex items-center gap-3 border-t border-zinc-200/90 pt-6 dark:border-zinc-700">
                  <img
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-zinc-200 dark:ring-zinc-700"
                    src={t.image}
                    alt=""
                  />
                  <div>
                    <p className="text-base font-bold text-zinc-950 dark:text-zinc-50">{t.name}</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{t.role}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="home-faq"
        className={`${sectionY} border-b border-zinc-200/90 dark:border-zinc-800/80`}
      >
        <div className={shell}>
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              kicker="FAQ"
              title="Straight answers before you commit"
              lead={null}
            />
            <div className="mt-10 space-y-3 lg:mt-12">
              {faqItems.map((item) => (
                <details
                  key={item.q}
                  className={`home-faq-item group ${cardBase} overflow-hidden open:shadow-md dark:open:shadow-black/30`}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-left text-base font-bold text-zinc-950 sm:px-6 sm:py-5 sm:text-lg dark:text-zinc-50 [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <ChevronDown className="h-5 w-5 shrink-0 text-zinc-500 transition group-open:rotate-180 dark:text-zinc-400" />
                  </summary>
                  <p className="border-t border-zinc-200/90 px-5 pb-5 pt-4 text-base leading-relaxed text-zinc-700 dark:border-zinc-700 dark:text-zinc-300 sm:px-6">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA banner — About / Contact energy */}
      <section className={`${shell} pb-10 pt-4`}>
        <div className="home-cta-banner rounded-3xl border border-violet-200/80 bg-gradient-to-br from-violet-50 via-white to-cyan-50 p-8 shadow-sm dark:border-violet-900/40 dark:from-violet-950/50 dark:via-zinc-900 dark:to-zinc-900 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-800 dark:text-violet-200">
              Next step
            </p>
            <h2 className="mt-3 text-2xl font-bold text-zinc-950 dark:text-white sm:text-3xl">
              Ready to see MemberFun in action?
            </h2>
            <p className="mt-3 text-zinc-700 dark:text-zinc-300">
              Create a space, or talk to us first — whichever fits how your group decides.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-xl bg-zinc-950 px-6 py-3.5 text-center text-base font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
            >
              Sign up free
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-1 rounded-xl border-2 border-zinc-300 bg-white px-6 py-3.5 text-center text-base font-semibold text-zinc-900 transition hover:border-zinc-400 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:border-zinc-500"
            >
              Contact sales
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="home-newsletter" className={`${shell} pb-24 pt-2 lg:pb-32`}>
        <div className="relative overflow-hidden rounded-3xl border-2 border-zinc-200/90 bg-gradient-to-br from-zinc-950 via-violet-950 to-zinc-950 px-6 py-14 shadow-2xl sm:px-10 sm:py-16 lg:px-14 lg:py-20 dark:border-zinc-700">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-500/35 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-cyan-500/25 blur-3xl"
            aria-hidden
          />
          <div className="home-newsletter-inner relative mx-auto max-w-2xl text-center lg:max-w-3xl">
            <h2
              className="home-reveal-news text-3xl font-bold tracking-tight text-white sm:text-4xl"
              id="newsletter-headline"
            >
              Field notes for community builders
            </h2>
            <p className="home-reveal-news mt-4 text-lg leading-relaxed text-zinc-300">
              Release notes, facilitation tips, and product thinking — one concise email on a calm
              cadence.
            </p>
            <form
              className="home-reveal-news mx-auto mt-10 flex max-w-md flex-col gap-3 sm:max-w-xl sm:flex-row sm:items-stretch"
              onSubmit={(e) => e.preventDefault()}
            >
              <label className="sr-only" htmlFor="home-newsletter-email">
                Email address
              </label>
              <input
                id="home-newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="min-h-[3.25rem] flex-1 rounded-xl border-0 bg-white/15 px-4 text-base text-white placeholder:text-zinc-400 ring-2 ring-inset ring-white/25 backdrop-blur focus:outline-none focus:ring-2 focus:ring-white/70"
              />
              <button
                type="submit"
                className="inline-flex min-h-[3.25rem] items-center justify-center rounded-xl bg-white px-8 text-base font-bold text-zinc-950 transition hover:bg-zinc-100"
              >
                Subscribe
              </button>
            </form>
            <p className="home-reveal-news mt-5 text-sm leading-relaxed text-zinc-400">
              Unsubscribe anytime. Read our{' '}
              <a
                className="font-semibold text-white underline decoration-white/50 underline-offset-2 hover:decoration-white"
                href="#"
              >
                Privacy policy
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
