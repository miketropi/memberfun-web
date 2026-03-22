import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';

const OFFICE = {
  street: '170-172 Xuân Thuỷ Street',
  line2: 'Khue Trung, Cam Le District',
  city: 'Da Nang City, Vietnam',
  phone: '+84 12 345 67 89',
  email: 'info@memberfun.com',
};

const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5167.936583273005!2d108.21200311176071!3d16.026069840525757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219f34f2fa307%3A0x4e722ce9f20c80a8!2zMTcwIFh1w6JuIFRo4buneSwgS2h1w6ogVHJ1bmcsIEPhuqltIEzhu4csIMSQw6AgTuG6tW5nLCBWaWV0bmFt!5e1!3m2!1sen!2s!4v1742063339965!5m2!1sen!2s';

const FAQS = [
  {
    q: 'Who is MemberFun for?',
    a: 'Member-led groups such as Beplus-style communities that combine learning, seminars, and member communication in one hub.',
  },
  {
    q: 'How do I create an account?',
    a: 'Use Sign up in the header, complete the form, and log in. If your organization uses invites, follow the link you were sent.',
  },
  {
    q: 'Can members update their own profiles?',
    a: 'Yes. Members can keep their details current while admins retain oversight, so your directory stays accurate.',
  },
  {
    q: 'Enterprise or security questions?',
    a: 'Use the form and mention your requirements in the message. We will route it to the right person and follow up with next steps.',
  },
];

const inputClass =
  'w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500';

const labelClass = 'text-sm font-semibold text-zinc-800 dark:text-zinc-200';

