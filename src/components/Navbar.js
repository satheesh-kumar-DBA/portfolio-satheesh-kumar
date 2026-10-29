import { useState } from 'react';
import { useTheme } from '../themes/ThemeContext';

export default function Navbar({ profile, sections }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = sections.filter((s) => s.show_in_nav && s.nav_label);
  // Terminal theme shows menu items as paths, e.g. ./about
  const terminal = useTheme().nav === 'terminal';
  const label = (item) => (terminal ? `./${item.nav_label.toLowerCase()}` : item.nav_label);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-line/5 bg-ink-900/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href={navItems[0] ? `#${navItems[0].slug}` : '#'} className="flex min-w-0 items-center gap-3">
            {profile.avatar_url && (
              <img
                src={profile.avatar_url}
                alt=""
                className="h-9 w-9 flex-shrink-0 rounded-full border border-accent/60 object-cover shadow-glow"
                style={{ objectPosition: profile.avatar_position }}
              />
            )}
            <span className="truncate font-display text-base font-semibold text-fg-50 sm:text-lg">
              {terminal ? `${profile.full_name.split(' ')[0].toLowerCase()}@portfolio:~$` : profile.full_name}
            </span>
            {profile.headline && (
              <span className="hidden rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-accent-300 lg:inline-block">
                {profile.headline}
              </span>
            )}
          </a>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.slug}
                href={`#${item.slug}`}
                className="rounded-md px-3 py-2 text-sm font-medium text-fg-400 transition-colors hover:bg-line/5 hover:text-accent-300"
              >
                {label(item)}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="rounded-md p-2 text-fg-300 hover:bg-line/5 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-line/5 pb-3 pt-2 md:hidden">
            {navItems.map((item) => (
              <a
                key={item.slug}
                href={`#${item.slug}`}
                className="block rounded-md px-3 py-2.5 text-fg-300 hover:bg-line/5 hover:text-accent-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {label(item)}
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="glow-line opacity-40" />
    </nav>
  );
}
