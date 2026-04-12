import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const linkGroups = [
    {
      title: 'Product',
      links: [
        { to: '/', label: 'Home' },
        { to: '/#features', label: 'Features' },
        { to: '/contact', label: 'Contact' },
      ],
    },
    {
      title: 'Account',
      links: [
        { to: '/login', label: 'Log in' },
        { to: '/register', label: 'Sign up' },
        { to: '/dashboard', label: 'Dashboard' },
      ],
    },
    {
      title: 'Company',
      links: [{ to: '/about', label: 'About' }],
    },
  ];

  return (
    <footer className="border-t border-zinc-200/90 bg-zinc-950 text-zinc-300 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            
            <Link
              to="/"
              className="inline-block text-xl font-bold tracking-tight text-white"
            >
              Member
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Fun
              </span>
            </Link>
            <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-400">
              One place for Beplus members to share articles, plan seminars, and
              stay in sync — without losing the thread across apps.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 text-zinc-400 transition hover:border-violet-500/50 hover:text-violet-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" aria-hidden />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 text-zinc-400 transition hover:border-violet-500/50 hover:text-violet-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" aria-hidden />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                  {group.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {group.links.map(({ to, label }) => (
                    <li key={to + label}>
                      <Link
                        to={to}
                        className="text-sm font-medium text-zinc-300 transition hover:text-white"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 sm:flex-row">
          <p className="text-center text-sm text-zinc-500 sm:text-left">
            © {currentYear} MemberFun. All rights reserved.
          </p>
          <p className="text-center text-sm text-zinc-600">
            Built for clarity, not clutter.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