function ChannelCard({ icon: Icon, title, children, href, external }) {
  const inner = (
    <div className="group flex gap-4 rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm transition hover:border-violet-300/60 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-violet-700/50">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950/80 dark:text-violet-300">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-zinc-950 dark:text-zinc-50">{title}</h3>
          {href ? (
            <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-400 opacity-0 transition group-hover:opacity-100 dark:text-zinc-500" />
          ) : null}
        </div>
        <div className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {children}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block outline-none ring-violet-500 focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </a>
    );
  }

  return inner;
}

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: 'general',
    message: '',
  });
  const [status, setStatus] = useState({ type: null, text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (status.type) setStatus({ type: null, text: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form:', form);
    setStatus({
      type: 'success',
      text: 'Thanks — we received your message and will reply as soon as we can.',
    });
    setForm({ name: '', email: '', topic: 'general', message: '' });
  };

  return (
    <div className="min-h-0">
      {/* Hero — editorial layout */}
      <section className="relative overflow-hidden border-b border-zinc-200/90 dark:border-zinc-800">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#71717a0d_1px,transparent_1px),linear-gradient(to_bottom,#71717a0d_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] dark:bg-[linear-gradient(to_right,#fafafa08_1px,transparent_1px),linear-gradient(to_bottom,#fafafa08_1px,transparent_1px)]" />
        <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-600/15" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl dark:bg-cyan-600/10" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:flex lg:items-end lg:justify-between lg:gap-16 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">
              Contact
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
              Let’s make your{' '}
              <span className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-cyan-400">
                member experience
              </span>{' '}
              easier.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-xl">
              Product questions, partnerships, or help getting started — send a note and a real human will read it.
            </p>
            <Link
              to="/"
              className="mt-8 inline-flex text-sm font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
            >
              ← Back to home
            </Link>
          </div>

          <div className="mt-12 grid shrink-0 grid-cols-2 gap-3 sm:max-w-md lg:mt-0 lg:max-w-sm">
            <div className="rounded-2xl border border-zinc-200/90 bg-white/90 p-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
              <p className="text-2xl font-bold text-zinc-950 dark:text-white">1–2 days</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Typical reply
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200/90 bg-white/90 p-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
              <p className="text-2xl font-bold text-zinc-950 dark:text-white">Da Nang</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                HQ timezone
              </p>
            </div>
            <div className="col-span-2 rounded-2xl border border-violet-200/80 bg-violet-50/90 p-4 dark:border-violet-900/50 dark:bg-violet-950/40">
              <div className="flex items-center gap-2 text-violet-800 dark:text-violet-200">
                <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
                <span className="text-sm font-semibold">Prefer email? Use the cards → then the form for longer threads.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main: channels + form */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-4 lg:col-span-5">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-zinc-50">Ways to reach us</h2>
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Pick what fits. For anything that needs context, the form on the right keeps everything in one thread.
            </p>

            <div className="space-y-3 pt-2">
              <ChannelCard icon={Mail} title="Email" href={`mailto:${OFFICE.email}`}>
                <span className="break-all font-medium text-zinc-800 dark:text-zinc-200">{OFFICE.email}</span>
              </ChannelCard>
              <ChannelCard icon={Phone} title="Phone" href={`tel:${OFFICE.phone.replace(/\s/g, '')}`}>
                {OFFICE.phone}
              </ChannelCard>
              <ChannelCard icon={MapPin} title="Office">
                <p>{OFFICE.street}</p>
                <p>{OFFICE.line2}</p>
                <p>{OFFICE.city}</p>
              </ChannelCard>
            </div>

            <div className="flex gap-3 rounded-2xl border border-zinc-200/90 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
              <Clock className="h-5 w-5 shrink-0 text-zinc-500 dark:text-zinc-400" aria-hidden />
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                We read messages in order during business hours (ICT). Urgent production issues — say so in the subject
                line.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-lg shadow-zinc-200/40 dark:border-zinc-800 dark:bg-zinc-900/90 dark:shadow-black/40 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 border-b border-zinc-200/90 pb-6 dark:border-zinc-800">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600 text-white shadow-md">
                  <Send className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-zinc-950 dark:text-white">Send a message</h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">All fields required.</p>
                </div>
              </div>

              {status.type === 'success' && (
                <div
                  className="mt-6 rounded-xl border border-emerald-200/80 bg-emerald-50 p-4 text-sm font-medium text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200"
                  role="status"
                >
                  {status.text}
                </div>
              )}

              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className={labelClass}>
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className={`${inputClass} mt-2`}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={labelClass}>
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className={`${inputClass} mt-2`}
                      placeholder="you@organization.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-topic" className={labelClass}>
                    Topic
                  </label>
                  <select
                    id="contact-topic"
                    name="topic"
                    value={form.topic}
                    onChange={handleChange}
                    className={`${inputClass} mt-2`}
                  >
                    <option value="general">General question</option>
                    <option value="demo">Demo / onboarding</option>
                    <option value="billing">Billing & plans</option>
                    <option value="security">Security & compliance</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className={labelClass}>
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} mt-2 resize-y`}
                    placeholder="What are you trying to solve? Include links or org name if relevant."
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 py-3.5 text-base font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 sm:w-auto sm:min-w-[200px]"
                >
                  <Send className="h-4 w-4" aria-hidden />
                  Send message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="border-y border-zinc-200/90 bg-zinc-100/80 py-16 dark:border-zinc-800 dark:bg-zinc-900/40 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">
                Visit
              </p>
              <h2 className="mt-2 text-2xl font-bold text-zinc-950 dark:text-white sm:text-3xl">
                Our office in Da Nang
              </h2>
              <p className="mt-2 max-w-xl text-zinc-600 dark:text-zinc-400">
                {OFFICE.street}, {OFFICE.line2}, {OFFICE.city}
              </p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=170+Xu%C3%A2n+Thu%E1%BB%B7+Street+Da+Nang"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400"
            >
              Open in Google Maps
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200/90 shadow-xl dark:border-zinc-800">
            <iframe
              title="MemberFun office location"
              src={MAP_EMBED}
              className="h-[min(24rem,50vh)] w-full min-h-[16rem]"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
        <h2 className="text-center text-2xl font-bold text-zinc-950 dark:text-white sm:text-3xl">
          Quick answers
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-zinc-600 dark:text-zinc-400">
          The essentials before you write in.
        </p>
        <div className="mt-10 space-y-3">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-zinc-200/90 bg-white open:shadow-md dark:border-zinc-800 dark:bg-zinc-900/85 dark:open:shadow-black/20"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-left font-semibold text-zinc-950 dark:text-zinc-100 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-zinc-400 transition group-open:rotate-180 dark:text-zinc-500" />
              </summary>
              <p className="border-t border-zinc-200/90 px-5 pb-5 pt-3 text-base leading-relaxed text-zinc-700 dark:border-zinc-800 dark:text-zinc-300 sm:px-6">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;
