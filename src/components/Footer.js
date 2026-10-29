import { SvgIcon, externalProps } from './Common';

export default function Footer({ profile, socialLinks }) {
  const links = socialLinks.filter((l) => l.show_in_footer);
  const footerText = (profile.footer_text || '')
    .replace('{year}', new Date().getFullYear())
    .replace('{name}', profile.full_name);

  return (
    <footer className="mt-10 border-t border-line/5 bg-ink-950/60">
      <div className="glow-line-amber mx-auto w-1/2 opacity-60" />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:px-6 md:flex-row lg:px-8">
        <p className="text-center font-mono text-xs text-fg-500 md:text-left">{footerText}</p>
        <div className="flex gap-2">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              aria-label={link.label}
              {...externalProps(link.url)}
              className="rounded-lg p-2 text-fg-500 transition-colors hover:bg-line/5 hover:text-accent-300"
            >
              <SvgIcon svg={link.icon_svg} className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
