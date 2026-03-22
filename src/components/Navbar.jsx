import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import useAuthStore from '../store/authStore';
import useThemeStore from '../store/themeStore';

const navLinkClass = ({ isActive }) =>
  [
    'rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
    isActive
      ? 'bg-violet-100 text-violet-900 dark:bg-violet-950/60 dark:text-violet-200'
      : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white',
  ].join(' ');

const mobileLinkClass = ({ isActive }) =>
  [
    'block rounded-lg px-4 py-3 text-base font-semibold transition-colors',
    isActive
      ? 'bg-violet-100 text-violet-900 dark:bg-violet-950/50 dark:text-violet-200'
      : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800',
  ].join(' ');

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/90 bg-white/85 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/90">
      <nav aria-label="Main">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-8">
            <Link
              to="/"
              className="shrink-0 text-xl font-bold tracking-tight text-zinc-950 dark:text-white"
              onClick={closeMenu}
            >
              Member
              <span className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-cyan-400">
                Fun
              </span>
            </Link>

            <div className="hidden items-center gap-1 sm:flex">
              <NavLink to="/" className={navLinkClass} end>
                Home
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
              {isAuthenticated && (
                <NavLink to="/dashboard" className={navLinkClass}>
                  Dashboard
                </NavLink>
              )}
            </div>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-amber-400" aria-hidden />
              ) : (
                <Moon className="h-5 w-5" aria-hidden />
              )}
            </button>

            {isAuthenticated ? (
              <div className="ml-1 flex items-center gap-3 border-l border-zinc-200 pl-4 dark:border-zinc-700">
                <span className="max-w-[10rem] truncate text-sm font-medium text-zinc-600 dark:text-zinc-300">
                  {user?.name || 'Member'}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="rounded-xl bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="ml-1 flex items-center gap-2 border-l border-zinc-200 pl-4 dark:border-zinc-700">
                <Link
                  to="/login"
                  className="rounded-xl border-2 border-zinc-300 px-4 py-2.5 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-50 dark:hover:border-zinc-500 dark:hover:bg-zinc-800/80"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="rounded-xl bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 sm:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-amber-400" aria-hidden />
              ) : (
                <Moon className="h-5 w-5" aria-hidden />
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsMenuOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" aria-hidden />
              ) : (
                <Menu className="h-5 w-5" aria-hidden />
              )}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`border-t border-zinc-200/90 bg-white dark:border-zinc-800 dark:bg-zinc-950 sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        >
          <div className="space-y-1 px-4 py-4">
            <NavLink to="/" className={mobileLinkClass} end onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/about" className={mobileLinkClass} onClick={closeMenu}>
              About
            </NavLink>
            <NavLink to="/contact" className={mobileLinkClass} onClick={closeMenu}>
              Contact
            </NavLink>
            {isAuthenticated && (
              <NavLink
                to="/dashboard"
                className={mobileLinkClass}
                onClick={closeMenu}
              >
                Dashboard
              </NavLink>
            )}
          </div>

          <div className="border-t border-zinc-200 px-4 py-4 dark:border-zinc-800">
            {isAuthenticated ? (
              <div className="space-y-3">
                <p className="px-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  Signed in as{' '}
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {user?.name || 'Member'}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="w-full rounded-xl bg-zinc-950 py-3 text-center text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  className="w-full rounded-xl border-2 border-zinc-300 py-3 text-center text-sm font-semibold text-zinc-900 dark:border-zinc-600 dark:text-zinc-50"
                  onClick={closeMenu}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="w-full rounded-xl bg-zinc-950 py-3 text-center text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"
                  onClick={closeMenu}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
